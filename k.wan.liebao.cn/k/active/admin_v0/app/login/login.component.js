angular.module('login')
    .component('login',{
        templateUrl:'login/login.template.html',
        controller:['$http','$rootScope',function($http,$rootScope){

            var self=this;

            self.loginApp=function loginApp ($event){
                $event.stopPropagation();
                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/admin/login?username='+self.account+'&password='+self.pwd+'&callback=JSON_CALLBACK').success(function(res){
                    console.log(res);
                    if(res.ret!=1) return false;
                    $rootScope.$broadcast('admin-login');
                    $rootScope.isUserAuth=true;
                });
            }


        }]
    });