using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PetaTest;
using Pecunia.Services;

namespace Pecunia.Tests
{
	[TestFixture]
	public class GdpProviderTests
	{
		[Test]
		public void ServiceWorks()
		{
			var data = GdpDataProvider.GetData();
			Assert.AreNotEqual(0, data.Count);			
		}
	}
}
