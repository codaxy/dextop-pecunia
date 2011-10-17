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
using Pecunia.Model;

namespace Pecunia.App.Finance
{
    public class StocksPanel : DextopWindow
    {
        [DextopRemotableConstructor(alias = "stocks")]
        public StocksPanel()
        { 
        }
            
        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);
            Remote.AddStore("model", Load);
        }

        Stock[] Load(DextopReadFilter filter)
        {
            var data = StockDataProvider.GetStockData();
            return data.ToArray();
        }

        
    }
}