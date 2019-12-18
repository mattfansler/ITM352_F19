//Assignment1_Design_Examples > Asssignment1_2file > store_server.js 

var fs = require('fs');
var express = require('express'); //Require Express
var app = express(); //initialize express
const querystring = require('querystring'); // requiring querystring
var parser = require('body-parser'); //Require body-parser
var cookieParser = require('cookie-parser'); //Require body-parser
var session = require('express-session'); //Require express-session



app.use(cookieParser());

app.use(session({ secret: "ITM 352" }));

app.use(parser.urlencoded({ extended: true })); 
app.use(parser.json());


//Lab 14 Server
var filename1 = 'user_data.json'; //loading the user_data.json file
var filename2 = './public/service_data.json';//loading service_data.json file
var filename3 = 'request_data.json'; //loading request_data.json file

if (fs.existsSync(filename1)) { //only open if file exists
  stats1 = fs.statSync(filename1); //used to printout size of filename
  stats2 = fs.statSync(filename2); //used to printout size of filename
  stats3 = fs.statSync(filename3); //used to printout size of filename

  console.log(filename1 + ' has ' + stats1.size + ' characters'); //number of characters
  console.log(filename2 + ' has ' + stats2.size + ' characters'); //number of characters
  console.log(filename3 + ' has ' + stats3.size + ' characters'); //number of characters

  user_data = fs.readFileSync(filename1, 'utf-8') //opens the filename1
  service_data_json = fs.readFileSync(filename2, 'utf-8') //open filename2
  request_data_json = fs.readFileSync(filename3, 'utf-8') //open filename2



  users_reg_data = JSON.parse(user_data); //create object with JSON.parse()
  service_data = JSON.parse(service_data_json); //create object with JSON.parse()
  request_data = JSON.parse(request_data_json); //create object with JSON.parse()

} else { //if file does not exist
  console.log(filename1 + ' does not exist!'); //saying filename doesn't exist in console
}

app.post("/submit_request", function (req, res, next) {
  req.query.date = req.body.date;
  req.query.time = req.body.time;
  req.query.request_details = req.body.request_details;
  req.query.hours = req.body.hours;
  req.session.request_details = req.query.request_details;
  req.session.time = req.query.time;
  req.session.date = req.query.date;
  req.session.hours = req.query.hours;
  req.query.request_details = req.body.request_details;



  var request_errors = []; //to store all errors

  if (request_errors.length == 0) { 
    res.clearCookie('user'); // clear cookie if request is valid
    
    //landing page generator
    pagestr = `  
  <!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Request confirmed</title>
      <link rel="stylesheet" href="main.css">
  </head>
<header>
<ul>
<li><a href="./search1.html">Search</a></li>
<li><a href="./prospects.html">Cart</a></li>
</ul>
</header>  
<body>
  <div>
    <h1>Thank you, your request is being processed</h1>
    <h2>Performers should contact you within 24 hours to confirm booking</h3>
    <center>Please call 808-555-HELP for any questions or concerns.</center>
  </div>
</body>
</html>`;

    res.send(pagestr); //display page

  } else {
    req.query.date = req.body.date;
    req.query.location = req.body.location;
    req.query.time = req.body.time;
    req.query.hours = req.body.hours;
    req.query.request_details = req.body.request_details; 
    req.query.name = req.session.name;
    req.query.email = req.session.email;
    req.query.service_name = req.session.service_name;
    req.query.request_errors = request_errors.join(';'); //join errors in querystring
    res.redirect('./request.html?' + querystring.stringify(req.query)); 
  }

});

app.get("/index.html", function (req, res, next) {
  res.cookie('name', 'guest');
  req.session.fav_service = [];  
  req.session.add = [];
  add_array = req.session.add;
  next();
});

app.get("/", function (req, res, next) {
  res.cookie('name', 'guest');
  req.session.fav_service = [];
  req.session.add = [];
  add_array = req.session.add;
  next();
});


app.get("/service_all.html", function (req, res) {
  if (typeof req.cookies.name != 'undefined') {
  } else {
    res.redirect('/index.html');
  }




  console.log('service all', req.query);
  pagestr = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <script>
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  </script>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Performers & Services</title>
      <link rel="stylesheet" href="main.css">
  </head>
  <header>
      <h1>Party Starters!</h1>
  </header>
</div>
<ul>
<li><a href="./search1.html">Search</a></li>
<li><a href="./prospects.html">Cart</a></li>
</ul> 

<br>
  <body>
  <div><main>
          <table cellpadding="10" border="0">`;

  //Search table, display image, name and give the option to further explore services
  for (i = 0; i < service_data.length; i++) {
    if (req.query.eventSize == service_data[i].keyword) {
      
      pagestr += `
                <form action="/service_single.html" method="GET">
                  <tr>
                  <td><img src="${service_data[i].image}"><br>
                  ${service_data[i].name}
                      
                      <input type="hidden" name="service_index" value="${i}">
                      <input type="submit" value="View Profile" name="${service_data[i].name}">

                      <input type="radio" id="fav_service${i}" name="fav_service${i}" onclick="postData('add_to_fav', {'service_index': ${i},'add${i}': this.checked})">
                      <label for="fav_service${i}" name="fav_service${i}" name="fav_service${i}">Add to Cart</label>
                      </td>
            
                      
      </tr>
      </form>
      `;
    }

  }

  pagestr += `
              </script>
  
          </table>
  
  </main></div>
  </body>
  <br>
  <footer>
  </footer>
  </html>`;

  res.send(pagestr);

});

app.get("/prospects.html", function (req, res) {  
  /*fav_artist = req.session.fav_artist;
  console.log(fav_artist);
  */

  if (typeof req.cookies.name != 'undefined') {
  } else {
    res.redirect('/index.html');
  }

  if (typeof add_array != 'undefined') {
    if (add_array.length > 0) {
      console.log(add_array);
      pagestr = `
  <!DOCTYPE html>
  <html lang="en">`;

      pagestr += `
  <head>
  <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Performers & Services</title>
      <link rel="stylesheet" href="main.css">
  </head>
  <header>
      <h1>Party Starters!</h1>
  </header>
  <ul>
  <li><a href="./search1.html">Search</a></li>
  <li><a href="./prospects.html">Cart</a></li>
  </ul> 
<br>
  <div><main>
  <body>
          <table cellpadding="10" border="0" >`;

      for (i = add_array.length - 1; i >= 0; i--) {
        pagestr += ` 
    <form action="/service_single.html" method="GET">
      <tr>
          <td><img src="${service_data[add_array[i]].image}"><br>${service_data[add_array[i]].name}
          <br>
          <input type="hidden" name="service_request" value="${service_data[add_array[i]].name}">
          <input type="hidden" name="service_index" value="${service_data[add_array[i]].service_id}">
          <input type="submit" value="View Profile" name="${service_data[add_array[i]].name}"></td>
      </tr>
      </form>`;
      }

      pagestr += ` 
          </table>
  </main></div>
  </body>
  <br>
  <footer>
   <h2>Party Starters</h2>
  </footer>
  </html>`;

      res.send(pagestr);
    } else {
      pagestr = `
  <!DOCTYPE html>
  <html lang="en">`;

      pagestr += `
  <head>
  <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Performers and Services</title>
      <link rel="stylesheet" href="main.css">
  </head>
  <header>
      <h1>Party Starters!</h1>
  </header>
  <ul>
  <li><a href="./search1.html">Search</a></li>
  <li><a href="./prospects.html">Cart</a></li>
  </ul> 

  <div><main>
  <body>
  <h2>Your cart is empty!</h2>
  </main></div>
  </body>
  <br>
  <footer>
  </footer>
  </html>`;

      res.send(pagestr);
    }
  } else {
    res.redirect('/index.html');
  }
});



app.get("/service_single.html", function (req, res) {

  if (typeof req.cookies.name != 'undefined') {
  } else {
    res.redirect('/index.html');
  }

  if (req.query.service_index !== undefined) {
    console.log('single service page', req.query);
    index = req.query.service_index;
    


    sav_service = req.session.sav_service;
    if (req.query["sav_service" + index] != undefined) {
      sav_service.push(index);
      req.session.fav_service = sav_service;
      console.log(req.session.fav_service);
    }

    pagestr = `
    <!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${service_data[index].name}</title>
        <link rel="stylesheet" href="main.css">
    </head>  
    <h1>Party Starters!</h1>
    <ul>
        <li><a href="./search1.html">Search</a></li>
        <li><a href="./prospects.html">Cart</a></li>
    </ul> 
  
  <body>
<form action = '/request_service'>
<div>
        <h1>${service_data[index].name}</h1>
        <br><img src="${service_data[index].image}">
        <br>
        <div><p>${service_data[index].description}</p></div>
<input type="hidden" name="service_request" id="service_request" value="${index}">
<input type="hidden" name="service_name" id="service_name" value="${service_data[index].name}">
<input type="submit" value="Book Service">
  </form> 
  <br>
        </div>
</body>
</html>`;
    res.send(pagestr);
  }
  else {
    res.redirect('service_all.html')
  }
});

app.get("/request.html", function (req, res, next) {
  //If user cookie is detected and user has logged in/registered, put registration info into a session
  if (typeof req.cookies.user != 'undefined') {
    req.session.email = req.query.email;
    req.session.name = req.query.name;
    req.session.service_name = req.query.service_name;
    req.session.username = req.query.username;
    email = req.session.email;
    console.log(req.session.service_name);
    console.log(req.session.username);
    next();

    //If the user has not logged in/registered, redirect user to the search page
  } else {
    res.redirect('/search1.html');
  }

});


app.post("/add_to_fav", function (req, res) {
  service_index = req.body.service_index;
  console.log(req.body);
  if (req.body["add" + service_index] != undefined) {
    add = req.body["add" + service_index];
    if (add == true) {
      add_array.push(service_index);
      console.log(add_array);
    } else {
      add_array.pop(service_index);
      console.log(add_array);
    }
  }
});


//service name is put into a session when he/she is requested
app.get("/request_service", function (req, res) {
  req.session.service_name = req.query.service_name;
  service_request = req.session.service_name;
  console.log(req.session.service_name);
  res.redirect('./login.html?' + querystring.stringify(req.query));

});


//Validation for the Login Information when Login Page is loaded
app.post("/login.html", function (req, res) {
  // Process login form POST and redirect to request page if ok, back to login page if not
  //Code from Lab 14
  console.log(req.body);
  var LogError = [];
  //To make username case insensitive
  //toLowerCase function: https://www.w3schools.com/jsref/jsref_tolowercase.asp
  the_username = req.body.username.toLowerCase(); //username entered is case insensitive, assign to variable the_username
  if (typeof users_reg_data[the_username] != 'undefined') { //check if the username exists in the json data
    if (users_reg_data[the_username].password == req.body.password) { //make sure password matches exactly - case sensitive
      req.query.username = the_username; //adding the case insensitive username to the query
      console.log(users_reg_data[req.query.username].name); //logging the name to ensure if statement is working
      req.query.name = users_reg_data[req.query.username].name //adding the name for the registered user to the querystring
      req.query.email = users_reg_data[the_username].email; //add email to querystring
      res.cookie('user', req.query.username);
      res.redirect('/request.html?' + querystring.stringify(req.query)); //keeping the querystring when redirecting to the invoice
      return; //ending the if statement
    } else { // if the password does not match what is in the registration data for the given username
      LogError.push = ('Invalid Password'); //push login error for invalid password
      console.log(LogError); //console log error to check working
      req.query.username = the_username; //add username to querystring
      req.query.password = req.body.password; //add password to querystring
      req.query.LogError = LogError.join(';'); //joining the login errors for the querystring
    }
  }
  else { //if username does not exist in registration data
    LogError.push = ('Invalid Username'); //push login error for invalid username
    console.log(LogError); //console log error to check working
    req.query.username = the_username; //add username to querystring
    req.query.password = req.body.password; //add password to querystring
    req.query.LogError = LogError.join(';'); //joining login errors for querystring
  }
  res.redirect('/login.html?' + querystring.stringify(req.query)); //redirecting user to the login page with the querystring

}
);

app.post("/search_service", function (req, res) {
  //put the search into a querystring
  req.query.eventSize = req.body.eventSize;
  console.log(req.query.eventSize);

  //If the no selection is made redirect back to search page
  if (req.query.eventSize == 'select_eventSize') {
    res.redirect('./search1.html');

    //If a selection is made, the user is redirected to service_all.html with search results
  } else {
    res.redirect('./service_all.html?' + querystring.stringify(req.query)); //redirect to the service page
  }
});

app.post("/search_service2", function (req, res) {
  req.query.eventSize = req.body.eventSize;
  console.log(req.query.eventSize);
  if (req.query.eventSize == 'select_eventSize') {
    res.redirect('./search1.html?');
  } else {
    res.redirect('./service_all.html?' + querystring.stringify(req.query)); //redirect to the service page
  }
});

app.post("/submit_register", function (req, res) {
  // Process registration form POST and redirect to artist search page if ok, back to registration page if not
  //validate registration data

  //to log what was entered in the textboxes
  console.log(req.body);

  //create arrays to store errors
  var errors = []; //to store all errors
  var nameerrors = []; //to store name errors
  var usererrors = []; //to store username errors
  var passerrors = []; //to store password errors
  var confirmerrors = []; //to store confirm password errors
  var emailerrors = []; //to store email errors
  var success = [];

  //make sure name is valid
  if (req.body.name == "") { //if nothing is written for the name
    nameerrors.push('Invalid Full Name'); //push error to name errors
    errors.push('Invalid Full Name') //push error to array
  }
  //make sure that full name has no more than 30 characters
  if ((req.body.name.length > 30)) { //if name length greater than 30 characters
    nameerrors.push('Full Name Too Long') //push error to name errors
    errors.push('Full Name Too Long') //push error to array
  }
  //make sure full name contains all letters
  //Code for Validating Letters only: https://www.w3resource.com/javascript/form/all-letters-field.php
  if (/^[A-Za-z]+$/.test(req.body.name)) { //if there are only letters and numbers, do nothing
  }
  else { //if there isn't only letters and numbers
    nameerrors.push('Use Letters Only for Full Name') //push error to name errors
    errors.push('Use Letters Only for Full Name') //push error to array
  }

  //Username must be minimum of 4 characters and maximum of 10
  //Code for Validating Username Length: https://crunchify.com/javascript-function-to-validate-username-phone-fields-on-form-submit-event/
  if ((req.body.username.length < 4)) { //if username is less than 4 characters, push an error
    usererrors.push('Username Too Short') //push to username errors array
    errors.push('Username Too Short') //push error to array
  }
  if ((req.body.username.length > 10)) { //if username is greater than 10 characters, push an error
    usererrors.push('Username Too Long') //push to username errors array
    errors.push('Username Too Long') //push error to array
  }
  
  var reguser = req.body.username.toLowerCase(); //make username case insensitive to prevent search errors
  if (typeof users_reg_data[reguser] != 'undefined') { //if username is defined
    usererrors.push('Username unavailable') //push to username errors array
    errors.push('Username unavailable') //push error to array
  }
  //Check letters and numbers only
  //Code for validating letters and numbers only: https://www.w3resource.com/javascript/form/letters-numbers-field.php
  if (/^[0-9a-zA-Z]+$/.test(req.body.username)) { //if there are only letters and numbers, do nothing
  }
  else { //if there are special characters 
    usererrors.push('Please remove special characters from username') //push to username errors
    errors.push('Please remove special characters from username') //push error to array
  }

  //check if password format is valid
  //check if password is a minimum of 6 characters long
  if ((req.body.password.length < 6)) { //if password length is less than 6 characters
    passerrors.push('Password Too Short') //push to password error array
    errors.push('Password Too Short') //push error to array
  }
  //check if password entered equals to the repeat password entered - make sure password is case sensitive
  if (req.body.password !== req.body.confirmpsw) { // if password equals confirm password
    confirmerrors.push('Passwords NOT a Match') //push to confirm password array
    errors.push('Password NOT a Match') //push error to array
  }


  //email validation https://www.w3resource.com/javascript/form/email-validation.php
  var regemail = req.body.email.toLowerCase(); // to make email case insensitive
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(regemail)) { //Criteria: only letters, numbers and _ in user address. and host machine, while domain name is limited to either 2 or 3 letters
  }
  else { //Invalid input
    emailerrors.push('Invalid Email') //push to email errors array
    errors.push('Invalid Email') //push to errors array
  }

  if (nameerrors.length == 0) { //if no name errors
    console.log('no name errors!'); // to make sure if statement working
  }
  if (nameerrors.length > 0) { //if have name errors
    console.log('error:' + nameerrors) //console log name errors
    req.query.nameerrors = nameerrors.join(';'); //joining name errors together
  }

  if (usererrors.length == 0) { //if no username errors
    console.log('no user errors!'); //to make sure if statement working
  }
  if (usererrors.length > 0) { //if have username errors
    console.log('error:' + usererrors) //console log username errors
    req.query.usererrors = usererrors.join(';'); //joining username errors together
  }

  if (passerrors.length == 0) { //if have password errors
    console.log('no password errors!'); //to make sure if statement working
  }
  if (passerrors.length > 0) { //if have password errors
    console.log('error:' + passerrors) //console log password errors
    req.query.passerrors = passerrors.join(';'); //joining password errors together
  }

  if (confirmerrors.length == 0) { //if have no errors with password confirmation
    console.log('no confirm errors!'); //to make sure if statement working
  }
  if (confirmerrors.length > 0) { //if have password confirmation errors
    console.log('error:' + confirmerrors); // console log password errors
    req.query.confirmerrors = confirmerrors.join(';'); //joining password confirmation errors together
  }

  if (emailerrors.length == 0) { //if there are no errors
    console.log('no email errors!'); // to confirm no email errors
  }
  if (emailerrors.length > 0) { //if there is more than 1 error
    console.log('error:' + emailerrors); //console log email errors
    req.query.emailerrors = emailerrors.join(';'); //joining email errors together
  }

  if (errors.length == 0) { //if there are no errors
    success.push('Successful registration');
    console.log(success);
    req.query.username = reguser; //put username in querystring
    req.query.name = req.body.name; //put name into querystring
    req.query.email = req.body.email; //put email into querystring
    req.query.service_name = req.session.service_name; //put artist name for form into querystring
    req.query.success = success.join(';'); //put success into querystring
    res.cookie('user', req.query.username);

    // store information into a JSON file
    users_reg_data[reguser] = {
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    };

    fs.writeFileSync(filename1, JSON.stringify(users_reg_data));


    //redirect to the services page
    res.redirect('./login.html?' + querystring.stringify(req.query));
  }
  //add errors to querystring (for purpose of putting back into textbox)
  else { //if there is one or more errors
    console.log(errors) //to double check if statement working
    req.query.name = req.body.name; //put name in querystring
    req.query.username = req.body.username; //put username in querystring
    req.query.password = req.body.password; //put password into querystring
    req.query.confirmpsw = req.body.confirmpsw; //put confirm password into querystring
    req.query.email = req.body.email; //put email back into querystring

    req.query.errors = errors.join(';'); //join all errors together into querystring
    res.redirect('./register.html?' + querystring.stringify(req.query)) //trying to add query from registration page and invoice back to register page on reload
  }
}
);

app.use(express.static('./public')); // create a static server using express from the public folder

// Having the server listen on port 8080
// From Assignment1_Design_Examples > Asssignment1_2file > store_server.js
var listener = app.listen(8080, () => { console.log('server started listening on port ' + listener.address().port) });