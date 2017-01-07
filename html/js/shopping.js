//
vegefruit66.controller('shoppingController', function($scope,$rootScope){
	$rootScope.currentLink = "shopping.html";

	$scope.objOptions = {
		ForUs : {
			title : "自己吃",
			price : 599,
			detail : "茂谷蜜柑(有機栽種)，25A/27A/30A混裝，一箱10士5%台斤(約25顆)。註:外觀較差，保值期較短，但較甜，數量有限",
			photo : "option1.jpg",
		},
		ForPresent : {
			title : "拌手禮",
			price : 799,
			detail : "茂谷蜜柑25A/27A/30A混裝，一箱10士5%台斤(約25顆)。塑膠套封裝可存放一、兩個月，但建議盡早食用，風味較佳。",
			photo : "option2.jpg",
		},
		ForEmpire : {
			title : "尊榮不凡",
			price : 1099,
			detail : "茂谷蜜柑30A頂級禮盒裝，一箱9士5%台斤(約18顆)。塑膠套封裝可存放一、兩個月，但建議盡早食用，風味較佳。",
			photo : "option3.jpg",
		},
	};

	//video
	$scope.isShowVideo = false;
	$scope.fnChangeShowVideo = function(){
		$scope.isShowVideo = !$scope.isShowVideo;
		jQuery(".videoPage").css('display','block');
	}
});