angular.module("App",["ngRoute"])
.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "templates/products.html",
            controller: "Products"
        })
        .when("/basket", {
            templateUrl : "templates/basket.html",
            controller: "Basket"
        })
        .when("/contacts", {
            templateUrl : "templates/contacts.html"
        })
        .when("/profile", {
            templateUrl : "templates/profile.html"
        });
})
.service("Info", function ($http) {

    var info = { basket:[] };

    $http.get("/userInfo").then(function(ret)
    {
        info.user = ret.data;
    });

    info.AddToBasket = function (p)
    {
        $http.post("/addProduct", {id: p.id}).then(function (ret) {
            if (ret.data.success)
            {
                info.basket.push(p);
            }
        })
    };

    return info;
})
.controller("Basket", function ($scope, Info) {
    $scope.basket = Info.basket;
})
.controller("Menu", function($scope,$http, Info)
{
    $scope.info = Info;
})
.controller("Products", function($scope,$http,Info)
{
    $scope.info = Info;
    $http.get("/products").then(function(ret)
    {
            $scope.products = ret.data;
    });
});