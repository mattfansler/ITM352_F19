attributes = "Jerome;27;27.5;-26.5";
separator = ";";
pieces = attributes.split(separator);

for (i=0; i<pieces.length; i++)
{
    console.log(`${typeof(pieces[i])} ${pieces[i]} ${isNonNegInt(pieces[i])}`);
}

return(errors.length == 0)