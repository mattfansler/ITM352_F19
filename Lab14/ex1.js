
readFileSync(filename, 'utf-8');

var fs = require('fs');

var myParser = require('body-parser');
var filename = 'user_data.json'
var raw_data = fs.readFileSync(filename, 'utf-8')

var data = json.parse(raw_data);
console.log(data.dport);
