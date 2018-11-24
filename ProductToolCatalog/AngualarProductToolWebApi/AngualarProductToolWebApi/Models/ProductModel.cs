using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngualarProductToolWebApi.Models
{
    public class ProductModel
    {
        public string category { get; set; }
        public string product { get; set; }
        public decimal price { get; set; }
        public string description {get;set;}
    }
}