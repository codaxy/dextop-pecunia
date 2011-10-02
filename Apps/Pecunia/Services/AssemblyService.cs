using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Pecunia.Services
{
	public class AssemblyService
	{
		public static String GetVersionNumber()
		{
			var v = typeof(AssemblyService).Assembly.GetName().Version;
			return v.ToString();
			//return String.Format("{0}.{1}.{2}", v.Major, v.Minor, v.Build);
		}
	}
}