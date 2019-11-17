const querystring = require('querystring');
var express = require('express'); //Use express module
var app = express(); // Create an object with express
//var fs = require('fs'); //require a file system from node
var myParser = require("body-parser"); //needed to make form data to be available in req.body
var products = require('./public/product_data.js'); // location of products

app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true}));

app.get("./process_page", function (request, response) {
    params = request.query;
    console.log(params)
    
    if (typeof params[final_submission] != 'undefined') {
        has_errors = false; //assume that quantity values are valid
        total_qty = 0; //set total_qty to 0
        for (i = 0; i <products.length; i++) {
            if (typeof params[`quantity${i}`] != 'undefined' ) {
                a_qty = params[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; //Are there errors?
                }
            }
        }
        qstr = querystring.stringify(request.query);
        if (has_errors || total_qty == 0){
            qstr = querystring.stringify(request.query);
            response.redirect("product_page.html?" + qstr)
        } else { //check quantity
            response.redirect("invoice.html?" + qstr);
        }
    }  
});

//lab11 check to see if q is a non-negative integer
function isNonNegInt(q, sendArrayBack = false) {  //Function from lab 11
    errors = []; // assume no errors at first
    if (q == '') q = 0; //if q is blank, set it to 0
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    else if (q < 0) errors.push('Negative value!'); // Check if q is non-negative
    else if (parseInt(q) != q) errors.push('Not an integer!'); // Check that q is an integer
    return sendArrayBack ? errors : (errors.length == 0);
}

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));