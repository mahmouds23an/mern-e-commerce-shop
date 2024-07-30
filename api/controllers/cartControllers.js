const Cart = require("../models/cartProduct");

// add to cart
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;
    const checkProduct = await Cart.findOne({ productId });
    if (checkProduct) {
      return res.json({
        message: "Product already exist",
        error: true,
        success: false,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const addToCart = new Cart(payload);
    const saveProduct = await addToCart.save();
    return res.status(201).json({
      message: "Product added successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// count the cart items
const countProductsAddedToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const count = await Cart.countDocuments({
      userId: userId,
    });
    return res.status(200).json({
      message: "Ok",
      error: false,
      success: true,
      data: {
        count: count,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// show cart items
const viewCartItems = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProducts = await Cart.find({
      userId: currentUser,
    }).populate("productId");
    return res.status(200).json({
      message: "Ok",
      error: false,
      success: true,
      data: allProducts,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// increase cart item quantity
const updateCartItemQuantity = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body._id;
    const qty = req.body.quantity;
    const updatedProduct = await Cart.updateOne(
      { _id: productId },
      {
        ...(qty && { quantity: qty }),
      }
    );
    res.status(200).json({
      message: "Cart updated successfully",
      data: updatedProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const currentUser = req.userId;
    const productId = req.body._id;
    const deletedProduct = await Cart.deleteOne({ _id: productId });
    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  addToCart,
  countProductsAddedToCart,
  viewCartItems,
  updateCartItemQuantity,
  deleteCartItem,
};
