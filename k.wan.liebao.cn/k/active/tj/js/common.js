function showAccountView() {
    var str='<div id="lgInfo">'+
        '<p>您好,<span>'+Account.getName()+'</span></p>'+
        ' <p>登录时间：<span>'+Account.getTime()+'</span></p>'+
        ' <p>推荐您进入：</p>'+
        ' <p><a href="'+Game.getURL()+'" target="_blank">'+Game.getName()+'&nbsp;&nbsp;'+Game.getServerName()+'</a></p>'+
        ' <p id="logOut">注销</p>'+
        ' </div>';
    $('#aq-login').append(str);
}

function bannerLoop (){
    var lstNdx=2;
    var ndx=$('.bannerItem.active').index();
    if(ndx==lstNdx){
        ndx=0;
    }else{
        ndx++;
    }

    $('.bannerBtn:eq('+ndx+')').addClass('active').siblings('.bannerBtn').removeClass('active');
    $('.bannerItem:eq('+ndx+')').addClass('active').siblings('.bannerItem').removeClass('active');

}

(function(){
    $('.li-nav:eq(3)').addClass('force');

    $('.l-tj').find('.li-tj').each(function(){
        var ndx=$(this).index();
        var len=$(this).siblings('.li-tj').length;
        if (ndx==len) $(this).addClass('last');
    });

    $('.li-tab').click(function(){
        var ndx=$(this).index();
        $(this).addClass('active').siblings('.li-tab').removeClass('active');
        $('.box-tab:eq('+ndx+')').addClass('active').siblings('.box-tab').removeClass('active');
        $('.more-tab:eq('+ndx+')').addClass('active').siblings('.more-tab').removeClass('active');
    });

    $('.bannerItem:eq(0)').addClass('active');

    var bannerTimer=setInterval('bannerLoop()',3000);

    $('#banner').mouseenter(function(){
        clearInterval(bannerTimer);
    }).mouseleave(function(){
        bannerTimer=setInterval('bannerLoop()',3000);
    });

    $('.bannerBtn').click(function(){
        var ndx=$(this).index();
        $(this).addClass('active').siblings('.bannerBtn').removeClass('active');
        $('.bannerItem:eq('+ndx+')').addClass('active').siblings('.bannerItem').removeClass('active');
    });




    $('#logOut').live('click',function () {
        Account.logout();
    });
    $('.link-hd-tj').click(function(){
        registerAccount.init();
    });
    // 设置延迟加载
    setTimeout(function(){Account.init(showAccountView);},200);



    function add_favorite(title, url) {
        url = url || window.location.href;
        title = title || '';
        try{ // IE
            window.external.addFavorite(url, title);
        } catch(e) {
            try{ // Firefox
                window.sidebar.addPanel(title, url, "");
            } catch(e) {
                if (/Opera/.test(window.navigator.userAgent)) { // Opera
                    a.rel = "sidebar";
                    a.href = url;
                    return true;
                }
                alert('加入收藏失败，请使用 Ctrl+D 进行添加');
            }
        }
        return false;
    }


    $('.li-tools.setIndex').click(function(){
        setHome();
    });
    $('.li-tools.collection').click(function(){
        addfavorite();
    });
})();

function setHome () {
    try {
        var a = this;
        a.style.behavior = "url(#default#homepage)";
        var b = window.location.href;
        a.setHomePage(b)
    } catch(c) {
        alert("您好，您的浏览器不支持直接设为首页，请使用浏览器菜单手动设置本站为首页，祝您使用愉快！")
    }
}

function addfavorite () {
    var a = window.location.href,
        b = document.title;
    try {
        window.external.addFavorite(a, b)
    } catch(c) {
        try {
            window.sidebar.addPanel(b, a, "")
        } catch(c) {
            alert("请使用Ctrl+D进行添加")
        }
    }
}