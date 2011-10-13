using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pecunia.Controllers
{
    public class ContactController : Controller
    {
        //
        // GET: /Content/
        public ActionResult Contact(String id)
        {
            return View(id);
        }

    }
}
