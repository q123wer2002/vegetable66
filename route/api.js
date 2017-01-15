'use strict'

//lib
var express = require('express');
var app = express();
var fs = require('fs');
//end lib

app.route('/order')
	.get(function(req,res,next){
		res.json("hello, this is get order");
	})
	.post(function(req,res,next){
		
		var order = req.body;
		fs.appendFile('orders.json', JSON.stringify(order,null,'\t'), function (err) {
			if (err) return console.log(err);
			res.send("Done");
		});
		
	});



module.exports = app;