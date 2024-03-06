const Products = require("../model/productModel");
const User = require("../model/userModel");
const cloudinary = require("cloudinary");

// create product
const createProduct = async (req, res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // step 2 : destructure the data
  const { productName, productPrice, productCategory, productDescription } =
    req.body;
  const { productImage } = req.files;

  // step 3 : Validate data
  if (
    !productName ||
    !productPrice ||
    !productCategory ||
    !productDescription ||
    !productImage
  ) {
    return res.status(400).json({
      success: false,
      message: "Please enter all fields", //message for ffff
    });
  }
  try {
    // upload image to  cloudinary
    const uploadedImage = await cloudinary.v2.uploader.upload(
      productImage.path,
      { folder: "products", crop: "scale" }
    );
    // save to databasee
    const newProduct = new Products({
      productName: productName,
      productPrice: productPrice,
      productCategory: productCategory,
      productDescription: productDescription,
      productImage: uploadedImage.secure_url,
    });
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});
    res.status(200).json({
      success: true,
      message: "All Products",
      products: allProducts,
    });
  } catch (error) {
    res.json({
      message: "internal server error",
    });
  }
};
// fetch single product
const getSingleProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const singleProduct = await Products.findById(productId);
    res.status(200).json({
      success: true,
      message: "Single Product",
      product: singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
const editProduct = async (req, res) => {
  const productId = req.params.productId;
  const data = req.body;
  data.productImage = undefined;
  // if(data.productImage) {
  //   const uploadedImage = await cloudinary.v2.uploader.upload(
  //     data.productImage.path,
  //     { folder: "products", crop: "scale" }
  //   );
  //   data.productImage = uploadedImage;
  // }

  try {
    const singleProduct = await Products.findOneAndUpdate({_id: productId}, req.body);
    res.status(200).json({
      success: true,
      message: "Single Product",
      product: singleProduct,
    });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    // Check if the product exists
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // Delete the product from Cloudinary
    const publicId = product.productImage.split('/').pop().split('.')[0];
    await cloudinary.v2.uploader.destroy(`products/${publicId}`);

    // Delete the product from the database
    await Products.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: 'Product deleted successfully.',
      deletedProduct: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

module.exports = { createProduct, getProducts, getSingleProduct, deleteProduct, editProduct };

