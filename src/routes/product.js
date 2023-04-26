import express from "express";
import { authMiddleware } from "../middlewares/Auth.js";
import productController from "../controllers/product.controller.js";
const router = express.Router();


// GET api/productos

router.get('/', productController.getProducts);


// GET api/productos/:id

router.get('/:id', productController.getProductId);
// 

// POST api/productos
router.post('/', authMiddleware, productController.postProduct);


// PUT api/productos/:id
router.put('/:id', authMiddleware, productController.putProduct);


// DELETE /api/productos/id

router.delete('/:id', productController.deleteProduct);



export default router;
