var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set_cookie', function(request, response) {   //use username for cookie
    response.cookie('myName', "J. Jerome", {maxAge: 10000}).send('cookie set'); //kill cookie after 10 seconds/10000 ms could also write maxAge: 10 * 10000
});

app.get('/use_cookie', function(request, response) {
    output = "No myName cookie found";
    if (typeof request.cookies.myName != 'undefined'){
        output = `Welcome to the Used Cookie Page ${request.cookies.myName}` ; 
    }  
    response.send(output); //could also be set up as an if else statement
});

app.get('/del_cookie', function(request, response) { //use for logging out
    response.clearCookie('myName');
    response.send('Cookie myName cleared');
});

app.use(express.static('.'));
app.listen(8080, () => console.log('listening on port 8080'));