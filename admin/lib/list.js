import tpl from './tpl/list.jade';

angular.module('list', [])
    .component('list', {
        template: tpl(),
        bindings: {
            pstn:'<',
            dictionary: '<',
            search: '<',
            btn: '<',
            title: '@',
            itemperpage: '@',
            errobj: '<',
            sertrans: '<'
        },
        controller: ['httpGet','httpPost','$rootScope','toTimestampFilter','objKn2strFilter',function(httpGet,httpPost,$rootScope,toTimestampFilter,objKn2strFilter){
            var that=this;

            this.searchParm={};
            this.changeParm={};
            this.xselect={};
            this.xsV={};

            this.$onInit= function(){
                httpGet(this.pstn.hst+this.pstn.r, false, {
                    page_index: 1,
                    page_size: 10
                }).then(function(res){
                    that.entities=res.data.data;
                    that.count=res.data.total_count;
                    that.editRight=$rootScope.editRight;

                    that.pageSection();
                });

                if (this.sertrans) {
                    httpGet(this.pstn.hst+this.pstn.r, false, {
                        page_index: 1,
                        page_size: 10000
                    }).then(function(res){
                        that.localdata=res.data.data;
                    });
                }
            };
            //view
            this.reFetch= function(p){
                var o= null;

                // if(p) pstn.dfp= $.extend(pstn.dfp, p);
                p ? o= $.extend({}, this.pstn.dfp, p) : o= $.extend({}, this.pstn.dfp);


                httpGet(this.pstn.hst+this.pstn.r, false, o).then(function(res){
                    that.entities= res.data.data;
                    that.count= res.data.total_count;

                    that.pageSection();
                });
            };

            this.bindText=function(it, k){
                if (!this.dictionary[k].escaped) return it[k];
                if(this.dictionary[k].escaped instanceof Function) return this.dictionary[k].escaped(it[k]);
                return this.dictionary[k].escaped[ it[k] ]
            };

            //handler
            this.searchForm= function(){
                var xsObj=sendXs(),
                    p=null,
                    sObj=null,
                    cObj=null;

                do4tpkrModel();
                sObj=objKn2strFilter(that.searchParm);
                cObj=kchange(that.changeParm);

                p=$.extend(xsObj, sObj, cObj);
                deleteK(p);


                this.pageparm=p;
                this.reFetch(p);


                function kchange (changeParm){
                    var searchObj=new Object();

                    for (var k in changeParm){
                        var v=changeParm[k];
                        var serK=that.sertrans[k];

                        for (var i=0,len=that.localdata.length; i<len; i++){
                            if (that.localdata[i][k]===v && v ) {
                                searchObj[serK]=that.localdata[i][serK];
                            }
                        }
                    }
                    return searchObj;
                }
            };
            this.deleteItem= function(id){
                this.hanerleId=id;
                $('#confirm .modal-body').text( '确定删除？' );
                $('#confirm').modal();

            };
            this.putItem=function(id,status){
                var p={};
                p[this.pstn.unique]=id;
                p.status=status;

                httpPost(this.pstn.hst+this.pstn.u ,p).then(function(res){
                    if (res.data.ret==1) {
                        that.reFetch();
                        return false;
                    }

                    for (var k in that.errobj) {
                        if (k==res.data.ret){
                            $('#alert .modal-body').text( that.errobj[k] );
                            $('#alert').modal();
                            break;
                        }
                    }
                });
            };

            // page 删除后的数据关联
            this.pageSection=function (){
                this.pageOpt={};

                this.pageOpt.total=this.count;
                this.pageOpt.show=false;
                this.pageOpt.sections=[];
                this.pageOpt.pages=Math.ceil(this.count/this.itemperpage);

                this.pageOpt.pages > 1 ? this.pageOpt.show=true : this.pageOpt.show=false;


                for (var i= 0,section=Math.ceil(this.pageOpt.pages/5); i<section; i++){
                    //章
                    var arr= [];

                    for (var x= i*5+1,len=(i+1)*5; x<=len; x++){
                        //页
                        if( i == (section-1) && x>this.pageOpt.pages ) break;
                        // if( i == (section-1) && x%5>=pages%5 ) break;
                        arr.push(x);

                    }
                    this.pageOpt.sections.push(arr);
                }
                this.pageOpt.curSection=this.pageOpt.sections[0];
                this.pageOpt.num=1;
                this.pageOpt.pageparm=this.pageparm;
            };


            $('#confirm').on('click', '#confirmBtn', function (e) {
                if($(this).attr('btn-role')=='delete'){
                    var p={};
                    p[that.pstn.unique]=parseInt(that.hanerleId);
                    // if(c){}
                    httpPost(that.pstn.hst+that.pstn.d, p).then(function(res){
                        if (res.data.ret==1) {
                            that.reFetch();
                            return false;
                        }

                        for (var k in that.errobj) {
                            if (k==res.data.ret){
                                $('#alert .modal-body').text( that.errobj[k] );
                                $('#alert').modal();
                                break;
                            }
                        }

                    });
                }
            });

            function do4tpkrModel (){
                var v;
                if( $('bootstrap-datetimepicker')[0]!=undefined ) {
                    for (var i=0,len=$('bootstrap-datetimepicker').length; i<len; i++){
                        if( $('bootstrap-datetimepicker:eq('+i+')').find('.form-control').val() ){

                            $('bootstrap-datetimepicker:eq('+i+')').attr('timestamp')==1 ? v=toTimestampFilter( $('bootstrap-datetimepicker:eq('+i+')').find('.form-control').val() ) : v=$('bootstrap-datetimepicker:eq('+i+')').find('.form-control').val().replace(/-/g,'');
                            that.searchParm[$('bootstrap-datetimepicker:eq('+i+')').find('.form-control').attr('id')]=v;
                        }else{
                            delete that.searchParm[ $('bootstrap-datetimepicker:eq('+i+')').find('.form-control').attr('id') ];
                        }
                    }
                }
            }
            function deleteK (o){
                for (var k in o) {
                    if(!o[k]) delete o[k];
                }
            }

            function sendXs(){
                var obj={};
                var vArr=null,pArr=null;

                for (var k in that.xsV){

                    for (var i=0,len=that.search.length; i<len; i++){
                        if (k == that.search[i].code){
                            vArr=that.xsV[k].split(',');
                            pArr=that.search[i].pstn.opt.v;
                        }
                    }

                    if(pArr && pArr.length!=0){
                        for (var x=0,len=pArr.length; x<len; x++){
                            obj[pArr[x]]=vArr[x];
                        }
                    }
                }
                return obj;
            }

            this.initXselect=function(it){
                httpGet(it.pstn.hst+it.pstn.r, false, it.pstn.dfp).then(function(res){
                    if (res.data.ret==1){
                        var data=res.data.data;
                        var arr=[];
                        that.xselect[it.code]=[];
                        for (var i=0,len=data.length; i<len; i++){
                            var o={};
                            var arrN=[];
                            var arrV=[];

                            for (var y=0,nLen=it.pstn.opt.n.length; y<nLen; y++){
                                arrN.push( data[i][it.pstn.opt.n[y]] );
                            }
                            for (var z=0,vLen=it.pstn.opt.v.length; z<vLen; z++){
                                arrV.push( data[i][it.pstn.opt.v[z]] );
                            }
                            o.n=arrN.join('-');
                            o.v=arrV.join();
                            that.xselect[it.code].push(o);
                        }
                    }
                });
            };
        }]
    });








// var p=objToTimestampFilter(this.searchParm);


//ex deleteItemFunction

// var c=confirm('确认删除？');
// var p={};
// p[this.pstn.unique]=parseInt(id);
// if(c){
//     httpPost(this.pstn.hst+this.pstn.d, p).then(function(res){
//         if (res.data.ret==1) {
//             that.reFetch();
//             return false;
//         }
//
//         for (var k in that.errobj) {
//             if (k==res.data.ret){
//                 $('#alert .modal-body').text( that.errobj[k] );
//                 $('#alert').modal();
//                 break;
//             }
//         }
//
//     });
// }