using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.CodeReports.Styling;

namespace Pecunia.App.Finance.Reports
{
    class ConditionalFormatters
    {
        public static CellStyle PercentChange(object value)
        {
            if (value == null)
                return null;
            var v = Convert.ToDouble(value);

            return new CellStyle
            {
                FontStyle = new FontStyle
                {
                    FontColor = Color.FromHtml(v >= 0 ? "#007700" : "#FF0000")
                }
            };
        }
    }
}