//
vegefruit66.controller('activityController', function($scope,$rootScope){
	$rootScope.currentLink = "activity.html";

	$scope.activitiesPages = {
			main: "./activities/main.html",
			activities1: "./activities/activity1.html",
			activities2: "./activities/activity2.html",
			activities3: "./activities/activity3.html",
			activities4: "./activities/activity4.html",
		};
	$scope.now = $scope.activitiesPages['main']

	$scope.pageChange = function(pageName) {
		$scope.now = $scope.activitiesPages[pageName]
	}
});