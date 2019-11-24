// The following data is the type, price, image link, and desciption for all of my items. 
product_data = [
    {
        "type": "Uke Flamed Acaia",
        "price": 129.00,
        "image": "./images/ukeacc.jpg",
        "description": "This ukulele is made from acacia wood and is known for its warm sounding playability, beautiful wood grain pattern, and mahogany neck and fretboard."
    },
    {
        "type": "Uke Artist Vintage Distressed",
        "price": 119.00,
        "image": "./images/ukeartvc.jpg",
        "description": "This ukulele has a warm tone and sound and is built with a spruce wood top and mahogany back and sides."
    },
    {
        "type": "Uke Bamboo",
        "price": 129.00,
        "image": "./images/ukebambooc.jpg",
        "description": "This ukulele is built with a mahogany neck, walnut bridge and fretboard, and beautiful pearl moon phase inlays. "
    },
    {
        "type": "Uke Crescent Olive Ash",
        "price": 199.00,
        "image": "./images/ukeexoa.jpg",
        "description": "This is ukulele features a olive ash body, mahogany neck, and a black walnut fingerboard."
    },
    {
        "type": "Uke Crescent Spalt Maple Concert",
        "price": 199.00,
        "image": "./images/ukeexsm.jpg",
        "description": "This ukulele features a spalt maple wood body, tortoise shell binding, mahogany wood neck, and pearloid inlays."
    }
];

//If the module is not undefined, have the module export the data from the product_data array
//From Assignment1_Design_Examples > Asssignment1_2file > product_data.js 
if (typeof module !='undefined') { //if the type of the module is defined
    module.exports=product_data; //export the product_data
}