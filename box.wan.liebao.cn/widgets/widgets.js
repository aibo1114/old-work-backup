var wgs=angular.module('wgs',[]);
wgs.factory('monthDays',function(){
    return function(momentDate){
        var firstDateWeek = moment(momentDate);
        var daysInMonth = firstDateWeek.daysInMonth();
        var firstDayWeek = firstDateWeek.format('d');
        var timeline = [];
        var calendar=[];

        for (var i=0; i<firstDayWeek; i++) {
            //subtract是moment方法
            timeline.push(moment(firstDateWeek).subtract(firstDayWeek-i, 'days'));
        }
        for (var i=0; i<daysInMonth; i++) {
            timeline.push(moment(firstDateWeek).add(i, 'days'));
        }

        for (var i=0; i<Math.ceil(timeline.length/7); i++) {
            calendar[i] = timeline.slice(i*7, (i+1)*7);
        }

        return calendar;
    }
});
wgs.directive('calendar', function(){
    return {
        restrict: 'EA',
        transclude: true,
        // scope : {
        //     signed : '=',
        //     action: '='
        // },
        controller:['$scope','monthDays','cookieTools','$timeout',function($scope,monthDays,cookieTools,$timeout){
            $scope.calendar = monthDays($scope.date);
            $scope.todaySigned=cookieTools.getCookie(ks_user.uid+'Signed');
            $scope.disappear=true;
            $scope.goDispr=function(){
                $scope.disappear=false;
            };

            // console.log( cookieTools.getCookie(ks_user.uid+'Signed') );
            // cookieTools.removeCookie(ks_user.uid+'Signed');
            if($scope.todaySigned!='userSigned'){
                cookieTools.setCookie(ks_user.uid+'Signed','userSigned');
            }
            $timeout($scope.goDispr,1000);
        }],
        templateUrl: '/widgets/tpl/calendar.html'
    }
});

wgs.animation('.num-integral-today',function(){
    return {
        enter :function(element,done){
            element.css({
                'top':'12px',
                'opacity': '1'
            });
            jQuery(element).animate({
                'top': '-12px',
                'opacity': '0'
            }, 800,done);

            return function(isCancelled) {
                if(isCancelled) {
                    jQuery(element).stop();
                }
            }
        }
    }
});
