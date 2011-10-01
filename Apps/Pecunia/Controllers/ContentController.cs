using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Pecunia.Controllers
{
    public class ContentController : Controller
    {
        //
        // GET: /Content/
        public ActionResult Article(String id)
        {
            return View(id);
        }

    }
}
