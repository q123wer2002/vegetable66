'use strict'

//lib
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');
var api = require('./route/api');
//end lib

//setting
app.use(express.static('html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//end setting

//local var function
var szHtmlPath = __dirname + "/html";
//end local

//router path
app.use('/vegefruit_api',api);
app.get('/', function(req,res){
	res.sendFile( path.join(szHtmlPath+'/index.html') );
});



//listening port
app.listen(5566,function(){
	console.log("Web is listening in port 5566");
});