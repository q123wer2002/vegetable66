vegefruit66.controller('shipmentsController', function($scope,$rootScope){
	$rootScope.currentLink = "shipments.html";

	$scope.aryDelivery = [
		{title:"20170611 出貨", aryFruit:[
			{name:"579水果箱", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t31.0-8/19024897_1914562615425811_1801325889670537570_o.jpg?oh=cabc2cc471866036f63bcc96188a1696&oe=59DC8C99"},
			{name:"懶人包", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/19105796_1914562618759144_4423244643258450923_n.jpg?oh=02c2653300802240892707d9fed6fc7c&oe=59D5F1F7"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1914572362091503", date:"2017/06/11"},
		{title:"20170528 出貨", aryFruit:[
			{name:"579水果箱", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/18739818_1908491336032939_6881417975122769888_n.jpg?oh=a6db23e5ffefeb03fe48bb8fba73c79f&oe=59A26DC7"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1908491336032939:0", date:"2017/05/28"},
		{title:"20170514 出貨", aryFruit:[
			{name:"579水果箱", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/18425490_1900220266860046_1493179772804064125_n.jpg?oh=f65a62b2cc8917075ed3f610cac6a270&oe=59DAA3E5"},
			{name:"懶人包", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/18447540_1900220323526707_8469591056225595252_n.jpg?oh=1708d4c690957293e1238ecba83313f5&oe=59DA5B23"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1900222403526499", date:"2017/05/14"},
		{title:"20170423 出貨", aryFruit:[
			{name:"活力水果箱 - 嚐鮮", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/17990827_1887890244759715_591964627682362562_n.jpg?oh=4f1a225badf18d9690c51b45262925b1&oe=599D3534"},
			{name:"懶人包", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/17991013_1887890284759711_7465653156043228453_n.jpg?oh=ebe3914b27c38a96870d529960f7859a&oe=59DAFED7"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1887890321426374", date:"2017/04/23"},
		{title:"20170408 出貨", aryFruit:[
			{name:"活力水果 - 家庭箱", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/17861656_1879861915562548_1435854946181388077_n.jpg?oh=b980a767bc62944bef65c8af76ca17b3&oe=59D4330C"},
			{name:"活力水果 - 嚐鮮", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/17800304_1879861925562547_7938229758538237268_n.jpg?oh=5948c2c5df73e7cfad4b0fe8fe72c039&oe=59AA5745"},			{name:"懶人包", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/17862790_1879861965562543_546780220242741000_n.jpg?oh=2b8ceb4bc1d592b7940e1654af58e7b8&oe=59DCCFA3"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1879862105562529", date:"2017/04/08"},
		{title:"20170326 出貨", aryFruit:[
			{name:"活力水果 - 嚐鮮", photo:"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/17757177_1875221509359922_5631892942406013019_n.jpg?oh=a47c9e55f2834630b8a7f83a81a35907&oe=59DA4081"},
		], fblink:"https://www.facebook.com/vegetable66/photos/a.1820718261476914.1073741829.1814040415478032/1875221509359922/?type=3&notif_t=like&notif_id=1491142309681904", date:"2017/03/26"},
		{title:"20170318 出貨", aryFruit:[
			{name:"活力水果 - 家庭箱", photo:"http://i.imgur.com/Iext493.jpg"},
			{name:"活力水果 - 嚐鮮", photo:"http://i.imgur.com/hav71X0.jpg"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1866957900186283", date:"2017/03/18"},
		{title:"20170311 出貨", aryFruit:[
			{name:"活力水果 - 家庭箱", photo:"http://i.imgur.com/i50nOYN.jpg"},
			{name:"活力水果 - 嚐鮮", photo:"http://i.imgur.com/0NYzo3T.jpg"},
		], fblink:"https://www.facebook.com/vegetable66/posts/1866955193519887", date:"2017/03/11"},
	];
});