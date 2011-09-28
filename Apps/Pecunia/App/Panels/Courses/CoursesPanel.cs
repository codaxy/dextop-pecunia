using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop;
using Codaxy.Dextop.Remoting;
using Codaxy.Dextop.Data;

namespace Pecunia.App
{
    public class CoursesPanel : DextopWindow
    {
        [DextopRemotableConstructor(alias = "courses")]
        public CoursesPanel()
        {
            
        }

        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);
            Remote.AddStore("model", new Codaxy.Dextop.Data.DextopMemoryDataProxy<User, int>(a=>a.Id, (id) => { return ++id; }));
        }

        [DextopModel]
        [DextopGrid]
        class User
        {
            public int Id { get; set; }

            [DextopGridColumn(width = 50, text="Active")]
            public bool Active { get; set; }

            [DextopGridColumn(width=100)]
            public String Username { get; set; }

            [DextopGridColumn(width = 150, text="Display Name")]
            public String DisplayName { get; set; }

            [DextopGridColumn(width = 150)]
            public String EMail { get; set; }
        }
    }
}