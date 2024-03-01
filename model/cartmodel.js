// const mongoose = require("mongoose");

// const cartschema = mongoose.Schema({
//   product_id: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: String,
//     required: true,
//   },
// });

// outer.put("/update_product/:id", authGuard, async (req, 
//   res) => {
//   console.log(req.body);
//   });

// module.exports = mongoose.model("cart", cartschema);

// new
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
  ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;

