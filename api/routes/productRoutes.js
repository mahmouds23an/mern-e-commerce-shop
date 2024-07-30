const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");
const authToken = require("../middleware/authToken");

// http://localhost:6001/products/.....
router.post("/upload-product", authToken, productController.createProduct);
router.get("/get-products", productController.getProducts);
router.post("/update-product", authToken, productController.updateProduct);
router.get("/category-product", productController.getCategoryProduct);
router.post(
  "/oneCategory-allProducts",
  productController.getAllProductsInCategory
);
router.post("/product-details", productController.getProductDetails);
router.get("/search-details", productController.searchProduct);
router.post("/filter-product", productController.filterProduct);

module.exports = router;
