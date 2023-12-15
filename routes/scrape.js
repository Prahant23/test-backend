// generate a nodejs script that will get all news from atlest 10 sources so that i can show it in my app as a news feed



// importing the routes or defining the routes
// configuring dotenv to use the .env file
// connecting to database
//defining routes
//task to create hello route
// Defining port
//running the server on port 5000
// importing Packages
const express = require('express');
const dotenv=require('dotenv');
const connectToDB = require('./database/db');
const scrape = require('./routes/scrape');
// creating an express app
const app = express();
// importing the routes or defining the routes

// configuring dotenv to use the .env file
dotenv.config();

// connecting to database
connectToDB();

//defining routes

//task to create hello route
app.get('/hello', (req, res) => {
    //res.send('Hello World2!');
    res.status(200).send({
        message: 'Hello World!'
    });
});
// Defining port
const PORT = process.env.PORT;
//running the server on port 5000
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});

// generate a nodejs script that will get all news from atlest 10 sources so that i can show it in my app as a news feed

// Path: routes/scrape.js
// importing Packages
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
// Defining the routes
router.get('/scrape', (req, res) => {
    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get('https://www.nytimes.com/section/world').then(response => {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(response.data);
        // An empty array to save the data that we'll scrape
        const results = [];
        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $('div.css-4jyr1y').each((i, element) => {
            const title = $(element).find('h2').text();
            const link = $(element).find('a').attr('href');
            const summary = $(element).find('p').text();
            results.push({
                title: title,
                link: link,
                summary: summary
            });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        // Send a message to the client
        res.send('Scrape Complete');
    });
});
// Exporting the router
module.exports = router;

// Path: routes/scrape.js
// importing Packages
const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
// Defining the routes
router.get('/scrape', (req, res) => {
    // Make a request via axios to grab the HTML body from the site of your choice
    axios.get('https://www.nytimes.com/section/world').then(response => {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        const $ = cheerio.load(response.data);
        // An empty array to save the data that we'll scrape
        const results = [];
        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $('div.css-4jyr1y').each((i, element) => {
            const title = $(element).find('h2').text();
            const link = $(element).find('a').attr('href');
            const summary = $(element).find('p').text();
            results.push({
                title: title,
                link: link,
                summary: summary
            });
        });
        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        // Send a message to the client
        res.send('Scrape Complete');
    });
});

// Exporting the router 
module.exports = router;




