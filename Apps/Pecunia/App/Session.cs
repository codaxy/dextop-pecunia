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
        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);
            config["appPath"] = HttpRuntime.AppDomainAppVirtualPath.TrimEnd('/');
        }
    }
}