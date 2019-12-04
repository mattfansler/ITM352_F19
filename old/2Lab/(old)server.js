var qs = require('querystring');
var express = require('express'); //Use express module
var app = express(); // Create an object with express
var fs = require('fs'); //require a file system from node
var myParser = require("body-parser"); //needed to make form data to be available in req.body
var products = require('../Assignment2/public/product_data.js'); // location of products
var filename = user_product_quantites;

app.all('*', function (request, response, next) {    //Initialize express
    console.log(request.method + ' to' + request.path);
    next();
});
app.use(myParser.urlencoded({ extended: true})); //use myParser

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let POST = request.body;
    if (users_reg_data[POST.username == undefined]) 
    {
        console.log('No form data');  //check if submit button was pressed
    } else  
    {
        //user submitted a userid and password. Test them for validity.
        if (users_reg_data[POST.username] != undefined)
        {
            if (POST.password == users_reg_data[POST.username.password])
            {
                theQueryString = qs.stringify(user_product_quantites);
                response.redirect("/checkout.html?" + theQueryString);
            } 
            else {
                response.redirect('login');
            }
        }
    }
});

var user_product_quantites = {};

app.get ("/purchase", function (request, response){ //get quantity data from query string
    user_product_quantites = request.query;
    console.log(user_product_quantites);

    // validate the quantities; if not valid go back to purchase page
    // if valid go to login
    response.redirect('login');
});



app.get("./checkout.html", function (request, response) {  //get checkout page if no errors
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
        qstr = querystring.stringify(request.query);  //Redirect to order_page if there are errors, checkout if there are none
        if (has_errors || total_qty == 0){
            qstr = querystring.stringify(request.query);
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
// Only open the file if it exists
if (fs.existsSync(filename))
{
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    console.log(users_reg_data);

    fstats = fs.statSync(filename);
    console.log(filename + " has " + fstats.size);
}
else {
    console.log('file ' + filename + " doesn't exist!");
}
 
var data = JSON.parse(raw_data);
console.log(data.dport);

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" name="submit">
</form>
</body>
    `;
    response.send(str);
 });



app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit" name="submit">  
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got the registration request");
    let POST = request.body; //private variable that only effects this portion of the page

    username = POST.username;  //name that is specified in app.get register name="username"
if (typeof users_reg_data[username] == 'undefined') {
    users_reg_data[username] = {};  //create empty object
    users_reg_data[username].name = username; //
    users_reg_data[username].password = POST.password; //check value
    users_reg_data[username].email = POST.email; //check value
    
    if (POST.password != POST.repeat_password)
    {
        console.log ("Passwords do not match!");
    }

    var output_data = JSON.stringify(users_reg_data);
    fs.writeFileSync(filename, output_data, "utf-8");

    response.send("user " + username + " registered");
} else
{
    response.send("User " + username + " already taken; try again.:" );
}
 });

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));