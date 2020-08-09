// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser")
// const path = require('path')



// // Set the todo model for database
// const Todo = require("../model/todo");


// // Route to the main  page:
// router.get("/",async (req,res,next)=>{
//   try{
//    await Todo.find({},(err,docs)=>{
//     if(err){
//      throw err;
//     }
//     else{
//      res.json(docs)
//     }
//    })
//   }
//   catch(err){
//    if(err){
//     next({ status: 400, message: "failed to delete todo" })
//    }
//   }
// })


// // Route for posting a new todo:
// router.post("/",(req,res)=>{
//  let todo = new Todo({
//   name:req.body.name
//  });
//  todo.save(function(err){
//    if(err){
//     throw err;
//    }
//    else{
//     res.redirect("/")
//    }
//   })
// })


// // Route for deleting a Todo:
// router.get("/delete/:id",async (req,res,next)=>{
//  let query = { _id: req.params.id };
//   try{
//    await Todo.deleteOne(query,(err,todo)=>{
//      if(err){
//       throw err;
//      }
//      else{
//       res.redirect("/")
//      }
//    })
//   }
//   catch(err){
//    if(err){
//     next({ status: 400, message: "failed to delete todo" })
//    }
//   }
// })


// // Route for editing a Todo:
// router.post("/edit/:id",async (req,res,next)=>{
//  let query = { _id: req.params.id };
//  let todo = {};
//  todo.name = req.body.name;
//  console.log(req.body.name)
//   try{
//    await Todo.findByIdAndUpdate(query,todo,(err,todo)=>{
//      if(err){
//       throw err;
//      }
//      else{
//       res.redirect("/")
//      }
//    })
//   }
//   catch(err){
//    if(err){
//     next({ status: 400, message: "failed to delete todo" })
//    }
//   }
// })


// // Error handler
// router.use((err, req, res, next) => {
//  return res.status(err.status || 400).json({
//    status: err.status || 400,
//    message: err.message || "there was an error processing request",
//  })
// })


// // If no API routes are hit, send the React app
// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '../../todo_frontend/build/index.html'));
// });


// module.exports = router;