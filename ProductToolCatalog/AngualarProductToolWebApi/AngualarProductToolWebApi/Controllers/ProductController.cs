using Business.Services;
using DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Business.Contracts;

namespace AngualarProductToolWebApi.Controllers
{
    [RoutePrefix("api/ProductService")]
    public class ProductController : ApiController
    {
        [HttpGet]
        [Route("GetCategories")]
        public async Task<List<Tuple<string, string, decimal, string>>> GetCategories()
        {
            List<Tuple<string, string, decimal, string>> res = null;//new Tuple<string, string, decimal, string>("","",0.00M,"");
            try
            {
                IProductService ps = new ProductService();
                res=  await ps.GetProductCateogoryListById();

            }
            catch(Exception e)
            {

            }
            return res;
        }

        [HttpPost]
        [Route("AddProduct")]
        public async Task<int> AddProduct(Product product)
        {
            IProductService ps = new ProductService();
            var id = await ps.AddProduct(product);
            return id;
        }

        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<int> UpdateProduct(Product product)
        {
            int Id = product.ProductId;
            IProductService ps = new ProductService();
            var id = await ps.UpdateProduct(product,Id);
            return id;
        }

        [HttpGet]
        [Route("Get")]
        public async Task<List<string>> Get()
        {
            IProductService ps = new ProductService();
            List<string> pc = await ps.GetProductCategoryByName();
            return pc;
        }

        [HttpGet]
        [Route("GetProducts")]
        public async Task<List<Product>> GetProducts()
        {
            IProductService ps = new ProductService();
            List<Product> pc = await ps.GetProducts();
            return pc;
        }

        [HttpGet]
        [Route("GetCategory")]
        public async Task<List<ProductCategory>> GetCategory()
        {
            IProductService ps = new ProductService();
            List<ProductCategory> pc = await ps.GetProductCategory();
            return pc;
        }


    }
}
