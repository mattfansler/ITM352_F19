var products =
  [
    {
      "model": "Panda Conservation",
      "price": 50.00,
      "image": "./images/panda.jpg",
    },
    {
      "model": "Orangutan Conservation",
      "price": 25.00,
      "image": "./images/orangutan.jpg",
    },
    {
      "model": "Sea Lion Conservation",
      "price": 20.00,
      "image": "./images/sea_lion.jpg",
    },
    {
      "model": "Snow Leopard Conservation",
      "price": 30.00,
      "image": "./images/snow_leopard.jpg",
    },
    {
      "model": "Elephant Conservation",
      "price": 15.00,
      "image": "./images/elephant.jpg",
    }
  ];

if (typeof module != 'undefined') {
  module.exports.products = products;
}

