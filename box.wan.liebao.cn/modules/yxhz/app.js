var app=angular.module('yxhz',[
    'ngRoute',
    'ngAnimate',
    'wgs',
    'games',
    'home',
    'integral',
    'package',
    'jQueryScrollbar'
]);
//fetch data
//fetch end
app.directive('hoverClass', function () {
    return {
        restrict: 'A',
        scope: {
            hoverClass: '@'
        },
        link: function (scope, element) {
            element.on('mouseenter', function() {
                element.addClass(scope.hoverClass);
            });
            element.on('mouseleave', function() {
                element.removeClass(scope.hoverClass);
            });
        }
    };
});
app.directive('focusClass',function(){
    return {
        restrict:'A',
        scope:{
            focusClass:'@'
        },
        link:function(scope,element){
            element.on('focus', function() {
                element.addClass(scope.focusClass).siblings('.input-group-btn').find('.btn').addClass(scope.focusClass);
            });
            element.on('blur', function() {
                element.removeClass(scope.focusClass).siblings('.input-group-btn').find('.btn').removeClass(scope.focusClass);
            });
        }
    }
});
app.filter('unique',function(){
    return function (array){
        var arr = [];//临时数组
        for(var i = 0;i < array.length; i++){
            if(arr.indexOf(array[i]) == -1) arr.push(array[i]);
        }
        return arr;
    }
});
//使用这个filter匹配过滤allGames源数据
app.filter('gids',['dictionary','uniqueFilter',function(dictionary,uniqueFilter){
    //gid ：用来在选中成功时，匹配到allGames的数据源
    //exact :2字；blur:1字；all：单个元素全部匹配 (如果有用户拼错的情况，总能拼对一个吧，就可以了)
    //多音字 或者 发音不准 怎么办
    return function(ipt){
        var arr=[];
        for (k in dictionary){
            var allArr=dictionary[k].all.split(',');
            var allStr=dictionary[k].all.replace(/\,/g,'');
            if (!ipt) return [];
            if( dictionary[k].blur.indexOf(ipt)!= -1 || ipt.indexOf(dictionary[k].blur)!= -1 ){
                arr.push(k);
                continue;
            }
            if(ipt.length>=2 && ( dictionary[k].exact.indexOf(ipt)!= -1 || ipt.indexOf(dictionary[k].exact)!= -1) ){
                arr.push(k);
                continue;
            }
            if(ipt.length>=4 && (allStr.indexOf(ipt)!= -1 || ipt.indexOf(allStr)!= -1) ){
                arr.push(k);
                continue;
            }
            for (var i=0;i<allArr.length;i++){
                if( ipt== allArr[i]) {
                    // if( ipt.indexOf( dictionary[k].all[i] )!= -1 ) {
                    arr.push(k);
                }
            }
        }
        arr=uniqueFilter(arr);
        return arr;
    }
}]);
app.filter('displayGames',['gidsFilter',function(gidsFilter){
    return function(ipt,data){
        var gids=gidsFilter(ipt);
        var arr=[];

        if(gids.length==0) return null;

        for(var i=0;i<gids.length;i++){
            for (var x=0;x<data.length;x++){
                if ( gids[i]==data[x].gid ) arr.push(data[x]);
            }
        }
        return arr;
    };
}]);
app.controller('loginController',['$scope',function($scope){
    //客户端登录和ks_user是否同步
    !ks_user || ks_user.length == 0 ? $scope.isLogin=false : $scope.isLogin=true;
}]);
app.controller('allGames',['getAllGames','$scope','$rootScope','displayGamesFilter','$location','$anchorScroll','$timeout',function(getAllGames,$scope,$rootScope,displayGamesFilter,$location,$anchorScroll,$timeout){

    $rootScope.pickerShow=false;

    getAllGames().then(function(response){
        var games=response.data.data.games;
        // var games=response.data.data.games.reverse();
        $scope.allGames=[];
        $scope.dftImgSrc='test';
        $rootScope.allGames=[];
        $rootScope.displayGames=[];
        for (var i=0;i<games.length;i++){
            if(games[i].visible){
                $scope.allGames.push(games[i]);
                $rootScope.allGames.push(games[i]);
                $rootScope.displayGames.push(games[i]);
            }
        }
        // $rootScope.kw = '';
        $scope.auto=false;
        $rootScope.$broadcast('gamesReady');
    });

    //pickServer
    $scope.pickServer=function(gid){
        if(!ks_user || ks_user.length==0 ){
            window.external.call('kieframe','relogin','');
            return false;
        }
        $rootScope.gid=gid;
        $rootScope.pickerShow=true;
    };
    //search
    $scope.sideSearch=function(kw){
        kw=='clears' ? $rootScope.kw=jQuery('#sideSer').val() : $rootScope.kw=kw || jQuery('#sideSer').val();
        if($location.path()!='/'){
            if(window.external ){
                window.external.call('kieframe','sethomepageindex','{index:1}');
            }
            $location.path('/');
        }
        $rootScope.$broadcast('sKw',$rootScope.kw);
        $scope.auto=false;
    };
    $scope.mainSearch=function(kw){
        kw=='clears' ? $rootScope.kw=jQuery('#mainSer').val() : $rootScope.kw=kw || jQuery('#mainSer').val();
        $rootScope.$broadcast('mKw',$rootScope.kw);
        $scope.auto=false;
    };
    $scope.clear=function(){
        $scope.mainSearch('clears');
        $rootScope.serResult=false;
    };

    //keyup一个函数
    $scope.autoGames=function(e){
        var id=jQuery(e.target).attr('id');
        var v=jQuery(e.target).val();
        var autoItmes=displayGamesFilter($scope.kw,$scope.allGames);
        $scope.autoItems=autoItmes;
        $rootScope.kw=v;
        if(!v) $scope.clear();
        if(!autoItmes){
            if(id=='sideSer') $rootScope.serResult=false;
            $scope.auto=false;
        }else {
            $scope.auto=true;
        }
    };
}]);


$(document).on('click','a',function(e){
    if(!ks_user || ks_user.length==0 ){
        e.preventDefault();
        window.external.call('kieframe','relogin','');
    }
});

$(document).on('mouseenter','.li-main-servers',function(){
    $(this).addClass('hover-main-servers').siblings('.li-main-servers').removeClass('hover-main-servers');
});


//allGames controller 的废弃
// $rootScope.displayGames=$scope.allGames;
//3个事件一个数据
//表单提交和点击联想下拉项是一个函数
/*
 $scope.searchGames=function(itemName){
 // console.log(itemName);
 var displayGames=null;
 $rootScope.kw=itemName || $rootScope.kw;
 // $scope.kw=itemName || $rootScope.kw;
 // $rootScope.kw=$scope.kw;

 displayGames=displayGamesFilter($rootScope.kw,$scope.allGames);

 if(displayGames){
 $rootScope.displayGames=displayGames;
 }else{
 $rootScope.displayGames=$scope.allGames;
 }
 if($location.path()!='/'){
 $location.path('/');
 }
 $scope.auto=false;

 };
 */