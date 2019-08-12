app.component('list',{
    templateUrl:'./components/list/list.component.html',
    bindings:{
        pstn:'<',
        dictionary:'<',
        entities:'<',
        btns:'<',
        title:'@',
        search:'<'
    },
    controller:['crossGet','toTimestampFilter','urlObjToStr',function(crossGet,toTimestampFilter,urlObjToStr){
        var that=this;

        this.delItemId='';
        this.searchObj={};

        this.setId=function(_id){
            this.delItemId=_id
        };

        this.bindText=function(entity,code){
            if(this.dictionary[code].escaped ){
                return this.dictionary[code].escaped[ entity[code] ]
            }else{
                return entity[code]
            }
        };

        this.reGet=function(pstn){
            crossGet(pstn.hst ,pstn.r ,pstn.rp).then(function(res){
                that.entities=res.data.data;
            });
        };

        this.removeItem=function(pstn){
            var parm={};
            parm[pstn.unique]=this.delItemId;

            crossGet(pstn.hst ,pstn.d ,parm).then(function(res){
                if(res.data.ret!=1){
                    switch (res.data.ret){
                        case 65571 :
                            //模板在使用
                            break;
                        default :
                            break;
                    }
                    return false;
                }

                that.reGet(pstn);
            });
        };

        this.initSerControl=function(control){
            this.searchObj[control.code]={};
            this.searchObj[control.code].val='';
            this.searchObj[control.code].type=control.type;
        };

        this.searchItems=function(pstn){
            var p={};
            for (k in this.searchObj){
                !this.searchObj[k].val ? delete this.searchObj[k] : p[k] = jQuery.extend({},this.searchObj[k]);
            }
            for (k in p) {
                if (p[k].type=='date') p[k].val= toTimestampFilter(p[k].val);
                p[k]=p[k].val;
            }
            p = jQuery.extend(p,pstn.rp);
            console.log(p);

            crossGet(pstn.hst,pstn.r, p).then(function(res){
                if(!res.data.data) {return false;}
                $ctrl.entities = res.data.data;
            });
        };
    }]
});