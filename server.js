require('./db');
var express = require('express');
var path = require('path')
var app = express();
const fs = require('fs')
var handlebars = require('handlebars')
const template = handlebars.compile("{{aString.trim}}");

const exphbs = require('express-handlebars');
const port = process.env.PORT||1313
// const mongoose = require('mongoose').model('employee')
const bodyParser = require('body-parser')
const employeeController = require('./employeeController')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
   app.listen(port,()=>{
   console.log('server start')
    app.set('views', path.join(__dirname,'/views'));
    app.engine('html', exphbs({extname:'html',defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
     app.set('view engine','html')
  //app.use('/employeeController',employeeController);
//var employee = require(__dirname+'/employeeController')
//app.use('/employeeController',employeeController);
   });
    app.get('/',(req,res)=>{
              res.redirect("/")
});

app.use('/employee',employeeController);
