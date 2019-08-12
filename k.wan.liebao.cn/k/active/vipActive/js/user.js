var helper={};
helper.domain='http://vip.wan.liebao.cn/';
helper.recordCb=function(){
    $('#recordBox').show();
};
helper.lottery=lottery;

ks_user && ks_user.length!=0 ? initLogin() : initUnlogin();

maskH();

$(document).on('click','[the-id=cService],#loginBtn',function(){
    toLogin();
});

$(window).scroll(function(){
    if ( $('.dialog').is(':visible') ){
        ieScroll();
    }
});
//关闭窗口
$(document).on('click','.fork-dialog-active,.left-dialog-btn,.right-dialog-btn,.close-dialog',function(){
    $('.dialog,.mask-dialog-active').hide();
});

//收货地址
$(document).on('click','[the-id=addrBtn]',function(e){
    e.preventDefault();
    getInfo();
});

$(document).on('click','#saveInfo',function(){
    setInfo();
});

$(document).on('click','#modifyInfo',function(){
    $('#getAddr').hide();
    $('#saveAddr').show();
});

$(document).on('click','.btn-wining-lottery',function(){
    $('.abs-wining-lottery').toggle();
});
$(document).on('mouseleave','.abs-wining-lottery',function(){
    $('.abs-wining-lottery').hide();
});

//充值卡信息，取消密码处理
/*
$(document).on('click','#checkCards',function(e){
    e.preventDefault();
    var pId=$(this).attr('pId');
    getCard('1',pId);
});
$(document).on('click','#checkCard',function(){
    var pId=$(this).attr('pId');
    getCard('2',pId);
});
*/

$('.li-tip-lottery').hover(function(){
    $(this).addClass('hover-tip-lottery');
},function(){
    $(this).removeClass('hover-tip-lottery');
});


$('#pRecord').click(function(){
    toLogin(helper.recordCb);

    $("#recordBox").niceScroll({
        touchbehavior:false,
        cursorcolor:"#f13c56",
        cursoropacitymax:1,
        cursorwidth:'2px',
        cursorborder:"none",
        //cursorborderradius:"4px",
        railpadding:{top:15,right:5},
        background:"#fff",
        autohidemode:false,
        zindex:1001
    });
}).mouseleave(function(){
    $('#recordBox').hide();
});

$('.li-btns-lottery').click(function(){
    toLogin(helper.lottery);
});

function toLogin (cb){
    if(!ks_user || ks_user.length==0){
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

function initUnlogin (){
    $('#unLoginStatus').show();
    $('#lotteryNumUnlogin').show();
}

function initLogin (){
    $('#loginStatus').show();
    $('#lotteryNumLogin').show();

    $.ajax({
        url:helper.domain+'vip/activity/first/init',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            $('#username').text(ks_user.showname);
            getNum();
            getTask();
            getRecord();
            setSerHrf();
        }
    });
}

function setSerHrf (){
    var uid=ks_user.uid,
        hf='http://wan.liebao.cn/action/redirect_kf.php?userId='+uid;
    $('[the-id=cService]').attr('href',hf);

}

function getNum (){
    $.ajax({
        url:helper.domain+'vip/activity/first/prize_times',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.ret!=1){
                resErr();
                return false;
            }
            $('[the-id=rNum]').text(res.data);
        }
    });
}

function getTask (){
    $.ajax({
        url:helper.domain+'vip/activity/first/task_list',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.ret!=1){
                resErr();
                return false;
            }
            var item='';
            for (var i=0;i<res.data.length;i++){
                res.data[i].state=='已完成' ? item+='<li class="li-task-active done">' : item+='<li class="li-task-active">';
                item+='<span class="icon-done-task">已完成</span>'+res.data[i].task_name+'</li>';
            }
            item+='<li class="clear"></li>';
            $('.l-task-active').html(item);
        }
    });
}

function getRecord (){
    $.ajax({
        // url:helper.domain+'vip/activity/first/prize_list',
        url:helper.domain+'vip/activity/first/prize_record',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.ret!=1 || !res.data){
                resErr();
                return false;
            }
            var item='';
            for (var i=0;i<res.data.length;i++){
                item+='<li class="li-record-lottery"><p class="name-record-lottery">'+res.data[i].prize_name+'</p><p class="num-record-lottery">X'+res.data[i].count+'</p>';
                switch (res.data[i].prize_type){
                    case 1 :
                        //vip体验券
                        item+='<a class="btn-record-lottery" href="http://vip.wan.liebao.cn" target="_blank">去体验</a></li>';
                        break;
                    case 2:
                        //手机充值卡
                        item+='<a id="checkCards" class="btn-record-lottery" pId="'+res.data[i].prize_id+'" href="http://wan.liebao.cn/action/redirect_kf.php" target="_blank">联系客服</a></li>';
                        break;
                    case 3:
                        //优惠券
                        item+='<a class="btn-record-lottery" href="http://wan.liebao.cn/pay" target="_blank">去使用</a></li>';
                        break;
                    case 4:
                        //加速券
                        item+='<a class="btn-record-lottery" href="http://wan.liebao.cn/pay" target="_blank">去使用</a></li>';
                        break;
                    case 5:
                        //实物
                        item+='<a the-id="addrBtn" class="btn-record-lottery" href="javascript:void(0);">收货信息</a></li>';
                        break;
                    default:
                        break;
                }

            }
            $('.l-record-lottery').html(item);
        }
    });
}

function lottery (){
    $.ajax({
        url:helper.domain+'vip/activity/first/prize_get',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.ret==65536){
                alert('活动未开始！');
                return false;
            }
            if(res.ret==65538){
                alert('活动已结束！');
                return false;
            }
            if(res.ret==65539){
                lotteryNone();
                return false;
            }
            if(res.ret!=1){
                lotteryFail();
                // resErr();
                return false;
            }
            var prizeNum;
            $('[the-id=prizeName]').text(res.data.prize_name);
            $('[the-id=prizeId]').val(res.data.prize_type);
            if(res.data.prize_type==2){
                $('[the-prize=2] #checkCard').attr('pId',res.data.prize_id);
            }
            if(res.data.prize_type==3 || res.data.prize_type==4){
                res.data.prize_name.substr(0,1)==5 ? prizeNum=res.data.prize_name.substr(0,1) : prizeNum=res.data.prize_name.substr(0,2);
                $('[the-id=prizeNum]').text(prizeNum);
            }
            $('[the-prize='+res.data.prize_type+'],.mask-dialog-active').show();
            ieScroll();
            getNum();
            getRecord();
        }
    });
}

function getCard (type,pId){
    $.ajax({
        url:helper.domain+'vip/activity/first/card_get?type='+type+'&prize_id='+pId,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var data=res.data,item='';
            if(res.ret!=1){
                resErr();
                return false;
            }
            for (var i=0;i<data.length;i++){
                item+='<li class="li-psd-dialog"><h4 class="name-psd-dialog">'+data[i].prize_name+'</h4>';
                item+='<p class="txt-psd-dialog">卡号：'+data[i].card_no+'</p>';
                item+='<p class="txt-psd-dialog">密码：'+data[i].card_secret+'</p></li>';
            }
            $('.l-psd-dialog').html(item);
            $('.dialog').hide();
            $('.dialog-sm-simple,.mask-dialog-active').show();
            ieScroll();
        }
    });
}

function getInfo (){
    $.ajax({
        url:helper.domain+'vip/activity/first/receieve_get',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var data=res.data;
            if(res.ret!=1){
                resErr();
                return false;
            }
            if(!data.name && !data.phone && !data.address){
                $('#saveAddr,.mask-dialog-active').show();
                ieScroll();
                return false;
            }
            $('#receiverName').text(data.name);
            $('#receiverContact').text(data.phone);
            $('#receiverAddress').text(data.address);
            $('.dialog').hide();
            $('#getAddr,.mask-dialog-active').show();
            ieScroll();

        }
    });
}
function setInfo (){
    var receiver=$('#receiver').val(),
        contact=$('#contact').val(),
        address=$('#address').val(),
        checkU=checkUserLen(),
        checkP=checkPhone(),
        checkA= checkAddrLen();
    if(!receiver || !contact || !address){
        alert('请填写完整的收货信息');
        return false;
    }
    if(!checkU){
        alert("收货人最多20字，谢谢");
        return false;
    }
    if(!checkP){
        alert("手机号码有误，请重填");
        return false;
    }
    if(!checkA){
        alert("收货地址最多50字，谢谢");
        return false;
    }
    receiver=encodeURIComponent(receiver);
    contact=encodeURIComponent(contact);
    address=encodeURIComponent(address);

    sendInfo(receiver,contact,address);
}
function sendInfo (receiver,contact,address) {
    $.ajax({
        url:helper.domain+'vip/activity/first/receieve_save?name='+receiver+'&phone='+contact+'&address='+address,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            if(res.ret!=1){
                resErr();
                return false;
            }
            $('.mask-dialog-active,.dialog').hide();
        }
    });
}

function maskH (){
    var winH=Math.max( $('body').height(),$(document).height() );
    $('.mask-dialog-active').height(winH);
}

function resErr (){}
function lotteryFail (){
    alert('换个姿势试试吧');
}
function lotteryNone (){
    alert('没有多余的抽奖次数了');
}

function AddFavorite(title,url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

function ieScroll (){
    var ieMode = document.documentMode;
    var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
    var isIE7 = isIE && !isIE6 && !ieMode || ieMode == 7;
    if(isIE6 || isIE7){
        var sH = document.documentElement.scrollTop+document.body.scrollTop;
        var t=sH+100;
        $('.dialog').css('top',t+'px');
    }
}

function checkPhone(){
    var phone = document.getElementById('contact').value;
    var vl=true;
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        vl=false;
    }
    return vl;
}
function checkUserLen (){
    var u = document.getElementById('receiver').value;
    var vl=true;
    if( u.length>20 ){
        vl=false;
    }
    return vl;
}

function checkAddrLen (){
    var addr = document.getElementById('address').value;
    var vl=true;
    if( addr.length>50 ){
        vl=false;
    }
    return vl;
}

$('#collect').click(function(){
    AddFavorite('豹会员抽奖','http://k.wan.liebao.cn/k/active/vipActive');
});

