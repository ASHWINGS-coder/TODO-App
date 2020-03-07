const express = require('express');// requireing express for the project
const path = require('path')
const port = 8001;
const app = express();
const db = require('./config/mongoose')  // accessing the db for project
const  Todo = require('./models/todo')
// setting up view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded())
app.use(express.static('assets'));

var planoftheday = [
    {
        plan:"Wear Smile",
        duedate:":)",
        work:"personal"
    }
]
// initial page that is visible to user 
app.get('/',function(req,res){
    return res.render('home',{
        title:"what do ppl call you as"
    });
});

app.get('/write',function(req,res){

    Todo.find({},function(err,plans){
        if(err){
            console.log("error in fetching todo from db");
            return;
        }
        return res.render('write',{
            title:"whats up with you today",
            poa:plans
        });
    });
   
});
//  after taking name as i/p from user redirecting the page to todo list 
app.post('/takenameasinput',function(req,res){

    // we need to find and pass all the todos to this res.render because this is the page being rendered and also add to the html
    return res.redirect('write') 
})

app.post('/todolist',function(req,res){
   
    Todo.create({
        plan:req.body.plan,
        duedate:req.body.duedate,
        work:req.body.work
    },function(err,newtodo){
        if(err){
            console.log("error in creating a contact");
            return  ;
        }
        console.log("*********",newtodo)

        // this redirect takes you back to write.ejs
        return res.redirect('write');
    })
    
});

app.get('/delete-todo/',function(req,res){
    //get id from query
     let id = req.query.id;

     // find the todo in the db using id and delete
     
     Todo.findByIdAndDelete(id,function(err){
         if(err){console.log("error in deleteing the todo from database");
         return;}
         return res.redirect('back')
     });
});

app.listen(port,function(err){
    if(err){
        console.log("Error in running server ",err)
    }
    console.log("yup server is running fyn in port :",port)
});