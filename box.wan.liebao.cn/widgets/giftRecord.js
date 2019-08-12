wgs.directive('giftRecord',[function(){
    return {
        scope:{
            list:'=',
            evts:'=',
            open:'='
        },
        link:function(scope,element,attrs){

        },
        controller:['$scope','gettedGifts','$rootScope',function($scope,gettedGifts,$rootScope){
            $scope.open=false;
            $scope.list=[];

            $scope.$on('pkgRecord',function () {
                $scope.open=true;
                $rootScope.hasDialog=true;
                gettedGifts().then(function(res){
                    // alert(res.data.ret);
                    if(res.data.ret==1){
                        $scope.list=res.data.data;

                    }else{
                        window.external.call('kieframe','relogin','');
                    }
                });
            });
            $scope.evts={
                close:function(){
                    $scope.open=false;
                    $rootScope.hasDialog=false;
                },
                copyCode:function(code){
                    // console.log('copy code: '+code);
                    if(window.clipboardData) window.clipboardData.setData("text" , code);
                    $scope.open=false;
                    $rootScope.hasDialog=false;
                }
            }
        }],
        templateUrl:'widgets/tpl/giftRecord.html'
    }
}]);