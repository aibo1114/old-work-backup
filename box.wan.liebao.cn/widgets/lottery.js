wgs.directive('lottery',['$interval','lotterynum','drawlots',function($interval,lotterynum,drawlots){
    return {
        restrict:'A',
        link:function(scope,element,attrs){},
        controller:['$scope','$rootScope',function($scope,$rootScope){
            var i=0,count=0;
            $scope.ing=false;
            $scope.stop=undefined;
            $scope.p=undefined;

            $scope.star=function(){
                $scope.p = $interval(function(){
                    i<12 ? i++ : i=1;
                    $('.prize-'+i).addClass('prize-active').siblings('.prize-turntbale').removeClass('prize-active');
                    count++;
                    if(count==36) {
                        $scope.stopFight($scope.p);
                        count=0;
                        $scope.fight($scope.pid);
                    }
                },50,36);
            };
            $scope.fight=function(pid){
                $scope.stop=$interval(function(){
                    i<12 ? i++ : i=1;
                    $('.prize-'+i).addClass('prize-active').siblings('.prize-turntbale').removeClass('prize-active');
                    if( $('.prize-'+i).attr('pid')==pid ) {
                        $scope.stopFight($scope.stop);
                        $rootScope.$broadcast('dialog','tip',{
                            title:'提示',
                            text:$scope.pname,
                            btn:{
                                txt:'再抽一次',
                                size:'lg'
                            },
                            icon:'dicon-bell',
                            w:364,
                            h:204
                        });
                        if(window.external){
                            window.external.call('kieframe','notifyupdateinfo','');
                        }
                    }
                },50);
            };
            $scope.stopFight=function(p){
                $interval.cancel(p);
                p = undefined;
            };
            $scope.$on('$destroy', function() {
                $scope.stopFight($scope.p);
                $scope.stopFight($scope.stop);
            });
            $scope.$on('drawed', function() {
                $scope.star();
            });
            $scope.$on('tipClose',function(){
                $scope.ing=false;
            });

            $scope.drawlots=function(){
                lotterynum($scope).then(function(res){
                    $scope.prize=res.data;
                    if(res.data.code==1){
                        $scope.nums=res.data.data.count;
                        if( $scope.nums && $scope.nums>0){
                            drawlots($scope);
                        }else{
                            $rootScope.$broadcast('dialog','tip',{
                                title:'提示',
                                text:'抱歉！您今日抽奖次数已不足',
                                icon:'dicon-bell',
                                btn:{
                                    txt:'赚积分',
                                    size:'lg'
                                },
                                w:364,
                                h:204,
                                tipCls:'grey'
                            });
                        }
                    }else{
                        $rootScope.$broadcast('dialog','tip',{
                            title:'提示',
                            text:'抽奖失败',
                            icon:'dicon-bell',
                            btn:{
                                txt:'赚积分',
                                size:'lg'
                            },
                            w:364,
                            h:204,
                            tipCls:'grey'
                        });
                    }
                });
            };
        }],
        templateUrl:'/widgets/tpl/lottery.html'
    }
}]);