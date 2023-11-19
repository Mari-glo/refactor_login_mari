const { Router } = require ('express')
const { CartManagerMongo } = require('../Daos/Mongo/managers/cartManager.js')
const { cartModel } = require('../Daos/Mongo/models/carts.model.js')

const router = Router();
let cartService = new CartManagerMongo()

router.get("/", async (req, res) => {
    try {
      let carts = await cartService.getAllCarts();
      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await cartService.getCartById(id);
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const carts = await cartService.addCart();
      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.post("/:idCart/product/:idProduct", async (req, res) => {
    const { idCart, idProduct } = req.params;
    try {
      await cartService.addProductToCart(idCart, idProduct);
  
      res.status(200).json({ msg: "Producto agregado al carrito" });
    } catch (error) {
      console.log(error);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const carts = await cartService.deleteCart(id);
  
      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const carts = await cartService.getAllCarts();
  
      res.status(200).json(carts);
    } catch (error) {
      console.log(error);
    }
  });
  
  module.exports = router