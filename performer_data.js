//Creating the array of the products

performer_data = [
//Group 1: Team Dethrone
    {
        "name": "Team Dethrone", 
        "price": 100.00, //per hour
        "image": "./images/TeamDethrone.jpg",  
        "description": "All-Star Hip-Hop Group, works best for large events",
        "bio": "placeholder for later",
        "eventSize": "Large Event",
        "keyword": "Large",
        "artist_id": "0"


    },
//Group 2: Dynamic Duo
    {
        "name": "Dynamic Duo", 
        "price": 25.00, //per hour
        "image": "./images/TripleThreat.jpg", 
        "description": "MCs JayRome and Malaman, Hip-Hop duo that works great for small events",
        "bio": "placeholder for later",
        "eventSize": "Small Event",
        "keyword": "Small",
        "artist_id": "1" 
    },
//Group 3: Isle of Poets
    {
        "name": "Isle of Poets", 
        "price": 40.00, //per hour
        "image": "./images/islandBand.jpg", 
        "description": "Three soulful braddahs bringing you smooth R&B classics",
        "bio": "placeholder for later",
        "eventSize": "Medium Event",
        "keyword": "Medium",
        "artist_id": "2"
    },
//Group 4: Lonely Cowboys
    {
        "name": "Lonely Cowboy", 
        "price": 20.00, //per hour
        "image": "./images/cowboy.jpg", 
        "description": "Hear that Nashville sound without leaving the islands!",
        "bio": "placeholder for later",
        "eventSize": "Small Event",
        "keyword": "small",
        "artist_id": "3" 
    },
//Group 5 Custodians
    {
        "groupName": "Custodians", 
        "price": 25.00, //per hour
        "image": "./images/janitor.jpg", 
        "description": "Make sure you have a crew to support in clean up",
        "bio": "placeholder for later",
        "eventSize": "Large Event",
        "keyword": "large",
        "artist_id": "4" 
    }
];


//From Assignment1_Design_Examples > Asssignment1_2file > product_data.js 
if (typeof module !='undefined') { //if the type of the module is defined
    module.exports=performer_data; //export the performer_data
}