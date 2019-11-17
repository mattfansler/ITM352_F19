var products = 
[
  {  
    "service": "How Many Miles?",  
    "price": 2,
    "image": "./images/road.jpeg",
    "description": "How far are you going?"  
  },
  {  
  "service": "Traditional",  
  "price": 10,
  "image": "./images/taxicar.jpg",
  "description": "A driver will pick you up"
  },
  {  
    "service": "Transport 5 Passenger Vehicle",  
    "price": 20,
    "image": "./images/taxicar.jpg",
    "description": "Don't leave your car at the bar!"  
  },
  {  
  "service": "Transport Moped/Motorcycle",  
  "price": 10,
  "image": "./images/moped.jpg",
  "description": "Don't mope! We can get your moped home for you!" 
  },
  {  
    "service": "Minivan",  
    "price": 25,
    "image": "./images/taxicar.jpg",
    "description": "Don't forget about the van!"  
  }

];

if(typeof module != 'undefined') {
  module.exports.products = products;
}