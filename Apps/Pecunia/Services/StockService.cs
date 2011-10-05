using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using Pecunia.App;

namespace Pecunia.Services
{
    public class StockService
    {

        private static List<String> StockNames = new List<String>() {
            "AAPL", "AMZN", "YHOO", "CNET", "ORCL", "NOVL", "MSFT", "INTC", "EBAY", "DELL", "GOOG" 
        };

        public static List<Stock> getStockDataSet() { 
            List<Stock> stocks = new List<Stock>();

            return stocks;
        }

        private string loadJSONStockData(String stockCode)
        {
            String googleFinanceApiUrl = "http://www.google.com/finance/info?client=ig&q=" + stockCode;

            HttpWebRequest request = (HttpWebRequest) WebRequest.Create(googleFinanceApiUrl);

            HttpWebResponse response = (HttpWebResponse) request.GetResponse();
            StreamReader responseStream = new StreamReader(response.GetResponseStream());
            string result = responseStream.ReadToEnd();
            
            response.Close();
            responseStream.Close();

            return result;
        }

        private Stock parseJSONStockData(String stockData) {

            Stock stock = new Stock();
            
            // i think this way is better :) 
            /*
            WebClient client = new WebClient();
            Stream stream = client.OpenRead("http://api.kazaa.com/api/v1/search.json?q=muse&type=Album");
            StreamReader reader = new StreamReader(stream);

            Newtonsoft.Json.Linq.JObject jObject = Newtonsoft.Json.Linq.JObject.Parse(reader.ReadLine());

            // instead of WriteLine, 2 or 3 lines of code here using WebClient to download the file
            Console.WriteLine((string)jObject["albums"][0]["cover_image_url"]);
            stream.Close();
            */
            
            

            return null;
        }

    }
}