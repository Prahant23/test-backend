const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensure at least one product is added
  },
}, { _id: false }); // Prevents creation of separate _id for sub-documents

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
    unique: true, // Ensures one cart per user
  },
  products: [cartItemSchema], // Array of cart items
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model("Cart", cartSchema);