using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using System.Xml;
using System.Globalization;
using System.Diagnostics;
using Codaxy.Dextop.Data;

namespace Pecunia.Services
{
    public class CurrencyHistoryService
    {
        
        static List<CurrencyList> historyList;

        private static List<CurrencyList> PrepareData()
        {
            //if (historyList != null && historyList.Date.Date == DateTime.Today)
            if (historyList != null)
                return historyList;
            return historyList = FetchCurrencyList();
        }

        public static List<CurrencyHistoryRate> getHistoryRateOfCurrency(String ISOCode)
        {
            PrepareData();
            List<CurrencyHistoryRate> list = new List<CurrencyHistoryRate>();
            foreach (var value in historyList) {
                CurrencyRate rate = value.Rates.Where(a => a.ISOCode.Equals(ISOCode)).Single();
                list.Add(new CurrencyHistoryRate() { 
                    Date = value.Date,
                    Rate = rate.Rate
                });
            }
            return list;
        }

        public static List<CurrencyList> FetchCurrencyList()
        {
            try
            {
                XElement xml = XElement.Load("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml");
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
                            }).Reverse().ToList<CurrencyList>();
                foreach (var clist in list)
                {
                    clist.Rates.Add(new CurrencyRate
                    {
                        ISOCode = "EUR",
                        Currency = GetCurrencyName("EUR"),
                        Rate = 1
                    });
                    clist.Rates.OrderBy(a => a.ISOCode).ToList();
                }
                return list;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return new List<CurrencyList>();
            }
        }

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

     


    }

    [DextopModel]
    public class CurrencyHistoryRate
    {
        [DextopModelId]
        public DateTime Date { get; set; }
        public decimal? Rate { get; set; }
    }

   
}