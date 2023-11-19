const { Router } = require ('express')
const { uploader } = require('../utils/multer')
const { userModel } = require ('../Daos/Mongo/models/user.model')
const { ProductManagerMongo } = require('../Daos/Mongo/managers/productManager.js')
const { CartManagerMongo } = require('../Daos/Mongo/managers/cartManager.js')


const router = Router()
let productService = new ProductManagerMongo()

router.get('/login', (req, res)=>{
  res.render('login')

} )
router.get('/register', (req, res)=>{
  res.render('register')

} )

router.get('/users', async (req, res)=>{
    try {
        const {numPage=1, limit=20, query=''} = req.query

        let { 
            docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            page
         } = await userModel.paginate({}, {limit: limit, page: numPage, lean: true})
         res.status(200).render('users',{
            showNav: true,
            users: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            page

         })
    } catch (error) {
        console.log(error)
        
    }
})

router.get('/subirarch', (req, res)=>{
    res.render('subirArch')
})

router.post('/subirarch', uploader.single('file'), (req,res)=>{
    if(!req.file) return res.status(400).send({status:'error', error:'No se ha guardado la imagen'})
    res.send({status:'Exito', payload: 'El archivo se ha subido con éxito'})

})

router.get("/", async (req, res) => {
    try {
      const products = await productService.getAllProducts();
  
      res.render("index");
    } catch (error) {
      console.log(error);
    }
  });
  
router.get("/chat", async (req, res) => {
    try {
      res.render("chat");
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/products", async (req, res) => {
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
        const products= await productService.getAllProducts({ category: category }, options);
        return res.json({ products });
      }
  
      const products = await productService.getAllProducts({}, options);
  
      const { totalPages, docs, hasPrevPage, hasNextPage, prevPage, nextPage } = products;
      res.render("products", {
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
  
  router.get("/product/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
      const product = await productService.getProductById(pid);
      console.log(product);
  
      res.render("itemDetail", product);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
      const cart = await CartManagerMongo.getCartById(cid);
      if (!cart) return res.status(404).json({ msg: "Carrito no encontrado" });
  
      res.render("carts", { products: cart.products });
    } catch (error) {
      console.log(error);
    }
  });
  

  



module.exports = router