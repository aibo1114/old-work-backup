var clockApp=angular.module('clock',[
    'ngRoute',
    'jQueryScrollbar'
]);
clockApp.directive('hoverClass', function () {
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
clockApp.directive('focusClass',function(){
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

clockApp.filter('enDate',function(){
    return function(ipt){
        var iptArr=ipt.split(',');
        var arr=[];
        for (var i=0;i<iptArr.length;i++){
            switch (iptArr[i]){
                case '星期日' :
                    arr.push('Sunday');
                    break;
                case '星期一' :
                    arr.push('Monday');
                    break;
                case '星期二' :
                    arr.push('Tuesday');
                    break;
                case '星期三' :
                    arr.push('Wednesday');
                    break;
                case '星期四' :
                    arr.push('Thursday');
                    break;
                case '星期五' :
                    arr.push('Friday');
                    break;
                case '星期六' :
                    arr.push('Saturday');
                    break;
                default:
                    break;
            }
        }
        return arr;
    };
});
clockApp.filter('deDate',function(){
    return function(iptArr){
        var arr=[];
        var str='';
        for (var i=0;i<iptArr.length;i++){
            switch (iptArr[i]) {
                case 'Sunday':
                    arr.push('星期日');
                    break;
                case 'Monday':
                    arr.push('星期一');
                    break;
                case 'Tuesday':
                    arr.push('星期二');
                    break;
                case 'Wednesday':
                    arr.push('星期三');
                    break;
                case 'Thursday':
                    arr.push('星期四');
                    break;
                case 'Friday':
                    arr.push('星期五');
                    break;
                case 'Saturday':
                    arr.push('星期六');
                    break;
                default:
                    break;
            }
        }
        str=arr.join(',');
        return str;
    };
});

clockApp.controller('clockList',['$scope','list','$rootScope','deleteClock','$route',function($scope,list,$rootScope,deleteClock,$route){
    $scope.hasClock=true;
    list().then(function(res){
        if(res.data.ret==1){
            if(res.data.data && res.data.data.length!=0){
                $scope.hasClock=true;
                for(var i=0;i<res.data.data.length;i++){
                    // console.log(res.data.data[i]);
                    res.data.data[i].type==1 ? res.data.data[i].icon='http://box.wan.liebao.cn/modules/yxhz/images/icon-cg.png' :  res.data.data[i].icon='http://box.wan.liebao.cn/modules/yxhz/images/icon-cc.png';
                    res.data.data[i].date=='仅一次' || res.data.data[i].date=='once' ? res.data.data[i].uiTime=moment(res.data.data[i].time).format('MM-DD HH:mm') : res.data.data[i].uiTime=res.data.data[i].time.substring(0,5);
                }
                $scope.list=res.data.data;
            }else{
                $scope.hasClock=false;
            }

        }
    });

    $scope.edit = function (id){
        var data={};
        for( var i =0;i<$scope.list.length;i++){
            if(id==$scope.list[i].id){
                data=$scope.list[i];
            }
        }
        $rootScope.$broadcast('edit',data);
        // window.external.setalarmwnd({"longwnd":"0"});
    };

    $scope.deleteClock=function(id){
        deleteClock(id).then(function(res){
            if(res.data.ret==1) {
                // window.external.call('kieframe','notifyalarm','');
                list().then(function(res){
                    if(res.data.ret==1){
                        // res.data.data && res.data.data.length!=0 ? $scope.hasClock=true :  $scope.hasClock=false;
                        if(  res.data.data && res.data.data.length!=0 ){
                            $scope.hasClock=true;
                            for(var i=0;i<res.data.data.length;i++){
                                // console.log(res.data.data[i]);
                                res.data.data[i].type==1 ? res.data.data[i].icon='http://box.wan.liebao.cn/modules/yxhz/images/icon-cg.png' :  res.data.data[i].icon='http://box.wan.liebao.cn/modules/yxhz/images/icon-cc.png';
                                res.data.data[i].date=='仅一次' || res.data.data[i].date=='once' ? res.data.data[i].uiTime=moment(res.data.data[i].time).format('MM-DD HH:mm') : res.data.data[i].uiTime=res.data.data[i].time.substring(0,5);
                            }
                        }else{
                            $scope.hasClock=false;
                        }
                        $scope.list=res.data.data;
                    }
                });
                if(window.external){
                    window.external.call('kieframe','notifyalarm','');
                }
            }
        });
    };

    $scope.$on('edit',function(e,data){
        $scope.data=data;
        if(data.type==1){
            $scope.editService=true;
            $scope.editCustom=false;
        }
        if(data.type==2){
            $scope.editCustom=true;
            $scope.editService=false;
        }
    });
}]);
clockApp.controller('serverEditor',['$scope','allGames','allServers','hh','mm','enDateFilter','deDateFilter',function($scope,allGames,allServers,hh,mm,enDateFilter,deDateFilter){
    $scope.game='';
    $scope.server='';
    $scope.gid='';
    $scope.sid='';
    $scope.cid='';
    $scope.desc='';
    $scope.time='';
    $scope.date='仅一次';
    $scope.dateArr=[];
    $scope.hh='00时';
    $scope.mm='00分';
    $scope.hhIts=hh();
    $scope.mmIts=mm();
    $scope.errTip='';
    $scope.gstatus=false;
    $scope.dstatus=false;
    $scope.sstatus=false;
    $scope.hstatus=false;
    $scope.mstatus=false;
    $scope.rst='添加';


    $scope.$on('edit',function(e,data){
        //这里type不对，不是开服闹钟，开服闹钟也不该在页面的闹钟列表里；需要全部是自定义闹钟（因为页面控件的有不同，最好增加一个新的type）
        $scope.rst='修改';
        $scope.game=data.game_name;
        $scope.gid=data.game_id;
        $scope.server=data.server_name;
        $scope.sid=data.server_id;
        $scope.cid=data.id;
        $scope.desc=data.desc;
        $scope.date=data.date;
        $scope.dateArr=enDateFilter($scope.date);
        $scope.time=data.time;
        $scope.hh=hh($scope.time);
        $scope.mm=mm($scope.time);
        allServers($scope.gid).then(function(res){
            $scope.servers=res.data.data.servers;
        });
    });

    $scope.gameTxt=function(){
        return $scope.game || '请选择游戏';
    };
    $scope.serverTxt=function(){
        return $scope.server || '请选择区服';
    };
    $scope.switchGame=function(){
        $scope.gstatus= !$scope.gstatus;
    };
    $scope.switchServer=function(){
        if(!$scope.gid){
            $scope.errTip='请选择游戏';
            return;
        }
        $scope.errTip='';
        $scope.sstatus= !$scope.sstatus
    };
    $scope.switchTime=function(t){
        if(t=='h') $scope.hstatus= !$scope.hstatus;
        if(t=='m') $scope.mstatus= !$scope.mstatus;
    };
    $scope.switchDate=function(){
        $scope.dstatus = !$scope.dstatus;
    };
    $scope.setOnce=function(){
        $scope.date='仅一次';
        $scope.dateArr=[];
        $scope.dstatus=false;
    };
    $scope.checkDate=function(d){
        $scope.dateArr.indexOf(d)>-1 ? $scope.dateArr.remove(d) : $scope.dateArr.push(d);
        $scope.date=deDateFilter($scope.dateArr);
    };

    $scope.selectGame=function(n,id){
        $scope.game=n;
        $scope.gid=id;
        $scope.gstatus=false;

        $scope.server='';
        $scope.sid='';
        $scope.errTip='';
        allServers($scope.gid).then(function(res){
            $scope.servers=res.data.data.servers;
        });
    };
    $scope.selectServer=function(n,id){
        $scope.server=n;
        $scope.sid=id;
        $scope.sstatus=false;

    };
    $scope.selectTime=function(v,t){
        if(t=='h') {
            $scope.hh=v;
            $scope.hstatus=false;
        }
        if(t=='m') {
            $scope.mm=v;
            $scope.mstatus=false;
        }
    };
    $scope.clear=function(t){
        if(t=='g'){
            $scope.game='';
            $scope.gid='';
            $scope.gstatus=false;
        }
        $scope.server='';
        $scope.sid='';
        $scope.sstatus=false;
    };

    allGames().then(function(res){
        var getAllGames=res.data.data.games.reverse();
        $scope.games=[];
        for (var i=0;i<games.length;i++){
            if (games[i].visible){
                $scope.games.push(games[i]);
            }
        }
    });
}]);
clockApp.controller('customEditor',['$scope','hh','mm','enDateFilter','deDateFilter','add','edit',function($scope,hh,mm,enDateFilter,deDateFilter,add,edit){
    $scope.cid='';
    $scope.title='';
    $scope.desc='';
    $scope.date='仅一次';
    $scope.dateArr=[];
    $scope.hh='00时';
    $scope.mm='00分';
    $scope.time='';
    $scope.hhIts=hh();
    $scope.mmIts=mm();
    $scope.rst='添加';
    $scope.errTip='';

    $scope.dstatus=false;
    $scope.hstatus=false;
    $scope.mstatus=false;

    $scope.$on('edit',function(e,data){
        $scope.rst='修改';
        $scope.cid=data.id;
        $scope.title=data.title;
        $scope.desc=data.desc;
        $scope.date=data.date;
        $scope.dateArr=enDateFilter($scope.date);
        $scope.time=data.time;
        $scope.hh=hh($scope.time);
        $scope.mm=mm($scope.time);
    });

    $scope.switchDate=function(){
        $scope.dstatus = !$scope.dstatus;
    };
    $scope.switchTime=function(t){
        if(t=='h') $scope.hstatus= !$scope.hstatus;
        if(t=='m') $scope.mstatus= !$scope.mstatus;
    };
    $scope.setOnce=function(){
        $scope.date='仅一次';
        $scope.dateArr=[];
        $scope.dstatus=false;
    };
    $scope.checkDate=function(d){
        $scope.dateArr.indexOf(d)>-1 ? $scope.dateArr.remove(d) : $scope.dateArr.push(d);
        $scope.date=deDateFilter($scope.dateArr);
    };
    $scope.selectTime=function(v,t){
        if(t=='h') {
            $scope.hh=v;
            $scope.hstatus=false;
        }
        if(t=='m') {
            $scope.mm=v;
            $scope.mstatus=false;
        }
    };
}]);
clockApp.controller('serverSubmit',['edit','add','$scope','$location','$route',function(edit,add,$scope,$location,$route){
    $scope.empty=function(){
        if( !$scope.game || !$scope.server ){
            $scope.$parent.errTip='请选择游戏区服';
            return true;
        }
    };
    $scope.submit=function(){
        var empty=$scope.empty();
        var g,s,t,d,gid,sid,data,date,
            ymd=moment().format('YYYY-MM-DD'),
            hh=$scope.hh.substring(0,2),
            mm=$scope.mm.substring(0,2);

        if(empty){
            return false;
        }

        id=$scope.id;
        g=$scope.game;
        s=$scope.server;
        gid=$scope.gid;
        sid=$scope.sid;
        d=$scope.desc;
        // t=ymd + ' '+hh+':'+mm+':00';

        !$scope.dateArr || !$scope.dateArr.length ? date='once' : date=$scope.dateArr.join(',');
        date=='once' ? t=hh+':'+mm : t=hh+':'+mm+':00';
        // date=='once' ? t=ymd+' '+hh+':'+mm+':00' : t=hh+':'+mm+':00';
        data={
            game_name:g,
            game_id:gid,
            server_name:s,
            server_id:sid,
            time:t,
            desc:d,
            date:date,
            type:1
        };
        $scope.rst=='添加' ? $scope.addSubmit(data) : $scope.editSubmit(data);
    };
    $scope.addSubmit=function(data){
        add(data).then(function(res){
            if(res.data.ret==1){
                if(window.external){
                    window.external.call('kieframe','notifyalarm','');
                }
                $location.path('/');
            }
        });
    };
    $scope.editSubmit=function(data){
        data.id=$scope.cid;
        edit(data).then(function(res){
            if(res.data.ret==1){
                if(window.external){
                    window.external.call('kieframe','notifyalarm','');
                }
                $route.reload();
            }
        });
    };
}]);
clockApp.controller('customSubmit',['edit','add','$scope','$location','$route',function(edit,add,$scope,$location,$route){
    $scope.empty=function(){
        if( !$scope.title ){
            $scope.$parent.errTip='请填写闹钟名称';
            return true;
        }
    };
    $scope.submit=function(){
        var empty=$scope.empty();
        var title,date,time,desc,data,
            ymd=moment().format('YYYY-MM-DD'),
            hh=$scope.hh.substring(0,2);
            mm=$scope.mm.substring(0,2);

        if(empty){
            return false;
        }

        title=$scope.title;
        !$scope.dateArr || !$scope.dateArr.length ? date='once' : date=$scope.dateArr.join(',');
        date=='once' ? time=hh+':'+mm : time=hh+':'+mm;
        // date=='once' ? time=ymd+' '+hh+':'+mm+':00' : time=hh+':'+mm+':00';
        desc=$scope.desc;
        data={
            title:title,
            date:date,
            time:time,
            desc:desc,
            type:2
        };

        $scope.rst=='添加' ? $scope.addSubmit(data) : $scope.editSubmit(data);
    };

    $scope.addSubmit=function(data){
        add(data).then(function(res){
            if(res.data.ret==1){
                if(window.external){
                    window.external.call('kieframe','notifyalarm','');
                }
                $location.path('/');
            }
        });
    };
    $scope.editSubmit=function(data){
        data.id=$scope.cid;
        edit(data).then(function(res){
            if(res.data.ret==1){
                if(window.external){
                    window.external.call('kieframe','notifyalarm','');
                }
                $route.reload();
            }
        });
    };
}]);



