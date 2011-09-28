using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Codaxy.Dextop;

namespace Pecunia
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.IgnoreRoute("rpc.ashx");
            routes.IgnoreRoute("poll.ashx");
            routes.IgnoreRoute("lpoll.ashx");

            routes.MapRoute(
                "Default", // Route name
                "{controller}/{action}/{id}", // URL with parameters
                new { controller = "Home", action = "Index", id = UrlParameter.Optional } // Parameter defaults
            );
        }

        protected void Application_Start()
        {
            try
            {
                AreaRegistration.RegisterAllAreas();

                RegisterGlobalFilters(GlobalFilters.Filters);
                RegisterRoutes(RouteTable.Routes);

                RegisterDextopApplication();
            }
            catch
            {
#if DEBUG
                HttpRuntime.UnloadAppDomain();
#endif
                throw;
            }
        }

        private void RegisterDextopApplication()
        {
            var app = new Application();
            app.Initialize();
            DextopApplication.RegisterApplication(app);
        }
    }
}