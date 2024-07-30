const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartControllers");
const authToken = require("../middleware/authToken");

// http://localhost:6001/carts/.....
router.post("/add-toCart", authToken, cartController.addToCart);
router.get("/count-items", authToken, cartController.countProductsAddedToCart);
router.get("/cart-items", authToken, cartController.viewCartItems);
router.post("/update-quantity", authToken, cartController.updateCartItemQuantity);
router.post("/delete-item", authToken, cartController.deleteCartItem);

module.exports = router;
