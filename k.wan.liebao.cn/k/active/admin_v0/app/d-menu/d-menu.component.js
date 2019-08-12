angular.module('dMenu').
    component('dMenu',{
        templateUrl:'d-menu/d-menu.template.html',
        controller:['$http','$scope',function($http,$scope){
            var self=this;
            $scope.$on('routerActive',function(e,rter){
                console.log(e);
                $("[href='#!/"+rter+"']").addClass('active').siblings('.list-group-item').removeClass('active');
            });
        }]
    });