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
using Codaxy.CodeReports;
using System.Web.UI;
using Codaxy.CodeReports.Exporters.Html;
using Codaxy.WkHtmlToPdf;
using Codaxy.CodeReports.Exporters.Text;
using Codaxy.CodeReports.Exporters.Xlio;
using Codaxy.CodeReports.Styling;

namespace Pecunia.App.Finance
{
    public class GdpPanel : DextopWindow
    {
        [DextopRemotableConstructor(alias = "gdp")]
		public GdpPanel()
        {
			GdpDataProvider.CacheFilePath = DextopUtil.MapPath("Cache/gdp.json");
        }

        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);
			Remote.OnProcessAjaxRequest = RenderReport;
			Remote.AddStore("reports", new[] {
				new ReportType { ReportId = "GdpByYear", Title = "GDP By Year" },
				new ReportType { ReportId = "GdpByCountry", Title = "GDP By Country" },
				new ReportType { ReportId = "BiggestCountries", Title = "Biggest Countries" },
				new ReportType { ReportId = "FastestGrowingCountries", Title = "Fastest Growing Countries" },
				new ReportType { ReportId = "BestCountries", Title = "Best Countries (GNI per Capita)" },
			});
        }

		void RenderReport(HttpContext context)
		{
			var type = context.Request.QueryString["type"];

			Report report;
			switch (type)
			{
				case "GdpByYear":
					report = Reports.GdpByYearReport.Generate();
					break;
				case "GdpByCountry":
					report = Reports.GdpByCountryReport.Generate();
					break;
				case "BiggestCountries":
					report = Reports.GdpYearColumnReport.BiggestCountries();
					break;
				case "FastestGrowingCountries":
					report = Reports.GdpYearColumnReport.FastestGrowingCountries();
					break;
				case "BestCountries":
					report = Reports.GdpYearColumnReport.BestCountries();
					break;
				default:
					throw new InvalidOperationException("Invalid report type.");
			}
            

			try
			{

				switch (context.Request.QueryString["format"])
				{
					case "pdf":
						var url = context.Request.Url.ToString().Replace("format=pdf", "print=1");
						PdfConvert.ConvertHtmlToPdf(new PdfDocument { Url = url }, new PdfOutput { OutputStream = context.Response.OutputStream });
						context.Response.SetFileDownloadHeaders(String.Format("Report{0}.pdf", DateTime.Now.Ticks));
						break;
					case "text":
						context.Response.SetFileDownloadHeaders(String.Format("Report{0}.txt", DateTime.Now.Ticks));
						TextReportWriter.WriteTo(report, context.Response.Output);
						break;
					case "xlsx":
						context.Response.SetFileDownloadHeaders(String.Format("Report{0}.xlsx", DateTime.Now.Ticks));
						XlsxReportWriter.WriteToStream(report, Themes.Default, context.Response.OutputStream);
						break;						
					default:
						var output = new HtmlTextWriter(context.Response.Output);
						var htmlWriter = new HtmlReportWriter(output);
						htmlWriter.RegisterCss(DextopUtil.AbsolutePath("client/css/report.css"));
						if (context.Request.QueryString["print"] == null)
							htmlWriter.RegisterCss(DextopUtil.AbsolutePath("client/css/report-preview.css"));
						htmlWriter.Write(report, new DefaultHtmlReportTheme());
						break;
				}

			}
			catch (Exception ex)
			{
				context.Response.Write(ex.ToString());
			}
		}

		[DextopModel]
		[DextopGrid]
		class ReportType
		{
			public String ReportId { get; set; }

			[DextopGridColumn(flex=1)]
			public String Title { get; set; }
		}

		
    }
        
}