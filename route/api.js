'use strict'

//lib
var express = require('express');
var app = express();
var fs = require('fs');
//end lib

//local var
var m_fnGetUniStr = function(szTpoic){
	return szTpoic + "_" + new Date().valueOf() + Math.round((Math.random()*1000));
}
//end local

app.route('/order')
	.get(function(req,res,next){
		res.json("hello, this is get order");
	})
	.post(function(req,res,next){
		
		var order = req.body;
		var szUniCode = m_fnGetUniStr('order');

		fs.readFile('orders.json', 'utf8', function(err, data){
			if (err){return console.log(err);}

			var orders = ( data.length != 0 ) ? JSON.parse(data) : {}; //now it an object
			orders[szUniCode] = order;

			//write file
			fs.writeFile('orders.json', JSON.stringify(orders, null, '\t'), 'utf8', function (err) {
				if (err) return console.log(err);
				res.send(szUniCode);
			}); // write it back 
		});
		
	});

module.exports = app;