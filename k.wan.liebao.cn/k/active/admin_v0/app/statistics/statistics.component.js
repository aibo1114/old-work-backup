angular.module('sList')
    .component('sList',{
        templateUrl:'statistics/statistics.template.html',
        controller:['$http','$rootScope',function($http,$rootScope){
            var self=this;

            $rootScope.$broadcast('routerActive','statistics');

            self.parm={};
            self.sum=0;

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

            self.sendStatistics=function sendStatistics (){
                var q=self.urlEncode(self.parm);

                console.log(q);

                $http.jsonp('http://trygame_mgr.web.anqu.com/1/api/statistics/query?callback=JSON_CALLBACK&page_size=15&page_index=1'+q)
                    .success(function(res){
                        console.log(res);
                        if(res.ret!=1) return;

                        self.statistics=res.data;

                        self.sum=0;
                        for(var i=0;i<self.statistics.length;i++){
                            self.sum+=parseInt(self.statistics[i].Money);
                        }
                    });
            };
        }]
    });