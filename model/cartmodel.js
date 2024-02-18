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

outer.put("/update_product/:id", authGuard, async (req, 
  res) => {
  console.log(req.body);
  });

module.exports = mongoose.model("cart", cartschema);
