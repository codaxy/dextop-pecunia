﻿using System;
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


    [DextopForm]
    class ConvertionForm
    {
     
        [DextopFormField]
        public String From          { get; set; }

        [DextopFormField]
        public String To            { get; set; }

        [DextopFormLookupCombo(lookupId="Currency")]
        public string FromCurrency        { get; set; }

        [DextopFormLookupCombo(lookupId = "Currency")]
        public string ToCurrency        { get; set; }      

    }

}