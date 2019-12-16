var fs = require('fs');

var myParser = require('body-parser');

var filename = "user_data.json";
var express = require('express');
var app = express();

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




app.use(myParser.urlencoded({ extended: true }));

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

app.post("/login", function (request, response) {
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




app.listen(8080, () => console.log(`listening on port 8080`));
