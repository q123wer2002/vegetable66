//
vegefruit66.controller('vegeinfoController', function($scope,$rootScope){
	//for menu link
	$rootScope.currentLink = "vegeinfo.html";

	//for vege
	$scope.aryVegeSelect = [
		{name:"高麗菜", photo:"cabbage.jpg", isSelected:false, Style:{}},
		{name:"玉米", photo:"corn.jpg", isSelected:false, Style:{}},
		{name:"牛番茄", photo:"tomato.jpg", isSelected:false, Style:{}},
		{name:"小黃瓜", photo:"gherkin.jpg", isSelected:false, Style:{}},
		{name:"絲瓜(菜瓜)", photo:"loofah.jpg", isSelected:false, Style:{}},
		{name:"球莖甘藍", photo:"kohlrabi.jpg", isSelected:false, Style:{}},
		{name:"包心白菜", photo:"package_cabbage.jpg", isSelected:false, Style:{}},
	];

	$scope.fnInitVegeSelect = function(){
		var nWidth = $('.vegeSelection').width()/5;
		for( var i=0; i<$scope.aryVegeSelect.length; i++ ){
			//width, height
			var Style = {"background":"url('./images/vegeinfo/" + $scope.aryVegeSelect[i].photo + "')", "height":nWidth + "px","background-position":"center","background-size":"100% auto","background-repeat":"no-repeat"};

			$scope.aryVegeSelect[i].Style = Style;
		}
	}
});