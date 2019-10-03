var age = 27;
var counter = 0;
// repeat until counter = age
while(counter < age) {
    counter++;
    if(counter > age/2) {
        console.log("Don't ask how old I am!");
        process.exit(0);
    }
    console.log('counter: ' + counter);
}