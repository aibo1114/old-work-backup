angular.module('providerList')
    .component('providerList',{
        templateUrl:'provider-list/provider-list.template.html',
        controller:['$http','$rootScope','$scope',function providerListController ($http,$rootScope,$scope){
            var self=this;

            $rootScope.$broadcast('routerActive','providers');

            self.stash=function stash (it){
                self.stashData=it;
            };

            self.del = function del (it){
                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/delete?supplier_id='+it.SupplierID+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        console.log(res);
                        if(res.ret==1){
                            self.providers.splice(self.providers.indexOf(it), 1);
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    });
            };

            $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/query?page_size=2&page_index=1&callback=JSON_CALLBACK')
                .success(function(res){
                    console.log(res);
                    self.providers=res.data;
                    self.total=parseInt(res.total_count);

                    $rootScope.$broadcast('pageReady','providers',self.total);
                })
                .error(function(err){
                    console.log(err);
                });

            $scope.$on('page',function(e,curP,data){
               if(curP=='providers'){
                   self.providers=data;
               }
            });
        }]
});


/*
 self.releaseThis = function (sid,state,it){
 state=='0' ? state='1' : state='0'
 $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/modify_state?supplier_id='+sid+'&state='+state+'&callback=JSON_CALLBACK')
 .success(function(res){
 console.log(res);
 if(res.ret==1){
 self.providers[self.providers.indexOf(it)].SupplierState=state;
 }
 })
 .error(function(err){
 console.log(err);
 });
 };
 */