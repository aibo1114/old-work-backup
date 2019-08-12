var games=angular.module('games',[]);
//filter
// games.filter('transformPlayed',[function(){
//     return function(data){
//         var arr=[];
//         for (var i=0;i<data.length;i++){
//             if (data[i].servers && data[i].servers.length){
//                 for (var x=0;x<data[i].servers.length;x++){
//                     var obj={};
//                     obj.gid=data[i].gid;
//                     obj.gname=data[i].game_name;
//                     obj.sname=data[i].servers[x].server_name;
//                     obj.sid=data[i].servers[x].sid;
//                     obj.lname=data[i].servers[x].line_name;
//                     obj.icon=data[i].icon || '';
//                     obj.icon='http://image.wan.liebao.cn/www/images/game/'+data[i].game_alias+'/20x20_logo.jpg';
//                     arr.push(obj);
//                 }
//             }
//         }
//         return arr;
//     }
// }]);
games.filter('transformPlayed',[function(){
    return function(data){
        var arr=[];
        if(data){
            for (var i=0;i<data.length;i++){
                data[i].icon='http://box.wan.liebao.cn/modules/yxhz/images/played/'+data[i].game_alias+'.png';
                // data[i].icon='http://image.wan.liebao.cn/www/images/game/'+data[i].game_alias+'/20x20_logo.jpg';
                arr.push(data[i]);
            }
        }

        return arr;
    }
}]);

games.controller('games',['played','recommend','toOpen','lately','clockList','setSclock','$scope','$rootScope','limitToFilter','transformPlayedFilter',function(played,recommend,toOpen,lately,clockList,setSclock,$scope,$rootScope,limitToFilter,transformPlayedFilter){
    played().then(function (res) {
        var played=null;
        played=transformPlayedFilter(res);
        // played=transformPlayedFilter(res.data);
        $scope.played=limitToFilter(played,7);
    });
    recommend().then(function(res){
        // console.log(res.data);
        $scope.recommend=limitToFilter(res.data,3);
    });

    toOpen().then(function(res){
        $scope.toOpen=res.data.data.servers;
        for (var i=0;i<$scope.toOpen.length;i++){
            var d=moment($scope.toOpen[i].START_TIME).format('MM-DD HH:mm');
            $scope.toOpen[i].uiTime=d;
        }
        $rootScope.$broadcast('dataGeted');
        //查看是否设置闹钟
        clockList().then(function(res){
            // console.log(res.data.data);
            if(res.data.ret==1){
                for (var i=0;i<res.data.data.length;i++){
                    var gid=res.data.data[i].game_id;
                    var sid=res.data.data[i].server_id;
                    for (var x=0;x<$scope.toOpen.length;x++){
                        if($scope.toOpen[x].GAME_ID==gid && $scope.toOpen[x].SID==sid){
                            $scope.toOpen[x].isClock=1;
                        }
                    }
                }
                // console.log($scope.toOpen);
            }
        });
    });
    lately().then(function(res){
        $scope.lately=res.data.data.servers;
        for (var i=0;i<$scope.lately.length;i++){
            var d=moment($scope.lately[i].START_TIME).format('MM-DD HH:mm');
            $scope.lately[i].START_TIME=d;
        }
        $rootScope.$broadcast('dataGeted');
    });
    $scope.perPage=5;
    $scope.currentPage=0;

    $scope.tabUrl='tpl/yxhz/fragment/toOpen.html';
    $scope.tabs=[
        {title:'新服预告',url:'tpl/yxhz/fragment/toOpen.html'},
        {title:'已开新服',url:'tpl/yxhz/fragment/lately.html'}
    ];
    $scope.switchTab=function(tabUrl){
        $scope.tabUrl=tabUrl;
    };
    $scope.isCurrent=function(tabUrl){
        return tabUrl==$scope.tabUrl;
    };

    $scope.gotoGame=function(gid,sid){
        // window.external.opentab('1','http://wan.liebao.cn/game_frame/wd_play_'+gid+'.php?sid='+sid+'&wd_entergame=1');
    };
    $scope.addClock=function(it){
        // console.log(it.START_TIME);
        if(!ks_user || ks_user.length==0 ){
            window.external.call('kieframe','relogin','');
            return false;
        }

        setSclock({
            type:1,
            game_id:it.GAME_ID,
            game_name:it.GAME_NAME,
            server_id:it.SID,
            server_name:it.LINE_NAME,
            date:'once',
            time:it.START_TIME
        }).then(function(res){
            // console.log(res.data);
            if(res.data.ret==1){
                it.isClock=1;
                if(window.external){
                    window.external.call('kieframe','notifyalarm','');
                }
            }
        },function(err){});
    };

}]);