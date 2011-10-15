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

namespace Pecunia.App
{
    public class ContactsPanel : DextopWindow
    {
        [DextopRemotableConstructor(alias = "contacts")]
        public ContactsPanel()
        {
        }

		public override void InitRemotable(DextopRemote remote, DextopConfig config)
		{
			base.InitRemotable(remote, config);
			Remote.AddStore("model", new ContactCrud());
		}
    }

	class ContactCrud : IDextopDataProxy<Contact>
	{
		Dictionary<String, Contact> Data { get; set; }

		public ContactCrud()
		{
			Data = new Dictionary<string, Contact>();
			foreach (var c in ContactService.GetContacts())
				Data[c.Id] = c;
		}

		public IList<Contact> Create(IList<Contact> records)
		{
			foreach (var rec in records)
			{
				rec.Id = Guid.NewGuid().ToString();
				Data.Add(rec.Id, rec);
			}
			ContactService.SaveContacts(Data.Values.ToArray());
			return records;
		}

		public IList<Contact> Destroy(IList<Contact> records)
		{
			foreach (var rec in records)
			{
				Data.Remove(rec.Id);
			}
			ContactService.SaveContacts(Data.Values.ToArray());
			return new Contact[0];
		}

		public IList<Contact> Update(IList<Contact> records)
		{
			foreach (var rec in records)
			{
				Data[rec.Id] = rec;
			}
			ContactService.SaveContacts(Data.Values.ToArray());
			return records;
		}

		public DextopReadResult<Contact> Read(DextopReadFilter filter)
		{
			return DextopReadResult.Create(Data.Values);
		}
	}

    [DextopForm]
    [DextopModel]
    [DextopGrid]
    public class Contact
    {
        [DextopModelId]
        public string Id { get; set; }

		[DextopFormField(anchor = "0")]
		[DextopGridColumn(flex = 1, text = "Name")]
		public String Name { get; set; }

		[DextopFormTabPanel(itemId="tab")]
		[DextopFormPanel(1, title = "General", bodyStyle = "padding: 5px", layout = "anchor")]
        [DextopFormFieldSet(2, title = "Personal")]
        [DextopFormField()]        
        public String DOB { get; set; }

		[DextopFormField(fieldLabel="Photo URL", anchor="0")]        
		public String PhotoUrl { get; set; }

		[DextopFormField(fieldLabel = "Wikipedia URL", anchor = "0")]
		public String WikipediaUrl { get; set; }

		[DextopFormField(anchor="0")]
		public String Nationality { get; set; }

		[DextopFormField(anchor = "0")]
		public string Religion { get; set; }

		[DextopFormField()]
		public int? Children { get; set; }

		[DextopFormFieldSet(2, title = "Life")]        
		[DextopFormField(anchor = "0")]        
        public String Business { get; set; }

        [DextopFormField(fieldLabel = "Fortune US$ (billion)")]
        [DextopGridColumn(width = 100)]
        public double Fortune { get; set; }

		[DextopFormField(anchor = "0")]
		public string Occupation { get; set; }

		[DextopFormPanel(1, title = "Bio", bodyStyle = "padding: 5px", layout = "anchor")]
		[DextopFormTextArea(anchor="0", height=200, labelAlign="top")]
		public string Bio { get; set; }

		[DextopFormPanel(1, title = "Extra", bodyStyle = "padding: 5px", layout="anchor")]
		[DextopFormField(anchor = "0", fieldLabel="Title", labelAlign="top")]
		public string ExtraTitle { get; set; }

		[DextopFormTextArea(anchor = "0", height = 200, labelAlign = "top")]
		public string Extra { get; set; }


	}

}