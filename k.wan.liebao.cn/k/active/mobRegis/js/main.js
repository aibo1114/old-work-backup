var pkgGetable=false;

(function(){
    var winH=Math.max($('body').height(),$(document).height());

    $('.mask-win').height(winH);
    if (ks_user) {
        $('[thi-id=username]').text(ks_user.passport);
    }

    _helper={};
    _helper.gid='';

    getVerInfo();


    function getVerInfo () {
        $.ajax({
            url:'http://api.wan.liebao.cn/card/1/api/info',
            type:'get',
            dataType:'jsonp',
            // crossDomain:true,
            // cache:false,
            // xhrFields: {
            //     withCredentials: true
            // },
            success:function(res){
                var idCard,mobile;
                if(res.data){
                    idCard=res.data.id_number;
                    mobile=res.data.mobile;
                }
                renderVerUI(idCard,mobile);
            }
        });
    }

    $.ajax({
        url:'http://api.wan.liebao.cn/game/list',
        type:'get',
        dataType:'jsonp',
        crossDomain:true,
        cache:false,
        success:function(res){
            var ret=res.ret;
            var arr=res.data;
            var msg=res.msg;
            if(ret!=1){
                $('#msgError').text(msg).show();
                return false;
            }
            _helper.gameArea=[];
            _helper.games=[];
            if(ret==1){
                for (var i=0,len=arr.length;i<len;i++){
                    _helper.gameArea.push(arr[i].area);
                    _helper.games.push(arr[i].games);
                }
                renderGameBox();
                renderGameContent();
                gameEvents();

                _helper.getGameInfo=true;
            }
        }
    });

    $('#games').click(function(){
        if (!ks_user || ks_user.length == 0) {

            Login_();
            /*
             new SQ.LoginDialog({
             autoShow: !0,
             mask: !0
             });
             */
            return false;
        }
        var showGameD=function (){
            if(_helper.getGameInfo){
                $('#gameDialog').show();
                $('.mask-win').show();
            }else{
                showGameD();
            }
        };
        showGameD();
    });

    $('#servers').click(function(e){
        e.preventDefault();
        if (!ks_user || ks_user.length == 0) {

            Login_();
            /*
             new SQ.LoginDialog({
             autoShow: !0,
             mask: !0
             });
             */
            return false;
        }
        if( !_helper.gid ){
            alert('请选择游戏');
            return false;
        }
        $.ajax({
            url:'http://api.wan.liebao.cn/game/server/list?gid='+_helper.gid,
            type:'get',
            dataType:'jsonp',
            crossDomain:true,
            cache:false,
            success:function(res){
                var ret=res.ret;
                var arr=res.data;

                var msg=res.msg;
                if(ret!=1){
                    $('#msgError').text(msg).show();
                    return false;
                }
                _helper.servArea=[];
                _helper.servs=[];
                if(ret==1){
                    for (var i=0,len=arr.length;i<len;i++){
                        _helper.servArea.push(arr[i].area);
                        _helper.servs.push(arr[i].servers);
                    }
                    renderServBox();
                    renderServContent();
                    servEvents();
                    $('#serverDialog').show();
                    $('.mask-win').show();
                }
            },
            error:function(){
                alert('err');
            },
            compelete:function(){
                alert('com');
            }
        });
    });

    $('.fork').click(function(){
        $('.dialog').hide();
        $('.tip').hide();
        $('.error-tip').hide();
        $('.mask-win').hide();
    });

    function renderVerUI (idData,mobData){
        var mobContent='<div class="content-bind-v"><p class="tip-bind-v">已绑定</p><p class="text-bind-v">'+mobData+'</p></div>',
            idContent='<div class="content-bind-v"><p class="tip-bind-v">已实名认证</p><p class="text-bind-v">'+idData+'</p></div>',
            mobBtn='<span class="line-unbind-v"></span><span id="bindMobBtn" class="btn-unbind-v">绑定手机号</span>',
            idBtn='<span class="line-unbind-v"></span><span id="bindIdBtn" class="btn-unbind-v">实名认证</span>';

        mobData ? $('#mobState').html(mobContent) : $('#mobState').html(mobBtn);
        idData ? $('#idState').html(idContent) : $('#idState').html(idBtn);

        if( idData && mobData ){
            pkgGetable=true;
            $('#getCard').removeClass('grey-btn-get');
        }else{
            pkgGetable=false;
            $('#getCard').addClass('grey-btn-get');
        }
    }

    function renderGameBox (){
        var tabList='<ul class="l-tab-games">';
        var contentList='<ul class="l-content-games">';
        var hml,dsply='none',cls='';
        for (var i=0,len=_helper.gameArea.length;i<len;i++){
            i===0 ? dsply='block' : dsply='none';
            i===0 ? cls=' cur-tab' : cls='';
            tabList+='<li class="li-tab-games'+cls+'">'+_helper.gameArea[i]+'</li>';
            contentList+='<li style="display:'+dsply+'" class="li-content-games"></li>';
        }
        tabList+='<li class="clear"></li></ul>';
        contentList+='<li class="clear"></li></ul>';
        hml=tabList+contentList;
        $('#gameDialog .bd-ct-dialog').html(hml);
    }


    function renderGameContent (){
        $('.li-content-games').each(function(){
            var ndx=$(this).index();
            var thisArr=_helper.games[ndx];
            var items='';
            for (var i=0,len=thisArr.length;i<len;i++){
                if(thisArr[i].visible){
                    items+='<span class="item-li-games" gid="'+thisArr[i].gid+'">'+thisArr[i].gname+'</span>';
                }
            }
            items+='<span class="clear"></span>';
            $(this).html(items);
        });
    }

    function gameEvents (){
        $('.item-li-games').click(function(){
            var gid=$(this).attr('gid');
            var gname=$(this).text();
            _helper.gid=gid;
            $('#games').text(gname);
            $('#gameDialog').hide();
            $('.mask-win').hide();

            $('#servers').text('选择服务器');
            _helper.sid='';

        }).hover(function(){
            $(this).addClass('hover-item');
        },function(){
            $(this).removeClass('hover-item');
        });

        $('.li-tab-games').click(function(){
            var ndx=$(this).index();
            $('.li-content-games:eq('+ndx+')').show().siblings('.li-content-games').hide();
            $(this).addClass('cur-tab').removeClass('hover-tab').siblings('.li-tab-games').removeClass('cur-tab');
        }).hover(function(){
            if( !$(this).hasClass('cur-tab') ){
                $(this).addClass('hover-tab');
            }
        },function(){
            $(this).removeClass('hover-tab');
        });

        $('.mask-win').click(function(){
            $('.dialog').hide();
            $(this).hide();
        });

    }



    function renderServBox (){
        var tabList='<ul class="l-tab-servs">';
        var contentList='<ul class="l-content-servs">';
        var hml,dsply='none',cls='';
        for (var i=0,len=_helper.servArea.length;i<len;i++){
            i===0 ? dsply='block' : dsply='none';
            i===0 ? cls=' cur-tab' : cls='';
            tabList+='<li class="li-tab-servs'+cls+'">'+_helper.servArea[i]+'</li>';
            contentList+='<li style="display:'+dsply+'" class="li-content-servs"></li>';
        }
        tabList+='<li class="clear"></li></ul>';
        contentList+='<li class="clear"></li></ul>';
        hml=tabList+contentList;
        $('#serverDialog .bd-ct-dialog').html(hml);
    }

    function renderServContent (){
        $('.li-content-servs').each(function(){
            var ndx=$(this).index();
            var thisArr=_helper.servs[ndx];
            var items='';
            for (var i=0,len=thisArr.length;i<len;i++){
                items+='<span class="item-li-servs" sid="'+thisArr[i].sid+'">'+thisArr[i].sname+'</span>';
            }
            items+='<span class="clear"></span>';
            $(this).html(items);
        });
    }

    function servEvents (){
        $('.item-li-servs').click(function(){
            var sid=$(this).attr('sid');
            var sname=$(this).text();
            _helper.sid=sid;
            $('#servers').text(sname);
            $('#serverDialog').hide();
            $('.mask-win').hide();
        }).hover(function(){
            $(this).addClass('hover-item');
        },function(){
            $(this).removeClass('hover-item');
        });

        $('.li-tab-servs').click(function(){
            var ndx=$(this).index();
            $('.li-content-servs:eq('+ndx+')').show().siblings('.li-content-servs').hide();
            $(this).addClass('cur-tab').removeClass('hover-tab').siblings('.li-tab-servs').removeClass('cur-tab');
        }).hover(function(){
            if( !$(this).hasClass('cur-tab') ){
                $(this).addClass('hover-tab');
            }
        },function(){
            $(this).removeClass('hover-tab');
        });

        $('.mask-win').click(function(){
            $('.dialog').hide();
            $(this).hide();
        });

    }

    var reqUri='http://api.wan.liebao.cn/';
    var uid,gid,sid,needBindRealName;

    $('#getCard').click(function(e){
        e.preventDefault();
        if(!pkgGetable) return false;

        if (!ks_user || ks_user.length == 0) {

            Login_();
            /*
             new SQ.LoginDialog({
             autoShow: !0,
             mask: !0
             });
             */
            return false;
        }
        getInfo();

        if(!gid){
            alert('请选择游戏');
            return false;
        }
        $.ajax({
            url:reqUri+'card/1/api/getcard?uid='+uid+'&gid='+gid,
            type:'get',
            dataType:'jsonp',
            crossDomain:true,
            cache:false,
            xhrFields: {
                withCredentials: true
            },
            success:function(res){
                var resObj=res;
                var ret=resObj.ret;
                var data=resObj.data;
                var msg=res.msg;

                switch (ret) {
                    case 1:
                        $('#pkageCode').text(data.code);
                        data.status==1 ? $('#pkgStatus').text('您已领取过该游戏礼包，礼包码为：') : $('#pkgStatus').text('您的礼包码');
                        $('#getSuc').show();
                        $('.mask-win').show();
                        tipEvts();
                        break;
                    case 10001:
                        alert('此游戏不在活动范围内');
                        break;
                    case 10002 || 10004:
                        $('#unbind').show();
                        $('.mask-win').show();
                        tipEvts();
                        ret==10004 ? needBindRealName=true : needBindRealName=false;
                        break;
                    case 10003:
                        $('#unbind').show();
                        $('.mask-win').show();
                        tipEvts();
                        break;
                    default:
                        $('#msgError').text(msg).show();
                        break;
                }
            }
        });
    });

    function getInfo (){
        uid=ks_user.uid;
        gid=_helper.gid;
        sid=_helper.sid;
    }

    function getValiCode (){
        getInfo();
        $.ajax({
            url:reqUri+'card/1/api/validimg?uid='+uid,
            type:'get',
            dataType:'jsonp',
            crossDomain:true,
            cache:false,
            xhrFields: {
                withCredentials: true
            },
            success:function(res){
                var resObj=res;
                var ret=resObj.ret,
                    data=resObj.data,
                    imgUrl,validImg;

                var msg=res.msg;
                if(ret!=1){
                    _helper.mobValiMsg=msg;
                    $('#msgError').text(_helper.mobValiMsg).show();
                    return false;
                }
                if(ret==1){
                    var imgObj= new Image();
                    imgObj.src=data.url;
                    imgObj.onload=function(){
                        $('#imgValidate').html($(this));
                    };
                }
            }
        });
    }

    function getPhoneMsg (resend){
        var uid=_helper.uid,
            mobile=_helper.mobVal,
            vercode=_helper.validVal,
            sendUrl=reqUri+'card/1/api/mobilebindsms?uid='+uid+'&mobile='+mobile+'&vercode='+vercode;

        if(resend){
            sendUrl=reqUri+'card/1/api/mobilebindsms?uid='+uid+'&mobile='+mobile
        }

        $.ajax({
            url:sendUrl,
            type:'get',
            dataType:'jsonp',
            crossDomain:true,
            cache:false,
            xhrFields: {
                withCredentials: true
            },
            success:function (res) {
                var resObj=res;
                var ret=resObj.ret,
                    msg=resObj.msg;

                if(!resend) {
                    if (ret != 1) {
                        $('#codeError').show().text(msg);
                        return false;
                    }
                    $('.error-tip').hide();
                    $('.tip').hide();
                    $('#bindPhone').show();
                }
                // console.log('.......');
            }
        });
    }

    function bindPhoneNum (){
        var uid=_helper.uid,
            mobile=_helper.mobVal,
            msgCode=_helper.msgCode;
        $.ajax({
            url:reqUri+'card/1/api/mobilebind?uid='+uid+'&mobile='+mobile+'&code='+msgCode,
            type:'get',
            dataType:'jsonp',
            crossDomain:true,
            cache:false,
            xhrFields: {
                withCredentials: true
            },
            success:function (res) {

                var resObj=res;
                var ret=resObj.ret,
                    msg=resObj.msg;
                if(ret==10008){
                    $('#msgError').show().text(msg);
                    return false;
                }
                $('.error-tip').hide();
                $('#bindPhone').hide();
                $('#bindName').show();

            }
        });
    }

    function mobValidate (){
        var mobile=_helper.mobVal;

        $.ajax({
            url:reqUri+'card/1/api/mobilevalid?mobile='+mobile,
            type:'get',
            dataType:'jsonp',
            crossDomain:true,
            async:false,
            cache:false,
            success:function (res) {
                var resObj=res,
                    ret=res.ret,
                    msg=res.msg;
                if(ret!=1){
                    _helper.mobValiMsg = msg;
                    $('#mobError').text(_helper.mobValiMsg).show();
                    return false;
                }
                $('.error-tip').hide();
                getPhoneMsg();
            }
        });
    }

    function validRealname(ident,trueName){
        ident=encodeURI(ident);
        trueName=encodeURI(trueName);
        $.ajax({
            url:'http://i.wan.liebao.cn/user/modify?idcard='+ident+'&truename='+trueName,
            dataType :'jsonp',
            success:function(res){
                if(res.code!=1){
                    alert('提交失败');
                    return false;
                }
                $('#bindSuc').show();
            },
            error:function (err) {}
        });
    }


    function tipEvts(){
        var $dom=$('.confirm-btn-tip,#bindBtn,#sendMsgBtn,#sendMsgBtn,#bindNumBtn,#mobVal,#resendMsg,#changePhone,#imgValidate,.mask-win');
        $dom.unbind('click');
        $dom.unbind('blur');

        $('.confirm-btn-tip').click(function(){
            $('.tip').hide();
            $('.mask-win').hide();
        });

        $('#bindBtn').click(function(){
            $('.tip').hide();
            getValiCode();
            $('#phoneNum').show();
        });

        $('#sendMsgBtn').click(function(){
            var mobVal=$('#mobVal').val(),
                validVal=$('#validVal').val(),
                uid=ks_user.uid;

            var mobJudge=/^1\d{10}$/.test(mobVal);

            if(!mobJudge){
                $('#mobError').text('*请输入正确的手机号').show();
                return false;
            }
            _helper.mobVal=mobVal;
            _helper.validVal=validVal;
            _helper.uid=uid;

            mobValidate();

        });

        $('#bindNumBtn').click(function(){
            var msgCode=$('#msgCode').val();
            _helper.msgCode=msgCode;

            if(!msgCode){
                $('#msgError').show().text('*请输入短信验证码');
                return false;
            }

            bindPhoneNum();
        });

        $('#resendMsg').click(function(){
            $('.error-tip').hide();
            $('#validVal').val('');
            $('.tip').hide();

            getValiCode();

            $('#phoneNum').show();
        });

        $('#mobVal').blur(function(){
            var thisVal=$(this).val(),
                // mobJudge=/^1[3|4|5|7|8]\d{9}$/.test(thisVal);
                mobJudge=/^1\d{10}$/.test(thisVal);
            if(mobJudge){
                $('#mobError').text('').hide();
            }else{
                $('#mobError').text('*请输入正确的手机号').show();
            }

        });

        $('#changePhone').click(function(){
            $('.error-tip').hide();
            $('#mobVal').val('');
            $('#validVal').val('');
            $('.tip').hide();

            getValiCode();

            $('#phoneNum').show();
        });

        $('#imgValidate').click(function(){
            getValiCode();
        });

        $('.mask-win').click(function(){
            $('.dialog').hide();
            $('.tip').hide();
            $('.error-tip').hide();
            $(this).hide();
        });

    }

    $(document).on('click', '#bindMobBtn', function(){
        if (!ks_user || ks_user.length == 0) {
            Login_();
            /*
            new SQ.LoginDialog({
                autoShow: !0,
                mask: !0
            });
            */
            return false;
        }
        var verified = new Verified(function () {getVerInfo();});
        verified.renderUI('phone');
    });
    $(document).on('click', '#bindIdBtn', function(){
        if (!ks_user || ks_user.length == 0) {
            Login_();
            /*
             new SQ.LoginDialog({
                 autoShow: !0,
                 mask: !0
             });
             */
            return false;
        }
        var verified = new Verified(function () {getVerInfo();});
        verified.renderUI();
    });
})();
