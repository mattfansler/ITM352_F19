const qs = require('querystring'); //use querstring
var express = require('express'); //Use express module
var app = express(); // Create an object with express
var fs = require('fs'); //require a file system from node
var myParser = require("body-parser"); //needed to make form data to be available in req.body
//var services = require('./public/service_data.js'); // location of services
const service_data = require('./public/service_data.js.js') //keep constant throughout
var filename = "user_data.json"; //location of user reg data
var user_quantity_data; //hold quantity variables until invoice is displayed

app.all('*', function (request, response, next) {
    console.log(request.method + ' to' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true}));

// Only open the file if it exists Lab 14
if (fs.existsSync(filename))
{
    fstats = fs.statSync(filename);
    console.log(filename + " has " + fstats.size + " characters");

    raw_data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(raw_data); //parse users registatration

    
} else {
    console.log('file ' + filename + " doesn't exist!");
     }

app.post('/login.html', function (request, response) { //Lab14
    var errors = []; //create a blank errors variable
    newUsername = request.body.username.toLowerCase(); //convert username to lowercase which will prevent case errors in the future
    //newPassword = request.body.password;
    if (typeof users_reg_data[newUsername] != 'undefined') { //Check if username already exists
        if (users_reg_data[newUsername].password == request.body.password) { //check the username input against the json data to verify if passwords match
        
    request.query.username = newUsername;
        response.redirect('/checkout.html?' + qs.stringify(request.query)); //send query to checkout
        return;
    } else {
        errors.push = ('Incorrect Password, Please Try Again') //log error
        console.log(errors);
        request.query.username = newUsername //check username
        request.query.password = request.body.password //check password
        request.query.errors = errors.join(';'); //string together errors
            }
        }else {
            errors.push = ('Incorrect Username');
            console.log(errors);
            request.query.username = newUsername;
            request.query.password = request.body.password //
            request.query.errors = errors.join(';') //string together errors
        }
        response.redirect('/login.html?' + qs.stringify(request.query));
    }
    );     
    app.get("/purchase", function (request, response, next) {  //get checkout page if parameters are met 
        user_quantity_data = request.query; //save
        
        
        if (typeof request.query['purchase'] != 'undefined') {
            console.log(Date.now() + ": Purchase made from ip " + request.ip + " raw_data: " + JSON.stringify(request.query));
            
            has_errors = false; //assume that quantity values are valid
            total_qty = 0; //set total_qty to 0, until service is requested
            for (i = 0; i <services.length; i++) {
                if (user_quantity_data[`quantity${i}`] != 'undefined' ) {
                    a_qty = user_quantity_data[`quantity${i}`];
                    total_qty += a_qty;
                    if (!isNonNegInt(a_qty)) {
                        has_errors = true; //Invalid quantity
                    }
                }
            }
            
            if (has_errors || total_qty == 0){
                response.redirect("order_page.html?" + qs.stringify(user_quantity_data));
            } else { //No errors, request login
                response.redirect("login");
            }
        }  
    });

app.get 
app.get("./process_page", function (request, response) {
    params = request.query;
    console.log(params)
    
    if (typeof params[final_submission] != 'undefined') {
        has_errors = false; //assume that quantity values are valid
        total_qty = 0; //set total_qty to 0
        for (i = 0; i <services.length; i++) {
            if (typeof params[`quantity${i}`] != 'undefined' ) {
                a_qty = params[`quantity${i}`];
                total_qty += a_qty;
                if (!isNonNegInt(a_qty)) {
                    has_errors = true; //Are there errors?
                }
            }
        }
        qstr = qs.stringify(request.query);
        if (has_errors || total_qty == 0){
            qstr = qs.stringify(request.query);
            response.redirect("order_page.html?" + qstr)
        } else { //check quantity
            response.redirect("checkout.html?" + qstr);
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