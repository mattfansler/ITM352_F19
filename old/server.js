//Creating the server via Express
//Template based on server from Assignment1_Design_Examples > Asssignment1_2file > store_server.js 

var fs = require('fs');
var express = require('express'); // server requires Express to run
const querystring = require('querystring'); // requiring a query string - string of whatever is written in textbox
const product_data = require('./public/product_data'); //using data from product_data.js
var app = express(); //run the express function and start express
var parser = require('body-parser');

app.use(parser.urlencoded({ extended: true })); // decode, now request.body will exist

//Login Server code from Lab 14

var filename = 'user_data.json'

if (fs.existsSync(filename)) { //check to see if file exists
  stats = fs.statSync(filename);

  console.log(filename + ' has ' + stats.size + ' characters');

  data = fs.readFileSync(filename, 'utf-8')

  users_reg_data = JSON.parse(data);

} else {
  console.log(filename + ' does not exist!');
}
/*
app.get("/invoice.html", function (req, res){
  if(typeof validuser == 'undefined'){
    console.log('meh');
    res.redirect('/login.html?' + querystring.stringify(req.query));
  }

});
*/

app.post("/login.html", function (req, res) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  //Code from Lab 14
  var LogError = [];
  console.log(req.body);
  //To make username case insensitive
  //toLowerCase function: https://www.w3schools.com/jsref/jsref_tolowercase.asp
  the_username = req.body.username.toLowerCase(); //username entered is case insensitive
  if (typeof users_reg_data[the_username] != 'undefined') { //check if the username exists in the json data
    if (users_reg_data[the_username].password == req.body.password) { //make sure password matches exactly - case sensitive
    req.query.username = the_username;
      res.redirect('/invoice.html?' + querystring.stringify(req.query)); // need to put query back into it
      return;
    } else{
      LogError.push = ('Invalid Password');
      console.log(LogError);
      req.query.username= the_username;
      req.query.password=req.body.password;
      req.query.LogError=LogError.join(';');
    }
  }
  else {
    LogError.push = ('Invalid Username');
    console.log(LogError);
    req.query.username= the_username;
    req.query.password=req.body.password;
    req.query.LogError=LogError.join(';');
  }
  res.redirect('/login.html?' + querystring.stringify(req.query));

}
);

app.post("/register.html", function (req, res) {
  qstr = req.body
  console.log(qstr);

  //validate registration data
  //create an array to store errors
  var errors = [];

  //make sure name is valid
  if (req.body.name == "") {
    errors.push('Invalid Full Name');
  }
  //make sure that full name has no more than 30 characters
  if ((req.body.name > 30)) {
    errors.push('Full Name Too Long')
  }
  //make sure full name contains all letters
  //Code for Validating Letters only: https://www.w3resource.com/javascript/form/all-letters-field.php
  if (/^[A-Za-z]+$/.test(req.body.name)) {
  }
  else {
    errors.push('Use Letters Only for Full Name')
  }

  //when check, change all to lowercase so is case insensitive
  //var str = request.body.username
  //var RegUser = str.toLowerCase();

  //Username must be minimum of 4 characters and maximum of 10
  //Code for Validating Username Length: https://crunchify.com/javascript-function-to-validate-username-phone-fields-on-form-submit-event/
  if ((req.body.username.length < 4)) { //if username is less than 4 characters, push an error
    errors.push('Username Too Short')
  }
  if ((req.body.username > 10)) { //if username is greater than 10 characters, push an error
    errors.push('Username Too Long')
  }
  //check if username exists
  //toLowerCase function: https://www.w3schools.com/jsref/jsref_tolowercase.asp
  var reguser = req.body.username.toLowerCase(); //make username user enters case insensitive
  if (typeof users_reg_data[reguser] != 'undefined') { //if the username is already defined in the registration data
    errors.push('Username taken')
  }
  //Check letters and numbers only
  //Code for validating letters and numbers only: https://www.w3resource.com/javascript/form/letters-numbers-field.php
  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
  }
  else {
    errors.push('Letters And Numbers Only for Username')
  }

  //check if password format is valid
  //check if password is a minimum of 6 characters long
  if ((req.body.username < 6)) {
    errors.push('Username Too Short')
  }
  //check if password entered equals to the repeat password entered - make sure password is case sensitive
  if (req.body.password !== req.body.confirmpsw) { // if password equals confirm password
    errors.push('Password Not a Match')
  }

  //check if email is valid
  //email validation code: https://www.w3resource.com/javascript/form/email-validation.php
  var regemail = req.body.email.toLowerCase(); // to make email case insensitive
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regemail)) {
  }
  else {
    errors.push('Invalid Email')
  }


  //if data is valid, save the data to the file and redirect to invoice

  //want to put alert for successful registration if can but alert no working :(
  //InvoiceName = req.body.username
  if (errors.length == 0) {
    console.log('none!');
    req.query.username = reguser;
    res.redirect('./invoice.html?' + querystring.stringify(req.query))
  }
  if (errors.length > 0) {
    console.log(errors)
    req.query.name = req.body.name;
    req.query.username = req.body.username;
    req.query.password = req.body.password;
    req.query.confirmpsw = req.body.confirmpsw;
    req.query.email = req.body.email;

    req.query.errors = errors.join(';');
    res.redirect('./register.html?' + querystring.stringify(req.query)) //trying to add query from registration page and invoice back to register page on reload
  }

  //add errors to querystring

}
);


app.get('/purchase', function (req, res, next) { //getting the data from the form where action is '/purchase' 
  console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.query)); // logging the date, IP address, and query of the purchase (quantities written in textboxes) into console

  // Validating quantity data, go through each and check if good
  // Done with help from Port
  let GET = req.query; // GET is equal to getting the request from the query
  console.log(GET); // putting the query that take from the form into the console
  var hasValidQuantities = true; // empty textbox is assumed true - quantity assumed valid even before entering anything
  var hasPurchases = false; //assume quantity of purchases are false (invalid) from the start
  for (i = 0; i < product_data.length; i++) { // for every product in the array, increasing by 1
    q = GET['quantity_textbox' + i]; // q is equal to the quantity pulled from what is entered into the textbox
    if (isNonNegInt(q) == false) { //if the quantity is not an integer
      hasValidQuantities = false; //hasValidQuantities is false 
    }
    if (q > 0) { // if the quantity entered in textbox is greater than 0
      hasPurchases = true; // hasPurchases is true - because there is a quantity greater than 0 entered in the textbox
    }
    console.log(hasValidQuantities, hasPurchases); // logging hasValidQuantities and hasPurchases into console to check validity (true or false)
  }

  // If it ok, send to invoice. if not, send back to the order form
  qString = querystring.stringify(GET); //stringing the query together
  if (hasValidQuantities == true && hasPurchases == true) { // if both hasValidQuantities and hasPurchases are true
    res.redirect('./login.html?' + querystring.stringify(req.query)); // redirect to the invoice page with the query entered in the form
  } else {    // if either hasValidQuantities or hasPurchases is false
    req.query["hasValidQuantities"] = hasValidQuantities; // request the query for hasValidQuantities
    req.query["hasPurchases"] = hasPurchases; // request the query for hasPurchases
    console.log(req.query); // log the query into the console
    res.redirect('./form.html?' + querystring.stringify(req.query)); // redirect to the form again, keeping the query that they wrote
  }


});

app.use(express.static('./public')); // create a static server using express from the public folder

// Having the server listen on port 8080
// From Assignment1_Design_Examples > Asssignment1_2file > store_server.js
var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });

//Creating the function checkQuantityTextbox()
function checkQuantityTextbox() { // the function checkQuantityTextbox
  errs_array = isNonNegInt(quantity_textbox.value, true); //errs_array is equal to the value of what is in the textbox if it is true
  qty_textbox_message.innerHTML = errs_array.join(','); // list out (join) the errors for the textbox quantity if it is not an integer
}

//Creating the isNonNegInt function, which checks to make sure the quantity is a positive integer 
//From Lab 12 and 13
function isNonNegInt(q, returnErrors = false) { // creating function with variable q, when returnErrors is false
  errors = []; // assume no errors at first
  if (q == '') q = 0; // handle blank inputs as if they are 0
  if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
  if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
  return returnErrors ? errors : (errors.length == 0); // return no errors if the errors length is 0
}

//Creating the process_form function, which checks to make sure that the quantity is an integer before processing the form 
//From Lab 13 Ex.4
function process_form(GET, response) { //creating function with variables GET and response
  if (typeof GET['purchase'] != 'undefined') { // if what is written in the textbox is defined
    for (i in products) {  // for whatever the product number is
      let q = GET[`quantity_textbox${i}`]; // q is equal to the quantity able to get from the textbox for that product
      if (isNonNegInt(q)) { //if quantity is an integer
        receipt += eval('`' + contents + '`'); // render template string
      } else { // if quantity is not an integer
        receipt += `<h3><font color="red">${q} is not a valid quantity for ${model}!</font></h3>`; // say it is not a valid quantity
      }
    }
    response.send(receipt); //sending the receipt
    response.end(); //ending the response
  }
}

