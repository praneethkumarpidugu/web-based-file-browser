var app = angular.module('webfile', []);

app.controller('LoginController', function ($scope, $http) {
	$scope.username = "";
	$scope.ipaddress = "";
	$scope.password = "";


	console.log($scope);
});

app.controller('FileBrowserController', function ($scope, $http) {
	$scope.mydata = "";
	$http.get('../../back-end/myJSONData.json')
		.then(function (res) {
			$scope.mydata = res.data;
        });
});


