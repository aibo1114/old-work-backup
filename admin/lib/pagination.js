import tpl from './tpl/pagination.jade';

angular.module('pagination',[])
    .component('pagination',{
        template: tpl(),
        bindings:{
            pageopt:'=',
            entities:'=',
            pstn:'<',
            num:'='
        },
        controller:['httpGet',function(httpGet){
            var that=this;

            // this.show=this.pageopt.show;
            // this.sections= this.pageopt.sections;
            // this.curSection= this.pageopt.sections[0];
            // this.pages= this.pageopt.pages;


            // this.num=1;
            this.jumpNum='';

            this.pageFetch=function(num){
                // var p=$.extend({}, this.pstn.dfp, {
                var p=$.extend({}, this.pstn.dfp, this.pageopt.pageparm, {
                    page_index:parseInt(num)
                });

                httpGet(this.pstn.hst+this.pstn.r, false, p).then(function(res){
                    that.entities=res.data.data;
                });
            };

            // this.$onInit= function(){
            //     console.log( this.pageopt );
            //     this.num= this.pageopt.num;
            // };




            this.numFn=function(num){
                this.num=num;
                //this.pageFetch(num-1);
                this.pageFetch(num);
            };
            this.prev=function(){
                if(this.num==1) return false;
                this.num--;
                //this.pageFetch(this.num-1);
                this.pageFetch(this.num);
                prev(this.num);
            };
            this.next=function(){
                if(this.num==this.pageopt.pages) return false;
                this.num++;
                //this.pageFetch(this.num-1);
                this.pageFetch(this.num);
                next(this.num);
            };
            this.goFirst=function(){
                //this.pageFetch(0);
                this.pageFetch(1);
                this.pageopt['curSection'] = this.pageopt.sections[0];
                this.num=1;
            };
            this.goLast=function(e){
                e.preventDefault();
                var lst=this.pageopt.sections.length-1;
                //this.pageFetch(this.pageopt.pages-1);
                this.pageFetch(this.pageopt.pages);
                this.pageopt['curSection'] = this.pageopt.sections[lst];
                this.num=this.pageopt.pages;
            };
            this.goJump=function(){
                var num=this.jumpNum;
                var section=Math.floor( (num-1) /5);

                //this.pageFetch(num-1);
                this.pageFetch(num);

                this.pageopt['curSection'] = this.pageopt.sections[section];
                this.num=num;
            };


            function prev(tarNum){
                if (tarNum%5!=0) return false;
                for (var i= 0,len=that.pageopt.sections.length; i<len; i++){
                    if (tarNum == that.pageopt.sections[i][4]){
                        that.pageopt['curSection'] = that.pageopt.sections[i];
                        break;
                    }
                }
            }
            function next (tarNum){
                if (tarNum%5!=1) return false;
                for (var i= 0,len=that.pageopt.sections.length; i<len; i++){
                    if (tarNum == that.pageopt.sections[i][0]){
                        that.pageopt['curSection'] = that.pageopt.sections[i];
                        break;
                    }
                }
            }
        }]
    });