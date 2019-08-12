var outHref='http://wan.liebao.cn/action/logout.php?bu=http%3A%2F%2Fvip.wan.liebao.cn'+location.pathname,
    alias=location.pathname.substr(10);

function goPay (){
    $.ajax({
        url: 'http://vip.wan.liebao.cn/vip/user/api/info',
        type: 'get',
        dataType: 'jsonp',
        success: function (res) {
            var status = res.data.status,
                hrf;
            status == 0 ? hrf = '/payOpen.html' : hrf = '/payRe.html';
            newWin(hrf, 'hideBtn4open');
        }
    });
}
function goGet (hrf){
    $.ajax({
        url: 'http://vip.wan.liebao.cn/vip/user/api/info',
        type: 'get',
        dataType: 'jsonp',
        success: function (res) {
            var status = res.data.status;

            if( status == 0){
                $('#receiveTipBtn').attr('href','http://vip.wan.liebao.cn/payOpen.html');
                $('.tip-gp,.mask-tip-gp').show();
                return false;
            }
            newWin(hrf, 'hideBtn4webSite');
        }
    });
}

function newWin(url, id) {
    var a = document.createElement('a');
    a.setAttribute('href',url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id',id);
    if (!document.getElementById(id)) {
        document.body.appendChild(a);
        a.click();
    }else{
        // $('#'+id).trigger('click');
        window.open(url);
    }
    // $(a).trigger('click');

}

function h(){
    var h=Math.max( $(document).height(), $('body').height() );
    return h;
}

(function () {
    var maskH=h();
    if(!ks_user || ks_user.length == 0){
        $('.y-login-header').hide();
        $('.n-login-header').show();
    }else{
        $('#username').text(ks_user.showname);
        $('#logout').attr('href',outHref);
        $('.y-login-header').show();
        $('.n-login-header').hide();
    }

    $('.mask-tip-gp').height( maskH );

    //Evts
    $(document).on('click','#loginBtn',function(){
        new SQ.LoginDialog({
            autoShow: !0,
            mask: !0
        });
    });
    $(document).on('click','[the-id=openBtn]',function(){
        if(!ks_user || ks_user.length == 0){
            new SQ.LoginDialog({
                autoShow: !0,
                mask: !0
            });
            return false;
        }
        goPay();
    });
    $(document).on('click','[the-id=receiveBtn]',function(){
        var hrf;
        if(!ks_user || ks_user.length == 0){
            new SQ.LoginDialog({
                autoShow: !0,
                mask: !0
            });
            return false;
        }
        $(this).attr('the-role')=='pri' ?  hrf='http://vip.wan.liebao.cn/member.html?pkg=pri' : hrf='http://wan.liebao.cn'+alias;
        goGet(hrf);
    });
    $(document).on('click','.btn-close-tip',function(){
        $('.mask-tip-gp,.tip-gp').hide();
    });

    $(window).scroll(function(){
        var t= $(this).scrollTop();
        var l= $('.l-nav-gp').offset().left;

        if(t>=600) {
            $('.l-nav-gp').addClass('nav-fix-gp').css({
                left:l
            })
        }else{
            $('.l-nav-gp').removeClass('nav-fix-gp').css({
                left:'1100px'
            })
        }
    });

    $('.li-tab-gp').mouseenter(function(){
        var ndx=$(this).index();
        var $pList=$(this).parents('.l-tab-gp');

        $(this).addClass('hvr-tab-gp').siblings('.li-tab-gp').removeClass('hvr-tab-gp');
        $pList.siblings('.content-tab-gp').children('.pane-tab-gp:eq('+ndx+')').show().siblings('.pane-tab-gp').hide();
    });

    $('.li-btn-header .more').mouseenter(function(){
        $(this).addClass('link-hvr-header').siblings('.l-more-header').show();
    });
    $('.l-more-header').mouseleave(function(){
        $(this).hide();
        $('.li-btn-header .more').removeClass('link-hvr-header');
    });


    $('.media-tab-gp').mouseenter(function () {
        $('.abs-media-tab').hide();
        $(this).children('.abs-media-tab').show();
    }).mouseleave(function () {
        $('.abs-media-tab').hide();
    });

    $('.media-td-gp').mouseenter(function () {
        $('.abs-media-td').hide();
        $(this).children('.abs-media-td').show();
    }).mouseleave(function () {
        $('.abs-media-td').hide();
    });
})();
