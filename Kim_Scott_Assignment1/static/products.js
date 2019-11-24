var products =
    [
        {
            "brand": "MSI GTX 1660",
            "price": "250",
            "image": "./static/images/1660ti.jpg"
        },
        {
            "brand": "MSI RTX 2060",
            "price": "400",
            "image": "./static/images/2060.jpg"
        },
        {
            "brand": "MSI RTX 2070",
            "price": "440",
            "image": "./static/images/2070.jpg"
        },
        {
            "brand": "MSI RTX 2080",
            "price": "730",
            "image": "./static/images/2080.jpg"
        },
        {
            "brand": "MSI RTX 2080 Ti",
            "price": "1250",
            "image": "./static/images/2080ti.jpg"
        },
    ];
if (typeof module != 'undefined') {
    module.exports.products = products;
}