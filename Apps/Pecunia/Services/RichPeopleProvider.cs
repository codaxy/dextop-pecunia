using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Pecunia.App;
using Newtonsoft.Json;
using Codaxy.Dextop;
using System.IO;
using Pecunia.App.Finance;
using Pecunia.Model;

namespace Pecunia.Services
{
    public class RichPeopleProvider
    {
		public static List<RichPerson> GetContacts()
		{
			List<RichPerson> contacts = new List<RichPerson>();

			var dataFilePath = DextopUtil.MapPath("rich-people.json");

			return JsonConvert.DeserializeObject<List<RichPerson>>(File.ReadAllText(dataFilePath), new JsonSerializerSettings
			{
				Converters = new[] { new Newtonsoft.Json.Converters.IsoDateTimeConverter() }
			});
		}

		public static void SaveContacts(IList<RichPerson> contacts)
		{
			var dataFilePath = DextopUtil.MapPath("rich-people.json");

			var json = JsonConvert.SerializeObject(contacts, Formatting.Indented, new JsonSerializerSettings
			{
				Converters = new[] { new Newtonsoft.Json.Converters.IsoDateTimeConverter() }
			});

			File.WriteAllText(dataFilePath, json);			
		}
    }
}