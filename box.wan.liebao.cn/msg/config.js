app.config(['$httpProvider','$routeProvider','$locationProvider',function($httpProvider,$routeProvider,$locationProvider){
    $httpProvider.defaults.transformRequest = function(obj){
        var str = [];
        for(var p in obj){
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
    };
    $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/',{
            templateUrl:'tpl/container.html'
        })
        .otherwise('/');
    //1 :系统 2: 活动
}]);