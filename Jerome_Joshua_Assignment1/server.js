var data = require('./public/product_data');
var products = data.products;
var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");

// Function to test if a string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {

    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);

}

// Initialize Express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));

// Set up the path and handler for POST requests
app.post("/process_form", function (request, response, next) {
    let POST = request.body;
    console.log(POST);
    // Check the quantity entered by the user
    if (typeof POST['Submit_button'] != 'undefined') {
        has_error = false;
        has_quantity = false;
        for (i = 0; i < products.length; i++) {
            q = POST['quantity_textbox' + i];
            if (q != "") {
                has_quantity = ((q > 0) || has_quantity);

                if (!isNonNegInt(q)) {
                    has_error = true;

                    break;
                }
            }
        }



        if (!has_error && has_quantity) {  //create invoice string if q is larger than 0
            Invoice_str = "";
            for (i = 0; i < products.length; i++) {
                q = POST['quantity_textbox' + i];
                if (q > 0) {
                    Invoice_str += `<h1>Thank you for purchasing ${q} ${products[i]['service']}. Your total is \$${q * products[i]['price']}!</h1>  `;
                }
            }
            response.send(Invoice_str);
                                           //ask user to select a service if not selected
        } else if (has_error) {
            response.send(`${q} is not a quantity!`);
        } else if (!has_quantity) {
            response.send("Please select a service");
        }                                      
    } else {
        next();
    }

});

// Look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));


