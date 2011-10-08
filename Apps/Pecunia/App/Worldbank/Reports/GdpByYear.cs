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
	public class GdpByYearReport
	{
		[GroupingLevel(0, ShowCaption=true, CaptionFormat="{Year}", ShowHeader=true)]		
		class Item
		{
			[TableColumn()]
			public String Country { get; set; }

			[GroupBy(0, 0, SortDirection=SortDirection.Descending)]			
			public int Year { get; set; }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? GDP { get; set; }

			[TableColumn(HeaderText="Growth", Format="{0:n}%", SortIndex=0, SortDirection=SortDirection.Descending)]
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
						   Year = item.Year
					   };
			dc.AddTable("data", data.ToArray());
			
			var flow = new Flow { Orientation = FlowOrientation.Vertical };
			flow.AddTable<Item>("data");
			
			return Report.CreateReport(flow, dc);
		}
	}
}