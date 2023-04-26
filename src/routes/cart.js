import express from "express";
import cartController from "../controllers/cart.controller.js";
const router = express.Router();


// POST /api/carrito
router.post('/', cartController.postCart);


// DELETE /api/carrito/id
router.delete('/:id', cartController.deleteCartId);


// POST /api/carrito/:id/productos

router.post('/:id/productos', cartController.postProductToCart);


// GET /api/carrito/:id/productos
router.get('/:id/productos', cartController.getAllproductCart)


// DELETE /api/carrito/:id/productos/:id_prod
router.delete('/:id/productos/:id_prod', cartController.deleteProductCart);

export default router;