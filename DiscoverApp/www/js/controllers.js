angular.module('starter.controllers', ['ngOpenFB'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {
<<<<<<< HEAD
    watchLoginChange = function() {

      var _self = this;

      var oauthApp = angular.module('oauthApp.controllers', []);
      oauthApp.controller('welcomeCtrl', function ($scope, $state, $cookieStore) {
 
        /**
         * SOCIAL LOGIN
         * Facebook and Google
         */
        // FB Login
        $scope.fbLogin = function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    getUserInfo();
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'email,user_photos,user_videos'});
     
            function getUserInfo() {
                // get basic info
                FB.api('/me', function (response) {
                    console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                    // get profile picture
                    FB.api('/me/picture?type=normal', function (picResponse) {
                        console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                        response.imageUrl = picResponse.data.url;
                        // store data to DB - Call to API
                        // Todo
                        // After posting user data to server successfully store user data locally
                        var user = {};
                        user.name = response.name;
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
                });
            }
        };
        // END FB Login
      })
    /*	$scope.fbLogin = function () {
    		ngFB.login({scope: 'email,user_likes,user_photos,user_videos', return_scopes: true}).then(//email,,read_stream,publish_actions
    			function (response) {
    				alert('Facebook login attempted');
    				if (response.status === 'connected') {
    					alert('Facebook login succeeded');
    					console.log(response.grantedScopes);
    					//getUserInfo();
    				//	$scope.closeLogin();
    				} else {
    					alert('Facebook login failed');
    				}
    			});

    */

    		
    	};
    })
=======
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
>>>>>>> origin/master


// This is search
.controller('DashCtrl', function($scope, UserLikes) {

	$scope.likes = UserLikes;

})

// This is
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

.controller('ProfileCtrl', function ($scope, ngFB) {
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
})

.controller('dashboardCtrl', function ($scope, $window, $state, $cookieStore) {
    // Set user details
    $scope.user = $cookieStore.get('userInfo');
    
    // Logout user
    $scope.logout = function () {
        $cookieStore.remove("userInfo");
        $state.go('welcome');
        $window.location.reload();
    }
});

