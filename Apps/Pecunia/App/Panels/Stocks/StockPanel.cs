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

        [DextopRemotableConstructor(alias = "stocks")]
        public StockPanel()
        { 
        }
            
        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);
            Remote.AddStore("model", Load);

        }

        Stock[] Load(DextopReadFilter filter)
        {
            var data = StockService.getStockDataSet();
            return data.ToArray();
        }

    }

    [DextopModel]
    [DextopGrid]
    public class Stock
    {
        [DextopModelId]
        [DextopGridColumn(width = 200, text = "Name", flex= 1)]
        public String Name { get; set; }

        [DextopGridColumn(width = 100, text = "Code")]
        public String Code { get; set; }

        [DextopGridColumn(width = 100, text = "Code")]
        public decimal? Change { get; set; }

        [DextopGridColumn(width = 100, text = "Price")]
        public decimal? Price { get; set; }

       
    }     
        
}