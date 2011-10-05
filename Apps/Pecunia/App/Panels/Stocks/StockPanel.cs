using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop;
using Codaxy.Dextop.Remoting;
using Codaxy.Dextop.Data;
using System.Xml.Linq;
using System.Globalization;
using System.Xml;
using Codaxy.Dextop.Forms;
using Pecunia.Services;
using Codaxy.Common;

namespace Pecunia.App
{
    public class StockPanel : DextopWindow
    {

        private List<String> StockNames;

        [DextopRemotableConstructor(alias = "courses")]
        public StockPanel()
        {
            StockNames = new List<String>() { "AAPL", "AMZN", "YHOO", "CNET", "ORCL", "NOVL", "MSFT", "INTC", "EBAY", "DELL", "GOOG" };


        }

        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);
            Remote.AddStore("model", Load);

        }

        Stock[] Load(DextopReadFilter filter)
        {
            /*
            var data = CurrencyService.GetCurrencyList(currency);
            return data.Rates.Select(a => new RateModel
            {
                Currency = a.Currency,
                ISOCode = a.ISOCode,
                Rate = a.Rate,
                Amount = amount * a.Rate
            }).ToArray();
            */
            return null;
        }
    }

    [DextopModel]
    [DextopGrid]
    public class Stock
    {
        [DextopGridColumn(width = 200, text = "Name")]
        public String Name { get; set; }

        [DextopGridColumn(width = 100, text = "Value")]
        public decimal? Value { get; set; }
    }     
        
}