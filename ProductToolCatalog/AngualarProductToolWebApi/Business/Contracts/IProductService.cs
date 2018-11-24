using DataAccess.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Contracts
{
    public interface IProductService
    {
        Task<List<Product>> GetProductListByCateogry(int categoryId);
        Task<int> AddProduct(Product product);
        Task<int> UpdateProduct(Product product, int productId);
        Task<List<ProductCategory>> GetProductCategory();
        Task<List<Tuple<string, string, decimal, string>>> GetProductCateogoryListById();
        Task<List<string>> GetProductCategoryByName();
        Task<List<Product>> GetProducts();
    }
}
