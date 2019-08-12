//stash
var helper={};
helper.dpath='http://vip.wan.liebao.cn/vip/activity/second/';

//flow
ks_user && ks_user.length!=0 ? initUser() : initGuest();

//fetch
function getNum (){
    $.ajax({
        url:helper.dpath+'prize_times',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if (!handler4errSimple(res.ret) ) return false;

            $('#num').text(res.data.sum_times);
            $('#sNum').text(res.data.super_times);
            $('#nNum').text(res.data.normal_times);
            numCb();
        }
    });
}
function getScore (){
    $.ajax({
        url:'http://credit.wan.liebao.cn/index.php/api/myCredit',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if( !handler4errSimple(res.code) ) return false;
            $('#score').text(res.data.myCredit);
        }
    });
}
function getScores (){
    $.ajax({
        url:helper.dpath+'get_op_detail',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var item='';
            if (!handler4errSimple(res.ret) ) return false;
            if(!res.data || !res.data.length){
                return false;
            }
            for (var i=0;i<res.data.length;i++){
                item+='<li the-id="'+res.data[i].detail_id+'" class="li-bd-score"><div class="part-bd-score">'+res.data[i].op_month+'</div><div class="part-bd-score">'+res.data[i].op_score+'</div>';
                res.data[i].is_receieve==1 ? item+='<div class="part-bd-score"><button class="btn-geted">已领取</button></div></li>' : item+='<div class="part-bd-score"><button class="btn-get">立即领取</button></div></li>';
            }
            $('.l-bd-score').html(item);
            niceScore();
        }
    });
}
function getLucky (){
    $.ajax({
        url:helper.dpath+'get_lucky_star',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if (!handler4errSimple(res.ret) ) return false;
            for(var i=0;i<res.data.length;i++){
                var x=i+1;
                $('.user-'+x+'-lucky').text(res.data[i].username_display);
            }
        }
    });
}
function getRecord (){
    $.ajax({
        url:helper.dpath+'prize_record',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var item='';
            var data=res.data;
            if (!handler4errSimple(res.ret) ) return false;
            if(!res.data || !res.data.length){
                return false;
            }
            for (var i=0;i<data.length;i++){
                if(data[i].prize_type=='2' || data[i].prize_type=='3' || data[i].prize_type=='4' || data[i].prize_type=='5'){
                    item+='<li class="li-record"><span class="title-li-record">'+data[i].prize_name+'</span><span class="count-li-record">X'+data[i].count+'</span>';
                    if(data[i].prize_type=='2') item+='<a class="btn-li-record" href="http://wan.liebao.cn/action/redirect_kf.php" target="_blank">联系客服</a>';
                    if(data[i].prize_type=='3' || data[i].prize_type=='4') item+='<a class="btn-li-record" href="http://wan.liebao.cn/pay" target="_blank">去使用</a>';
                    if(data[i].prize_type=='5') item+='<span class="btn-li-record btn-address">收货地址</span>';
                    item+='</li>';
                }
            }
            $('.l-record').html(item);
        }
    });
}
function getPrize (t){
    var p;
    t ? p='prize_get?is_super=1' : p='prize_get';
    $.ajax({
        url:helper.dpath+p,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var data,type,pname,txt;
            var dType,btnTxt,btnLink='javascript:void(0);';
            if(res.ret==65540){
                $('[the-id=none],.mask').show();
                return false;
            }
            if( handler4err(res.ret) ) return false;
            data=res.data;type=data.prize_type;pname=data.prize_name;txt=data.remark;

            switch (type){
                case 2: //话费充值卡
                    dType='prizes';btnTxt='联系客服';btnLink='http://wan.liebao.cn/action/redirect_kf.php';
                    break;
                case 3: //百分比优惠券
                    dType='prizes';btnTxt='去使用';btnLink='http://wan.liebao.cn/pay';
                    break;
                case 4: //定额优惠券
                    dType='prizes';btnTxt='去使用';btnLink='http://wan.liebao.cn/pay';
                    break;
                case 5: //实物
                    dType='goods';btnTxt='收货信息';
                    break;
                case 6: //没抽中
                    dType='failed';
                    break;
                case 7: //抽奖机会
                    dType='prizes';btnTxt='去开启';pname='开启升级宝箱机会一次';
                    break;
                default:
                    break;
            }
            if(data && data.prize_name) $('.d-2 [the-id=prizeName]').text(pname);

            dType=='goods' ? $('[the-id='+dType+'] .text-d-2').text(txt) : $('[the-id='+dType+'] .btn-d').attr('href',btnLink).text(btnTxt);
            type==7 ? $('[the-id='+dType+'] .btn-d').attr('target','') : $('[the-id='+dType+'] .btn-d').attr('target','_blank');
            $('[the-id='+dType+'],.mask').show();
            getNum();
            getRecord();
        }
    });
}
function getAddr (){
    $.ajax({
        url:helper.dpath+'receieve_get',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var data=res.data;
            if (!handler4errSimple(res.ret) ) return false;

            if( !data.name || !data.phone || !data.address ){
                $('[the-id=checkAnode]').addClass('none');
                $('[the-id=editAnode]').removeClass('none');
            }else{
                $('[the-id=editAnode]').addClass('none');
                $('[the-id=checkAnode]').removeClass('none');
                $('#reciver').val(data.name);$('#reciverTxt').text(data.name);
                $('#contact').val(data.phone);$('#contactTxt').text(data.phone);
                $('#addr').val(data.address);$('#addrTxt').text(data.address);
            }
            $('.mask,[the-id=address]').show();
        }
    });
}

function saveAddr (){
    var name=$('#reciver').val(),
        phone=$('#contact').val(),
        address=$('#addr').val();

    if(!name || !phone || !address){
        alert('请填写完整的收货信息');
        return false;
    }
    if( name.length>10 ){
        alert("收货人最多10字，谢谢");
        return false;
    }
    if( !(/^1(3|4|5|7|8)\d{9}$/.test(phone)) ){
        alert("手机号码有误，请重填");
        return false;
    }
    if( address.length>50 ){
        alert("收货地址最多50字，谢谢");
        return false;
    }
    name=encodeURIComponent(name);
    phone=encodeURIComponent(phone);
    address=encodeURIComponent(address);

    $.ajax({
        url:helper.dpath+'receieve_save?name='+name+'&phone='+phone+'&address='+address,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if (!handler4errSimple(res.ret) ) return false;
            $('.mask,[the-id=address]').hide();
        }
    });
}

function takeScore (dId,$btn){
    $.ajax({
        url:helper.dpath+'get_score?detail_id='+dId,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            handler4err(res.ret);
            $btn.addClass('btn-geted').removeClass('btn-get').text('已领取');
            getScore();
        }
    });
}


//fns lib
function initUser (){
    $('[the-id=userNode]').show();
     $.ajax({
         url:helper.dpath+'init',
         type:'get',
         dataType:'jsonp',
         success:function(res){
             $('#username').text(ks_user.showname);
             // $('#service').attr('href','http://im.wan.liebao.cn/web/icc/chat/chat?c=1&s=3&st=1&userId='+ks_user.passport);
             getNum();
             getScore();
             getScores();
             getLucky();
             getRecord();
         }
     });
    /*
    $('#username').text(ks_user.showname);
    $('#service').attr('href','http://im.wan.liebao.cn/web/icc/chat/chat?c=1&s=3&st=1&userId='+ks_user.passport);
    getNum();
    getScore();
    getScores();
    getLucky();
    getRecord();
     */

}
function initGuest (){
    $('[the-id=guestNode]').show();
    numCb();
    getLucky();
}
function toLogin (e,cb){
    if(!ks_user || ks_user.length==0){
        e.preventDefault();
        new SQ.LoginDialog({
            autoShow: !0,
            mask: !0
        });
        return false;
    }
    if(cb){
        cb();
    }
}
function numCb (){
    if(!ks_user || ks_user.length==0 ){
        $('.btn-chest-lottery').addClass('disabled-chest-lottery');
        return false;
    }
    $('#nNum').text()=='0' ? $('.btn-chest-lottery.general').addClass('disabled-chest-lottery') : $('.btn-chest-lottery.general').removeClass('disabled-chest-lottery');
    $('#sNum').text()=='0' ? $('.btn-chest-lottery.luxury').addClass('disabled-chest-lottery') :  $('.btn-chest-lottery.luxury').removeClass('disabled-chest-lottery');
}

function niceScore (){
    $('.l-bd-score').niceScroll({
        touchbehavior:false,
        cursorcolor:"#f13c56",
        cursoropacitymax:1,
        cursorwidth:'3px',
        cursorborder:"none",
        //cursorborderradius:"4px",
        railpadding:{top:15,right:0},
        background:"#fff",
        autohidemode:false,
        zindex:9
    });
}

function handler4errSimple (ret){
    if(ret!=1){
        alert('请求失败');
    }
    return true;
}
function handler4err (ret){
    if(ret==65536){
        alert('活动未开始，敬请期待');
        return true;
    }
    if(ret==65538){
        alert('非常抱歉，活动已结束！');
        return true;
    }
    if(ret!=1){
        alert('请求失败');
        return true;
    }
}




//Evt
$(document).on('click','[the-id=login]',function(e){
    toLogin(e);
});

$(document).on('click','.btn-chest-lottery',function(){
    if( !$(this).hasClass('disabled-chest-lottery') ){
        $(this).hasClass('luxury')? getPrize(true) : getPrize();
    }
});

$(document).on('click','.btn-get',function(){
    var dId=$(this).parents('.li-bd-score').attr('the-id');
    if( !$(this).hasClass('btn-geted') ) takeScore(dId,$(this));

});