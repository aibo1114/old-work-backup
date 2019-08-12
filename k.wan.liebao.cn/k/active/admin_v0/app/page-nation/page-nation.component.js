angular.module('pageNation')
    .component('pageNation',{
        templateUrl:'page-nation/page-nation.template.html',
        controller:['$http','$scope','$rootScope',function($http,$scope,$rootScope){
            var self=this;

            self.pageShow=false;

            self.pageCount=2;
            self.cur=1;
            self.url='';

            $scope.$on('pageReady',function(e,rter,total){
                switch (rter) {
                    case 'providers':
                        self.curL='providers';
                        self.url='http://trygame_mgr.web.anqu.com/1/api/supplier/query';
                        break;
                    case 'actives':
                        self.curL='actives';
                        self.url='http://trygame_mgr.web.anqu.com/1/api/activity/query';
                        break;
                }

                self.total=total;
                self.total>self.pageCount ? self.pageShow=true : self.pageShow=false
                self.num=[];
                self.lst=Math.ceil(self.total/self.pageCount);

                for(var i=1;i<=self.lst;i++){
                    self.num.push(i);
                }
                self.effect();
            });

            self.sendReq = function sendReq (ndx){
                $http.jsonp(self.url+'?page_size='+self.pageCount+'&page_index='+ndx+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        if(res.ret==1){
                            self.cur=ndx;
                            self.data=res.data;
                            $rootScope.$broadcast('page',self.curL,self.data);
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    });
            };

            self.effect = function effect (){
                $('.pagination .num:eq('+(self.cur-1)+')').addClass('active').siblings('.num').removeClass('active');
                if (self.cur==1){
                    $('.pagination .up').addClass('disabled');
                }else{
                    $('.pagination .up').removeClass('disabled');
                }
                if (self.cur==self.lst){
                    $('.pagination .down').addClass('disabled');
                }else{
                    $('.pagination .down').removeClass('disabled');
                }
            };

            self.sendNum = function sendNum (ndx){
                self.cur=ndx;
                self.sendReq(ndx);
                self.effect();
            };


            self.sendUp=function sendUp (){
                if(self.cur-1<=0) return false;

                self.cur--;
                self.sendReq(self.cur);
                self.effect();
            };

            self.sendDown=function sendDown (){
                if(self.cur+1>self.lst) return false;

                self.cur++;
                self.sendReq(self.cur);
                self.effect();
            };
        }]
    });