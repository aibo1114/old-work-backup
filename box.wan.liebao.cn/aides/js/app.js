var wgs=angular.module('wgs',[]);
var app=angular.module('app',[
    'ngRoute',
    'jQueryScrollbar',
    'wgs'
]);

app.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider){
    //request payload 转 formData
    $httpProvider.defaults.transformRequest = function(obj){
        var str = [];
        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };

    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control' : 'no-cache'
    };
    // $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    // $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/',{
            templateUrl:'/aides/tpl/list.html'
        })
        .when('/services',{
            templateUrl:'/aides/tpl/service.html'
        })
        .otherwise('/');
}]);

app.controller('listController',['$http','$scope',function($http,$scope){
    $http({
        method:'jsonp',
        url:'http://box.wan.liebao.cn/1/api/assistlist?callback=JSON_CALLBACK'
    }).then(function(res){
        if(res.data.ret==1) $scope.games=res.data.data;
    },function(err){});
}]);
app.controller('servicesController',['$scope','$location',function($scope,$location){
    $scope.gid=$location.search().gid;
}]);

