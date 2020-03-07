const mongoose = require('mongoose');
// setting up a schema for the data base
const todoSchema = new mongoose.Schema({
    plan:{
        type:String,
        required:true
    },
    duedate:{
        type:String,
        required:true
    },
    work:{
        type:String,
        required:true
    }
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;