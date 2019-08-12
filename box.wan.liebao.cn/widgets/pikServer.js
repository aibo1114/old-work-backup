//开一个controller,嵌套在allGames下
wgs.directive('pikServer',[function(){
    return {
        scope:{
            all:'=',
            servers:'=',
            lately:'=',
            evts:'=',
            gid:'@',
            status:'@',
            aides:'@'
        },
        link:function(scope,element,attributes){
            $(element).on('click','.li-tab-area',function(){
                var ndx=$(this).index();
                $(this).addClass('active').siblings('.li-tab-area').removeClass('active');
            });
            $(element).on('click','.link-server-aides',function(e){
                e.preventDefault();
                var gid=$(this).attr('gid');
                var sid=$(this).attr('sid');
                var hrf=$(this).attr('href');
                try {window.external.call('kieframe','openTab','{"isneedlogin":1,"gameid":"'+gid+'","svrid":"'+sid+'","url":"'+hrf+'"}');} catch(err) {
                    alert('页面需要在特定环境使用');
                }

            });
        },
        templateUrl:'http://box.wan.liebao.cn/widgets/tpl/pikServer.html'
    }
}]);
wgs.controller('pikServer',['$scope','assorted','playHistory','$rootScope',function($scope,assorted,playHistory,$rootScope){
    $scope.shows=false;
    $scope.status='history';
    $scope.all=[];
    $scope.lately=[];
    $scope.servers=[];
    $scope.playHistoryRes=ks_user.play_history;


    if( $scope.playHistoryRes ){
        for (var i=0;i<$scope.playHistoryRes.length;i++){
            if($scope.playHistoryRes[i].gid==$scope.gid){
                $scope.lately=$scope.playHistoryRes[i].servers;
            }
        }
    }


    $scope.evts={
        switchStatus:function(s){
            $scope.status=s;
            if( s=='all'){
                assorted($scope.gid).then(function(res){
                    $scope.all=res.data.data;
                    $scope.servers=res.data.data[0].servers;
                });
            }
        },
        switchArea:function(sers){
            $scope.servers=sers.servers;
        },
        closePick:function(){
            $rootScope.pickerShow=false;
        }
    };
}]);