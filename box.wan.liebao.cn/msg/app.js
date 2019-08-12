var app=angular.module('msg',[
    'ngRoute',
    'jQueryScrollbar'
]);
app.filter('trustHtml', ['$sce',function ($sce) {
    return function (ipt) {
        return $sce.trustAsHtml(ipt);
    };
}]);
app.filter('deTag',[function(){
    return function delHtmlTag(ipt) {
        return ipt.replace(/<[^>]+>/g,"");
    }
}]);
app.filter('addEllipses',[function(){
    return function delHtmlTag(ipt) {
        return ipt+'......';
    }
}]);
app.controller('msgContent',['$scope','$rootScope','readStatus',function($scope,$rootScope,readStatus){
    // $scope.sysNew=false;
    // $scope.activeNew=false;
    $scope.status='sys';
    $scope.tabUrl='tpl/sysNews.html';

    readStatus().then(function(res){
        if(res.data.ret==1){
            res.data.data.unread_count_system ? $rootScope.$broadcast('sNew') : $rootScope.$broadcast('sNormal');
            res.data.data.unread_count_activity ? $rootScope.$broadcast('aNew') : $rootScope.$broadcast('aNormal');
        }
    });
    $scope.isAllRead=function(){
        readStatus().then(function(res){
            if(res.data.ret==1){
                res.data.data.unread_count_system ? $rootScope.$broadcast('sNew') : $rootScope.$broadcast('sNormal');
                res.data.data.unread_count_activity ? $rootScope.$broadcast('aNew') : $rootScope.$broadcast('aNormal');
            }
        });
    };
    $scope.switchUrl=function(url,status){
        $scope.tabUrl=url;
        $scope.status=status;
        $scope.isAllRead();
    };

    $scope.$on('sNew',function(e){
        $scope.sysNew=true;
    });
    $scope.$on('aNew',function(e){
        $scope.activeNew=true;
    });
    $scope.$on('sNormal',function(e){
        $scope.sysNew=false;
    });
    $scope.$on('aNormal',function(e){
        $scope.activeNew=false;
    });
}]);

app.controller('sysList',['$scope','$rootScope','systemList','readStatus','putRead',function($scope,$rootScope,systemList,readStatus,putRead){
    systemList(1).then(function(res){
        $scope.amount=res.data.total_count;
        $scope.maxNdx=Math.ceil( $scope.amount/4 );
        $scope.list=res.data.data;
        $scope.transTime($scope.list);

        $scope.amount > 4 ? $scope.lstPage=false :  $scope.lstPage=true;
    });
    $scope.view='list';
    $scope.item=null;
    $scope.curPage=1;
    $scope.transTime=function(arr){
        for(var i in arr){
            arr[i].uiTime= moment( arr[i].ctime_int*1000 ).format('YYYY-MM-DD HH:mm');
        }
    };
    $scope.isAllRead=function(){
        readStatus().then(function(res){
            if(res.data.ret==1){
                res.data.data.unread_count_system ? $rootScope.$broadcast('sNew') : $rootScope.$broadcast('sNormal');
                window.external.call('kieframe','readednotice','');
            }
        });
    };
    $scope.loadNext=function(){
        $scope.curPage++;
        systemList($scope.curPage).then(function(res){
            var l,h=$('.li-msg').height();

            $scope.transTime(res.data.data);
            $scope.list = $scope.list.concat(res.data.data);

            l=$scope.list.length;
            $('.l-msg').animate({scrollTop:h*l},400);

            if($scope.curPage==$scope.maxNdx) $scope.lstPage=true;
        });
    };
    $scope.goDetail=function(it){
        $scope.view='detail';
        $scope.item=it;
        putRead(it.message_id).then(function(res){
            if(res.ret==1) it.is_read=1;
            $scope.isAllRead();
        });
    };
    $scope.goList=function(it){
        it.is_read=1;
        $scope.view='list';
    };
}]);

app.controller('activeList',['$scope','$rootScope','activeList','readStatus','putRead',function($scope,$rootScope,activeList,readStatus,putRead){
    activeList(1).then(function(res){
        $scope.amount=res.data.total_count;
        $scope.maxNdx=Math.ceil( $scope.amount/4 );
        $scope.list=res.data.data;
        $scope.transTime($scope.list);

        $scope.amount > 4 ? $scope.lstPage=false :  $scope.lstPage=true;

    });
    $scope.view='list';
    $scope.item=null;
    $scope.curPage=1;
    $scope.transTime=function(arr){
        for(var i in arr){
            arr[i].uiTime= moment( arr[i].ctime_int*1000 ).format('YYYY-MM-DD HH:mm');
        }
    };
    $scope.isAllRead=function(){
        readStatus().then(function(res){
            if(res.data.ret==1){
                res.data.data.unread_count_activity ? $rootScope.$broadcast('aNew') : $rootScope.$broadcast('aNormal');
                window.external.call('kieframe','readednotice','');
            }
        });
    };
    $scope.loadNext=function(){
        $scope.curPage++;
        activeList($scope.curPage).then(function(res){
            var l,h=$('.li-msg').height();

            $scope.transTime(res.data.data);
            $scope.list = $scope.list.concat(res.data.data);

            l=$scope.list.length;
            $('.l-msg').animate({scrollTop:h*l},400);

            if($scope.curPage==$scope.maxNdx) $scope.lstPage=true;
        });
    };
    $scope.goDetail=function(it){
        $scope.view='detail';
        $scope.item=it;
        putRead(it.message_id).then(function(res){
            if(res.ret==1) it.is_read=1;
            $scope.isAllRead();
        });
    };
    $scope.goList=function(it){
        it.is_read=1;
        $scope.view='list';
    }
}]);


$(document).on('click','.text-item-msg a',function(e){
    e.preventDefault();
    var hrf=$(this).attr('href');
    window.external.call('kieframe','openTab','{"isneedlogin":"1","url":"'+hrf+'"}');
});