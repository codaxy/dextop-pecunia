using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop;
using Codaxy.Dextop.Remoting;

namespace Pecunia.App
{
    public class Session : DextopSession
    {


        [DextopRemotable]
        DextopConfig CreatePanel(String panelName)
        {

            /*
            switch (panelName)
            {
                case "invoice-list": return Remote.Register(new InvoiceList());
            }
            */

            throw new Exception("Requested View not does not exist!");
        }

    }
}