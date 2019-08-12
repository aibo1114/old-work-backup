angular.module('activeList').
    component('activeList',{
        templateUrl:'active-list/active-list.template.html',
        controller:['$http','$rootScope','$scope',function activeList ($http,$rootScope,$scope){
            var self=this;

            $rootScope.$broadcast('routerActive','actives');

            self.stash=function stash (it){
                self.stashData=it;
            };

            self.release = function (it){
                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/activity/pub?activity_id='+it.ActivityID+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        console.log(res);
                        if(res.ret==1){
                            //self.actives[self.actives.indexOf(it)].State='1';
                            $rootScope.$broadcast('alertEvt','发布');
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    });
            };

            self.del = function del (it){
                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/activity/delete?activity_id='+it.ActivityID+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        console.log(res);
                        if(res.ret==1){
                            self.actives.splice(self.actives.indexOf(it), 1);
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    });
            };

            $scope.$on('page',function(e,curP,data){
                if(curP=='actives'){
                    self.actives=data;
                }
            });

            $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/activity/query?page_size=2&page_index=1&callback=JSON_CALLBACK')
                .success(function(res){
                    console.log(res);
                    if(res.ret==1){
                        self.actives=res.data;
                        self.total=parseInt(res.total_count);
                        $rootScope.$broadcast('pageReady','actives',self.total);
                    }
                });
        }]
    });