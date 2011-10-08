using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using PetaTest;
using Pecunia.Services.Worldbank;

namespace Pecunia.Tests
{
	[TestFixture]
	public class WorldBankServicesTests
	{
		[Test]
		public void ServiceWorks()
		{
			var data = GDPService.LoadData();
			Assert.AreNotEqual(0, data.Count);			
		}
	}
}
