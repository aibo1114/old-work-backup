angular.module('orderList')
    .component('orderList',{
        templateUrl:'order-list/order-list.template.html',
        controller:['$http','$filter','$rootScope',function($http,$filter,$rootScope){
            var self=this;

            $rootScope.$broadcast('routerActive','orders');

            self.parm={};
            self.sum=0;

            self.fmtDate=function fmtDate (tm){
                var fmt=$filter('date')(tm, 'yyyy-MM-dd HH:mm:ss');
                return fmt;
            };

            self.urlEncode = function urlEncode (param, key, encode) {
                if(param==null) return '';
                var paramStr = '';
                var t = typeof (param);
                if (t == 'string' || t == 'number' || t == 'boolean') {
                    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
                } else {
                    for (var i in param) {
                        var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                        paramStr += urlEncode(param[i], k, encode);
                    }
                }
                return paramStr;
            };

            self.sendOrder = function sendOrder (){
                var q='';
                self.q={};

                for (k in self.parm){
                    self.q[k]=self.parm[k];
                }

                self.q.begin=self.fmtDate(self.q.begin);
                self.q.end=self.fmtDate(self.q.end);

                q=self.urlEncode(self.q);

                console.log(q);

                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/order/query?callback=JSON_CALLBACK&page_size=15&page_index=1'+q)
                    .success(function(res){
                        console.log(res);
                        if(res.ret!=1) return false;
                        self.orders=res.data;

                        self.sum=0;
                        for(var i=0;i<self.orders.length;i++){
                            self.sum+=parseInt(self.orders[i].Money);
                        }
                    });
            };
        }]
    });