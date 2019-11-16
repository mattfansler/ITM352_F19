/*
    Purpose: function to determin if a string is a non-negative integer
    Date: 10/18/2019
    Author J Jerome

    Revision history:
    Usage Notes:
*/

function isNonNegInt(q, errors = false)
{
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    if (sendArrayBack)
    {
            return(errors);
    } else
    {
            return(errors.length == 0);
    }
    
}    

console.log(isNonNegInt("5",true));