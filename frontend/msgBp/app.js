var app=angular.module('msgBp',[
    'ngRoute'
]);

//login
app.controller('loginController',[function(){}]);

//menu
app.controller('menu',['$scope','$location',function($scope,$location){
    $scope.cur=$location.path().substring(1);

    $scope.$on('$routeChangeSuccess',function(){
        $scope.cur=$location.path().substring(1);
    });
}]);