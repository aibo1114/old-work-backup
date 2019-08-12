function showAccountView() {
var str='欢迎您：<span id="usernmae" class="name-user">'+Account.getName()+'</span>'+
        '<a id="logout" href="javascript:void(0);" class="logout-user">[退出]</a>'
$('.user').html(str);
}
(function(){
    $('.li-banner:eq(0)').show();

    $('.setIndex').click(function(){
        setHome();

    });
    $('.collect').click(function(e){
        e.preventDefault();
        addfavorite();
    });
    $('.desktop').click(function(){});

    var timer=setInterval('banner()',3000);

    $('.media-web').hover(function(){
        $(this).find('.tip-obj-media').show();
    },function(){
        $(this).find('.tip-obj-media').hide();
    });

    $('.li-btn-banner').mouseenter(function(){
        clearInterval(timer);
    }).mouseleave(function(){
        timer=setInterval('banner()',3000);
    }).click(function(){
        var ndx=$(this).index();
        $(this).addClass('active').siblings('.li-btn-banner').removeClass('active');
        $('.li-banner').hide();
        $('.li-banner:eq('+ndx+')').fadeIn();
    });

    $('#logout').live('click',function(){
        Account.logout();
    });
     $('#anquLogin').click(function(){
      Account.init(showAccountView);
      Account.show();
    });
    setTimeout(function(){Account.init(showAccountView);},200);
})();

function banner (){
    var last=2;
    var ndx=$('.li-banner:visible').index();
    ndx==last ? ndx=0 : ndx++;
    $('.li-banner').hide();
    $('.li-banner:eq('+ndx+')').fadeIn();
    $('.li-btn-banner:eq('+ndx+')').addClass('active').siblings('.li-btn-banner').removeClass('active');
}

//充值订单查询
function getRecordList() {
    $.ajax({
        url:'http://api.web.anqu.com/pay/api/1/orders?offset=0&max=1000',
        type:'get',
        dataType:"jsonp",
        success:function(data){
            if(data.ret=='1'){
                var str='';
                for(var i=0;i<data.data.orders.length;i++){
                    str+='<tr><td>'+data.data.orders[i].username+'</td>'+
                         '<td> '+data.data.orders[i].game_name+'</td>'+
                         '<td>'+data.data.orders[i].money+'</td>'+
                        '<td>'+data.data.orders[i].order_id+'</td>'+
                         '<td>充值成功</td>'+
                         '<td>'+data.data.orders[i].time+'</td>'+
                         '</tr>'
                }
                $('.record-tb tbody').append(str);
            }else{
                alert(data.msg);
            }
        }
    });
}
//getRecordList();

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
