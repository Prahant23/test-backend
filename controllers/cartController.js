// const cart = require("../model/cartmodel");

// const addtocart = async (req, res) => {
//   try {
//     const cart_obj = new cart({
//       // Use another field name, assuming product_id is the identifier
//       product_id: req.body.product_id,
//       price: req.body.price,
//     });
//     const cart_data = await cart_obj.save();

//     res.status(200).send({
//       success: true,
//       msg: "cart product detail",
//       data: cart_data,
//     });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// };

// module.exports = {
//   addtocart,
// };
