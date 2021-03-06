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
			index : {name:"首頁", link:"index.html", isSelected:false, isShown:true},
			farmerTalk : {name:"農民都說讚", link:"farmerTalk.html", isSelected:false, isShown:false},
			friendShop : {name:"合作商家", link:"friendShop.html", isSelected:false, isShown:false},
			masterVegeFood : {name:"蔬果大廚在這", link:"masterVegeFood.html", isSelected:false, isShown:false},
			shipments : {name:"蔬果出貨區", link:"shipments.html", isSelected:false, isShown:true},
			activity : {name:"一起探訪去", link:"activity.html", isSelected:false, isShown:true},
			shopping : {name:"購物去吧！", link:"shopping.html", isSelected:false, isShown:true}
		};

		$rootScope.StyleTargetMenu = function(objMenu){
			objMenu.isSelected = false;
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