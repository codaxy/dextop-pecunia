using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.CodeReports;
using Codaxy.CodeReports.CodeModel;
using Codaxy.CodeReports.Data;
using Codaxy.CodeReports.Controls;
using Pecunia.Services.Worldbank;

namespace Pecunia.App.Worldbank.Reports
{
	public class GdpYearColumnReport
	{
		class Base
		{
			protected decimal?[] GDP = new decimal?[5];
			protected decimal?[] GDPGrowth = new decimal?[5];
			protected decimal?[] GNIPC = new decimal?[5];

			public void Process(int lastYear, CountryData rec)
			{
				var index = lastYear - rec.Year;
				if (index >= 5)
					return;

				GDP[index] = rec.GDP;
				GDPGrowth[index] = rec.GDPGrowth;
				GNIPC[index] = rec.GniPerCapita;
			}
		}



		[GroupingLevel(0, ShowHeader=true)]		
		class GdpItem : Base
		{
            [TableColumn(HeaderText = "Rank", CellDisplayMode = CellDisplayMode.RowNumber)]
            public int No { get; set; }

			[TableColumn()]
			public String Country { get; set; }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y1 { get { return GDP[4]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y2 { get { return GDP[3]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y3 { get { return GDP[2]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y4 { get { return GDP[1]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y5 { get { return GDP[0] ?? Y4; } }			
		}

		[GroupingLevel(0, ShowHeader = true)]
		class GrowthItem : Base
		{
            [TableColumn(HeaderText = "Rank", CellDisplayMode = CellDisplayMode.RowNumber)]
            public int No { get; set; }

			[TableColumn()]
			public String Country { get; set; }

			[TableColumn(Format = "{0:n}%")]
			public decimal? Y1 { get { return GDPGrowth[4]; } }

			[TableColumn(Format = "{0:n}%")]
			public decimal? Y2 { get { return GDPGrowth[3]; } }

			[TableColumn(Format = "{0:n}%")]
			public decimal? Y3 { get { return GDPGrowth[2]; } }

			[TableColumn(Format = "{0:n}%")]
			public decimal? Y4 { get { return GDPGrowth[1]; } }

			[TableColumn(Format = "{0:n}%")]
			public decimal? Y5 { get { return GDPGrowth[0] ?? Y4; } }
		}

		[GroupingLevel(0, ShowHeader = true)]
		class GniPCItem : Base
		{
            [TableColumn(HeaderText = "Rank", CellDisplayMode = CellDisplayMode.RowNumber)]
            public int No { get; set; }

			[TableColumn()]
			public String Country { get; set; }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y1 { get { return GNIPC[4]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y2 { get { return GNIPC[3]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y3 { get { return GNIPC[2]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y4 { get { return GNIPC[1]; } }

			[TableColumn(Format = "{0:0,0}")]
			public decimal? Y5 { get { return GNIPC[0] ?? Y4; } }
		}

		public static Report BiggestCountries()
		{			
			var dc = new DataContext();
			var data = new Dictionary<string, GdpItem>();
			var src = Pecunia.Services.Worldbank.GDPService.LoadData();
			var lastYear = src.Max(a=>a.Year);
			foreach (var item in src)
			{
				GdpItem i;
				if (!data.TryGetValue(item.Country, out i))
					data.Add(item.Country, i = new GdpItem { Country = item.Country });
				i.Process(lastYear, item);
			}

			var res = data.Values.ToArray();
			dc.AddTable("data", res);

			var table = TableGenerator.GetTable(typeof(GdpItem), "data");
			table.Columns.Last().SortIndex = 0;
			table.Columns.Last().SortDirection = SortDirection.Descending;
			for (var i = 0; i < 5; i++)
				table.Columns[i + 2].HeaderText = (lastYear - 4 + i).ToString();

			var flow = new Flow { Orientation = FlowOrientation.Vertical };
			flow.Add(table);
			
			return Report.CreateReport(flow, dc);
		}

		public static Report FastestGrowingCountries()
		{
			var dc = new DataContext();
			var data = new Dictionary<string, GrowthItem>();
			var src = Pecunia.Services.Worldbank.GDPService.LoadData();
			var lastYear = src.Max(a => a.Year);
			foreach (var item in src)
			{
				GrowthItem i;
				if (!data.TryGetValue(item.Country, out i))
					data.Add(item.Country, i = new GrowthItem { Country = item.Country });
				i.Process(lastYear, item);
			}

			var res = data.Values.ToArray();
			dc.AddTable("data", res);

			var table = TableGenerator.GetTable(typeof(GrowthItem), "data");
			table.Columns.Last().SortIndex = 0;
			table.Columns.Last().SortDirection = SortDirection.Descending;
			for (var i = 0; i < 5; i++)
				table.Columns[i + 2].HeaderText = (lastYear - 4 + i).ToString();

			var flow = new Flow { Orientation = FlowOrientation.Vertical };
			flow.Add(table);

			return Report.CreateReport(flow, dc);
		}

		public static Report BestCountries()
		{
			var dc = new DataContext();
			var data = new Dictionary<string, GniPCItem>();
			var src = Pecunia.Services.Worldbank.GDPService.LoadData();
			var lastYear = src.Max(a => a.Year);
			foreach (var item in src)
			{
				GniPCItem i;
				if (!data.TryGetValue(item.Country, out i))
					data.Add(item.Country, i = new GniPCItem { Country = item.Country });
				i.Process(lastYear, item);
			}

			var res = data.Values.ToArray();
			dc.AddTable("data", res);

			var table = TableGenerator.GetTable(typeof(GniPCItem), "data");
			table.Columns.Last().SortIndex = 0;
			table.Columns.Last().SortDirection = SortDirection.Descending;
			for (var i = 0; i < 5; i++)
				table.Columns[i+2].HeaderText = (lastYear - 4 + i).ToString();

			var flow = new Flow { Orientation = FlowOrientation.Vertical };
			flow.Add(table);

			return Report.CreateReport(flow, dc);
		}
	}
}