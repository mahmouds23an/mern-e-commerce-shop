const uploadProductPermission = require("../helpers/permission");
const Product = require("../models/product");

// create a new product
const createProduct = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }
    const uploadProduct = new Product(req.body);
    const saveProduct = await uploadProduct.save();
    if (!saveProduct) {
      return res.status(400).json({
        message: "There is no product to save",
        error: true,
        success: false,
      });
    }
    return res.status(201).json({
      message: "Product created and saved in database successfully",
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

// get all products
const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find().sort({ createdAt: -1 });
    if (!allProducts) {
      return res.status(400).json({
        message: "There is no product to shown",
        error: true,
        success: false,
      });
    }
    return res.status(200).json({
      message: "All products shown successfully",
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

// update a product
const updateProduct = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const { _id, ...resBody } = req.body;
    const updateProduct = await Product.findByIdAndUpdate(_id, resBody);
    return res.status(200).json({
      message: "Product updated successfully",
      error: false,
      success: true,
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// get category product
const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await Product.distinct("category");
    // to store one product from each category
    const productByCategory = [];
    for (const category of productCategory) {
      const product = await Product.findOne({ category });
      if (product) {
        productByCategory.push(product);
      }
    }
    return res.status(200).json({
      message: "Done",
      error: false,
      success: true,
      data: productByCategory,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// get all products in one category
const getAllProductsInCategory = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await Product.find({ category });
    return res.status(200).json({
      message: "Done",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
 
// get product details
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    return res.status(200).json({
      message: "Done",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// search product
const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");
    const product = await Product.find({
      $or: [
        {
          productName: regex,
        },
        {
          category: regex,
        },
      ],
    });
    return res.status(200).json({
      message: "Done",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

// filter product
const filterProduct = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];
    const product = await Product.find({
      category: {
        $in: categoryList,
      },
    });
    return res.status(200).json({
      message: "Done",
      error: false,
      success: true,
      data: product,
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
  createProduct,
  getProducts,
  updateProduct,
  getCategoryProduct,
  getAllProductsInCategory,
  getProductDetails,
  searchProduct,
  filterProduct,
};
