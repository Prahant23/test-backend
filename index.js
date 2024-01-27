// importing Packages
const express = require('express');
const dotenv=require('dotenv');
const connectToDB = require('./database/db');
const cors = require('cors');
const cloudinary = require('cloudinary');
const acceptMultimedia = require('connect-multiparty');
const cartroute = require('./routes/cartRoutes');

// creating an express app
const app = express();

// importing the routes or defining the routes

// configuring dotenv to use the .env file
dotenv.config();

// cloudinary config          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

app.use(acceptMultimedia());
// Cors config to accept request from frontend
const corsOptions={
    origin:true,
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// connecting to database
connectToDB();
// accepting json data
//defining routes
app.use('/api/user',require('./routes/userRoutes'));
app.use('/api/product',require('./routes/productRoutes'));


// //cart route
app.use('/api/addtocart',cartroute);

//task to create hello route
app.get('/api', (req, res) => {
    //res.send('Hello World2!');
    res.status(200).send({
        message: 'cartadded'
    });
});
// Defining port
const PORT = process.env.PORT;
//running the server on port 4000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

