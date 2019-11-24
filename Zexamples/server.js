const querystring = require('querystring');

var express = require('express');
var myParser = require("body-parser");
var products = require("./public/products.js");

var app = express();
app.all('*', function(request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
//intercept purchase submission form, if good give an invoice, otherwise send back to order page
app.get("/purchase", function(request, response) {
    //check if quantity data is valid
    //look up request.query
    params = request.query;
    console.log(params);
    if (typeof params['purchase_submit'] != 'undefined') {
        has_errors = false; // assume quantities are valid from the start
        total_qty = 0; // need to check if something was selected so we will look if the total > 0
        for (i = 0; i < products.length; i++) {
            if (typeof params[`quantity${i}`] != 'undefined') {
                a_qty = params[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; // oops, invalid quantity
                }
            }
        }
        qstr = querystring.stringify(request.query);
        // Now respond to errors or redirect to invoice if all is ok
        if (has_errors || total_qty == 0) {
            //if quantity data is not valid, send them back to product display
            qstr = querystring.stringify(request.query);
            response.redirect("catalog.html?" + qstr);
        } else { // all good to go!
            response.redirect("invoice.html?" + qstr);
        }
    }
});
//if quantity data valid, send them to the invoice





app.use(express.static('./public')); //this is the server being created listening port 8080.
app.listen(8080, () => console.log(`listening on port 8080`));

function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (q == "") { q = 0; }
    if (Number(q) != q) errors.push('Not a number!'); // number value?
    if (q < 0) errors.push('Negative value!'); // non-negative?
    if (parseInt(q) != q) errors.push('Not an integer!'); // integer?
    return returnErrors ? errors : (errors.length == 0);
}

/*
function displayPurchase(POST, response) {
   q = POST['quantity_textbox'];
   if (isNonNegInt(q)) {
      response.send(`Thank you for purchasing ${q} things!`);
   } else {
      response.send(`${q} is not a quantity! Press the back button and try again.`);
   }
}
*/