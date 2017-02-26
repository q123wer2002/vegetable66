'use strict'

//lib
var express = require('express');
var app = express();
var fs = require('fs');
var EmailManager = require('./../module/EmailManager');
//end lib

//local var
var m_fnGetUniStr = function(szTpoic){
	return szTpoic + "_" + new Date().valueOf() + Math.round((Math.random()*1000));
}
var m_fnCreateMailContent = function(szCode,objOrder){
	var option = {
		receiver : objOrder.objAddress.name.value + "<" + objOrder.objAddress.email.value + ">",
		topic : "蔬果溜溜訂單",
		content : "",
	};
	//for title
	option.content = option.content + "親愛的" + objOrder.objAddress.name.value + "您好，感謝您訂購蔬果溜溜<br>";
	option.content = option.content + "總金額為： <span style=\"color:red\">$" + objOrder.nTotalPrice + "</span><br>";
	option.content = option.content + "<br><hr><br> 匯款資料：中華郵政 <br>郵局代號：700 <br> 帳號：0301151-0466691 <br> 戶名：曾國舜 <br><hr><br>";
	option.content = option.content + "您的訂單編號為：" + szCode + "<br>您訂購資訊如下：";

	//for css
	var szTableCss = "<style>";
	szTableCss = szTableCss + "table{width: 100%;text-align: center;margin: 15px auto;border-collapse: collapse;}";
	szTableCss = szTableCss + "table,tr,td{border: 1px solid rgba(0,0,0,0.1);padding:5px 7px;}";
	szTableCss = szTableCss + "</style>";
	option.content += szTableCss;

	//for product table
	var szHtmlCode = "<table border-collapse:\"collapse\" border=\"1\"><tr><td>商品名稱</td><td>商品單價</td><td>商品數量</td></tr>";
	var szProductHtmlCode = "";
	for( var i=0; i<objOrder.aryProduct.length; i++ ){
		szProductHtmlCode = szProductHtmlCode + "<tr><td>" + objOrder.aryProduct[i].name + "</td><td>" + objOrder.aryProduct[i].price + "</td><td>" + objOrder.aryProduct[i].count + "</td></tr>";
	}
	szHtmlCode = szHtmlCode + szProductHtmlCode + "</table><br><br>";
	option.content += szHtmlCode;

	//for user info
	var userinfoHtml = "<table>";
	for( var key in objOrder.objAddress ){
		userinfoHtml = userinfoHtml + "<tr>";
		userinfoHtml = userinfoHtml + "<td>" + objOrder.objAddress[key].title + "</td>";
		userinfoHtml = userinfoHtml + "<td style=\"font-weight:800;\">" + objOrder.objAddress[key].value + "</td>";
		userinfoHtml = userinfoHtml + "</tr>";
	}
	userinfoHtml = userinfoHtml + "</table>";
	option.content += userinfoHtml;

	//add vegetable url
	option.content += "<br><br><a href='http://vegefruit66.tk' target='_new' >蔬果溜溜官網查看更多蔬果資訊</a>"

	//return
	return option;
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

				var option = m_fnCreateMailContent(szUniCode,order);
				EmailManager.fnSendMail(option, function(err,info){
					if(err){
						console.log(info);
					}
				});

				res.send(szUniCode);
				res.end();
			}); // write it back 
		});
		
	});
app.route('/test_send_mail')
	.get(function(req,res,next){
		var objOptions = {
			receiver : "q123wer2002@gmail.com",
			topic : "TEST",
			content : "HELLO, TEST",
		};
		EmailManager.fnSendMail(objOptions,function(err,info){
			if(err){
				info.result = "Fail";
				res.send(info);
			}
			info.result = "Success";
			res.send(info);
		});
	});

module.exports = app;