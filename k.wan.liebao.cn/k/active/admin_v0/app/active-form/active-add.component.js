angular.module('activeForm')
    .component('activeAdd',{
        templateUrl:'active-form/active-form.template.html',
        controller:['$http','$filter','$rootScope',function activeAdd ($http,$filter,$rootScope){
            var self=this;

            $rootScope.$broadcast('routerActive','actives');

            self.title='新增活动';
            self.active={
                State:'0'
            };
            self.active.Detail=[];

            self.goBack=function goBack (){
                window.history.back();
            };
            self.fmtDate=function fmtDate (tm){
                var fmt=$filter('date')(tm, 'yyyy-MM-dd HH:mm:ss');
                return fmt;
            };
            self.addItem=function addItem (){
                self.active.Detail.splice(self.active.Detail.length+1,0,{Level:'',Money:'',Remark:''});
            };
            self.deleteItem=function deleteItem(it){
                self.active.Detail.splice(self.active.Detail.indexOf(it), 1);
            };

            self.sendActive=function(){
                self.parm={};
                for (k in self.active){
                    self.parm[k]=self.active[k];
                }

                console.log(self.active);

                self.parm.BeginTime=self.fmtDate(self.parm.BeginTime);
                self.parm.EndTime=self.fmtDate(self.parm.EndTime);


                var q=JSON.stringify(self.parm, function (key, val) {
                    if (key == '$$hashKey') {
                        return undefined;
                    }
                    return val;
                });

                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/activity/add?activity='+q+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        console.log(res);
                        if (res.ret==1){
                            window.history.back();
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    });
            };
        }]
    });