var services = 
[
  {  
    "service": "How Many Miles?",  
    "price": 2,
    "image": "road.jpeg",
    "description": "How far are you going?",
    "description2": "Step 1"
  },
  {  
  "service": "Traditional",  
  "price": 10,
  "image": "taxicab.png",
  "description": "A driver will pick you up",
  "description2": "Step 2"
  },
  {  
    "service": "Transport 5 Passenger Vehicle",  
    "price": 20,
    "image": "/car.png",
    "description": "Don't leave your car at the bar!",
    "description2": "Step 3, need a tow?" 
  },
  {  
  "service": "Transport Moped/Motorcycle",  
  "price": 10,
  "image": "/motorcycle.png",
  "description": "Don't mope! We can get your moped home for you!",
  "description2": "Step 4, need a moped/motercyle pick up?" 
  },
  {  
    "service": "Transport Van",  
    "price": 25,
    "image": "/van.png",
    "description": "Don't forget about the van!",
    "description2": "Step 5, need a Van pickup?"  
  }

];

if(typeof module != 'undefined') {
  module.exports.services = services;
}
