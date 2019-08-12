angular.module('cmsHead')
    .component('cmsHead',{
        templateUrl:'cms-head/cms-head.template.html',
        controller:['$scope', function($scope){
            var self=this;

            self.isLogin=false;

            $scope.$on('admin-login',function(e){
                self.isLogin=true;
            });
        }]
    });