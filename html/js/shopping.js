//
vegefruit66.controller('shoppingController', function($scope,$rootScope,$http){
	$rootScope.currentLink = "shopping.html";

	$scope.fnGetNextDeliveryDate = function(nDayOfWeek){
		//0~6
		var dateToday = new Date();

		//this week would delivery
		dateToday.setDate(dateToday.getDate() + (nDayOfWeek-1-dateToday.getDay()+7)%7+1);

		return (dateToday.getMonth()+1) + "/" + dateToday.getDate();
	}

	$scope.fnBKshadowClose = function(){
		if( $scope.isShowVideo == true ){
			$scope.fnChangeShowVideo();
		}

		if( $scope.objShopInfo.isShow == true ){
			$scope.objShopInfo.fnIsShowShopInfo();
		}
	}

	//video
		$scope.isShowVideo = false;
		$scope.fnChangeShowVideo = function(){
			$scope.isShowVideo = !$scope.isShowVideo;
			jQuery(".videoPage").css('display','block');
		}
	//orange
		$scope.objOrange = {
			nOrangeDeliveryDay : 5, //Wednesday

			isSelected : false,
			nTotalPrice : 0,
			
			options : {
				ForTesting : {
					title : "活力水果嘗鮮箱",
					price : 399,
					detail : "內含茂谷蜜柑、珍珠芭樂、玉女小番茄、牛番茄...等當季新鮮水果(3~5種)，一箱4士5%台斤。",
					photo : "option1.jpg",
					count : 0,
				},
				ForFamily : {
					title : "活力水果家庭箱",
					price : 699,
					detail : "內含茂谷蜜柑、珍珠芭樂、玉女小番茄、牛番茄...等當季新鮮水果(3~5種)，一箱10士5%台斤。",
					photo : "option2.jpg",
					count : 0,
				},
				/*ForEmpire : {
					title : "尊榮不凡",
					price : 1099,
					detail : "茂谷蜜柑30A頂級禮盒裝，一箱9士5%台斤(約18顆)。塑膠套封裝可存放一、兩個月，但建議盡早食用，風味較佳。",
					photo : "option3.jpg",
					count : 0,
				},*/
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

			detail : "",

			fnClickCheckBox : function(){
				$scope.objShopInfo.isAgree = !$scope.objShopInfo.isAgree;
			},

			fnIsShowShopInfo : function(){
				$scope.objShopInfo.isShow = !$scope.objShopInfo.isShow;
				jQuery(".shopinfoPage").css('display','block');
			},
		};
	//order
		$scope.objOrder = {
			isShow : false,
			szError : "",
			columns : {
				name : {
					title : "姓名",
					value : "",
					isNecessary : true,
					fnIsValid : function(){
						if( $scope.objOrder.columns.name.value.length == 0 ){
							return false;
						}
						return true;
					},
				},
				phone : {
					title : "手機",
					value : "",
					isNecessary : true,
					fnIsValid : function(){
						var szPhone = $scope.objOrder.columns.phone.value;
						if( szPhone.length < 10 || szPhone.length > 13){
							return false;
						}

						var strTemp="0123456789-()#+";
						for( var i=0; i<szPhone.length; i++ ){
							if( strTemp.indexOf(szPhone[i]) == -1 ){
								return false;
							}
						}

						return true;
					},
				},
				email : {
					title : "電子郵件",
					value : "",
					isNecessary : true,
					fnIsValid : function(){
						var szEmail = $scope.objOrder.columns.email.value;
						var szEmailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
						
						if( szEmail.search(szEmailRule) == -1 ){
							return false;
						}

						return true;
					},
				},
				address : {
					title : "宅配地址",
					value : "",
					isNecessary : true,
					fnIsValid : function(){
						return true;
					},
				},
				option_delivery : {
					title : "宅配選項",
					value : "",
					isNecessary : true,
					fnIsValid : function(){
						return true;
					},
				},
				ATM : {
					title : "ATM匯款後五碼",
					value : "",
					isNecessary : true,
					fnIsValid : function(){
						var szATMfive = $scope.objOrder.columns.ATM.value;

						if( szATMfive.length != 5 ){
							return false;
						}

						var szStrTemp = "0123456789";
						for( i=0; i<szATMfive.length; i++ ){
							if( szStrTemp.indexOf(szATMfive[i]) == -1 ){
								return false;
							}
						}

						return true;
					},
				},
				comment : {
					title : "寶貴建議",
					value : "",
					isNecessary : false,
					fnIsValid : function(){
						return true;
					},
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

					if( $scope.objOrder.columns[key].fnIsValid() == false ){
						$scope.objOrder.szError = "\"" + $scope.objOrder.columns[key].title + "\"欄位格式錯誤";
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

			isFinish : false,
			fnSubmit : function(){
				if( $scope.objOrder.m_isOrderRequiredDone() == false ){
					return;
				}

				//clear error message
				$scope.objOrder.szError = "";

				//create data into file
				$scope.objMyOrder = {
					nTotalPrice : 0,
					aryProduct : [],
					objAddress : {},
				};

				$scope.objOrder.isFinish = true;
				
				//product
				for( var option in $scope.objOrange.options ){
					if( $scope.objOrange.options[option].count != 0 ){
						var orderTmp = {
							name : $scope.objOrange.options[option].title,
							price : $scope.objOrange.options[option].price,
							photo : $scope.objOrange.options[option].photo,
							count : $scope.objOrange.options[option].count,
						};
						$scope.objMyOrder.aryProduct.push(orderTmp);
					}
				}

				//total price
				$scope.objMyOrder.nTotalPrice = $scope.objOrange.nTotalPrice;

				//address
				for( var key in $scope.objOrder.columns ){
					$scope.objMyOrder.objAddress[key] = {
						title : $scope.objOrder.columns[key].title,
						value : $scope.objOrder.columns[key].value,
					};
				}
			},
		};

	$scope.isDone = false;
	$scope.nWaitSecond = 5;
	$scope.fnOrderDone = function(){
		//console.log($http.post('http://localhost:5566/vegefruit_api/order').then(function(response){console.log(response);}));
		//send data into databse

		//add order date
		$scope.objMyOrder['create_date'] = new Date().toLocaleString();
		$http.post('./vegefruit_api/order', JSON.stringify($scope.objMyOrder) )
		.then(function(data){
			
			console.log(data);
			$scope.isDone = true;
			
			setInterval(function(){
				$scope.nWaitSecond--;

				if( $scope.nWaitSecond == 0 ){
					window.open("http://vegefruit66.tk", "_self");
				}
			},1000);

		});
	}
});