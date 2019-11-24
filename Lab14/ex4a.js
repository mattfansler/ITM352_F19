var fs = require('fs');
var myParser = require('body-parser');

var filename = 'user_data.json'
var raw_data = fs.readFileSync(filename, 'utf-8');
var users_reg_data = JSON.parse(raw_data);

username = 'newuser';
if (users_reg_data['username'] == undefined) {
    users_reg_data[username] = {};  //create empty object
    users_reg_data[username].name = username; //
    users_reg_data[username].password = 'newpass'; //give value
    users_yreg_data[username].email = 'newuser@user.com'; //give value
}

var output_data = JSON.stringify(users_reg_data);
fs.writeFileSync(filename, output_data, "utf-8");

console.log(output_data);