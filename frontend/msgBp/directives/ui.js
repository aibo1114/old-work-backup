app.directive('setWidth',function(){
    return {
        restrict:'A',
        scope: {
            setWidth: '@'
        },
        link:function(scope,element){
            var pW=element.parents('[the-id=widthBox]').width();
            var w=Math.floor(pW/10*scope.setWidth)+ 'px';
            element.width(w);
        }
    }
});
app.directive('hoverClass', function () {
    return {
        restrict: 'A',
        scope: {
            hoverClass: '@'
        },
        link: function (scope, element) {
            element.on('mouseenter', function() {
                element.addClass(scope.hoverClass);
            });
            element.on('mouseleave', function() {
                element.removeClass(scope.hoverClass);
            });
        }
    };
});