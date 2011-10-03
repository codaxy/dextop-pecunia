using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;
using System.Xml.Linq;
using System.Xml;
using System.Diagnostics;
using Codaxy.Common;

namespace Pecunia.Services
{
	public static class CurrencyService
	{
		static SortedDictionary<String, String> currencyName;

		static void LoadCurrencyNames()
		{
			if (currencyName != null)
				return;

			currencyName = new SortedDictionary<string, string>();
			foreach (var ci in CultureInfo.GetCultures(CultureTypes.SpecificCultures))
			{
				var regionInfo = new RegionInfo(ci.LCID);
				currencyName[regionInfo.ISOCurrencySymbol] = regionInfo.CurrencyEnglishName;
			}
		}

		public static String GetCurrencyName(String code)
		{
			if (currencyName == null)
				LoadCurrencyNames();
			String value;
			if (currencyName.TryGetValue(code, out value))
				return value;
			return code;
		}

		static CurrencyList currencyList;		

		public static CurrencyList GetCurrencyList()
		{
			if (currencyList != null && currencyList.Date.Date == DateTime.Today)
				return currencyList;
			return currencyList = FetchCurrencyList();
		}

		public static CurrencyList GetCurrencyList(String currency)
		{
			var list = GetCurrencyList();
			decimal? factor = null;
			var rate = list.Rates.SingleOrDefault(a => a.ISOCode == currency);
			if (rate != null)
				factor = rate.Rate;
			return new CurrencyList
			{
				Date = list.Date,
				Rates = list.Rates.Select(a => new CurrencyRate
				{
					Currency = a.Currency,
					Rate = NullableMath.Round(a.Rate / factor, 6),
					ISOCode = a.ISOCode
				}).ToList()
			};
		}

		public static CurrencyList FetchCurrencyList()
		{
			try
			{
				XElement xml = XElement.Load("http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml");
				var list = (from el in xml.Descendants()
							where el.Name.LocalName == "Cube"
							&& el.Attribute("time") != null
							select new CurrencyList
							{
								Date = XmlConvert.ToDateTime(el.Attribute("time").Value, XmlDateTimeSerializationMode.Local),
								Rates = (from d in el.Descendants()
										 select new CurrencyRate
										 {
											 Currency = GetCurrencyName(d.Attribute("currency").Value),
											 ISOCode = d.Attribute("currency").Value,
											 Rate = XmlConvert.ToDecimal(d.Attribute("rate").Value)
										 }).ToList()
							}).Single();
                
                //fixed course
                list.Rates.Add(new CurrencyRate { ISOCode = "BAM", Currency = GetCurrencyName("BAM"), Rate = 1.95583m });
				
                list.Rates.Add(new CurrencyRate
				{
					ISOCode = "EUR",
					Currency = GetCurrencyName("EUR"),
					Rate = 1
				});
				list.Rates = list.Rates.OrderBy(a => a.Currency).ToList();
				return list;
			}
			catch (Exception ex)
			{
				Debug.WriteLine(ex);
                return new CurrencyList
                {
                    Date = DateTime.Today.AddDays(-1),
                    Rates = new List<CurrencyRate>() { 
						new CurrencyRate { ISOCode = "EUR", Currency = "Euro", Rate = 1 },                       
					}
                };
			}
		}
	}

	public class CurrencyRate
	{
		public String ISOCode { get; set; }
		public String Currency { get; set; }
		public decimal? Rate { get; set; }
	}

	public class CurrencyList
	{
		public DateTime Date { get; set; }
		public List<CurrencyRate> Rates { get; set; }
	}
}