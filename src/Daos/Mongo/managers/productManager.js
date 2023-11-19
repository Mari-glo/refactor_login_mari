const { productModel } = require("../models/products.model.js");

class ProductManagerMongo {
    

    async getAllProducts(query, options) {
      const products = await productModel.paginate(query, options);
      return products;
    }
    
      
      async getProductById(id) {
        const productFind = await productModel.findOne({ _id: id });
        if (!productFind) return `No se encuentra el producto "${id} "`;
        return productFind;
      }
    
      
      async addProduct(product) {
        
    
        const verProductInfo = Object.values(product).includes(undefined);
    
        if (verProductInfo) return "información incompleta";
    
          
        const newProduct = await productModel.create(product);
        return newProduct;
      }
    
     
      async updateProduct(id, data) {
        const productUpdate = await productModel.updateOne({ _id: id }, data);
        return productUpdate;
      }
    
      
      async deleteProduct(id) {
        const productDelete = await productModel.deleteOne({ _id: id });
    
        return productDelete;
      }
    }
    

module.exports = { ProductManagerMongo }