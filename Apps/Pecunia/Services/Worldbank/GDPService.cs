using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Collections.Concurrent;
using System.Threading.Tasks;
using Codaxy.Dextop;

namespace Pecunia.Services.Worldbank
{
	public class GDPService
	{
		class Indicators
		{
			public const string GdpGrowthRate = "NY.GDP.MKTP.KD.ZG";
			public const string Gdp = "NY.GDP.MKTP.CD";
			public const string GniPerCapita = "NY.GNP.PCAP.CD";
		}
		
		const string indicatorServiceUrl = "http://api.worldbank.org/countries/indicators/{0}?per_page=2000&date={1}:{2}&format=json";

		static void FetchIndicator(String url, Action<CountryData, Decimal?> setter)
		{
			var request = WebRequest.Create(url);

			var response = request.GetResponse();

			JContainer data;
			using (var streamReader = new StreamReader(request.GetResponse().GetResponseStream()))
			using (var jr = new JsonTextReader(streamReader))
			{
				var js = JsonSerializer.Create(new JsonSerializerSettings());
				data = (JContainer)js.Deserialize(jr);
			}

			var list = new List<CountryData>();
			var indicators = (JArray)data[1];
			
			foreach (var indicator in indicators)
			{
				var year = indicator.Value<int>("date");
				var country = indicator["country"].Value<String>("value");
				var countryId = indicator["country"].Value<String>("id");
				var indicatorValue =  indicator.Value<decimal?>("value");

				if (indicatorValue.HasValue)
				{
					var key = countryId + year;
					var e = countryData.GetOrAdd(key, new CountryData { ID = key, Year = year, Country = country });

					setter(e, indicatorValue);
				}
			}			
		}

		public static string CacheFilePath { get; set; }

		public static IList<CountryData> LoadData()
		{
			lock (countryData)
			{
				if (countryData.Count == 0)
				{
					if (CacheFilePath!=null && File.Exists(CacheFilePath) && File.GetLastWriteTime(CacheFilePath).Date == DateTime.Today)
					{
						using (var jtr = new JsonTextReader(new StreamReader(CacheFilePath)))
						{
							var js = new JsonSerializer();
							foreach (var item in js.Deserialize<CountryData[]>(jtr))
								countryData.TryAdd(item.ID, item);
						}
					}
					else
					{

						var lastYear = DateTime.Today.Year - 1;
						var firstYear = lastYear - 4;
						string gdpServiceUrl = String.Format(indicatorServiceUrl, Indicators.Gdp, firstYear, lastYear);
						string gdpGrowthServiceUrl = String.Format(indicatorServiceUrl, Indicators.GdpGrowthRate, firstYear, lastYear);
						string gniPerCapitaServiceUrl = String.Format(indicatorServiceUrl, Indicators.GniPerCapita, firstYear, lastYear);

						Parallel.Invoke(new Action[] {
						() => {	FetchIndicator(gdpServiceUrl, (c, v) => { c.GDP = v; });}, 
						() => { FetchIndicator(gdpGrowthServiceUrl, (c, v) => { c.GDPGrowth = v; });},
						() => { FetchIndicator(gniPerCapitaServiceUrl, (c, v) => { c.GniPerCapita = v; });}
					});

						if (CacheFilePath != null)
						{
							//Cache data on disk
							using (var jtw = new JsonTextWriter(new StreamWriter(CacheFilePath)))
							{
								var js = new JsonSerializer();
								js.Serialize(jtw, countryData.Values);
							}
						}
					}
				}

				return countryData.Values.ToArray();
			}
		}


		

		static ConcurrentDictionary<String, CountryData> countryData = new ConcurrentDictionary<string, CountryData>();

		
	}

	public class CountryData
	{
		public String ID { get; set; }
		public String Country { get; set; }
		public int Year { get; set; }
		public decimal? GDP { get; set; }
		public decimal? GDPGrowth { get; set; }
		public decimal? GniPerCapita { get; set; }
	}
}