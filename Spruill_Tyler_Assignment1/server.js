//server that functions via Express, based on previous lab
var fs = require('fs')
var express = require('express');
var app = express();
var data = require('./public/product_data.js'); //references product data from public folder
var products = data.products; //remove this later
myParser = require("body-parser"); 


//function tests if input is a non-negative integer 
function isNonNegInt(q, returnErrors = false)
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0); 
    
}

function process_quantity_form (POST, response) {
    // take first product in array and get model, assign value, get the price
    let model = products_array[i]['model'];
    let model_price = products_array[i]['price'];

    // check quantity entered
   if (typeof POST['quantity_textbox'] != 'undefined') 
   {
       q = POST ['quantity_textbox']; 
           if (isNonNegInt(q))
           {
            var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8'); //edit later, quantity template not used for assignment1
            response.send(eval('`' + contents + '`')); // render template string
           }
           else {
               response.send(`${q} is not a quantity! Press the back button and try again.`)
           }
   }
}

// initialize express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next(); //requests the data from server 
});

app.use(myParser.urlencoded({ extended: true }));

// set up the path and handler for POST requests
app.post("/process_form", function (request, response) {
   let POST = request.body;
   //response.send(POST); 
   process_quantity_form (POST, response);

});

// look for files in "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));