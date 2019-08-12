(function(){
    var hst='http://api.wan.liebao.cn';

    $.ajax({
        url:hst+'/super/vip/info/get',
        dataType :'jsonp',
        cache:false,
        success:function(res){
            if(res.ret!=1){
                alert('请登录');
                return false;
            }
            // res.data.is_vip!=1 ? $('#done').show() : getProcess();
            res.data.is_vip==1 ? $('#done').show() : getProcess();
        }
    });

    function getProcess (){
        $.ajax({
            url:hst+'/super/vip/process/get_list',
            dataType:'jsonp',
            cache:false,
            success:function(res){
                var data=res.data;
                var item='';
                for (var i=0;i<data.length;i++){
                    var cN='';
                    var percent=(data[i].process_value/data[i].condition_value)*100;
                    switch (data[i].condition_id) {
                        case 1 :
                            cN='一';
                            break;
                        case 2 :
                            cN='二';
                            break;
                        case 3 :
                            cN='三';
                            break;
                        default :
                            break;
                    }
                    item+='<li class="li-undone-svip">';
                    if(data[i].gid==0 && data[i].sid==0){
                        item+='<h6 class="title-li-undone"><span class="first">条件'+cN+'</span><span class="orange">【您没有满足条件的区服】</span></h6>';
                    }else{
                        item+='<h6 class="title-li-undone"><span class="first">条件'+cN+'</span><span class="orange">【'+data[i].gname+'</span><span class="orange">'+data[i].sname+'】</span></h6>';
                    }
                    item+='<div class="process-li-undone"><span class="bar-process-undone"  style="width: '+percent+'%;"></span><p class="num-process-undone">'+data[i].process_value+'/'+data[i].condition_value+'</p></div>';
                    item+='<span class="btn-li-undone">领取礼包</span>';
                    item+='</li>';
                }
                $('#conditionList').html(item);
                $('#undone').show();
            }
        });
    }
})();