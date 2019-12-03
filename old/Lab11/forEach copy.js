function isNonNegInt(q, sendArrayBack = false)
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

function checkValues (q)
{
    result - isNonNegInt(q);
    console.log(`${q}: ${result}`)
}
attributes = "Jerome;27;27.5;-26.5";
separator = ";";
pieces = attributes.split(separator);

pieces.forEach(isNonNegInt);

function checkType (q)
{
    console.log(typeof item == 'string' && item.length > 0);
    return q > 0
}