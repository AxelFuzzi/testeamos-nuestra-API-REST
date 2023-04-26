import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";

router.get("/", userController.home);
router.get("/logout", userController.logout);
router.get("/login", userController.getLogin);
router.get("/signup", userController.getSignup);
router.post("/signup", userController.postSignup);
router.post("/login", userController.postLogin);

export default router;