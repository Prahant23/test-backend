// const cart = require("../model/cartmodel");

// const addtocart = async (req, res) => {

//   const { productName, productPrice, productCategory, 
//     productDescription } = req.body;
//     const { productImage } = req.files;
//     if (!productName || !productPrice ||
//     !productCategory || !productDescription) {
//     return res.status(422).json({ error: "Please add all the fields" });
//     }
//   try {
//     if(productImage){
//       const uploadImage =await cloudinary.v2.uploader.upload(
//         productImage.path,
//         {
//           folder :  "Vintuff",
//           crop  : "scale"
//         }
//       )

//       //update product 
//       const product = await productModel.findById(req.params.id);
//       product.name = productName;
//       product.price = productprice;
//       product.category = productCategory;
//       product.description = productDescription;
//       product.image = uploadImage.secure_url;

//       await product.save();
//       res.status(201).json({message: "Product updated successfully"});
//     }else{
//       const product =  await productModel.findById(req.params.id);
//       product.name = productName;
//     }
  
//   }  catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal Server  Error" });  
// };
// }

// module.exports = {
//   addtocart,
// };

// new
const mongoose = require('mongoose');
const CartItem = require('../model/cartmodel');
const Products = require("../model/productModel");

// Controller to add item to cart
const addtocart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Extract userId from authenticated user
    console.log(userId);

    // Validate productId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid productId' });
    }

    // Create a new CartItem instance with userId
    const cartItem = new CartItem({ productId: new mongoose.Types.ObjectId(productId), quantity, userId });

    await cartItem.save();

    res.status(201).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find({userId: req.user.userId});
    let cart = [];
    for(let i=0; i<cartItems.length; i++) {
      let cartItem = cartItems[i];
      let product = await Products.findById(cartItem.productId);
      let item = {
        productImg: product.productImage,
        productName: product.productName,
        productPrice: product.productPrice
      };
      cart.push(item)
    }
    return res.json({message: 'success', cart})
  } catch (error) {
    
  }
}

module.exports = {
  addtocart,
  getCartItems
};