app.service('readStatus',['$http','$q',function($http,$q){
    return function(){
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://news.wan.liebao.cn/message/api/1/get_count_info?plat_id=1&plat_sub_id=1&sign_type=2&v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    };
}]);
app.service('systemList',['$http','$q',function($http,$q){
    return function(ndx){
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://news.wan.liebao.cn/message/api/1/get_message_list?plat_id=1&plat_sub_id=1&page_size=4&page_index='+ndx+'&type=1&v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    };
}]);
app.service('activeList',['$http','$q',function($http,$q){
    return function(ndx){
        var r=Math.random();
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://news.wan.liebao.cn/message/api/1/get_message_list?plat_id=1&plat_sub_id=1&page_size=4&page_index='+ndx+'&type=2&v='+r+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    };
}]);
app.service('putRead',['$http','$q',function($http,$q){
    return function (mid){
        var deferred=$q.defer();
        var p=deferred.promise;
        $http({
            method:'jsonp',
            url:'http://news.wan.liebao.cn/message/api/1/message_read?plat_id=1&plat_sub_id=1&message_id='+mid+'&callback=JSON_CALLBACK'
        }).then(function(res){
            deferred.resolve(res);
        },function(err){
            deferred.reject();
        });
        return p;
    }
}]);