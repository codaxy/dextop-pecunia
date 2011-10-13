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
            Remote.AddStore("model", Load);
        }

		Contact[] Load(DextopReadFilter filter)
		{
            return ContactService.getContacts().ToArray();
		}

    }

    [DextopForm]
    [DextopModel]
    [DextopGrid]
    public class Contact
    {
        [DextopModelId]
        public int id { get; set; }

        [DextopFormFieldSet(0, title = "Personal")]
        [DextopFormField()]
        [DextopGridColumn(width = 200, text = "Firstname")]
        public String Firstname { get; set; }

        [DextopFormField()]
        [DextopGridColumn(width = 200, text = "Lastname")]
        public String Lastname { get; set; }

        [DextopFormField()]
        [DextopGridColumn(width = 200, text = "From")]
        public DateTime From { get; set; }

        [DextopFormField()]
        [DextopGridColumn(width = 200, text = "To")]
        public DateTime? To { get; set; }

        [DextopFormField()]
        [DextopFormFieldSet(0, title = "Live")]
        [DextopGridColumn(width = 200, text = "Science")]
        public String Business { get; set; }

        [DextopFormField()]
        [DextopGridColumn(width = 200, text = "Science")]
        public long   Capital { get; set; }

        public String ImageUrl { get; set; }

        public String InfoUrl { get; set; }
    }

}