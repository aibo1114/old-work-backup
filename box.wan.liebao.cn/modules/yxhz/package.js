var p=angular.module('package',[]);
p.controller('package',['$scope','gifts','takeGift','$rootScope',function($scope,gifts,takeGift,$rootScope){
    gifts().then(function(res){
        if(res.data.ret==1){
            $scope.gifts=res.data.data;
            // $scope.gifts=res.data.data.games;
            // for (var i=0;i<$scope.gifts.length;i++){
            //     $scope.gifts[i].getSatatus=0;
            // }
        }
    });
    $scope.gifts=[];
    $scope.getted=[];
    $scope.takeGift=function(it,e){
        takeGift(it.game_id).then(function(res){
            if(res.data.ret==1) {
                var gn=res.data.data.game_name;
                var code=res.data.data.code;
                var content='<h4 class="title-bd-dialog">恭喜！您已经领取'+gn+'礼包</h4>';

                $rootScope.$broadcast('dialog','content',{
                    w:450,
                    h:320,
                    title:'礼包',
                    btn:{
                        txt:'知道了',
                        size:'lg'
                    },
                    icon:'dicon-gift',
                    content:content,
                    copycode:code
                });

                it.get_gift=1;
            }
            // else if(res.data.ret==16002) {
            //     $rootScope.$broadcast('dialog','tip',{
            //         w:320,
            //         h:180,
            //         text:"您已经领取过当前礼包"
            //     });
            //     $(e.target).removeClass('hover-li-package');
            // }
            else {
                $rootScope.$broadcast('dialog','tip',{
                    w:320,
                    h:180,
                    title:'礼包',
                    icon:'dicon-gift',
                    text:"领取失败"
                });
                $(e.target).removeClass('hover-li-package');
                window.external.call('kieframe','relogin','');
            }
        });
    };
    $scope.showGettd=function () {
        $rootScope.$broadcast('pkgRecord');
    };
    $scope.showContent=function(hasDialog,it){
        if(!hasDialog) it.contentOpen=true;
    };
}]);
