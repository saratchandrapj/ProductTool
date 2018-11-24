
var app = angular.module('TestMod');
app.controller('LoginController', function ($scope, $rootScope,$location, $stateParams, $state, LoginService, sharedService) {
    $rootScope.title = "User Login Page";
    $scope.formSubmit = function () {
        if (LoginService.login($scope.username, $scope.password)) {
            console.log('user loggeed in ' + $scope.username);
            $rootScope.userName = $scope.username;
            $rootScope.isLoggedIn = true;
            $scope.UserId = $scope.email;
            $scope.session = $scope.email;
            $scope.sessionName = 'admin';
            window.localStorage.setItem("SessionId", $scope.session);
            window.localStorage.setItem("SessionName", $scope.sessionName);
            window.localStorage.setItem("isLoggedIn", $scope.isLoggedIn);
            $state.transitionTo('home');
            console.log("logginf shared service fomr controller");
            console.log(sharedService)
            sharedService.store($scope.username);
            console.log('user loggeed in ' + $rootScope.userName);
        } else {
            $scope.error = "Incorrect username/password !";
        }
    };
    
});