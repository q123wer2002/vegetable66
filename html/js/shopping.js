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
		$scope.objOrange = {
			nOrangeDeliveryDay : 3, //Wednesday

			isSelected : false,
			nTotalPrice : 0,
			
			options : {
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
			},

			fnCountOrange : function(){
				//default
				$scope.objOrange.nTotalPrice = 0;

				for( var option in $scope.objOrange.options ){
					var nOptionPrice = $scope.objOrange.options[option].count*$scope.objOrange.options[option].price;
					$scope.objOrange.nTotalPrice += nOptionPrice;
				}

				if( $scope.objOrange.nTotalPrice == 0 ){
					$scope.objOrange.isSelected = false;

					//
					$scope.objOrder.isShow = false;
					return;
				}

				$scope.objOrange.isSelected = true;
			},
		};
	//shopping info
		$scope.objShopInfo = {
			isShow : false,
			isAgree : false,

			fnClickCheckBox : function(){
				$scope.objShopInfo.isAgree = !$scope.objShopInfo.isAgree;
			},
		};
	//order
		$scope.objOrder = {
			isShow : true,
			szError : "",
			columns : {
				name : {
					title : "姓名",
					value : "",
					isNecessary : true,
				},
				phone : {
					title : "手機",
					value : "",
					isNecessary : true,
				},
				email : {
					title : "電子郵件",
					value : "",
					isNecessary : true,
				},
				address : {
					title : "宅配地址",
					value : "",
					isNecessary : true,
				},
				received_option : {
					title : "宅配選項",
					value : "",
					isNecessary : true,
				},
				ATM : {
					title : "ATM匯款後五碼",
					value : "",
					isNecessary : true,
				},
				comment : {
					title : "寶貴建議",
					value : "",
					isNecessary : false,
				},
			},

			fnCreateOrder : function(){
				$scope.objOrder.isShow = true;
			},

			fnCloseOrder : function(){
				$scope.objOrder.isShow = false;	
			},

			m_isOrderRequiredDone : function(){
				//check column
				for( var key in $scope.objOrder.columns ){
					if( $scope.objOrder.columns[key].isNecessary == true && $scope.objOrder.columns[key].value.length == 0 ){
						$scope.objOrder.szError = "\"" + $scope.objOrder.columns[key].title + "\"欄位不可以空白";
						return false;
					}
				}

				//check shopping info
				if( $scope.objShopInfo.isAgree == false ){
					$scope.objOrder.szError = "別忘了查看購買須知唷";
					return false;
				}

				return true;
			},

			fnSubmit : function(){
				if( $scope.objOrder.m_isOrderRequiredDone() == false ){
					return;
				}

				//clear error message
				$scope.objOrder.szError = "";
			},
		};
});