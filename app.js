'use strict'

//lib
var express = require('express');
var app = express();
var path = require('path');
//end lib

//setting
app.use(express.static('html'));
//end setting

//local var function
var szHtmlPath = __dirname + "/html";
//end local

//router path
app.get('/', function(req,res){
	res.sendFile( path.join(szHtmlPath+'/index.html') );
});


//listening port
app.listen(5566,function(){
	console.log("Web is listening in port 5566");
});