const express = require ('express')
const mysql = require ('mysql')
const path = require('path')
const flash  = require('connect-flash')
const passport = require('passport')
const bodyParser = require("body-parser");
const session = require('express-session');

require('./routes/passport')(passport);


const app = express ()


app.use(bodyParser()  );
// app.use(session({ secret: '2181616A8D5AD45EE3A64BE1B325F', saveUninitialized: false, resave: true }));

app.use(session({ secret: '2181616A8D5AD45EE3A64BE1B325F',resave: true, saveUninitialized:false})); // session secret
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
// var server      = require('http').createServer(app);

var db = require('./config/config')
 
  
// connection on namespace /chat





db.connect((err, result) => {
  if (err) {
      throw new Error(err)
      return
  } else {
      console.log('Successfully connecting with the database')
  }
});


  
  app.use(express.static(path.join(__dirname, 'public')));

require('./routes/login')(app,passport,db)


app.listen(2002, function() {
  console.log(' server listening on port 2002');
});