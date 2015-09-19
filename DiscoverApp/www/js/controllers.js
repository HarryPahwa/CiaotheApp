angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {
	$scope.fbLogin = function () {
		ngFB.login({scope: 'user_likes'}).then(//email,,read_stream,publish_actions
			function (response) {
				if (response.status === 'connected') {
					console.log('Facebook login succeeded');
					$scope.closeLogin();
				} else {
					alert('Facebook login failed');
				}
			});
	};
})


.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
	Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ButtonColorChanger', function($scope, $stateParams){
	$scope.broadcastState=!$scope.broadcastState;
	
	console.log($scope.broadcastState);
})

.controller('HomeController', function($scope, $window) {
	$window.navigator.geolocation.getCurrentPosition(function(position){
		var lat=position.coords.latitude;
		var lng=position.coords.longitude;

		$scope.$apply(function() {
			$scope.lat=lat;
			$scope.lng=lng;
		});
	});
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
	enableFriends: true
  };
});

