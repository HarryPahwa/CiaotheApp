angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {
	$scope.fbLogin = function () {
		ngFB.login({scope: 'user_likes'}).then(//,read_stream,publish_actions
			function (response) {
				if (response.status === 'connected') {
					console.log('Facebook login succeeded');
					//$scope.closeLogin();
					location.reload();
				} else {
					// alert('Facebook login failed');
					console.log("Facebook not login");
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

	$scope.remove = function(index) {
	alert(index);
	$scope.likes[index].delete();
	
  };
})
.controller('LikeDetailCtrl', function($scope, $stateParams, UserLikes) {
	$scope.likes = UserLikes;
	$scope.likeNm = JSON.parse($stateParams.likeId).name; 
	$scope.likeId = JSON.parse($stateParams.likeId).index; 
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

.controller('ButtonController', function($scope, $stateParams){
	$scope.broadcastState=!$scope.broadcastState;
	console.log("HERE");
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

.controller('AccountCtrl', function($scope, ngFB, $window) {
	$scope.settings = {
		enableFriends: true
	};

	ngFB.api({
		path: '/me',
		params: {fields: 'id,name,likes,email,gender'}
	}).then(
		function (user) {
			$scope.user = user;
			// console.log(user); 

			//everytime I get this stuff I need to update firebase 
			updateLikes(user.likes.data, user.name); 

			$window.navigator.geolocation.getCurrentPosition(function(position){
				var lat=position.coords.latitude;
				var lng=position.coords.longitude;

				updateProfile(user, lat, lng); 
			});
		},
		function (error) {
			// alert('Facebook error lili: ' + error.error_description);
			// console.log("error"); 
	});

	updateLikes = function(likes, name) {
		nam = appropriating_name(name, name.length) 

		var likesRef = new Firebase('https://blinding-inferno-6264.firebaseio.com/user_likes');

		for (num in likes) {
			nm = appropriating_name(likes[num].name, likes[num].name.length); 
			likesRef.child(nm).child("users").child(nam).set(true);
		}		
	}

	updateProfile = function(user, lat, lng) {
		console.log(user); 
		
		name = appropriating_name(user.name, user.name.length); 

		var usersRef = new Firebase('https://blinding-inferno-6264.firebaseio.com/Users');
		usersRef.child(name).set({"email": user.email, "gender": user.gender, "lat": lat, "lng": lng}); 

		for (num in user.likes.data) {
			nm = appropriating_name(user.likes.data[num].name, user.likes.data[num].name.length); 
			usersRef.child(name).child("likes").child(nm).set(true); 
		}
	}	


	appropriating_name = function(str, len) {
		for (var i=0; i<len; i++) {
			if (str[i] == ('.' || '#' || '$' || '[' || ']')) {
				str = str.substr(0, i) + str.substr(i+1);
			}
		}
		return str;
	}
});

