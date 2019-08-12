angular.module('exdrct',[])
    .directive('splitWidth',function(){
        return {
            restrict:'A',
            scope: {
                splitWidth: '@'
            },
            link:function(scope,element){
                var col= parseFloat(scope.splitWidth),
                    pW=$(element).parents('[the-p=width]').width(),
                    w=Math.floor(pW/100*col-4)+ 'px';

                $(element).width(w);
            }
        }
    });