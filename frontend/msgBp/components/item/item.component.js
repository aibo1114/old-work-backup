app.component('item',{
    templateUrl:'./components/item/item.component.html',
    bindings:{
        pstn:'<',
        controls:'<',
        extparm:'<',
        listrt:'<',
        title:'@',
        uglyfield:'<',
        uglyurl:'<'
    },
    controller:['$routeParams', 'crossGet','create','$location','$rootScope','$scope','urlStrToObj','urlObjToStr','splitUrlParam','toTimestampFilter',function($routeParams, crossGet, create, $location,$rootScope,$scope,urlStrToObj,urlObjToStr,splitUrlParam,toTimestampFilter){
        var that=this;

        this.content={};
        this.exContent={};
        this.radioContent={};

        this.$onInit=function(){
            if($routeParams._id){
                var parmObj={};
                parmObj[this.pstn.unique]=$routeParams._id;

                crossGet(this.pstn.hst, this.pstn.r, parmObj).then(function(res){
                    that.content=res.data.data;
                    if(that.uglyfield){
                        that.exContent=urlStrToObj(res.data.data[that.uglyfield]);
                        that.uglyurl=splitUrlParam(res.data.data[that.uglyfield]);
                        //that.exContent=urlStrToObj('http://news.wan.liebao.cn/message/specific/user/game_money?money=10&money_condition=1&game=1040');
                        //that.uglyurl=splitUrlParam('http://news.wan.liebao.cn/message/specific/user/game_money?money=10&money_condition=1&game=1040');
                    }
                    $rootScope.$broadcast('itemLoadFinished');
                });
            }
        };

        this.initSlt=function(control){
            if(!this.content[control.code]) this.content[control.code]='';
        };
        this.switchRadios=function($event,control,radio){
            console.log(radio);
            this.content[control.code]=radio.v;

            jQuery($event.target).addClass('active').siblings('.btn').removeClass('active');
        };

        this.goList=function(){
            $location.path(this.listrt);
        };
        this.submitForm=function(){
            var content=this.content;
            var extparm=this.extparm;
            var parmObj=jQuery.extend(content,extparm);
            var rt,radioP={};


            $routeParams._id ? rt=this.pstn.u : rt=this.pstn.c;

            if(this.uglyfield){
                var strP=urlObjToStr(this.exContent);
                parmObj[this.uglyfield]=this.uglyurl+'?'+strP;
            }

            for (k in this.radioContent){
                !this.radioContent[k].val ? delete this.radioContent[k] : radioP[k] = jQuery.extend({},this.radioContent[k]);
            }
            for (k in radioP) {
                if (radioP[k].type=='date') radioP[k].val= toTimestampFilter(radioP[k].val);
                //this.radioContent[k]=this.radioContent[k].val;
                parmObj[k]=radioP[k].val;
            }

            create(this.pstn.hst, rt, parmObj).then(function(res){
                if (res.data.ret==1) that.goList();
            });
        };


        this.initRadioControl=function(control){
            this.radioContent[control.code]={};
            this.radioContent[control.code].val='';
            this.radioContent[control.code].type=control.type;
        };

        this.exInit=function(item){
            var controls=item.controls;
            //controller不能直接拿到其$onInit的值,因为当$resolve完毕,$onInit的作用域将被销毁(猜测)

            //controller中的exContent是通过ng的的双向数据绑定vm(template)传回来的;
            //vm(template)可以接收到controller.$onInit的值,再通过双向绑定传回到controller,这样,controller就拿到了config中$resolve设置的值;
            //controller的init事件要先于dom的init事件(先渲染上下文环境),但因为ng的httpAPI请求(底层是访问XMLHttpRequest[浏览器对象])是异步的:
            //所以要用事件发送(emit)机制确保在异步请求成功装载所需数据后:在controller中对 "单块"数据进行操作(因为数据结构被打散)
            $scope.$on('itemLoadFinished',function(evt){
                for (var i=0;i<controls.length;i++){
                    if ( that.exContent[ controls[i].code ] ) item.checked=true;
                    if ( that.exContent[ controls[i].code ] && controls[i].type=='number' ) that.exContent[ controls[i].code ]= parseInt(that.exContent[ controls[i].code ]);
                }
            });
        };
        this.exChanged=function(item){
            var controls=item.controls;
            if (!item.checked){
                for (var i=0;i<controls.length;i++){
                    that.exContent[ controls[i].code ]='';
                }
            }
        };
    }]
});