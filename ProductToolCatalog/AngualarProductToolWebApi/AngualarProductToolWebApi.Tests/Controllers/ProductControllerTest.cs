using AngualarProductToolWebApi.Controllers;
using DataAccess.Data;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngualarProductToolWebApi.Tests.Controllers
{
    class ProductControllerTest
    {

        [TestMethod]
        public void GetCategory()
        {
            bool isTrue = false;
            ProductController P = new ProductController();
            var result = P.GetCategory();

            if(result.Result.Count>0)
            {
                isTrue = true;
            }

            Assert.IsTrue(isTrue);
        }

        [TestMethod]
        public void AddProduct()
        {
            bool isTrue = false;
            Product product = new Product();
            product.Description = "testfrommUnittestcase";
            product.Price = 10.00M;
            product.ProductCategoryId = 1;
            product.ProductName = "unitTestcaseProduct";

            ProductController P = new ProductController();
            var resp = P.AddProduct(product);

            if(resp.Result > 0)
            {
                isTrue = true;
            }
            Assert.IsTrue(isTrue);
        }

        [TestMethod]
        public void UpdateProduct()
        {
            bool isTrue = false;
            Product product = new Product();
            product.Description = "testfrommUnittestcase";
            product.Price = 10.00M;
            product.ProductCategoryId = 1;
            product.ProductName = "unitTestcaseProduct";
            product.ProductId = 12;

            ProductController P = new ProductController();
            var resp = P.UpdateProduct(product);

            if(resp.Result > 0)
            {
                isTrue = true;
            }

            Assert.IsTrue(isTrue);
        }


        [TestMethod]
        public void GetProducts()
        {
            bool isTrue = false;

            ProductController P = new ProductController();
            var resp = P.GetProducts();

            if (resp.Result.Count() > 0)
            {
                isTrue = true;
            }

            Assert.IsTrue(true);
        }
    }
}
