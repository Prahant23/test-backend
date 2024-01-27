const mongoose = require("mongoose");

const cartschema = mongoose.Schema({
  product_id: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("cart", cartschema);
