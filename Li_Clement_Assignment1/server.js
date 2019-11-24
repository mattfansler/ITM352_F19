var fs = require('fs') //require fs or file system from node
var express = require('express'); //use the express module from Node.js
var app = express(); // Create an object of the express module
var data = require('./public/product_data.js'); //include the data from product_data.js
var products = data.products; // Products is defined as the data from product_data.js
myParser = require("body-parser"); // If I recall, it gets the parser from Node.Js 


//Borrowed from previous labs function to test if a string is a non-negative integer 
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q == '') q = 0; // Set no data as if they are 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);

}

// Borrowed from Lab13 
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));

// set up the path and handler for GET requests
app.get('/invoice.html', function (request, response, next) {
    var params = request.query;  // params is set as the query from the request to get the data from products_display.html
    var ValidPurchase = true; // Making a variable to check if there was a valid purchase 
    if (typeof params['purchase_submit'] != undefined) { //Check the type of data in the variable of params
        //Check and validate data here
        for (i = 0; i < Object.keys(params).length - 1; i++) { /* for every product in the array. I was getting arrays when I was using console.log so somebody suggested
                                                            to use Object.keys which supposedly returns the elements from the array*/
            q = params[`quantity${i}`]; //q is set as the quantities from products_display.html
            if (!(q > 0 || q == '')) { // If q is less than 0 and q equal an empty string
                ValidPurchase = false; // than the ValidPurchase is false
            }
        }
        console.log(ValidPurchase);

        if (ValidPurchase) { // if valid purchase is true than the page goes forward to the invoice
            next();
        } else {
            response.redirect('back'); //Otherwise, the response to the client is to redirect back to the original page
        }
    }
});

// look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));