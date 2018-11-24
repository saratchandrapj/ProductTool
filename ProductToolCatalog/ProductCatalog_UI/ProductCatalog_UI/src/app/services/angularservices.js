angular.module('TestMod')
    .factory('dataFactory', ['$http', function ($http) {

        var urlBase = 'http://localhost:61223/api/ProductService';
        var dataFactory = {};

        //dataFactory.getCustomers = function () {
        //    return $http.get(urlBase);
        //};

        dataFactory.getCategory = function () {
            return $http.get(urlBase + '/GetCategory');
        };
        dataFactory.getProducts = function () {
            return $http.get(urlBase + '/GetProducts');
        };

        dataFactory.insertProduct = function (cust) {
            return $http.post(urlBase + '/AddProduct', cust);
        };

        dataFactory.updateProduct = function (cust) {
            return $http.put(urlBase + '/UpdateProduct', cust)
        };

        return dataFactory;
    }]);







//app.factory('ProductServices', function ($http) {
//    var object = {};
//    object.getCategory = function(selection){
//        return $http({
//            url:'http://localhost:61223/api/ProductService/GetCategory',
//            method : 'GET',
//            headers:{
//                'Content-Type': 'application/json'
//            }
//                .then(function (response) {
//                $scope.category = response.data;
//                $scope.data.categories = $scope.category;
//                $scope.current_category = $scope.data.categories[0].CategoryName;
//                // $scope.totalItems = $scope.data.length;
//            })
//        }
//    });
//});