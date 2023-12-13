const mongoose = require("mongoose");

const connecttodb = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("connected to database")
})
}
module.exports = connecttodb;