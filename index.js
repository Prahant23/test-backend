const express = require("express");
const dotenv = require("dotenv");
const connecttodb = require('./database/db')

const app = express();
dotenv.config();
connecttodb();
app.use(express.json());
app.use('/api/user',require('./routes/userRoutes'));


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`listening to port : ${PORT}`)
})