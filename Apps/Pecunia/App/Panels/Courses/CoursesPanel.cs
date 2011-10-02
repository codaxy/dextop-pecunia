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
    public class CoursesPanel : DextopWindow
    {
        [DextopRemotableConstructor(alias = "courses")]
        public CoursesPanel()
        {
            
        }

        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);			
            Remote.AddStore("model", Load);
			Remote.AddLookupData("Currency", CurrencyService.GetCurrencyList().Rates.Select(a => new Object[] { 
				a.ISOCode, String.Format("{0} ({1})", a.Currency, a.ISOCode) }).ToArray());
			
			config["convertData"] = new ConvertForm
			{
				Amount = 100,
				Currency = "EUR"
			};
        }

		RateModel[] Load(DextopReadFilter filter)
		{			
			var currency = filter.Params.SafeGet("Currency", "EUR");
			var amount = filter.Params.SafeGet("Amount", 100.0m);
			
			var data = CurrencyService.GetCurrencyList(currency);
			return data.Rates.Select(a => new RateModel
			{
				Currency = a.Currency,
				ISOCode = a.ISOCode,
				Rate = a.Rate,
				Amount = amount * a.Rate
			}).ToArray();
		}

		[DextopModel]
		[DextopGrid]
		class RateModel
		{

			[DextopGridColumn(width = 200, text = "Currency")]
			public String Currency { get; set; }

			[DextopGridColumn(width = 100, text = "Rate")]
			public decimal? Rate { get; set; }

			[DextopGridColumn(renderer = "money")]
			public decimal? Amount { get; set; }

			[DextopModelId]
			[DextopGridColumn(width = 50, text = "ISO")]
			public String ISOCode { get; set; }
		}

		[DextopForm]
		public class ConvertForm
		{
			[DextopFormField(labelAlign = "top", width=100)]
			public double Amount { get; set; }

			[DextopFormLookupCombo(labelAlign="top", width=200)]
			public string Currency { get; set; }
		}
    }
    

    
}