//service & filter
app.factory('urlObjToStr',function(){
    return function(ipt){
        var pStr='';
        for (i in ipt){
            pStr+=i+'='+ipt[i]+'&';
        }
        return pStr.substring(0,pStr.length-1);
    }
});
app.factory('urlStrToObj',[function(){
    return function (url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
            arr_url = reg_url.exec(url),
            ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;
    }
}]);
app.factory('splitUrlParam',function(){
    //**比较通用的正则表达式，捕获url各个部分。
    //**注意各部分基本上都包含了相应的符号，例如端口号如果捕获成功，那就是':80'
    //**函数返回一个正则表达式捕获数组。
    //**注意，现在获得的是一个数组，所以需要通过arr[i]的方式引用。
    //**正则表达式所有的匹配说明::
    //**$0
    //**整个url本身。如果$0==null，那就是我的正则有意外，未捕获的可能。
    //**有一种未捕获的情况已经被发现，那就是域名后面没有以'/'结尾，如：'http://localhost'
    //**但是经过我的测试，IE和firefox会自动把域名后面加上'/'的。
    //**$1-$4  协议，域名，端口号，还有最重要的路径path！
    //**$5-$7  文件名，锚点(#top)，query参数(?id=55)
    //**
    return function(url) {
        console.log(url);
        var re = /(\w+):\/\/([^\:|\/]+)(\:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i;
        var arr = url.match(re);
        console.log(arr);
        return arr[1]+'://'+arr[2]+arr[4]+arr[5];
    }
});
//也许factory和filter的区别只有:一个只能在js中使用,一个可以在js和view中使用.
app.filter('toNum',function(){
    return function(ipt){
        return parseInt(ipt);
    }
});
app.filter('toTimestamp',function(){
    return function(str){
        var date = new Date( str.replace(/-/g,'/') ); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
        var time = date.getTime();
        return time;
    }
});

//communicate
app.factory('crossGet',['$http','$q','urlObjToStr',function($http,$q,urlObjToStr){
    return function(hst,rt,p){
        var deferred=$q.defer();
        var pm=deferred.promise;
        var pStr;

        p ? pStr=urlObjToStr(p) : pStr='';
        rt= rt || '';

        $http({
            method:'jsonp',
            url:hst+rt+'?'+pStr,
            async:false,
        }).then(function(res){
            deferred.resolve(res);
        },function(){
            deferred.reject();
        });
        return pm;
    };
}]);
app.factory('create',['$http','$q',function($http,$q){
    return function(hst,rt,p){
        var deferred=$q.defer();
        var pm=deferred.promise;

        $http({
            url:hst+rt,
            method:'post',
            data:p
        }).then(function(res){
            deferred.resolve(res);
        },function(){
            deferred.reject();
        });
        return pm;
    }
}]);