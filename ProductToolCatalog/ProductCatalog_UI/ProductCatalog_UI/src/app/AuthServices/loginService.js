
var app = angular.module('TestMod');
app.factory('LoginService', function () {
    var admin = 'test';
    var pass = 'test';
    var isAuthenticated = false;
    return {
        login: function (username, password) {
            isAuthenticated = username === admin && password === pass;
            return isAuthenticated;
        },
        isAuthenticated: function () {
            return isAuthenticated;
        }
    };
});