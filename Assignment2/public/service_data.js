var services = 
[
  {  
    "service": "How Many Miles?",  
    "price": 2,
    "image": "road.jpeg",
    "description": "How far are you going?"  
  },
  {  
  "service": "Traditional",  
  "price": 10,
  "image": "taxicab.png",
  "description": "A driver will pick you up"
  },
  {  
    "service": "Transport 5 Passenger Vehicle",  
    "price": 20,
    "image": "/car.png",
    "description": "Don't leave your car at the bar!"  
  },
  {  
  "service": "Transport Moped/Motorcycle",  
  "price": 10,
  "image": "/motorcycle.png",
  "description": "Don't mope! We can get your moped home for you!" 
  },
  {  
    "service": "Transport Van",  
    "price": 25,
    "image": "/van.png",
    "description": "Don't forget about the van!"  
  }

];

if(typeof module != 'undefined') {
  module.exports.services = services;
}