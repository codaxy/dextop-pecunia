using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using System.Xml;
using System.Globalization;
using System.Diagnostics;
using Codaxy.Dextop.Data;
using Pecunia.Model;

namespace Pecunia.Services
{
    public class CurrencyHistoryDataProvider
    {        
        static List<CurrencyList> historyList;
        static DateTime cacheTime;

        public static CurrencyHistoryRate[] GetCurrencyRateHistory(String ISOCode)
        {
            return GetCurrencyList().SelectMany(a => a.Rates.Where(b => b.ISOCode == ISOCode).Select(c => new CurrencyHistoryRate
            {
                Date = a.Date,
                Rate = c.Rate,
            })).ToArray();
        }

        public static CurrencyHistoryRate[] GetCurrencyRateComparisionHistory(String ISOCode, String baseCurrencyISOCode)
        {
            var list1 = GetCurrencyRateHistory(ISOCode);
            var list2 = GetCurrencyRateHistory(baseCurrencyISOCode);
            if (list1.Length == list2.Length)
                for (var i = 0; i < list1.Length; i++)
                    list1[i].Rate /= list2[i].Rate;
            return list1;
        }

        public static List<CurrencyList> GetCurrencyList()
        {
            if (historyList != null && cacheTime.AddHours(1) > DateTime.Now)
                return historyList;
            historyList = FetchCurrencyList();
            cacheTime = DateTime.Now;
            return historyList;
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
                                             ISOCode = d.Attribute("currency").Value,
                                             Rate = XmlConvert.ToDecimal(d.Attribute("rate").Value)
                                         }).ToList()
                            }).Reverse().ToList<CurrencyList>();
                foreach (var clist in list)
                {
                    clist.Rates.Add(new CurrencyRate
                    {
                        ISOCode = "EUR",
                        Rate = 1
                    });

                    clist.Rates.Add(new CurrencyRate
                    {
                        ISOCode = "BAM",
                        Rate = 1.95583m
                    });
                }
                return list;
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return new List<CurrencyList>();
            }
        }
    }
}