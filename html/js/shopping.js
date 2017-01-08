//
vegefruit66.controller('shoppingController', function($scope,$rootScope){
	$rootScope.currentLink = "shopping.html";

	$scope.fnGetNextDeliveryDate = function(nDayOfWeek){
		//0~6
		var dateToday = new Date();

		//this week would delivery
		dateToday.setDate(dateToday.getDate() + (nDayOfWeek-1-dateToday.getDay()+7)%7+1);

		return (dateToday.getMonth()+1) + "/" + dateToday.getDate();
	}

	//video
		$scope.isShowVideo = false;
		$scope.fnChangeShowVideo = function(){
			$scope.isShowVideo = !$scope.isShowVideo;
			jQuery(".videoPage").css('display','block');
		}
	//orange
	$scope.isSelected = false;
	$scope.nOrangeDeliveryDay = 3; //Wednesday
	$scope.objOrangeOption = {
		ForUs : {
			title : "蜜柑饗宴",
			price : 599,
			detail : "茂谷蜜柑(有機栽種)，25A/27A混裝，一箱10士5%台斤(25~27顆)。註:外觀較差，保值期較短，但較甜，數量有限。",
			photo : "option1.jpg",
			count : 0,
		},
		ForPresent : {
			title : "拌手禮",
			price : 799,
			detail : "茂谷蜜柑25A/27A混裝，一箱10士5%台斤(25~27顆)。塑膠套封裝可存放一、兩個月，但建議盡早食用，風味較佳。",
			photo : "option2.jpg",
			count : 0,
		},
		ForEmpire : {
			title : "尊榮不凡",
			price : 1099,
			detail : "茂谷蜜柑30A頂級禮盒裝，一箱9士5%台斤(約18顆)。塑膠套封裝可存放一、兩個月，但建議盡早食用，風味較佳。",
			photo : "option3.jpg",
			count : 0,
		},
	};
	$scope.fnCountOrange = function(){
		for( var option in $scope.objOrangeOption ){
			if( $scope.objOrangeOption[option].count != 0 ){
				$scope.isSelected = true;
				return;
			}
		}

		$scope.isSelected = false;
	}
});