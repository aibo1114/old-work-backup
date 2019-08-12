import tpl from './tpl/item.jade';

angular.module('item',[])
    .component('item',{
        template:tpl(),
        bindings:{
            pstn:'<',
            controls:'<',
            lstrt:'@',
            title:'@',
            errobj:'<'
        },
        controller:['httpPost','$routeParams','$location','$rootScope','$scope',function(httpPost, $routeParams, $location, $rootScope, $scope){
            var that=this;

            this.content={};

            this.$onInit=function(){
                var p={};
                if(!$routeParams._id) {
                    this.type='add';
                    return false;
                }

                p[this.pstn.unique]=$routeParams._id;

                httpPost(this.pstn.hst+this.pstn.r, p).then(function(res){
                    that.content=res.data.data;
                    $rootScope.$broadcast('loadOver');
                });
            };

            //view
            this.initRadio=function(control){
                if(!$routeParams._id && control.required) this.content[control.code]=control.radios[0].v;

                $scope.$on('loadOver', function(){
                    for (var i=0,len=control.radios.length; i<len; i++){
                        if ( control.radios[i].v == that.content[control.code] ) {
                            $('#'+control.code+i).addClass('active');
                            break;
                        }
                    }
                });
            };
            this.setRadio=function($e, control, radio){
                this.content[control.code]=radio.v;
                $($e.target).addClass('active').siblings('.btn').removeClass('active');
            };

            //handle
            this.goList=function(){
                this.lstrt ? $location.path(this.lstrt) : window.history.back();
            };
            this.submitForm=function(){
                var content=this.content,
                    rt='',
                    p=null;

                this.pstn.dfp ? p=$.extend(content,this.pstn.dfp) : p=$.extend({},content);
                $routeParams._id ? rt=this.pstn.u : rt=this.pstn.c;

                httpPost(this.pstn.hst+ rt, p).then(function(res){
                    if (res.data.ret!=1) {

                        for (var k in that.errobj) {
                            if (k==res.data.ret){
                                $('#alert .modal-body').text( that.errobj[k] );
                                $('#alert').modal();
                                break;
                            }
                        }

                        return false;
                    }
                    that.goList();


                });
            };
        }]
    });