using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using Pecunia.App;
using Newtonsoft.Json.Linq;
using System.Globalization;
using Codaxy.Dextop;
using System.Diagnostics;
using Pecunia.Model;

namespace Pecunia.Services
{
    public class StockDataProvider
    {
        public static List<Stock> GetStockData()
        {
            String stockCodes = "AAPL+XOM+ORCL+MSFT+INTC+GOOG+IBM+CHL+PTR";
            String resultConfig     = "snc1j1p";

            String stockRequstUrl = "http://finance.yahoo.com/d/quotes.csv?s=" + stockCodes + "&f=" + resultConfig;

			var cacheFile = DextopUtil.MapPath("Cache/stocks.csv");

			if (!File.Exists(cacheFile) || File.GetLastWriteTime(cacheFile) < DateTime.Now.AddHours(-1))
			{
				try
				{
					WebClient client = new WebClient();
					client.DownloadFile(stockRequstUrl, cacheFile);
				}
				catch (Exception ex)
				{
					Debug.WriteLine(ex);
				}
			}

			var lines = File.ReadAllLines(cacheFile);

            List<Stock> stocks = new List<Stock>();

            foreach (var line in lines)
            {
                String[] attributes = line.Split(',');
                stocks.Add(new Stock()
                {
                    Code = attributes[0].Trim('"'),
					Name = attributes[1].Trim('"'),
                    Change = Decimal.Parse(attributes[2], CultureInfo.InvariantCulture) / 10,
                    Value = Decimal.Parse(attributes[3].TrimEnd('B'), CultureInfo.InvariantCulture),
                    Price = Decimal.Parse(attributes[4], CultureInfo.InvariantCulture)
                });
            }

            return stocks;
        }
    }
}