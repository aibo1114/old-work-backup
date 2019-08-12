clockApp.factory('list',['$q','$http',function($q,$http){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        var r=Math.random();
        $http({
            method:'jsonp',
            url:'http://box.wan.liebao.cn/1/api/alarm?callback=JSON_CALLBACK&v='+r
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    };
}]);
clockApp.factory('add',['$q','$http',function($q,$http){
    return function(parm){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'post',
            url:'http://box.wan.liebao.cn/1/api/alarm',
            data:parm
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });

        return p;
    };
}]);

clockApp.factory('edit',['$q','$http',function($q,$http){
    return function(parm){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'put',
            url:'http://box.wan.liebao.cn/1/api/alarm',
            data:parm,
            headers:{'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });

        return p;
    };
}]);

clockApp.factory('deleteClock',['$q','$http',function($q,$http){
    return function(id){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'delete',
            url:'http://box.wan.liebao.cn/1/api/alarm?id='+id
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });

        return p;
    };
}]);

clockApp.factory('allGames',['$q','$http',function($q,$http){
    return function(){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://api.wan.liebao.cn/game/list/2?callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);

clockApp.factory('allServers',['$q','$http',function($q,$http){
    return function(gid){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://api.wan.liebao.cn/game/server/list/2?gid='+gid+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(res){
            deferred.reject();
        });
        return p;
    }
}]);