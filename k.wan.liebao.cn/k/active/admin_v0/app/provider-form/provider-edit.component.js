angular.module('providerForm').component('providerEdit',{
    templateUrl:'provider-form/provider-form.template.html',
    controller:['$http','$routeParams','$rootScope',function($http,$routeParams,$rootScope){
        var self=this;

        $rootScope.$broadcast('routerActive','providers');

        self.title='编辑厂商';

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

            $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/modify?supplier='+q+'&callback=JSON_CALLBACK')
                .success(function(res){
                    console.log(res);
                    console.log(q);
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


        $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/supplier/query?supplier_id='+$routeParams.pId+'&callback=JSON_CALLBACK')
            .success(function(res){
                console.log(res);
                if(res.ret!=1) return;

                self.provider=res.data[0];

                if(!self.provider.Sources || self.provider.Sources.length==0){
                    self.provider.Sources=[];
                }
            })
            .error(function(err){
                console.log(err);
            });
    }]
});