using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Pecunia.App;
using Newtonsoft.Json;
using Codaxy.Dextop;
using System.IO;

namespace Pecunia.Services
{
    public class ContactService
    {
		public static List<Contact> GetContacts()
		{
			List<Contact> contacts = new List<Contact>();

			var dataFilePath = DextopUtil.MapPath("rich-people.json");

			return JsonConvert.DeserializeObject<List<Contact>>(File.ReadAllText(dataFilePath), new JsonSerializerSettings
			{
				Converters = new[] { new Newtonsoft.Json.Converters.IsoDateTimeConverter() }
			});
		}

		public static void SaveContacts(IList<Contact> contacts)
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