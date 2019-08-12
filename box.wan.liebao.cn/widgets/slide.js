wgs.controller("lucky",['$scope','lucky',function($scope,lucky){

        lucky().then(function(result){
            $scope.speed=2000;
            $scope.lucky=result.data.data.prize;
        });

    }])
    .directive("slideFollow",['$timeout','$location','$interval',function($timeout,$location,$interval){
        var tpl='<li></li>';
        switch ($location.path()){
            case '/integral' :
                tpl='<li ng-repeat="it in dataset" class="li-bd-lucky"><h5 class="name-li-lucky">{{it.passport}}</h5><p class="prize-li-lucky">抽中&nbsp;&nbsp;<span class="line">------------</span>&nbsp;&nbsp;<span class="pname">{{it.name}}</span></p><p class="time-li-lucky">{{it.day}}</p></li>';
                break;
            case '/' :
                tpl='<li ng-repeat="it in dataset" class="li-notice-pushys"><a class="link-notice-pushys" ng-href="{{it.url}}" target="_blank">{{it.title}}</a></li>';
                break;
            default:
                break;
        }
        return {
            restrict : 'A',
            replace : true,
            scope : {
                dataset :"=",
                speed: '='
            },
            template : tpl,
            link : function(scope,elem,attrs) {
                    var s=scope;
                    $timeout(function(){
                        var className = $("." + $(elem).parent()[0].className);
                        var i = 0,sh, applySelf;
                        var liLength = className.children("li").length;
                        var liHeight = className.children("li").height() + parseInt(className.children("li").css('border-bottom-width'));
                        className.html(className.html() + className.html());
                        // 开启定时器
                        sh = setInterval(slide,scope.speed);
                        function slide(){
                            if (parseInt(className.css("margin-top")) > (-liLength * liHeight)) {
                                i++;
                                className.animate({
                                    marginTop : -liHeight * i + "px"
                                },"slow");
                            } else {
                                i = 0;
                                className.css("margin-top","0px");
                            }
                        }

                        applySelf=setInterval(applyFn,1000);
                        function applyFn(){
                            if(!s.dataset || !s.speed){
                                s.$apply();
                            }else{
                                clearInterval(applySelf);
                            }
                        }

                        // 清除定时器
                        className.hover(function(){
                            clearInterval(sh);
                            // $interval.cancel(sh);
                            sh=undefined;
                        },function(){
                            clearInterval(sh);
                            sh = setInterval(slide,scope.speed);
                            // $interval.cancel(sh);
                            // sh = $interval(slide,scope.speed);
                        })
                },1800);
                // safeApply(scope,function(){
                //     var className = $("." + $(elem).parent()[0].className);
                //     var i = 0,sh;
                //     var liLength = className.children("li").length;
                //     var liHeight = className.children("li").height() + parseInt(className.children("li").css('border-bottom-width'));
                //     className.html(className.html() + className.html());
                //     // 开启定时器
                //     sh = setInterval(slide,scope.speed);
                //     function slide(){
                //         if (parseInt(className.css("margin-top")) > (-liLength * liHeight)) {
                //             i++;
                //             className.animate({
                //                 marginTop : -liHeight * i + "px"
                //             },"slow");
                //         } else {
                //             i = 0;
                //             className.css("margin-top","0px");
                //         }
                //     }
                //     // scope.$apply();
                //     // 清除定时器
                //     className.hover(function(){
                //         clearInterval(sh);
                //         // $interval.cancel(sh);
                //         sh=undefined;
                //     },function(){
                //         clearInterval(sh);
                //         sh = setInterval(slide,scope.speed);
                //         // $interval.cancel(sh);
                //         // sh = $interval(slide,scope.speed);
                //     })
                // });
                // function safeApply(scope, fn) {
                //     (scope.phase||scope.$root.phase) ? fn() : scope.$apply(fn);
                // }

            }
        }
    }]);
