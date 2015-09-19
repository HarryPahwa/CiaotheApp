angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {
	$scope.fbLogin = function () {
		FB.login(//{scope: 'email,user_likes,user_photos,user_videos', return_scopes: true}).then(//email,,read_stream,publish_actions
			function (response) {
				alert('Facebook login attempted');
				if (response.status === 'connected') {
					alert('Facebook login succeeded');
					console.log(response.grantedScopes);
					getUserInfo();
				//	$scope.closeLogin();
				} else {
					alert('Facebook login failed');
				}
			}, {scope: 'email,user_likes,user_photos,user_videos', 
			return_scopes: true});


		function getUserInfo(){
			console.log("I'm here!");
			ngFB.api('/me', function (response) {
                console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                // get profile picture
                ngFB.api('/me/picture?type=normal', function (picResponse) {
                    console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                    response.imageUrl = picResponse.data.url;
                    // store data to DB - Call to API
                    // Todo
                    // After posting user data to server successfully store user data locally
                    var user = {};
                    user.name = response.name;
                    alert(response.name);
                    user.email = response.email;
                    if(response.gender) {
                        response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                    } else {
                        user.gender = '';
                    }
                    user.profilePic = picResponse.data.url;
                    $cookieStore.put('userInfo', user);
                    $state.go('dashboard');
 
                });
		}
		);
};
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

