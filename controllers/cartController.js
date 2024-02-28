const cartModel = require("../model/cartmodel");
const cloudinary = require('cloudinary');
const productModel = require("../model/productModel"); // Ensure you have this if you're fetching product details

const addtocart = async (req, res) => {
  const { productId, quantity } = req.body; // Assuming you pass productId and quantity

  if (!productId || !quantity) {
    return res.status(422).json({ error: "Please provide product ID and quantity" });
  }

  try {
    // Optionally, verify the product exists
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the cart exists for the user
    let userCart = await cartModel.findOne({ userId: req.user._id }); // Assuming you have user info in req.user
    if (!userCart) {
      // If no cart exists, create a new cart
      userCart = new cartModel({
        userId: req.user._id,
        products: [{ productId, quantity }],
      });
    } else {
      // If cart exists, add or update the product in the cart
      const productIndex = userCart.products.findIndex(item => item.productId.toString() === productId);
      if (productIndex > -1) {
        // Product exists in cart, update quantity
        userCart.products[productIndex].quantity += quantity;
      } else {
        // Product does not exist in cart, add new
        userCart.products.post({ productId, quantity });
      }
    }

    await userCart.save();
    res.status(201).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addtocart
};
