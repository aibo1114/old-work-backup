var helper={};
helper.orderId='';
helper.host='http://api.web.anqu.com/';
helper.defaultCost=10;


(function(){
    var host='http://api.web.anqu.com/';

    var $gBox=$('[the-id=gameBox]');
    var $sBox=$('[the-id=serverBox]');
    var $gBtn=$('[the-id=gameBtn]');
    var $sBtn=$('[the-id=serverBtn]');
    var $gTip=$('[the-id=gameTip]');
    var $sTip=$('[the-id=serverTip]');
    var $costItem=$('[the-id=costItem]');
    var $costIpt=$('[the-id=costIpt]');

    var $payBtn=$('#payBtn');

    var gid,sid,cost=helper.defaultCost,pType=22,gname,sname;

    var $tabs = $('.tab');

    var maxH=Math.max($(document).height(),$('body').height());

    $('body').click(function(){
        $gBox.hide();
        $sBox.hide();
    });

    $('.mask-dialog').height(maxH);

    $.ajax({
        url:host+'game/api/1/game',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            // console.log(res);
            var ret=res.ret;
            var data=res.data;
            if(ret==1){
                var list='<ul class="l-games">';
                for(var i=0;i<data.length;i++){
                    list+='<li gid="'+data[i].game_id+'" class="li-games">'+data[i].game_name+'</li>';
                }
                list+='</ul>';
                $gBox.find('.bd-box-recharge').html(list);
                $('[the-id=tipGname]').text( $('.li-games:eq(0)').text() );
                handler4game();
            }
        }
    });

    $tabs.click(function(){
        var ndx=$(this).index();
        $(this).addClass('tab_arrow').siblings().removeClass('tab_arrow');

        $('.content-recharge').hide();

        $('.content-tab-recharge:eq('+ndx+')').show().addClass('active').siblings('.content-tab-recharge').removeClass('active').hide();

        pType=parseInt( $(this).attr('pType') );
        gid='';sid='';gname='';sname='';

        $('[the-id=costItem]').removeClass('active');
        $('[the-id=costItem].first').addClass('active').siblings('[the-id=costItem]');
        $costIpt.val('');
        cost=helper.defaultCost;
        $('#tCodeBox').html('');
        $('.wc-pay-replace').show();
        $('.ali-pay-replace').show();

        $gBtn.text('选择充值游戏');
        $sBtn.text('选择游戏服务器');

        switchNum();
        $('[the-id=tipGname]').text( $('.li-games:eq(0)').text() );
        // switchName();
    });

    $gBtn.click(function(e){
        e.stopPropagation();
        $sBox.hide();
        $sTip.hide();

        $sBtn.parents('.li-btn-recharge').removeClass('active');
        $(this).parents('.li-btn-recharge').toggleClass('active');
        $('[the-id=gameBox]').toggle();
    });

    $sBtn.click(function(e){
        e.stopPropagation();
        if(gid){
            $gBox.hide();
            $gBtn.parents('.li-btn-recharge').removeClass('active');
            $(this).parents('.li-btn-recharge').toggleClass('active');
            $sBox.toggle();
        }else{
            $sTip.show();
        }
    });

    $costItem.click(function(){
        $costIpt.val('');
        $(this).addClass('active').siblings('[the-id=costItem]').removeClass('active');
        //rework
        cost=$(this).attr('cost');
        // cost=parseFloat($(this).attr('cost'))/1000;

        if(pType==4){
            if(sid){
                //sendOrder();
                hasRole();
            }
        }else{
            $('#tCodeBox').html('');
            $('.wc-pay-replace').show();
        }

        switchNum();
    });

    $costIpt.click(function(){
        cost=undefined;
        $costItem.removeClass('active');
    }).blur(function () {
        var thisVal=parseInt($(this).val()) ;
        // if(!thisVal){
        //     return;
        // }
        //rework
        // console.log(thisVal);
        if( thisVal>=10 && thisVal<=5000 ){
            // thisVal=Math.floor(thisVal * 100) / 100;
            // thisVal=thisVal.toFixed(2);
            $(this).val(thisVal);
            cost=thisVal;
            if(pType==22){
                $('#tCodeBox').html('');
                $('.wc-pay-replace').show();
            }
            switchNum();
        }else{
            cost=helper.defaultCost;
            $('[the-id=costItem]:visible:eq(0)').addClass('active');
            if(thisVal){
                alert('请输入10-5000之间的任意数值');
            }
            $(this).val('');

        }

    });

    $payBtn.click(function(){
        if (!gid){
            $gTip.show();
            return;
        }
        if(!sid){
            $sTip.show();
            return;
        }
        if(!cost){
            alert('请选择正确的充值金额');
            return;
        }
        //sendOrder(gid,sid,cost,pType);
        //sendOrder();
        hasRole();
    });

    $('[the-id=chargeContinue]').click(function(e){
        e.preventDefault();
        window.location.reload();
    });
    $(document).on('mouseenter','.li-games,.li-servers',function(){
        $(this).css('text-decoration','underline');
    });
    $(document).on('mouseleave','.li-games,.li-servers',function(){
        $(this).css('text-decoration','none');
    });
    $('.fork-dialog,.btn-dialog').click(function(){
        $('.dialog').hide();
        $('.mask-dialog').hide();
    });


    function handler4game (){
        $gBox.click(function(e){
            e.stopPropagation();
        });
        $('.li-games').click(function(e){
            e.stopPropagation();
            gid=$(this).attr('gid');
            gname=$(this).text();
            $gTip.hide();
            $sBtn.text('选择游戏服务器');
            sid='';
            $('.li-btn-recharge').removeClass('active');
            getServer(gid);
            $gBtn.text($(this).text());
            $gBox.hide();
            switchName();
        });
    }

    function handler4server (){
        $sBox.click(function(e){
            e.stopPropagation();
        });
        $('.li-servers').click(function(e){
            e.stopPropagation();
            sid=$(this).attr('sid');
            sname=$(this).text();
            $sTip.hide();
            $('.li-btn-recharge').removeClass('active');
            $sBtn.text($(this).text());
            $sBox.hide();
            if(pType==4){
                //sendOrder();
                hasRole();
            }else{
                $('#tCodeBox').html('');
                $('.wc-pay-replace').show();
            }
        });
    }

    function getServer (gid){
        $.ajax({
            url:host+'game/api/1/server?game_id='+gid,
            type:'get',
            dataType:'jsonp',
            success:function(res){
                // console.log(res);
                var ret=res.ret;
                var data=res.data.servers;
                if(ret==1){
                    var list='<ul class="l-servers">';
                    for(var i=0;i<data.length;i++){
                        list+='<li sid="'+data[i].server_id+'" class="li-servers">'+data[i].server_name+'</li>';
                    }
                    list+='</ul>';
                    $sBox.find('.bd-box-recharge').html(list);
                    handler4server();
                }
            }
        });
    }

    function hasRole(){
        $.ajax({
            url:host+'game/api/1/check_player?game_id='+gid+'&server_id='+sid,
            type:'get',
            dataType:'jsonp',
            success:function(res){
                //console.log(res);
                var ret=res.ret;
                if(ret!='1'){
                    $('.js-d-role').show();
                    $('.mask-dialog').show();
                    $('#tCodeBox').html('');
                    if(pType==4){
                        $('.ali-pay-replace').show();
                    }
                    return false;
                }
                if(ret=='1'){
                    var nickname=res.data.nickname;
                    if(!nickname){
                        $('.js-d-role').show();
                        $('.mask-dialog').show();
                        $('#tCodeBox').html('');
                        if(pType==4){
                            $('.ali-pay-replace').show();
                        }
                        return false;
                    }
                    sendOrder();
                }
            }
        });
    }

    function sendOrder (){
        // console.log(gid);
        // console.log(sid);
        // console.log(cost);
        // console.log(pType);
        // console.log(gname);
        // console.log(sname);
        $.ajax({
            url:host+'pay/api/1/order?game_id='+gid+'&game_name='+gname+'&server_id='+sid+'&server_name='+sname+'&money='+cost+'&pay_type='+pType,
            // url:host+'pay/api/1/order',
            type:'get',
            dataType:'jsonp',
            data:{
                game_id:gid,
                game_name:gname,
                server_id:sid,
                server_name:sname,
                money:cost,
                pay_type:pType
            },
            domain:true,
            success:function(res){
                // console.log(res);
                var ret=res.ret;

                if(ret==1){
                    var qrUrl=res.data.args.qr_url;
                    var order_id=res.data.order_id;
                    var tcode='<img id="tCode" src="'+qrUrl+'" />';


                    helper.orderId=order_id;

                    if(pType==22){
                        $('.wc-pay-replace').hide();
                        helper.timer=setInterval('getResWc()',4000);
                    }
                    if(pType==4){
                        $('.ali-pay-replace').hide();
                        helper.timer=setInterval('getResAli()',4000);
                    }

                    $('#tCodeBox').html(tcode);
                }
            }
        });
    }

    function isLogin (){
        $.ajax({
            // http://api.web.anqu.com/account/api/1/islogin?callback=jQuery18003988917809741974_1472789893952&_=1472789894166
            url:host+'account/api/1/islogin',
            type:'get',
            dataType:'jsonp',
            success:function(res){
                console.log(res);
            }
        });
    }

    function switchNum (){
        var dfV=parseInt( $costIpt.val() || $('[the-id=costItem].active:visible').attr('cost') );

        $('[the-id=sO]').text(dfV);
        $('[the-id=sT]').text(dfV*10);
    }

    function switchName (){
        var dfV=$gBtn.text();
        $('[the-id=tipGname]').text(gname);
    }

})();

function getResWc(){
    // console.log(helper.orderId);
    $.ajax({
        url:helper.host+'pay/api/1/order/'+helper.orderId,
        type:'get',
        dataType:'jsonp',
        success:function(res){
            var ret=res.ret;

            if(ret==1){
                var status=res.data.status,
                    username=res.data.username,
                    game_name=res.data.game_name,
                    server_name=res.data.server_name,
                    money=res.data.money;
                if(status==2){

                    $('#tCodeBox').html('');
                    $('.content-tab-recharge').hide();
                    $('.content-recharge.success').show();

                    $('#chargeAccount').html(username);
                    $('#chargeGame').html(game_name);
                    $('#chargeServer').html(server_name);
                    $('#chargeMoney').html(money);

                    clearInterval(helper.timer);
                }
            }
        }
    });
}
function getResAli(){
    $.ajax({
        url:helper.host+'pay/api/1/alipay/qr',
        type:'get',
        dataType:'jsonp',
        success:function(res){
            // alert(res);
            var ret=res.ret;

            if(ret==1){
                var status=res.data.status,
                    username=res.data.username,
                    game_name=res.data.game_name,
                    server_name=res.data.server_name,
                    money=res.data.money;
                if(status==2){

                    $('#tCodeBox').html('');
                    $('.content-tab-recharge').hide();
                    $('.content-recharge.success').show();

                    $('#chargeAccount').html(username);
                    $('#chargeGame').html(game_name);
                    $('#chargeServer').html(server_name);
                    $('#chargeMoney').html(money);

                    clearInterval(helper.timer);
                }
            }
        }
    });
}