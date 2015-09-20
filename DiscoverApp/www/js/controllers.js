angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {
	$scope.fbLogin = function () {
		ngFB.login({scope: 'email,user_likes'}).then(//,read_stream,publish_actions
			function (response) {
				if (response.status === 'connected') {
					console.log('Facebook login succeeded');
					// console.log(ngFB.login.email); 
					//$scope.closeLogin();
				} else {
					alert('Facebook login failed');
				}
			});
	};
})


// This is search
.controller('DashCtrl', function($scope, UserLikes) {

	$scope.likes = UserLikes;

	$scope.countMembers = function(likesObj) {
		return Object.keys(likesObj).length; 
	}

})
.controller('LikeDetailCtrl', function($scope, $stateParams, UserLikes) {
	$scope.likes = UserLikes;
	$scope.likeNm = JSON.parse($stateParams.likeId).name; 
	$scope.likeId = JSON.parse($stateParams.likeId).index; 

	$scope.getUsers = function(likeObj) {
		if ($scope.likeNm == likeObj.id) {
			return Object.keys(likeObj.users);
		} else {
			return null;
		}
	}

})
.controller('UserDetailCtrl', function($scope, $stateParams, Users) {
	$scope.users = Users;
	$scope.userNm = JSON.parse($stateParams.userId).name; 
	$scope.userId = JSON.parse($stateParams.userId).index;
})

// This is
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
	Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  console.log($scope.chat); 
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

.controller('AccountCtrl', function($scope, ngFB) {
	$scope.settings = {
		enableFriends: true
	};

	ngFB.api({
		path: '/me',
		params: {fields: 'id,name'}
	}).then(
		function (user) {
			$scope.user = user;
		},
		function (error) {
			alert('Facebook error: ' + error.error_description);
	});

});

