var express=require('express');
var path=require('path');
var app=express();
var multer=require('multer');
var upload=multer();
var client=require("./router/router_client");
var admin=require("./router/router_admin");
var bodyParser=require('body-parser');
var cookie=require('cookie-parser');
const session = require('express-session');
expressLayouts=require('express-ejs-layouts');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookie());
app.use(session(
    {  
    secret: 'Key',
    resave: false,
    saveUninitialized: true

    }
));
var mysql=require('mysql2');
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname+'/views'));
app.use("/public", express.static(__dirname + '/public'));
app.use("/",client);
app.use("/admin",admin);
app.listen(5000);