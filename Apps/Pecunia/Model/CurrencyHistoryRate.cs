using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop.Data;

namespace Pecunia.Model
{
    [DextopModel]
    public class CurrencyHistoryRate
    {
        [DextopModelId]
        public DateTime Date { get; set; }
        public decimal? Rate { get; set; }
    }
}