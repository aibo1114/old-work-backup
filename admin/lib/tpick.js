import '../node_modules/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN';

import tpl from './tpl/datetimepicker.jade';


//因为需要使用link方法,所以使用directive
angular.module('tpick',[])
    .directive('bootstrapDatetimepicker',function(){
        return {
            restrict:'E',
            scope:{
                ctx: '=',
                model:'='
            },
            template: tpl(),
            link:function(scope,element,attr){
                var format='',minView= 0,startView=4;

                scope.ctx.opt ? format=scope.ctx.opt.format || 'yyyy-mm-dd hh:ii:ss' : format='yyyy-mm-dd hh:ii:ss';
                scope.ctx.opt ? minView=scope.ctx.opt.minView || 0 : minView= 0;
                scope.ctx.opt ? startView=scope.ctx.opt.startView || 4 : startView=4;

                $('.form_datetime').datetimepicker({
                    language:  'zh-CN',
                    weekStart: 1,
                    todayBtn:  'linked',
                    autoclose: true,
                    todayHighlight: 1,
                    forceParse: 1,
                    showMeridian: 1,
                    format:format,
                    startView: startView,
                    minView:minView
                });
                // .on('changeDate', function(e){
                //     console.log($(this));
                //     console.log( $(this).children('.form-control').val() );
                //     console.log( $(this).children('.form-control').attr('value') );
                //     $(this).children('.form-control').attr('value', $(this).children('.form-control').val() );
                //     // console.log( e.date.getFullYear().toString()+(e.date.getMonth()+1).toString()+e.date.getDate() );
                //     // $(this).children('.form-control').attr('value', e.date.getFullYear().toString()+( e.date.getMonth()+1).toString()+e.date.getDate() );
                //     // $(this).attr('value', e.date.getFullYear().toString()+(e.date.getMonth()+1).toString()+e.date.getDate()  );
                //     // if(!scope.model) scope.model={};
                //     // scope.model =e.date.getFullYear().toString()+(e.date.getMonth()+1).toString()+e.date.getDate();
                // });


                // console.log('....................l');
                // console.log(scope.ctx);
                // console.log(scope.ctx.code);
                // console.log( $('#'+scope.ctx.code) );

            }
        }
    });