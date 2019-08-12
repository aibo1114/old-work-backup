clockApp.directive('serviceEditform',[function(){
    return {
        restrict:'A',
        scope:{
            data: '='
        },
        link:function(s,e,a){},
        controller:['$scope',function($scope){}],
        templateUrl:'tpl/f_service.html'
    }
}]);

clockApp.directive('customEditform',[function(){
    return {
        restrict:'A',
        scope:{
            data: '='
        },
        link:function(s,e,a){},
        controller:['$scope',function($scope){}],
        templateUrl:'tpl/f_custom.html'
    }
}]);

