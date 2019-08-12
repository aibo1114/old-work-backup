angular.module('providerForm')
    .component('providerAdd',{
        templateUrl:'provider-form/provider-form.template.html',
        controller:['$http','$rootScope',function($http,$rootScope){
            var self=this;

            $rootScope.$broadcast('routerActive','providers');

            self.provider={
                SupplierState:'1'
            };
            self.title='新增厂商';

            self.provider.Sources=[];

            self.stash=function stash (opt){
                self.stashData=opt;
                console.log(self.stashData);
            };
            self.addItem=function addItem (){
                self.provider.Sources.splice(self.provider.Sources.length + 1, 0,{Source:'',Remark:''});
            };
            self.deleteItem=function deleteItem(it){
                self.provider.Sources.splice(self.provider.Sources.indexOf(it), 1);
            };
            self.modifyState = function (state){
                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/modify_state?supplier_id='+self.provider.SupplierID+'&state='+state+'&callback=JSON_CALLBACK')
                    .success(function(res){
                        console.log(res);
                        if(res.ret==1){
                            self.provider.SupplierState=state;
                        }
                    })
                    .error(function(err){
                        console.log(err);
                    });
            };

            self.sendProvider=function sendProvider (){
                var q=JSON.stringify(self.provider, function (key, val) {
                    if (key == '$$hashKey') {
                        return undefined;
                    }
                    return val;
                });
                console.log(q);
                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/add?supplier='+q+'&callback=JSON_CALLBACK')
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

            self.goBack=function goBack (){
                window.history.back();
            };
        }]
    });
