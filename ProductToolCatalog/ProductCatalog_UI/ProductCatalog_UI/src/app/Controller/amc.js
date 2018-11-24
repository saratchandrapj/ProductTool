

 
var TestMod = angular.module('TestMod', ['ngRoute', 'ui.router']);

 
TestMod.run(function ($rootScope, $location, $state, LoginService) {
    //console.clear();
    //console.log('running');
    if (!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
    }
});
TestMod.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('logout', {
              url: '/logout',
              controller: function ($scope, $route) {
                  $route.reload()

              }
          })
        .state('login', {
            url: '/login',
            templateUrl: '../Views/login.html',
            controller: 'LoginController'
        })
        .state('home', {
            url: '/home',
            templateUrl: '../Views/home.html',
            controller: 'tmController'
        });

      $urlRouterProvider.otherwise('/login');
  }]);


TestMod.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});
  
TestMod.controller('tmController', function ($scope, $http, dataFactory, $rootScope, $stateParams, $state, LoginService, sharedService, $location, $window) {
  $scope.test = "test";
  $scope.data = {};
  $scope.Products = [];
  checklogin();

  $scope.logout = function () {
      window.localStorage.clear();
      $rootScope.isLoggedIn = false;
      $location.path("/");
      sharedService.store('');
      console.log(sharedService.get());
  }

  function checklogin () {
      if(sharedService.get() == '')
      $location.path("/");
  }
    // list of table heading fields
  $scope.data.product_fields = ['product', 'price', 'description'];
  
  if (sharedService )
  {
      $scope.user = sharedService.get();
  }

  getCustomers();
  getProducts();

    //Fetch Categorys
  function getCustomers() {
      dataFactory.getCategory()
          .then(function (response) {
              $scope.data.categories = response.data;
              $scope.current_category = $scope.data.categories[0].CategoryName;
          }, function (error) {
              $scope.status = 'Unable to load Category data: ' + error.message;
          });
  }
    //Fetch Products
  function getProducts() {
      dataFactory.getProducts()
          .then(function (response) {
              $scope.data.products = response.data;
             // console.log($scope.data.products);
          }, function (error) {
              $scope.status = 'Unable to load Product data: ' + error.message;
          });
  }
    //insert New Product
  $scope.insertProduct = function (product) {
      //Fake customer data
      dataFactory.insertproduct(product)
          .then(function (response) {
              $scope.status = 'Inserted Product! Refreshing Product List.';
              $scope.data.products.push(product);
          }, function (error) {
              $scope.status = 'Unable to insert PRoduct: ' + error.message;
          });
  };

  $scope.updateProduct = function (product) {
      dataFactory.updateProduct(product)
       .then(function (response) {
           $scope.status = 'Updated Product List! Refreshing customer list.';
           getProducts();
       }, function (error) {
           $scope.status = 'Unable to update Product: ' + error.message;
       });
  };


  // store list of categories
    // $scope.data.categories = ['cat1', 'cat2', 'cat3', 'cat4'];

 //$http.get('http://localhost:61223/api/ProductService/GetCategory').then(function (response) {
 //     $scope.category = response.data;
 //     $scope.data.categories = $scope.category;
 //     $scope.current_category = $scope.data.categories[0].CategoryName;
 //    // $scope.totalItems = $scope.data.length;
     
 // });
  //var resp = $http.get('http://localhost:61223/api/ProductService/GetProducts').then(function (response) {
  //    $scope.data.products = response.data;
  //    console.log($scope.data.products);
  //    $scope.viewby = 3;
  //    $scope.totalItems = $scope.data.products.length;
  //    console.log($scope.totalItems);
  //    $scope.currentPage = 3;
  //    $scope.itemsPerPage = $scope.viewby;
  //    $scope.maxSize = 3; //Number of pager buttons to show
  //    $scope.setPage = function (pageNo) {
  //        alert(pageNo);
  //        $scope.currentPage = pageNo;
  //    };

  //    $scope.pageChanged = function () {
  //        console.log('Page changed to: ' + $scope.currentPage);
  //    };

  //    $scope.setItemsPerPage = function (num) {
  //        $scope.itemsPerPage = num;
  //        $scope.currentPage = 3; //reset to first page
  //    }
  //});
 
 
 // console.log($scope.data.products);
  //  console.log($scope.current_category);
  // this item is bound to user input and also used to show list of items based on the filter
  

  // this object is bind to the modal input fields
  $scope.staging_item = {};

  // this object i temporary variable, intended to store items in products array
  $scope.current_edit_item ={};

  // set this to add if modal is open for adding new item and edit if modal is open for editing an existing item
  $scope.modal_mode = "none";

  // set this to true false to show hide modal
  $scope.show_modal = false;

  // utility function to copy a contents to b , where a is source object and b is destination object
  $scope.copyTo = function (a, b) {
    //  console.log(a);
     // console.log(b);
    var keys = Object.keys(a);
    if(keys && keys.length > 0){
      keys.forEach(function(e){
          b[e] = a[e];
      });
    }
  }


  // ======================================================================================================================
    // ======================================================================================================================
    // ======================================================================================================================
    // ======================================================================================================================
    // items per page
  $scope.ipp = 3;
  $scope.current_offset = 0;
    // store items list in data.products
  $scope.productByFilter = function (cat, offset) {
      var list = [];
      //console.log("logging data");
      //console.log($scope.data.products);
      if (typeof ($scope.data.products) == "undefined") return;
     // console.log("logging data after defined");
     // console.log($scope.data.products);
      $scope.data.products.forEach(function (e) {
          if (e.ProductCategory.CategoryName == cat) {
       //       console.log("pusing e");
              list.push(e);
          }
      });

      if (offset >= 0)
          return list.slice(offset, offset + $scope.ipp);
      else
          return list;
  }

  $scope.generateRange = function (r) {
      r = Math.ceil(r);
      var list = [];
      for (i = 1 ; i <= r ; i++)
          list.push(i);
      return list;
  }

  $scope.shift = function (lr) {

     // console.log("test");

      if (lr == -1) {
       //   console.log($scope.current_offset - $scope.ipp);
          if ($scope.current_offset - $scope.ipp >= 0) {
              $scope.current_offset = $scope.current_offset - $scope.ipp;
              return;
          } else {

              //$scope.current_offset 
          }
      } else {
        //  console.log($scope.productByFilter($scope.current_category).length);

          if ($scope.current_offset + $scope.ipp < $scope.productByFilter($scope.current_category).length) {
              $scope.current_offset = $scope.current_offset + $scope.ipp;
          }
      }
  }
  $scope.shiftByIndex = function (i) {
      $scope.current_offset = ((i - 1) * $scope.ipp);
  }
  $scope.$watch('current_category', function (nv, ov) {
      $scope.current_offset = 0;
     // console.log(nv, ov);
  });


    // ======================================================================================================================
    // ======================================================================================================================
    // ======================================================================================================================
    // ======================================================================================================================

// store items list in data.products

  $scope.edit_product = function (item) {
     // console.log(item);
    $scope.modal_mode = "edit";
    $scope.staging_item  = {};
    $scope.copyTo(item, $scope.staging_item);
    $scope.current_edit_item = item;
    $scope.show_modal = true;
  }
  $scope.edit_product_save = function(){
   // console.log($scope.staging_item);
    //console.log($scope.current_edit_item);

      //Call service to update
    $scope.updateProduct($scope.staging_item);

    $scope.current_edit_item = {};
    $scope.staging_item = {};
    $scope.modal_mode = "";
    $scope.show_modal = false;

  }
  $scope.edit_product_cancel = function(){
    $scope.current_edit_item = {};
    $scope.staging_item = {};
    $scope.modal_mode = "";
    //$("#myModal").modal("close");
    $scope.show_modal = false;
  }

  $scope.addNewProduct = function(){
      $scope.modal_mode = "add";
     // console.log($scope.modal_mode);
      $scope.show_modal = true;
      $scope.staging_item = {};
  }
  $scope.saveNewProduct = function(){
      //$("#myModal").modal('close');
   //   console.log($scope.data.categories);
  //    console.log($scope.data.products[$scope.staging_item.category]);

      //Call service to insert
      $scope.insertProduct($scope.staging_item);

    $scope.staging_item = {};
    $scope.modal_mode = "";
    $scope.show_modal = false;
    //$("#myModal").modal('close');
  }




});
