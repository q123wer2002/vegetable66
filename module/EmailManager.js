'use strict'

//lib
var EmailModule = require('nodemailer');
//end lib

//setting
var mailTransporter = EmailModule.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: 'healthyvegetable1612@gmail.com',
        pass: 'vegetable1277'
    },
});

//end setting
var mailModule = {};
mailModule.fnSendMail = function(options,fnCallback){
	//mail default
	var objOptions = {
		from : "蔬果溜溜<healthyvegetable1612@gmail.com>", //sender
		to : "", //receiver
		cc : "", //cc
		bcc : "", //secert cc
		subject : "",
		text : "", //plaintext body
		html : "此信件由系統發出<hr><br>",
		attachments : [],
		/*
		{filename : "",content:""}
		{filename : "",path:""}
		*/
	};

	objOptions.to = options.receiver;
	objOptions.subject = options.topic;
	objOptions.html += options.content;

	mailTransporter.sendMail(objOptions,function(err,info){
		 if(err){
		 	return fnCallback(true,err);
		 }

		 fnCallback(false,info);
	});
}



//http://ithelp.ithome.com.tw/articles/10160766
module.exports = mailModule;