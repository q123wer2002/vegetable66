//
vegefruit66.controller('shoppingController', function($scope,$rootScope,$http,$interval){
	$rootScope.currentLink = "shopping.html";

	$scope.fnGetNextDeliveryDate = function(nDayOfWeek){
		/*var dateToday = new Date();
		//this week would delivery
		dateToday.setDate(dateToday.getDate() + (nDayOfWeek-1-dateToday.getDay()+7)%7+1);
		return (dateToday.getMonth()+1) + "/" + dateToday.getDate();*/
		
		//two weeks one delivery, start from 3/11, 3/25,...
		//only SAT.

		/*var dateTody = new Date();
		var dateFirstDelivery = new Date("2017-03-12");

		var timeDiff = Math.abs(dateTody.getTime() - dateFirstDelivery.getTime());
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		dateFirstDelivery.setDate( dateFirstDelivery.getDate() + Math.ceil(diffDays/14)*14 );
		return (dateFirstDelivery.getMonth()+1) + "/" + dateFirstDelivery.getDate();*/
		return "5/14"
	}

	//count Reciprocal time
	$scope.fnCountReciprocalTime = function(){
		var nNextDay = $scope.objOrange.nOrangeDeliveryDay;
		var date_now = new Date();
		var date_nextDelivery = new Date( date_now.getFullYear() + "/" + $scope.fnGetNextDeliveryDate(nNextDay) );

		var  fnSecondsToTime = function(secs)
		{
			var hours = Math.floor(secs / (60 * 60));

			var divisor_for_minutes = secs % (60 * 60);
			var minutes = Math.floor(divisor_for_minutes / 60);

			var divisor_for_seconds = divisor_for_minutes % 60;
			var seconds = Math.ceil(divisor_for_seconds);

			var obj = {
				"h": hours,
				"m": minutes,
				"s": seconds
			};
			return obj;
		}
		var nTotalSeconds = Math.floor(((date_nextDelivery-date_now)/1000));
		var objReciprocalTime = fnSecondsToTime(nTotalSeconds);
		return objReciprocalTime;
	}
	//interval to count reciprocal time
	$interval(function(){
		$scope.nReciprocal = $scope.fnCountReciprocalTime();
	},1000);

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
			nOrangeDeliveryDay : 6, //Wednesday

			isSelected : false,
			nTotalPrice : 0,
			nDeliveryPrice : 0,

			options : {
				ForTesting : {
					title : "健康579水果箱",
					//originalPrice : 599,
					price : 599,
					detail : "符合每天成人攝取579健康原則、內含4~6種水果。(柳橙、釋迦、香蕉、木瓜、楊桃、芒果、檸檬、梨子、火龍果、荔枝、龍眼、百香果、葡萄柚、鳳梨、番茄、葡萄、芭樂、棗子、哈密瓜、蘋果、茂谷蜜柑、百香果)(含運)",
					photo : "option1.jpg",
					count : 0,
					isNewProduct : true,
				},
				/*ForFamily : {
					title : "活力水果家庭箱",
					originalPrice : 899,
					price : 699,
					detail : "內含3~5種當季新鮮水果，視當天採收狀況出貨。(葡萄柚、鳳梨、番茄、葡萄、芭樂、棗子、哈密瓜、蘋果、西洋梨、茂谷蜜柑、百香果、香蕉)，一箱10台斤±5%。(含運)",
					photo : "option2.jpg",
					count : 0,
					isNewProduct : false,
				},*/
				ForLazy : {
					title : "懶人包專屬水果",
					//originalPrice : 599,
					price : 599,
					detail : "不用切、削，內含4~6種當季新鮮水果，視當天採收狀況出貨。(香蕉、李子、甜桃、荔枝、龍眼、百香果、無籽葡萄、番茄、芭樂、棗子、橘子、茂谷蜜柑)(含運)",
					photo : "option3.png",
					count : 0,
					isNewProduct : true,
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
		var nEveryPackagePrice = 30;
		$scope.objOrder = {
			isShow : false,
			szError : "",
			columns : {
				name : {
					title : "姓名",
					value : "",
					isEdit : true,
					isShow : true,
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
					isEdit : true,
					isShow : true,
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
					isEdit : true,
					isShow : true,
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
					isEdit : true,
					isShow : true,
					isNecessary : true,
					fnIsValid : function(){
						return true;
					},
				},
				option_receive_delivery : {
					title : "收貨時間",
					value : "",
					options : ["不指定", "早上 (09:00~12:00)", "午後 (12:00~17:00)", "晚間 (17:00~20:00)"],
					isEdit : true,
					isShow : true,
					isNecessary : true,
					fnIsValid : function(){
						return true;
					},
				},
				option_pay : {
					title : "付款方式",
					value : "",
					options : ["ATM匯款", "貨到付款"],
					isEdit : true,
					isShow : true,
					isNecessary : true,
					fnIsValid : function(){
						return true;
					},
					fnChanged : function(){
						var szOptionPay = $scope.objOrder.columns.option_pay.value;

						if( szOptionPay == "" ){
							return;
						}

						if( szOptionPay == "ATM匯款" ){
							$scope.objOrder.columns.pay_info.title = "ATM後五碼";
							$scope.objOrder.columns.pay_info.value = "";
							$scope.objOrder.columns.pay_info.isNecessary = true;
							$scope.objOrder.columns.pay_info.isShow = true;
							$scope.objOrder.columns.pay_info.isEdit = true;
							return;
						}

						if( szOptionPay == "貨到付款" ){
							$scope.objOrder.columns.pay_info.title = "提醒您";
							$scope.objOrder.columns.pay_info.value = "貨到付款每箱需要加" + nEveryPackagePrice + "元";
							$scope.objOrder.columns.pay_info.isNecessary = false;
							$scope.objOrder.columns.pay_info.isShow = true;
							$scope.objOrder.columns.pay_info.isEdit = false;
							return;
						}
					},
				},
				pay_info : {
					title : "擴充選項",
					value : "",
					isEdit : false,
					isShow : false,
					isNecessary : true,
					fnIsValid : function(){
						var szOptionPay = $scope.objOrder.columns.option_pay.value;
						if( szOptionPay == "" || szOptionPay == "貨到付款" ){
							return true;
						}

						var szATMfive = $scope.objOrder.columns.pay_info.value;

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
					isEdit : true,
					isShow : true,
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
				var nTotalCount = 0;
				for( var option in $scope.objOrange.options ){
					if( $scope.objOrange.options[option].count != 0 ){
						nTotalCount = nTotalCount + $scope.objOrange.options[option].count;
						var orderTmp = {
							name : $scope.objOrange.options[option].title,
							price : $scope.objOrange.options[option].price,
							photo : $scope.objOrange.options[option].photo,
							count : $scope.objOrange.options[option].count,
						};
						$scope.objMyOrder.aryProduct.push(orderTmp);
					}
				}

				//add delivery price
				var szOptionPay = $scope.objOrder.columns.option_pay.value;
				if( szOptionPay == "貨到付款" ){
					$scope.objOrange.nDeliveryPrice = nTotalCount * nEveryPackagePrice;
				}

				//total price
				$scope.objMyOrder.nTotalPrice = $scope.objOrange.nTotalPrice + $scope.objOrange.nDeliveryPrice;

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