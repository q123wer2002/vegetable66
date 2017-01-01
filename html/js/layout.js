var vegefruit66 = angular.module('vegefruit66', []);

//controller
vegefruit66.controller('mainController', function($scope, $rootScope){
	//header
	$rootScope.header = {
		title : "蔬果溜溜",
		metas : [
			{name : "charset",content : "UTF-8"},
			{name : "description",content : "vegefruit66, 蔬果溜溜"},
			{name : "keywords",content : "vegefruit66, 蔬果溜溜"},
			{name : "viewport",content : "width=device-width, initial-scale=1, maximum-scale=1"}
		],

	};

	$rootScope.includePages = {
		top : "./templates/top.html",
		body : "", //depends on page
		footer : "./templates/footer.html",
	};

	//menu list
	$rootScope.objMenuList = {
		vegeinfo : {name:"蔬果小學堂", link:""},
		farmerTalk : {name:"農民都說讚", link:""},
		friendShop : {name:"合作商家", link:""},
	};
});

//directive
vegefruit66.directive("scroll", function($window){
	return function(scope, element, attrs) {
		angular.element($window).bind("scroll", function() {
			if (this.pageYOffset >= 120) {
				scope.isChangeClass = true;
			}else{
				scope.isChangeClass = false;
			}
			scope.$apply();
		});
	};
});