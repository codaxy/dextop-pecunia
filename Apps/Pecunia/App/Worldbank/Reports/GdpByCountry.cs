using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.CodeReports;
using Codaxy.CodeReports.CodeModel;
using Codaxy.CodeReports.Data;
using Codaxy.CodeReports.Controls;

namespace Pecunia.App.Worldbank.Reports
{
	public class GdpByCountryReport
	{
		[GroupingLevel(0, ShowCaption=true, CaptionFormat="{Country}", ShowHeader=true)]		
		class Item
		{
			[GroupBy(0, 0, SortDirection = SortDirection.Ascending)]			
			public String Country { get; set; }

			[TableColumn(SortIndex = 0, SortDirection = SortDirection.Descending, CellAlignment=CellAlignment.Left)]
			public int Year { get; set; }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? GDP { get; set; }

			[TableColumn(Format = "{0:n}", HeaderText = "GNI Per Capita")]
			public decimal? GniPerCapita { get; set; }

			[TableColumn(HeaderText="Growth", Format="{0:n}%")]
			public decimal? GdpGrowth { get; set; }
		}

		public static Report Generate()
		{
			var dc = new DataContext();
			var data = from item in Pecunia.Services.Worldbank.GDPService.LoadData()
					   select new Item
					   {
						   Country = item.Country,
						   GDP = item.GDP,
						   GdpGrowth = item.GDPGrowth,
						   Year = item.Year,
						   GniPerCapita = item.GniPerCapita
					   };
			dc.AddTable("data", data.ToArray());
			
			var flow = new Flow { Orientation = FlowOrientation.Vertical };
			flow.AddTable<Item>("data");
			
			return Report.CreateReport(flow, dc);
		}
	}
}