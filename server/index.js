if(process.env.NODE_ENV !== 'production'){
 require('dotenv').config()
}

const express= require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const pug = require("pug");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser")
const connectDB = require("./config/auth");
const passport = require("passport");

const { check, validationResult } = require('express-validator');
// GET the Router module
const router = require("./controllers/auth")

const cors = require("cors")
app.use(cors())

// Connect to the database
connectDB();

// Middleware for the static Files
app.use(express.static(path.join(__dirname,"public")))

// Middleware for the body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


// Middleware for rendering the Template Engines/PUG
app.set("view engine","pug");
app.set("views",path.join(__dirname,"./views"));


// Middleware for the Express Session--------------

// @Session created by EXPRESS SESSION;
app.set('trust proxy', 1)

app.use(session({
 secret:process.env.SESSION_SECRET,
 resave:true,
 saveUninitialized:true
}))

// cookie parser middleware
app.use(cookieParser())

// Setting up PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// @connect flash for flash Messages
app.use(require('connect-flash')());

app.use(function (req, res, next) {
   res.locals.messages = require('express-messages')(req, res)
  next();
});


// Giving all the pages the same user
app.get('*', function(req, res, next){
 res.locals.user = req.user || null;
 next();
});


// Setting the router module
app.use("/",router());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});






app.listen(5000 ,()=>{
  console.log(`App is running at port : 5000`)
})