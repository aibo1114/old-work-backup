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
            templateUrl:'/tpl/yxhz/index.html'
        })
        .when('/integral',{
            templateUrl:'/tpl/yxhz/integral.html'
        })
        .when('/package',{
            templateUrl:'/tpl/yxhz/package.html'
        })
        .otherwise('/');
}]);