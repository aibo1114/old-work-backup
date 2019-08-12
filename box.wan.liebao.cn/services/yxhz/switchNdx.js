app.factory('switchNdx',function(){
    return function(ndx,lst) {
        var p;
        function switchNdx(){
            ndx < lst ? ndx++ : ndx=0;
        }
        return {
            fight:function(speed){
                p=$interval($scope.switchNdx,speed);
            },
            stopFight:function(){
                $interval.cancel(p);
                p = undefined;
            }
        }
    };
});