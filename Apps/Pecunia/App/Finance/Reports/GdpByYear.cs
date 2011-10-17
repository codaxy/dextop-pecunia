using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.CodeReports;
using Codaxy.CodeReports.CodeModel;
using Codaxy.CodeReports.Data;
using Codaxy.CodeReports.Controls;

namespace Pecunia.App.Finance.Reports
{
	public class GdpByYearReport
	{
		[GroupingLevel(0, ShowCaption=true, CaptionFormat="{Year}", ShowHeader=true)]		
		class Item
		{
            [TableColumn(HeaderText = "Rank", CellDisplayMode = CellDisplayMode.RowNumber)]
            public int No { get; set; }

			[TableColumn(SortIndex=0, SortDirection=SortDirection.Ascending)]
			public String Country { get; set; }

			[GroupBy(0, 0, SortDirection=SortDirection.Descending)]			
			public int Year { get; set; }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? GDP { get; set; }

			[TableColumn(Format = "{0:n}", HeaderText="GNI Per Capita")]
			public decimal? GniPerCapita { get; set; }

			[TableColumn(HeaderText="Growth", Format="{0:n}%")]
			public decimal? GdpGrowth { get; set; }
		}

		public static Report Generate()
		{
			var dc = new DataContext();
            var data = from item in Pecunia.Services.GdpDataProvider.GetData()
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
			var table = flow.AddTable<Item>("data");
            table.Columns.Single(a => a.DataField == "GdpGrowth").ConditionalFormatting = ConditionalFormatters.PercentChange;
			
			return Report.CreateReport(flow, dc);
		}
	}
}