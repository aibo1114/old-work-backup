app.directive('datetimePicker',function(){
    return {
        restrict:'E',
        scope:{
            ctx: '=',
            model:'='
        },
        templateUrl:'../widgets/bootstrap-datetimepicker/bootstrap-datetimepicker.tpl.html',
        link:function(scope,element){
            var format='',minView= 0,startView=4;

            scope.ctx.opt ? format=scope.ctx.opt.format || 'yyyy-mm-dd hh:ii:ss' : format='yyyy-mm-dd hh:ii:ss';
            scope.ctx.opt ? minView=scope.ctx.opt.minView || 0 : minView= 0;
            scope.ctx.opt ? startView=scope.ctx.opt.startView || 4 : startView=4;

            $('.form_datetime').datetimepicker({
                language:  'zh-CN',
                weekStart: 1,
                todayBtn:  'linked',
                autoclose: 1,
                todayHighlight: 1,
                forceParse: 1,
                showMeridian: 1,
                format:format,
                startView: startView,
                minView:minView
            });
        }
    }
});