const cart = require("../model/cartmodel");

const addtocart = async (req, res) => {

  const { productName, productPrice, productCategory, 
    productDescription } = req.body;
    const { productImage } = req.files;
    if (!productName || !productPrice ||
    !productCategory || !productDescription) {
    return res.status(422).json({ error: "Please add all the fields" });
    }
  try {
    if(productImage){
      const uploadImage =await cloudinary.v2.uploader.upload(
        productImage.path,
        {
          folder :  "Vintuff",
          crop  : "scale"
        }
      )

      //update product 
      const product = await productModel.findById(req.params.id);
      product.name = productName;
      product.price = productprice;
      product.category = productCategory;
      product.description = productDescription;
      product.image = uploadImage.secure_url;

      await product.save();
      res.status(201).json({message: "Product updated successfully"});
    }else{
      const product =  await productModel.findById(req.params.id);
      product.name = productName;
    }
  
  }  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server  Error" });  
};
}

module.exports = {
  addtocart,
};
