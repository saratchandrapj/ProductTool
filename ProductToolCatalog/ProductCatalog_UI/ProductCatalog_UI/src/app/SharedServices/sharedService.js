
angular.module('TestMod')
    .factory('sharedService',function () {
        var username = '';
        console.log("instantiated");
        return {
            store: function ( value) {
                username = value;
            },
            get: function () {
                return username;
            }
        };
    });
