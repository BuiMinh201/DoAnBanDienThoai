const express = require("express");
const router = express.Router();
//Admin Controller
const AdminController = require("../apps/controllers/admin");
const AuthController = require("../apps/controllers/auth");
const ProductController= require("../apps/controllers/product");
const CategoryController= require("../apps/controllers/category");
const UserController= require("../apps/controllers/user")
// Site Controller
const SiteController = require("../apps/controllers/site")
// Middleware
const AuthMiddleware = require("../apps/middlewares/auth")
const UploadMiddleware = require("../apps/middlewares/upload")
// Admin
router.get("/admin/login",AuthMiddleware.checkLogin, AuthController.getlogin);
router.post("/admin/login",AuthMiddleware.checkLogin, AuthController.postlogin);
router.get("/admin/logout",AuthMiddleware.checkAdmin, AuthController.logout);
router.get("/admin/dashboard",AuthMiddleware.checkAdmin, AdminController.index);
// Products
router.get("/admin/products",AuthMiddleware.checkAdmin,ProductController.index);
router.get("/admin/products/create",AuthMiddleware.checkAdmin,ProductController.create);
router.post("/admin/products/store",
UploadMiddleware.single("thumbnail"),
AuthMiddleware.checkAdmin,
ProductController.store);
router.get("/admin/products/edit/:id",AuthMiddleware.checkAdmin,ProductController.edit);
router.post("/admin/products/update/:id",UploadMiddleware.single("thumbnail"),AuthMiddleware.checkAdmin,ProductController.update);
router.get("/admin/products/delete/:id",AuthMiddleware.checkAdmin,ProductController.del);
// Categories
router.get("/admin/categories",AuthMiddleware.checkAdmin,CategoryController.index);
router.get("/admin/categories/create",AuthMiddleware.checkAdmin,CategoryController.create);
router.get("/admin/categories/edit/:id",AuthMiddleware.checkAdmin,CategoryController.edit);
router.get("/admin/categories/delete/:id",AuthMiddleware.checkAdmin,CategoryController.del);
// User
router.get("/admin/user",AuthMiddleware.checkAdmin,UserController.index);
router.get("/admin/user/create",AuthMiddleware.checkAdmin,UserController.create);
router.get("/admin/user/edit/:id",AuthMiddleware.checkAdmin,UserController.edit);
router.get("/admin/user/delete/:id",AuthMiddleware.checkAdmin,UserController.del);

//Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);
router.get("/delete-cart-:id", SiteController.deleteCart);
router.get("/cart", SiteController.cart);
router.post("/order", SiteController.order);
router.get("/success", SiteController.success);
module.exports = router;

