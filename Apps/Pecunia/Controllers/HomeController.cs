using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Codaxy.Dextop;

namespace Pecunia.Models
{
    public class AppConfig
    {
        public String[] JsFiles { get; set; }
        public String[] CssFiles { get; set; }
        public string SessionConfig { get; set; }
    }
}

namespace Pecunia.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            var app = DextopApplication.GetApplication();
            var session = new App.Session();
            var config = app.AddSession(session);

            var model = new Models.AppConfig
            {
                CssFiles = app.GetCssFiles(session.Culture),
                JsFiles = app.GetJsFiles(session.Culture),
                SessionConfig = DextopUtil.Encode(config)
            };            

            return View(model);           
        }

    }
}
