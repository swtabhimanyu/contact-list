//require th library
const mongoose=require('mongoose');

//connect to databse
mongoose.connect('mongodb://localhost/contact-list');   

//aquire to the connection (to check if it suessful)
const db=mongoose.connection;

//if db does not connect
db.on('error',console.error.bind('connection error'));

//db connected and running
db.once('open',function(){
    console.log('sucesfully connected to DB');
});