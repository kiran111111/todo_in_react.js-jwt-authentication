const express = require("express");
const router = express.Router();
const passport = require("passport")
const mongo = require("mongo");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// Schema model setup for database
const userSchema = require("../models/users")
// Set the todo model for database
const Todo = require("../models/todo");
// Modules for express validaiton
const {userValidationRules,validate} = require("./validator")
// Module for the database model
const User = mongoose.model("Users",userSchema);



module.exports = () =>{

  //Routing for todo app
  router.get("/todolist",verifyToken,async (req,res,next)=>{

    User.findById(req.userId, { password: 0 },async function (err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      // --------------------------
      try{
        await Todo.find({},(err,docs)=>{
         if(err){
          throw err;
         }
         else{
          res.json(docs)
         }
        })
       }
       catch(err){
        if(err){
         next({ status: 400, message: "failed to delete todo" })
        }
       }
      //  -------------------------
    })

  })


  // Route for posting a new todo:
router.post("/todolist",(req,res)=>{
  let todo = new Todo({
   name:req.body.name
  });
  todo.save(function(err){
    if(err){
     throw err;
    }
    else{
     res.redirect("/")
    }
   })
 })
 


 // Route for deleting a Todo:
router.delete("/delete/:id",async (req,res,next)=>{
  let query = { _id: req.params.id };
   try{
    await Todo.deleteOne(query,(err,todo)=>{
      if(err){
       throw err;
      }
      else{
       res.redirect("/")
      }
    })
   }
   catch(err){
    if(err){
     next({ status: 400, message: "failed to delete todo" })
    }
   }
 })


 // Route for editing a Todo:
router.post("/edit/:id",verifyToken,async (req,res,next)=>{

  User.findById(req.userId, { password: 0 },async function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

      // -------------------------
      let query = { _id: req.params.id };
      let todo = {};
      todo.name = req.body.name;
      console.log(req.body.name)
      try{
        await Todo.findByIdAndUpdate(query,todo,(err,todo)=>{
          if(err){
          throw err;
          }
          else{
          res.redirect("/")
          }
        })
      }
      catch(err){
        if(err){
        next({ status: 400, message: "failed to edit todo" })
        }
      }
      //  ------------------------------
  })
 })


 // Error handler
router.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  })
 })
 
 


// ************* AUTHENTICATION********************-------------------------------------------------------------

//POST Route to the FORM PAGE-----------------------------------------------
router.post("/register", userValidationRules(),validate,async (req,res)=>{
 await User.findOne({username:req.body.username},async (err,docs)=>{
  if(err){
   console.log(err)
   res.status(401).send({
    error: 'Error occured !'
   });
  }
   else if(docs){
    res.status(401).send({
      error: 'User already exists !'
     });
    res.redirect("/register");
   }else{
    try{
     const hashedPassword = await bcrypt.hash(req.body.password,10);
      let user = new User({
       name:req.body.name,
       username:req.body.username,
       password:hashedPassword
      }) 

       await user.save((err,user)=>{
        if (err) return res.status(500).send("There was a problem registering the user`.");
        // if user is registered without errors
        // create a token
        console.log(user);
        var token = jwt.sign({ id: user._id }, "kitten", {
          expiresIn: 10 // expires in 24 hours
        });
        res.send({token:token})
        
       });

      //  req.flash("success","User has been created");
       console.log("user has been created")
      //  res.redirect("/login")
      }catch(err){
       res.redirect("/register");
     }
    }
  }) 
 })


// GET the LOGIN page----------------------------------------------------------------------
 router.get("/login",(req,res)=>{
  res.render("login",{title:'Login'});
 })


// new ...LOGIN route
router.post("/login",(req,res)=>{
     
  const query = { username : req.body.username};
  let password = req.body.password;

    User.findOne(query, async function(err, user) {
        if (err) { 
          console.log("err in finding user");
          return res.status(401).send({
            error: 'Error in finding User !.'
           });
         }
        if (!user) {
          console.log('Username not Found, Please Register !')
           return res.status(401).send({
            error: 'Usernname not found !'
           });
         }
        else{
          try{
            if( await bcrypt.compare(password,user.password)){
                  // if password also correct then -----
                  var token = jwt.sign({ id: user._id }, "kitten", {
                    expiresIn: 3600 // expires in 24 hours
                   });
                  res.send({token:token,user : user})
                  // else
                }else{
                   res.status(401).send({
                    error: 'Incorrect Password !'
                   });
                }
            }catch(err){
              console.log(err)
              res.status(401).send({
                error: 'Error occured!!!'
               });
           }
        }
      }
    )
  });



// PASSPORT STRATEGY--------------------USERNAME ----------------------PASSWORD-----------
// Post route to the login page for authenticating user

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log("kiran")
  var token = req.headers['authorization'];
  if (!token) 
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, "kitten", function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    
    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    console.log(decoded.id)
    next();
  });
}




router.get("/shop",verifyToken,(req,res)=>{
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  })
})



// Logout Rpute to the logged in user
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/login');
});


 return router;
}

