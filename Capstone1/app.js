const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require('admin-bro-expressjs')
const User=require("./models/User"); 

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require('admin-bro-mongoose'))
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  })
)
// Passport Config
require('./config/passport')(passport);

// Connect to Mongo
mongoose.connect("mongodb://localhost:27017/nutrifiredb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database...'))
  .catch(err => console.log('Database error:', err))

// EJS
app.use(expressLayouts)

app.set('view engine', 'ejs')
// app.set("views",path.join(__dirname,"views"))

//Body parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))


// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.page = req.flash("page")
  next();
});

// Public
app.use("/css", express.static(path.resolve(__dirname, 'public/css')))
app.use("/js", express.static(path.resolve(__dirname, 'public/js')))

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/meals", require("./routes/meals"));


const adminBro = new AdminBro({
  resources: [User],
  rootPath: '/admin',
})
// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

app.listen(PORT, console.log("Server on port 5000"));
