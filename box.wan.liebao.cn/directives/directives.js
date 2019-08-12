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
app.directive('focusClass',function(){
    return {
        restrict:'A',
        scope:{
            focusClass:'@'
        },
        link:function(scope,element){
            element.on('focus', function() {
                element.addClass(scope.focusClass).siblings('.input-group-btn').find('.btn').addClass(scope.focusClass);
            });
            element.on('blur', function() {
                element.removeClass(scope.focusClass).siblings('.input-group-btn').find('.btn').removeClass(scope.focusClass);
            });
        }
    }
});