angular.module('activeForm')
    .component('activeEdit',{
        templateUrl:'active-form/active-form.template.html',
        controller:['$http','$routeParams','$filter','$rootScope',function activeEdit ($http,$routeParams,$filter,$rootScope){
            var self=this;

            $rootScope.$broadcast('routerActive','actives');

            self.title='编辑活动';

            self.fmtDate=function fmtDate (tm){
                var fmt=$filter('date')(tm, 'yyyy-MM-dd HH:mm:ss');
                return fmt;
            };
            self.goBack=function goBack (){
                window.history.back();
            };
            self.addItem=function addItem (){
                self.active.Detail.splice(self.active.Detail.length+1,0,{Level:'',Money:'',Remark:''});
            };
            self.deleteItem=function deleteItem(it){
                self.active.Detail.splice(self.active.Detail.indexOf(it), 1);
            };

            self.sendActive = function sendActive (){
                self.parm={};
                for (k in self.active){
                    self.parm[k]=self.active[k];
                }
                self.parm.BeginTime=self.fmtDate(self.parm.BeginTime);
                self.parm.EndTime=self.fmtDate(self.parm.EndTime);

                var q=JSON.stringify(self.parm, function (key, val) {
                    if (key == '$$hashKey') {
                        return undefined;
                    }
                    return val;
                });
                console.log(q);

                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/activity/modify?activity='+q+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        if(res.ret==1){
                            self.goBack();
                        }
                    });
            };

            $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/activity/query?activity_id='+$routeParams.aId+'&callback=JSON_CALLBACK')
                .success(function(res){
                    console.log(res);
                    if(res.ret!=1) return;

                    self.active=res.data[0];
                    self.active.BeginTime=new Date(self.active.BeginTime);
                    self.active.EndTime=new Date(self.active.EndTime);

                    if(!self.active.Detail || self.active.Detail.length==0){
                        self.active.Detail=[];
                    }
                });
        }]
    });