angular.module('exsrv',[])
    .factory('urlObjToStr',function(){
        return function(ipt){
            var pStr='';
            for (i in ipt){
                pStr+=i+'='+ipt[i]+'&';
            }
            return pStr.substring(0,pStr.length-1);
        }
    })
    .factory('httpGet',['$http','$q','urlObjToStr',function($http,$q,urlObjToStr){
        return function(adrs, cros, p){
            var deferred=$q.defer();
            var pm=deferred.promise;
            var pStr,m,r=Math.random();

            cros ? m='jsonp' : m='get';
            p ? pStr=encodeURI( urlObjToStr(p) ) : pStr='';

            $http({
                method: m,
                url: adrs +'?'+pStr+'&r='+r,
                async: false
            }).then(function(res){
                deferred.resolve(res);
            },function(){
                deferred.reject();
            });
            return pm;
        };
    }])
    .factory('httpPost',['$http','$q',function($http,$q){
        return function(adrs,p){
            var deferred=$q.defer();
            var pm=deferred.promise;

            $http({
                url:adrs,
                method:'post',
                data:p
            }).then(function(res){
                deferred.resolve(res);
            },function(){
                deferred.reject();
            });
            return pm;
        }
    }])
    .filter('toTimestamp',function(){
        return function(str){
            console.log(str);
            var date = new Date( str.replace(/-/g,'/') ); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
            var time = date.getTime()/1000;
            console.log(date);
            console.log(date.getTime());
            return time;
        }
    })
    .filter('objKn2str',function(){
        return function(obj){
            var out={};
            for (var k in obj){
                typeof obj[k] == 'number' ? out[k]=obj[k].toString() : out[k]=obj[k];
            }
            return out;
        }
    });