const mongoose = require('mongoose'); // requireing mongoose for project

mongoose.connect('mongodb://127.0.0.1:27017'); // conneting to mongoose 

const db = mongoose.connection; // making a connection to mongoose
// if error in connecting to db
db.on('error', console.error.bind(console.log("error connecting to db")));
// if no error in connecting to db
db.once('open',function(){
    console.log("successfully connected to db");
})