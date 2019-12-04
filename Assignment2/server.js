const qs = require('querystring'); //use querystring
var express = require('express'); //Use express module
var app = express(); // Create an object with express
var fs = require('fs'); //require a file system from node
var myParser = require("body-parser"); //needed to make form data to be available in request.body
//var services = require('./public/service_data.js'); // location of services
const service_data = require('./public/service_data.js'); //keep service_data constant
var filename = "user_data.json"; //location of user reg data
//var user_quantity_data; // hold quantity variables until invoice is displayed
var a_qty;
app.use(myParser.urlencoded({ extended: true })); //use myParser



// Only open the file if it exists Lab 14
if (fs.existsSync(filename)) {
    fstats = fs.statSync(filename);
    console.log(filename + " has " + fstats.size + " characters");

    raw_data = fs.readFileSync(filename, 'utf-8');
    users_reg_data = JSON.parse(raw_data); //parse users registatration


} else {
    console.log('file ' + filename + " doesn't exist!");
}


app.get('/purchase', function (request, response, _next) { //get data from /purchase action
    console.log(Date.now() + ' raw_data ' + JSON.stringify(request.query)); //log date and quantites 

    let grab = request.query; //grab request from query
    console.log(grab); //grab query from the form 
    var validQuantities = true; //textboxes are blank to start, nothing is invalid
    var validPurchases = false; //quantities are considered false since it should be empty to start
    var minMiles = 5; //Minimum charge is 5 miles, number is set to appear automatically in /service_data.js default
    tot_qty = 0;
    for (i = 0; i < service_data.length; i++) { //starting at 0 then increase by one for every service available
        index = 'qtyTextbox' + i;

        a_qty = grab[index]; //a_qty is the quantity from textbox
        if (isNonNegInt(a_qty) == false) { // if not an integer
            validQuantities = false; //quantites are not valid 
            console.log(a_qty);
        } else {
            tot_qty += Number(a_qty); //tot_qty is the total purchases selected, must be a number > 5
        }
    }

    //validPurchases not turning to true even though a_qty is greater than minMiles
    if (tot_qty > minMiles) { //if quantity is > 5
        validPurchases = true; // change from false to true once it is no longer blank.
    }
    console.log(validQuantities, validPurchases); //log into console to check validity
    
    qString = qs.stringify(a_qty); //string query together
    if (validQuantities == true && validPurchases == true) { //if both are true
        response.redirect('login.html?' + qs.stringify(request.query)); //send to login with the form data 
    } else { //if either is false
        request.query["validQuantities"] = validQuantities; // request the query for validQuantities
        request.query["validPurchases"] = validPurchases; // request the query for validPurchases
        console.log(request.query); // log the query into the console
        response.redirect('./order_page.html?' + qs.stringify(request.query)); // redirect to the form again, keeping the query that they wrote
    }
}
);
/*app.get("/loginform", function (_request, response) {
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
*/
app.post("/login.html", function (request, response) { //Lab14
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    var errors = []; //create a blank errors variable
    newUsername = request.body.username.toLowerCase();  //convert to all lowercase username to prevent case errors in the future
    newPassword = request.body.password;
    if (typeof users_reg_data[newUsername] != 'undefined') {  //check if username already exists in user reg data
        if (users_reg_data[newUsername].password == newPassword) {  //does password match username?
            request.query.username = newUsername;
            response.redirect('/checkout.html?' + qs.stringify(request.query)); //send query to checkout
            return;
        } else {
            errors.push = ('Invalid Password');
            console.log(errors);
            request.query.username = newUsername
            request.query.password = request.body.password;
            request.query.errors.join(';');
        }
    } else {
        errors.push = ('Invalid Username');
        console.log(errors);
        request.query.username = newUsername;
        request.query.password = request.body.password;
        request.query.errors = errors.join(';');
    }
    response.redirect('./public/login.html?' + qs.stringify(request.query));
}
);

app.post("registration.html", function (request, res) {

    var errors = []; //create an array for errors

    if ((request.body.realName < 2)) {  //must be more than 2 characters
        errors.push('Name Is Too Short'
        )
    }
    if ((request.body.realName > 50)) {   //must be less than 50 characters
        errors.push('Name Is Too Long')
    }

    if (/^[0-9a-zA-Z]+$/.test(request.body.realName)) { //Check for special characters https://www.w3resource.com/javascript/form/all-letters-field.php
    }
    else {
        errors.push('Letters And Numbers Only for Username')
    }

    if ((request.body.username.length < 2)) { //Username must be more than 2 characters
        errors.push('Username Is Too Short')
    }
    if ((request.body.username > 15)) { //Username must be less than 15
        errors.push('Username Too Long')
    }
    //check if username exists, convert to lowercase
    var regUser = request.body.username.toLowerCase(); //make username case insensitive
    if (typeof users_reg_data[regUser] != 'undefined') { //if the username is already defined in the registration data
        errors.push('Username Is Taken, Please Select Another')
    }
    //Check for special characters
    if (/^[0-9a-zA-Z]+$/.test(request.body.username)) {
    }
    else {
        errors.push('Letters And Numbers Only for Username')
    }

    //check if password is a minimum of 6 characters long
    if ((request.body.password < 6)) {
        errors.push('Password Too Short')
    }
    //check if password entered equals to the repeat password entered - make sure password is case sensitive
    if (request.body.password !== request.body.pswd) { // if password equals confirm password
        errors.push('Password Not a Match')
    }

    var regemail = request.body.email.toLowerCase(); //make email case insensitive
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regemail)) {
    }
    else {
        errors.push('Invalid Email')
    }

    //https://www.w3resource.com/javascript/form/email-validation.php
    //if data is valid, redirect checkout

    if (errors.length == 0) {
        console.log('Error Free');
        request.query.username = regUser;
        res.redirect('./checkout.html?' + qs.stringify(request.query))
    }
    if (errors.length > 0) {
        console.log(errors)
        request.query.name = request.body.name;
        request.query.username = request.body.username;
        request.query.password = request.body.password;
        request.query.pswd = request.body.pswd;
        request.query.email = request.body.email;

        request.query.errors = errors.join(';');
        response.redirect('./register' + qs.stringify(request.query))
    }

    //add errors to querystring

}
);
/* app.get('/services', function (request, response, next)
{
    response.json(services);
});
*/
/*  app.get("/purchase", function (request, response, next) {  //get checkout page if parameters are met 
    user_quantity_data = request.query; //save
    
    
    if (typeof request.query['purchase'] != 'undefined') {
        console.log(Date.now() + ": Purchase made from ip " + request.ip + " raw_data: " + JSON.stringify(request.query));
        
        has_errors = false; //assume that quantity values are valid
        total_qty = 0; //set total_qty to 0
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
*/


//lab11 check to see if a_qty is a non-negative integer
function isNonNegInt(a_qty, sendArrayBack = false) {  //Function from lab 11
    errors = []; // assume no errors at first
    if (a_qty == '') a_qty = 0; //if a_qty is blank, set it to 0
    if (Number(a_qty) != a_qty) errors.push('Not a number!'); // Check if string is a number value
    else if (a_qty < 0) errors.push('Negative value!'); // Check if a_qty is non-negative
    else if (parseInt(a_qty) != a_qty) errors.push('Not an integer!'); // Check that a_qty is an integer
    return sendArrayBack ? errors : (errors.length == 0);
};



/*app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let POST = request.body;
    console.log(POST);

    if (typeof POST['submit'] == undefined)
    {
        console.log('No form data');  //check if submit button was pressed
    } else  
    {
        //user submitted a userid and password. Test them for validity.
        if (users_reg_data[POST.username] != undefined)
        {
            if (POST.password == users_reg_data[POST.username.password])
            {
                console.log(password);
            }
        }
    }
});
*/

/*app.get("/register", function (request, response) {
    if (typeof user_quantity_data != 'undefined')
    {
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
    } else {
        str = `
        <head>
        <script>
            alert('Select service(s) before regsitering!');
            
            window.location = './order_page.html';
        </script>
        </head>
            `;
        response.send(str);
    }
 });
*/
/*app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got the registration request");
    let POST = request.body; //private variable that only effects this portion of the page
    username = POST.username;  //name that is specified in app.get register name="username"
    if (typeof users_reg_data[username] == 'undefined') {
        users_reg_data[username] = {};  //create empty object
        users_reg_data[username].name = username; //
        users_reg_data[username].password = POST.password; //check value
        users_reg_data[username].email = POST.email; //check value

        if (POST.password != POST.repeat_password) {
            console.log("Passwords do not match!");
        }

        var output_data = JSON.stringify(users_reg_data); //assign users_reg_data to output
        fs.writeFileSync(filename, output_data, "utf-8");

        response.send("user " + username + " registered");
    } else {
        response.send("User " + username + " already taken; try again.:");
    }
});*/


app.all('*', function (request, _response, next) {    //Initialize express
    console.log(`${request.method} + ' to' + ${request.path}`);
    next();
});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));