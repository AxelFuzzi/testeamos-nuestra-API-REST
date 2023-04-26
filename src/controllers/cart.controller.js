import express from 'express';
import { CarritoDao } from "../dao/CarritoDao.js";
import { ProductoDao } from "../dao/ProductoDao.js";

const router = express.Router();
const carritoDao = new CarritoDao();

const postCart = async (_req, res) => {
    const newCart = await carritoDao.createCart();
    
    newCart
        ? res.status(200).json({"success": "Product added with ID " + newCart._id})
        : res.status(500).json({"error": "there was an error"})
    
}

const deleteCartId = async(req,res) => {
    const { id } = req.params;
    const wasDeleted = await carritoDao.deleteCartById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
     
}

const postProductToCart = async(req,res) => {
    const { id } = req.params;
    const { body } = req;
    //id de producto con key productId
    const productExists = await ProductoDao.exists(body.productId);
    
    if(productExists) {
        await carritoDao.saveProductToCart(id, body)
    } else {
        res.status(404).json({"error": "product not found"});
    }
    
}

const getAllproductCart = async(req,res)=>{
    const { id } = req.params;
    const cartProducts = await carritoDao.getAllProductsFromCart(id);
    
    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({"error": "cart not found"})
}

const deleteProductCart = async(req, res) => {
    const {id, id_prod } = req.params;
    
    const wasDeleted = await carritoDao.deleteProductFromCart(id, id_prod);
    
    wasDeleted 
        ? res.status(200).json({"success": "that product is no longer in the cart"})
        : res.status(400).json({"error": "there was some problem"})
    
}

export default {postCart, deleteCartId, postProductToCart, getAllproductCart, deleteProductCart}

