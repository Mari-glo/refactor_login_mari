const { Router } = require ('express')

const { ProductManagerMongo } = require('../Daos/Mongo/managers/productManager.js')

const router = Router()
let productService = new ProductManagerMongo()

router.get("/", async (req, res) => {
    const { limit, page, sort, category, status } = req.query;
  
    try {
      const options = {
        limit: limit || 12,
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1,
        },
        lean: true,
      };
  
      if (status != undefined) {
        const products = await productService.getAllProducts({ status: status }, options);
        return res.json({ products });
      }
  
      if (category != undefined) {
        const products = await productService.getAllProducts({ category: category }, options);
        return res.json({ products });
      }
  
      const products = await productService.getAllProducts({}, options);
      console.log(products);
      const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = products;
      res.status(200).json( {
        status: "success",
        products: docs,
        totalPages,
        prevPage,
        nextPage,
        page: products.page,
        hasPrevPage,
        hasNextPage,
        prevLink: `http://localhost:8080/products?page=${prevPage}`,
        nextLink: `http://localhost:8080/products?page=${nextPage}`,
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const products = await productService.getProductById(id);
  
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.post("/", async (req, res) => {
    const body = req.body;
    try {
      const products = await productService.addProduct(body);
  
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;
  
    try {
      await productService.updateProduct(id, body);
      const products = await productService.getProductById(id);
  
      res.status(200).json({
        msg: "Producto actualizado",
        products,
      });
    } catch (error) {
      console.log(error);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await productService.deleteProduct(id);
      res.status(200).json({ msg: "Producto eliminado" });
    } catch (error) {
      console.log(error);
    }
  });



module.exports = router