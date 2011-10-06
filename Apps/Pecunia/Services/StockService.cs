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

        private static SortedDictionary<String, String> stockSet = new SortedDictionary<string, string>(){
            {"AAPL","Apple Inc."},
            {"AMZN","Amazon, Inc."}, 
            {"YHOO","Yahoo! Inc."}, 
            {"ORCL","Oracle "}, 
            {"MSFT","Microsoft"}, 
            {"INTC","Intel"}, 
            {"EBAY","eBay Inc."}, 
            {"DELL","Dell"}, 
            {"GOOG","Google"} 
        };

        public static List<Stock> getStockDataSet() { 
            List<Stock> stocks = new List<Stock>();

            foreach (var code in stockSet.Keys)
                stocks.Add(loadStockData(code));    

            return stocks;
        }

        private static Stock loadStockData(String stockCode)
        {
            String googleFinanceApiUrl = "http://www.google.com/finance/info?client=ig&q=" + stockCode;

            WebClient client = new WebClient();
            Stream stream = client.OpenRead(googleFinanceApiUrl);
            StreamReader reader = new StreamReader(stream);

            String json = reader.ReadToEnd();
            json = json.TrimStart(new char[] { '\n', '/', '/' });

            JToken stockData = JArray.Parse(json).First;
            
            stream.Close();

            Stock stock = new Stock()
            {
                Name = stockSet[stockCode],
                Code = stockCode,
                Change = Decimal.Parse(stockData["c"].ToString(), CultureInfo.InvariantCulture.NumberFormat),
                Price = Decimal.Parse(stockData["l_cur"].ToString(), CultureInfo.InvariantCulture.NumberFormat)
            };

            return stock;
        }

    }
}