var $=require('./polyfill.js');
var style=require('./css/pagination.css');

$._exFn.createStyleSheet(style);

function Pagination (count, rootNodeId, opt){

    var pagination = {
            num: opt.curpage,
            itemperpage: 10,

            isShow : function (){
                var rootNode=document.getElementById(rootNodeId),
                    content= document.createElement('div');

                content.id='qaPagination';
                content.className='pagination-qa';

                if(document.getElementById('qaPagination')==undefined) rootNode.appendChild(content);

                if (count <= this.itemperpage){
                    document.getElementById('qaPagination').style.display='none';
                    return false;
                }else{
                    document.getElementById('qaPagination').style.display='block';
                    return true;
                }
            },
            renderUI: function(){
                var pages=Math.ceil(count/this.itemperpage),
                    isShow=this.isShow(),
                    content=document.getElementById('qaPagination'),
                    l='<span class="btn-pagination-qa" id="paginationFirst"> |< </span><span class="btn-pagination-qa" id="paginationPrev"> < </span>',
                    r='<span class="btn-pagination-qa" id="paginationNext"> > </span><span class="btn-pagination-qa" id="paginationLast"> >| </span>',
                    list='<ul id="pageNumList" class="l-pagination-qa">',

                    multiple=Math.floor(this.num/5),
                    remainNums;

                if(this.num%5==0) multiple--;
                remainNums=pages-(multiple*5);

                if(!isShow) return;

                for (var i=0,len=Math.min(remainNums, 5); i<len; i++){
                    var _thisNum=(multiple*5)+(i+1);
                    _thisNum==this.num ? list+='<li class="li-pagination-qa cur-pagination-qa">'+_thisNum+'</li>' : list+='<li class="li-pagination-qa">'+_thisNum+'</li>';
                }

                list+='</ul>';

                if (pages>5) r='<span id="sectionPrev" class="section-pagination-qa">上一章</span><span id="sectionNext" class="section-pagination-qa">下一章</span>'+r;
                if (remainNums>5) r='<span class="ellipsis-pagination-qa">...</span>'+r;

                content.innerHTML= l+list+r;
                // setMl();

                this.pages=pages;
                this.bindEvts();

                function setMl(){
                    var ml=content.clientWidth/2;
                    content.style.marginLeft='-'+ml+'px';
                }
            },
            bindEvts: function(){
                var btn= document.getElementsByClassName('li-pagination-qa'),
                    prev= document.getElementById('paginationPrev'),
                    next= document.getElementById('paginationNext'),
                    fst= document.getElementById('paginationFirst'),
                    lst= document.getElementById('paginationLast'),
                    sectionPrev=document.getElementById('sectionPrev'),
                    sectionNext=document.getElementById('sectionNext');

                $._exFn.bindEvt(btn,'click', function(e){
                    pagination.num=parseInt(this.innerText);
                    pageFetch(pagination.num);

                });
                $._exFn.bindEvt(prev,'click', function(e){
                    if (pagination.num<=1) return;

                    pagination.num--;
                    pageFetch(pagination.num);
                });
                $._exFn.bindEvt(next,'click', function(){
                    if (pagination.num>=pagination.pages) return;

                    pagination.num++;
                    pageFetch(pagination.num);
                });
                $._exFn.bindEvt(fst,'click', function(){
                    if (pagination.num<=1) return;

                    pagination.num=1;
                    pageFetch(pagination.num);
                });
                $._exFn.bindEvt(lst,'click', function(){
                    if (pagination.num>=pagination.pages) return;

                    pagination.num=pagination.pages;
                    pageFetch(pagination.num);
                });

                if(sectionPrev){
                    $._exFn.bindEvt(sectionPrev,'click', function(){
                        var curFrtNum=document.getElementsByClassName('li-pagination-qa')[0].innerText;

                        if (curFrtNum==1) return;

                        pagination.num=curFrtNum-1;
                        pageFetch(curFrtNum-1);
                    });
                }
                if(sectionNext){
                    $._exFn.bindEvt(sectionNext,'click', function(){
                        var curBtns=document.getElementsByClassName('li-pagination-qa'),
                            curLstNum=parseInt( curBtns[curBtns.length-1].innerText );

                        if(curLstNum==pagination.pages) return;

                        pagination.num=curLstNum+1;
                        pageFetch(curLstNum+1);
                    });
                }

                function pageFetch(num){
                    var p={};
                    for (var k in opt.p) p[k]=opt.p[k];
                    p.page=num;

                    $._XMLHttp.sendJsonp(opt.action, p, opt.cb);
                }
            }
    };



    return pagination;
}

module.exports=Pagination;