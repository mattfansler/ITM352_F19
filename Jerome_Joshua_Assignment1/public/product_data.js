products = 
[
  {  
  "service":"Pickup",  
  "price": 10,
  "image": "src=./images/taxicar.png"
  },
  {  
  "service":"pickup and delivery",  
  "price": 15  
  },
  {  
    "service":"delivery",  
    "price": 15  
    },
  {  
     "service":"random",  
    "price": 5  
    },
    {  
        "service":"random",  
        "price": 7  
        }
];

if(typeof module != 'undefined') {
  module.exports.products = products;
}