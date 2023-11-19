const { cartModel } = require("../models/carts.model.js");
const { productModel } = require("../models/products.model.js")

class CartManagerMongo{
    constructor(){
        this.model = cartModel, productModel
    }

    async getAllCarts() {
        const carts = await cartModel.find();
        return carts;
      }
    
      async getCartById(id) {
        const cart = await cartModel.findOne({ _id: id });
        if (!cart) return `No se encuentra el Carrito ${id}`;
        return cart;
      }
    
      
      async addCart() {
        const newCart = {
          products: [],
        };
        const cart = await cartModel.create(newCart);
        return cart;
      }
    
      
      async addProductToCart(idCart, idProduct) {
        const product = await productModel.findOne({ _id: idProduct });
        const car = await cartModel.findOne({ _id: idCart });
        if (!car) return `El carrito con " ${idCart} " no existe`;
        if (!product) return `El producto " ${idProduct} " no existe`;
        const cartUpdate = await cartModel.updateOne({ _id: idCart }, { $push: { products: product } });
    
        return cartUpdate;
      }
    
      
      async deleteCart(id) {
        const cartDelete = await cartModel.deleteOne({ _id: id });
    
        return cartDelete;
      }
    }

module.exports = { CartManagerMongo }

