using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using Pecunia.App;
using Newtonsoft.Json.Linq;
using System.Globalization;

namespace Pecunia.Services
{
    public class StockService
    {
        public static List<Stock> getStockData()
        {

            String stockCodes = "AAPL+XOM+ORCL+MSFT+INTC+GOOG+IBM+CHL+PTR";
            String resultConfig     = "snc1j1p";

            String stockRequstUrl = "http://finance.yahoo.com/d/quotes.csv?s=" + stockCodes + "&f=" + resultConfig;

            WebClient client = new WebClient();
            Stream stream = client.OpenRead(stockRequstUrl);
            StreamReader reader = new StreamReader(stream);

            // read csv share data 
            List<String> lines = new List<String>();
            while (!reader.EndOfStream)
                lines.Add(reader.ReadLine().Replace("\"", ""));
            stream.Close();


            List<Stock> stocks = new List<Stock>();

            foreach (var line in lines)
            {
                String[] attributes = line.Split(',');
                stocks.Add(new Stock()
                {
                    Code = attributes[0],
                    Name = attributes[1],
                    Change = Decimal.Parse(attributes[2], CultureInfo.InvariantCulture.NumberFormat),
                    Capital = Decimal.Parse(attributes[3].TrimEnd('B'), CultureInfo.InvariantCulture.NumberFormat),
                    Price = Decimal.Parse(attributes[4], CultureInfo.InvariantCulture.NumberFormat)
                });
            }

            return stocks;
        }
    }
}