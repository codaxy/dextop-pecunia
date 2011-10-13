using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Pecunia.App;

namespace Pecunia.Services
{
    public class ContactService
    {
        public static List<Contact> getContacts(){
            List<Contact> contacts = new List<Contact>();

            contacts.Add(new Contact{
                id           = 1,
                Firstname    = "William Henry",
                Lastname     = "Gates",
                Business     = "Software",
                Capital      = 53000000000,
                From         = new DateTime(1955, 10, 28),
                To           = null,
                ImageUrl    = "http://upload.wikimedia.org/wikipedia/commons/b/bf/Bill_Gates_World_Economic_Forum_2007.jpg",
                InfoUrl      = "/Contact/Contact/BillGates"
            });

            contacts.Add(new Contact {
                id          = 2,
                Firstname = "Carlos Slim",
                Lastname = "Helú",
                Business = "Telekomunication",
                Capital = 74000000000,
                From = new DateTime(1940, 1, 28),
                To = null,
                ImageUrl = "http://upload.wikimedia.org/wikipedia/commons/d/df/Carlos_Slim_Hel%C3%BA.jpg",
                InfoUrl = "/Contact/Contact/CarlosSlim"
            });

            contacts.Add(new Contact
            {
                id        = 3,
                Firstname = "Warren",
                Lastname = "Buffet",
                Business = "Telekomunication",
                Capital = 39000000000,
                From = new DateTime(1930, 8, 30),
                To = null,
                ImageUrl = "http://upload.wikimedia.org/wikipedia/commons/5/51/Warren_Buffett_KU_Visit.jpg",
                InfoUrl = "/Contact/Contact/WarrenBuffet"
            });

            return contacts;
        }
    }
}