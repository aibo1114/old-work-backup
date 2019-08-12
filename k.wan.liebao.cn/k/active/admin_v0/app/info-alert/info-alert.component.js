angular.module('infoAlert')
    .component('infoAlert',{
        templateUrl:'info-alert/info-alert.template.html',
        controller:['$rootScope','$scope','$timeout', function($rootScope,$scope,$timeout){
            var self=this;

            self.close=function close (){
                $rootScope.eleShow=false;
            };

            $scope.$on('alertEvt',function(e,txt){
                self.txt=txt;
                $rootScope.eleShow=true;

                $timeout(self.close,2000);
            });
        }]
    });
