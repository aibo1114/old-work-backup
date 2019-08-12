var home=angular.module('home',[]);


// home.controller('home',['$scope','pushys','$location','$anchorScroll','$interval','$timeout',function($scope,pushys,$location,$anchorScroll,$interval,$timeout){
home.controller('home',['$scope','pushys','$rootScope',function($scope,pushys,$rootScope){
    pushys().then(function (result) {
        $scope.focus=result.data[0].data.focus;
        $scope.notices=result.data[0].data.notice;
        $scope.hotgame=result.data[0].data.hotgame;
    });
}]);

home.controller('focus',['$scope','$timeout','$interval',function($scope,$timeout,$interval){
    var p;
    $scope.ndx=0;
    $scope.lst=2;
    $scope.switchNdx=function(){
        $scope.ndx < $scope.lst ? $scope.ndx++ : $scope.ndx=0;
    };
    $scope.fight=function(){
        p=$interval($scope.switchNdx,4000);
    };
    $scope.stopFight=function(){
        $interval.cancel(p);
        p = undefined;
    };
    $scope.setNdx=function(ndx){
        $scope.ndx=ndx;
    };
    $scope.$on('$destroy',$scope.stopFight);
    $timeout($scope.fight,0);
}]);
home.controller('notice',['$scope','$timeout','$interval','pushys',function($scope,$timeout,$interval,pushys){
    pushys().then(function (result) {
        // console.log(result.data[0].data);
        var p;
        $scope.notices=result.data[0].data.notice;
        $scope.ndx=0;
        $scope.lst=$scope.notices.length-1;
        $scope.switchNdx=function(){
            $scope.ndx < $scope.lst ? $scope.ndx++ : $scope.ndx=0;
        };
        $scope.fight=function(){
            p=$interval($scope.switchNdx,6000);
        };
        $scope.stopFight=function(){
            $interval.cancel(p);
            p = undefined;
        };
        $scope.$on('$destroy',$scope.stopFight);
        $timeout($scope.fight,0);
    });
}]);
home.controller('hotGames',['$scope','$rootScope',function($scope,$rootScope){
    $scope.pickServer=function(gid){
        if(!ks_user || ks_user.length==0 ){
            window.external.call('kieframe','relogin','');
            return false;
        }
        $rootScope.gid=gid;
        $rootScope.pickerShow=true;
        // $rootScope.hasDialog=true;
    };
}]);

// home.controller('allGames',['$rootScope','$location',function($rootScope,$location){}]);

home.animation('.li-banner',function(){
    return {
        enter:function(element,done){
            element.css('top','294px');
            jQuery(element).animate({
                'top': '0'
            }, 500,done);

            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        },
        leave :function(element,done){
            element.css('height','294px');
            jQuery(element).animate({
                'height': '0'
            }, 500,done);

            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        }
    }
});
home.animation('.li-notice-pushys',function(){
    return {
        enter:function(element,done){
            element.css('top','294px');
            jQuery(element).animate({
                'top': '0'
            }, 2200,done);

            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        },
        leave :function(element,done){
            element.css('height','294px');
            jQuery(element).animate({
                'height': '0'
            }, 2200,done);

            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        }
    }
});