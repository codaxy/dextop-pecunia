using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop;

namespace Pecunia
{
    public class Application : DextopApplication
    {
        protected override void RegisterModules()
        {
#if DEBUG
            var debug = true;
#else
            var debug = false;
#endif
            /// TODO: Replace this in your application 
            /// with path to your local Ext repository
            
            RegisterModule("http://dextop.codaxy.com/ext/extjs-4.1.1-rc2", new DextopExtJSModule
            {
                CssThemeSuffix = "-gray",
                UsingExternalResources = true,
                Debug = debug
            });
            RegisterModule("client/lib/dextop", new DextopCoreModule());
            RegisterModule("", new AppModule());            
        }

        protected override void OnModulesInitialized()
        {
            base.OnModulesInitialized();
#if !DEBUG
            OptimizeModules("client/js/cache");
#endif
        }
    }
}