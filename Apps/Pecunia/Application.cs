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
            
            RegisterModule("client/lib/ext", new DextopExtJSModule { Debug = debug, CssThemeSuffix = "-gray" });
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