using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Codaxy.Dextop;
using Codaxy.Dextop.Remoting;
using Codaxy.Dextop.Data;
using System.Xml.Linq;
using System.Globalization;
using System.Xml;
using Codaxy.Dextop.Forms;

namespace Pecunia.App
{
    public class CoursesPanel : DextopWindow
    {

        /// <summary>Daly courses (Mo-Fr) of the European Central Bank</summary>
        private String uriDailyXml = "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml";

        private List<Rate> rates;

        [DextopRemotableConstructor(alias = "courses")]
        public CoursesPanel()
        {
            // load the rates 
            rates = loadCourses();
        }

        public override void InitRemotable(DextopRemote remote, DextopConfig config)
        {
            base.InitRemotable(remote, config);

            Crud crud = new Crud(rates);
            Remote.AddStore("model", crud);

            SamplesCrud samplesCrud = new SamplesCrud();
            Remote.AddStore("", samplesCrud);

            Remote.AddLookupData("Currency", rates.Select(a=> new Object[]{ a.Id, a.Currency } ).ToArray() );

        }

        private List<Rate> loadCourses()
        {
            System.Xml.Linq.XElement cubes = XElement.Load(uriDailyXml);
            var cubs =
              from el in cubes.Descendants()
              where el.Name.LocalName == "Cube" &&
                    el.Attribute("time") != null
              select new
              {
                  Date = DateTime.Parse(el.Attribute("time").Value),
                  Rate =
                    from d in el.Descendants()
                    select new Rate
                    {
                        Currency = CurrencyName(d.Attribute("currency").Value),
                        ISOCode = d.Attribute("currency").Value,
                        Value = XmlConvert.ToDouble(d.Attribute("rate").Value)
                    }
              };
            List<Rate> rates = new List<Rate>();
            foreach (var rate in cubs.ToList()[0].Rate)
                rates.Add(rate);
            return rates;
        }

        CultureInfo[] cultures = CultureInfo.GetCultures(CultureTypes.SpecificCultures);

        protected string CurrencyName(string isoCode)
        {
            foreach (CultureInfo ci in cultures)
            {
                RegionInfo ri = new RegionInfo(ci.LCID);
                if (ri.ISOCurrencySymbol == isoCode) return ri.CurrencyEnglishName;
            }
            return null;
        }

        [DextopRemotable]
        public double Convert(ConvertionForm form)
        {

            return 1.0;
        }

        [DextopRemotable]
        public void updateSampleRate(Rate rate) { 
        
        }

    }

    class Crud : DextopDataProxy<Rate>
    {
        SortedDictionary<int, Rate> list = new SortedDictionary<int, Rate>();
        int id = 0;

        public Crud(List<Rate> rates)
        {
            foreach (var rate in rates)
                addRate(rate);
        }

        public void addRate(Rate rate)
        {
            rate.Id = ++id;
            list.Add(rate.Id, rate);
        }
       
        public override DextopReadResult<Rate> Read(DextopReadFilter filter)
        {
            return DextopReadResult.CreatePage(list.Values.AsQueryable(), filter);
        }
    }

    class SamplesCrud : DextopDataProxy<ConvertionSample> 
    {
        SortedDictionary<int, ConvertionSample> list = new SortedDictionary<int, ConvertionSample>();
        int id = 0;

        public SamplesCrud() {
            addSample(new ConvertionSample("One", 1));
            addSample(new ConvertionSample("Ten", 10));
            addSample(new ConvertionSample("Fifty", 50));
            addSample(new ConvertionSample("Hundred", 100));
            addSample(new ConvertionSample("Five hundred", 500));
            addSample(new ConvertionSample("Thousand", 1000));
            addSample(new ConvertionSample("Five thousand", 5000));
            addSample(new ConvertionSample("Ten thousand", 10000));
            addSample(new ConvertionSample("Hungred thousand", 100000));
            addSample(new ConvertionSample("Million", 1000000 ));
            updateRate(1);
        }

        public void updateRate(double rate){
            foreach(var sample in list)
                sample.Value.Value = sample.Value.Euro * rate;
        }

        public void addSample(ConvertionSample rate)
        {
            rate.Id = ++id;
            list.Add(rate.Id, rate);
        }
       
        public override DextopReadResult<ConvertionSample> Read(DextopReadFilter filter)
        {
            return DextopReadResult.CreatePage(list.Values.AsQueryable(), filter);
        }
    
    }

    [DextopModel]
    [DextopGrid]
    class Rate
    {
        public int Id { get; set; }

        [DextopGridColumn(width = 200, text = "Currency")]
        public String Currency { get; set; }

        [DextopGridColumn(width = 100, text = "ISO Code")]
        public String ISOCode { get; set; }

        [DextopGridColumn(width = 100, text = "Rate")]
        public Double Value { get; set; }
    }

    [DextopModel]
    [DextopGrid]
    class ConvertionSample
    {

        public ConvertionSample(String unit, int euro) 
        {
            Unit = unit;
            Euro = euro;
        }

        public int Id { get; set; }

        [DextopGridColumn(width = 200, text = "Unit")]
        public String Unit { get; set; }

        [DextopGridColumn(width = 100, text = "€")]
        public int Euro { get; set; }

        [DextopGridColumn(width = 100, text = "Foreign")]
        public double Value { get; set; }

    }


    [DextopForm]
    public class ConvertionForm
    {

        [DextopFormFieldSet(0, title = "Convertion Information", collapsible = false)]
        [DextopFormField]
        public String Amount          { get; set; }

        [DextopFormLookupCombo(lookupId="Currency")]
        public string FromCurrency        { get; set; }

        [DextopFormLookupCombo(lookupId = "Currency")]
        public string ToCurrency        { get; set; }      

    }



  
}