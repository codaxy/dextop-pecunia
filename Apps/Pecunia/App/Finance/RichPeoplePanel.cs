using System;
using System.Collections.Generic;
using System.Linq;
using Codaxy.Dextop;
using Codaxy.Dextop.Data;
using Codaxy.Dextop.Remoting;
using Pecunia.Model;
using Pecunia.Services;

namespace Pecunia.App.Finance
{
    public class RichPeoplePanel : DextopWindow
    {
        [DextopRemotableConstructor(alias = "rich-people")]
        public RichPeoplePanel()
        {
        }

		public override void InitRemotable(DextopRemote remote, DextopConfig config)
		{
			base.InitRemotable(remote, config);
			Remote.AddStore("model", new RichPeopleCrud());
		}
    }

	class RichPeopleCrud : IDextopDataProxy<RichPerson>
	{
		Dictionary<String, RichPerson> Data { get; set; }

		public RichPeopleCrud()
		{
			Data = new Dictionary<string, RichPerson>();
			foreach (var c in RichPeopleProvider.GetContacts())
				Data[c.Id] = c;
		}

		public IList<RichPerson> Create(IList<RichPerson> records)
		{
			foreach (var rec in records)
			{
				rec.Id = Guid.NewGuid().ToString();
				Data.Add(rec.Id, rec);
			}
			RichPeopleProvider.SaveContacts(Data.Values.ToArray());
			return records;
		}

		public IList<RichPerson> Destroy(IList<RichPerson> records)
		{
			foreach (var rec in records)
			{
#if !DEBUG
                if (rec.IsLocked)
                    throw new DextopErrorMessageException("This record is protected from removal!");
#endif
                Data.Remove(rec.Id);
			}
			RichPeopleProvider.SaveContacts(Data.Values.ToArray());
			return new RichPerson[0];
		}

		public IList<RichPerson> Update(IList<RichPerson> records)
		{
			foreach (var rec in records)
			{
#if !DEBUG
                if (rec.IsLocked)
                    throw new DextopErrorMessageException("This record is protected from updates!");
#endif
				Data[rec.Id] = rec;
			}
			RichPeopleProvider.SaveContacts(Data.Values.ToArray());
			return records;
		}

		public DextopReadResult<RichPerson> Read(DextopReadFilter filter)
		{
			return DextopReadResult.Create(Data.Values);
		}
	}

    

}