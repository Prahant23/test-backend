const cloudinary=require("cloudinary");
const Products=require("../model/productModel");
// create product
const createProduct= async(req,res)=>{
    // step 1 : check incomming data
    console.log(req.body);
    console.log(req.files);

    // step 2 : destructure the data
    const {productName,productPrice,productCategory,productDescription}=req.body;
    const{productImage}=req.files;

    // step 3 : Validate data
    if(!productName || !productPrice || !productCategory || !productDescription || !productImage){
        return res.status(400).json({
            success:false,
            message:"Please enter all fields"
        })
    }
    try{
        // upload image to  cloudinary
        const uploadedImage=await cloudinary.v2.uploader.upload(productImage.path,{folder:"products",crop:"scale"});
        // save to databasee
        const newProduct = new Products({
            productName:productName,
            productPrice:productPrice,
            productCategory:productCategory,
            productDescription:productDescription,
            productImage:uploadedImage.secure_url
        });
        await newProduct.save();
        res.status(200).json({
            success:true,
            message:"Product created successfully",
            product:newProduct
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error",
           
        })
    }
}
module.exports={
    createProduct
}