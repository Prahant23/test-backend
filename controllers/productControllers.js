// controllers/productController.js
const Product = require("../model/productModel.js");
const Category = require("../model/productCategory.js");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, productImage, category } = req.body;

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      productImage,
      category,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Update a product by ID
const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, productImage, category } = req.body;

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        productImage,
        category,
      },
      { new: true }
    ).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete a product by ID
const deleteProductById = async (req, res) => {
    try {
      const productId = req.params.id;
  
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      res.json({
        success: true,
        message: "Product deleted successfully",
        product: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  

module.exports = {
  createProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
