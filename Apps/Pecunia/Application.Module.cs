using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop;

namespace Pecunia
{
    public class AppModule : DextopModule
    {
        protected override void InitNamespaces()
        {
            RegisterNamespaceMapping("Pecunia*", "Pecunia");
        }

        protected override void InitResources()
        {
            RegisterJs("sample", "", 
                "client/js/generated/",
                "client/js/controls/*/",
                "App/*/");

            RegisterCss("client/css/site.css");
        }

        public override string ModuleName
        {
            get { return "sample"; }
        }

        protected override void RegisterAssemblyPreprocessors(Dictionary<string, IDextopAssemblyPreprocessor> preprocessors)
        {
            RegisterStandardAssemblyPreprocessors("client/js/generated", preprocessors);
        }

        protected override void RegisterLoaders(Dictionary<string, IDextopFileLoader> loaders)
        {
            
        }
    }
}