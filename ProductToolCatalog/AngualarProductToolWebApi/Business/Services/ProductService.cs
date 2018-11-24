using Business.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace Business.Services
{
    public class ProductService : IProductService
    {
        AngualarProductToolEntities db = new AngualarProductToolEntities();
        private AngualarProductToolEntities _db;

        public ProductService()
        {
            _db = db;
        }

        public async Task<List<ProductCategory>> GetProductCategory()
        {
            List<ProductCategory> pc = new List<ProductCategory>();
            try
            {
                 pc = await _db.ProductCategories.ToListAsync();
            }
            catch
            {

            }
            return pc;
        }


        public async Task<List<string>> GetProductCategoryByName()
        {
            List<string> pc = new List<string>();
            try
            {
                pc = await _db.ProductCategories.Select(a=>a.CategoryName).ToListAsync();
            }
            catch
            {

            }
            return pc;
        }

        public async Task<int> AddProduct(Product product)
        {
            int Id = 0;
            try
            {
                db.Products.Add(product);
                await db.SaveChangesAsync();
                Id = product.ProductId;
                return Id;
            }
            catch (Exception e)
            {
                return Id;
            }
        }

        public async Task<List<Product>> GetProductListByCateogry(int categoryId)
        {
              return await _db.Products.Where(a => a.ProductCategoryId == categoryId).ToListAsync();
        }

        public async Task<List<Tuple<string,string,decimal,string>>> GetProductCateogoryListById()
        {
            Tuple<string, string, decimal, string> res = null;
            List<Tuple<string, string, decimal, string>> resp = new List<Tuple<string, string, decimal, string>>();
            //var productdictionary = new Dictionary<int, Product> ();
            //var result = new Dictionary<int, Dictionary<int, Product>>();
            var productCategory = await GetProductCategory();

            foreach(var pc in productCategory)
            {
                //productdictionary = new Dictionary<int, Product>();
                res = new Tuple<string, string, decimal, string>("", "", 0.00M, "");
                var product = await GetProductListByCateogry(pc.ProductCategoryId);
                foreach(var p in product)
                {
                    //if (!productdictionary.ContainsKey(p.ProductId))
                    //    productdictionary.Add(p.ProductId, p);
                    res = new Tuple<string, string, decimal, string>(pc.CategoryName, p.ProductName, p.Price.GetValueOrDefault(), p.Description);
                    resp.Add(res);
                }
                //if (!result.ContainsKey(pc.ProductCategoryId))
                //    result.Add(pc.ProductCategoryId, productdictionary);
            }
            return resp;
        }

        public async Task<List<Product>> GetProducts()
        {
            return await _db.Products.ToListAsync();
        }

        public async Task<int> UpdateProduct(Product product, int productId)
        {
            int Id = 0;
            try
            {

                //_db = new AngualarProductToolEntities();
                _db.Entry(product).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductExists(productId))
                    {
                        return 0;
                    }
                    else
                    {
                        throw;
                    }
                }
                var p = await _db.Products.Where(a => a.ProductId == productId).FirstOrDefaultAsync();
                if (p != product)
                {
                    p.Price = product.Price;
                    p.Description = product.Description;
                    p.ProductName = product.ProductName;
                    p.ProductCategoryId = product.ProductCategoryId;
                    //context.SaveChanges();
                    //_db.Products.aAdd
                    //b.Products.Attach(p);
                    //_db.Entry(p).State = EntityState.Modified;
                    _db.SaveChanges();
                    return productId;
                }
                else
                {
                    return Id;
                }
            }
            catch (Exception e)
            {
                return Id;
            }
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.ProductId == id) > 0;
        }
    }
}
