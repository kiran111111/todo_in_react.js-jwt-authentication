// Connecting to Database

const mongo = require("mongo");
const mongoose = require("mongoose");


// const db = process.env.MONGODB;
const db =  "mongodb+srv://kiran:kiran@cluster0-zrsby.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true";

// Connecting to the database-----
const ConnectDB = async ()=>{
  try{
     await mongoose.connect(db,{
       useNewUrlParser:true,
       useUnifiedTopology:true
     })
     console.log(' Connected to Mongo Database ')
  }catch(err){
   console.log("Error occured in connecting to the database");
   process.exit(1);
  }
}

module.exports = ConnectDB;