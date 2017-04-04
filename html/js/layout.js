var vegefruit66 = angular.module('vegefruit66', []);

//controller
vegefruit66.controller('mainController', function($scope, $rootScope,$http){
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

		//script
		var objPreLoadScript = {
			jquery : {src:"./js/lib/jquery.js"},
		};
		$rootScope.fnPreLoadScript = function(){
			for( var script in objPreLoadScript ){
				var js = document.createElement("script");
				js.type = "text/javascript";
				js.src = objPreLoadScript[script].src;
				document.body.appendChild(js);
			}
		}

	//menu list
		$rootScope.objMenuList = {
			vegeinfo : {name:"蔬果小學堂", link:"vegeinfo.html", isSelected:false, isShown:false},
			farmerTalk : {name:"農民都說讚", link:"farmerTalk.html", isSelected:false, isShown:false},
			friendShop : {name:"合作商家", link:"friendShop.html", isSelected:false, isShown:false},
			masterVegeFood : {name:"蔬果大廚在這", link:"masterVegeFood.html", isSelected:false, isShown:false},
			activity : {name:"活動專欄", link:"activity.html", isSelected:false, isShown:true}
		};

		$rootScope.StyleTargetMenu = function(objMenu){
			if( $rootScope.currentLink == objMenu.link ){
				objMenu.isSelected = true;
			}
		}
});

//directive
vegefruit66.directive("scroll", function($window){
	return function(scope, element, attrs) {
		angular.element($window).bind("scroll", function() {
			if (this.pageYOffset >= 140) {
				scope.isChangeClass = true;
			}else{
				scope.isChangeClass = false;
			}
			scope.$apply();
		});
	};
});