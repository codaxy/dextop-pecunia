using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop.Data;

namespace Pecunia.Model
{
    [DextopModel]
    [DextopGrid]
    public class Stock
    {
        [DextopGridColumn(width = 60, text = "Code")]
        public String Code { get; set; }

        [DextopModelId]
        [DextopGridColumn(text = "Name", flex = 1)]
        public String Name { get; set; }

        [DextopGridColumn(width = 70, text = "Value (B$)")]
        public decimal? Value { get; set; }

        [DextopGridColumn(width = 70, text = "Price")]
        public decimal? Price { get; set; }

        [DextopGridColumn(width = 70, text = "Change (%)")]
        public decimal? Change { get; set; }
    }     
}