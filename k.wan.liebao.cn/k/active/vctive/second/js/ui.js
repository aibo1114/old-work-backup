//flow
var uiData={};
maskH();

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

//Evt
$('#collect').click(function(){
    AddFavorite('豹会员活动--第二弹','http://k.wan.liebao.cn/k/active/vctive/second');
});

$('.l-navfix').on('click','.to-top',function(){
    if( ($('html').scrollTop()!=0 || $('body').scrollTop()!=0) && !$('html,body').is(':animated') ) $('html,body').animate({scrollTop:'0px'},400);
});

$('.eg-title-rule').click(function (){
    $('.abs-tip-title').hide();
    $(this).siblings('.abs-tip-title').show();
});

$(document).on('click',function(e){
    var t=$(e.target);
   if( !t.hasClass('eg-title-rule') && !t.hasClass('abs-tip-title') && !t.hasClass('text-tip-title') && !t.hasClass('arrow-tip-abs') && !t.hasClass('eg') ) $('.abs-tip-title').hide();
});

$(document).on('click','[the-tri=dialog]',function(e){
    e.preventDefault();
    var hock=$(this).attr('the-hock');
    $('.mask,.'+hock).show();
    if(hock=='d-1-lg'){
        setDtop();
        uiData.sT=$(window).scrollTop();
        $('.l-d1-lg').show().niceScroll({
            touchbehavior:false,
            cursorcolor:"#f13c56",
            cursoropacitymax:1,
            cursorwidth:'3px',
            cursorborder:"none",
            //cursorborderradius:"4px",
            railpadding:{top:15,right:0},
            background:"#fff",
            autohidemode:false,
            zindex:1010
        });
    }
});

$(document).on('click','.fork-d',function(){
    $('.mask,.dialog,.l-d1-lg').hide();
});

$(document).on('click','.btn-address',function(){
    $('.dialog').hide();
    getAddr();
});

$(document).on('click','#saveAddr',function(){
    saveAddr();
});
$(document).on('click','#editAddr',function(){
    $('[the-id=checkAnode]').addClass('none');
    $('[the-id=editAnode]').removeClass('none');
});

$('.btn-record').click(function(){
    $('.box-record').show().niceScroll({
        touchbehavior:false,
        cursorcolor:"#f13c56",
        cursoropacitymax:1,
        cursorwidth:'4px',
        cursorborder:"none",
        //cursorborderradius:"4px",
        railpadding:{top:15,right:5},
        background:"#fff",
        autohidemode:false,
        zindex:9
    })
});
$('.abs-record').mouseleave(function(){
    $('.box-record').hide();
});

$(document).on('click','.btn-wining-lottery',function(){
    $('.abs-wining-lottery').toggle();
});
$(document).on('mouseleave','.abs-wining-lottery',function(){
    $('.abs-wining-lottery').hide();
});



//fns lib


function maskH (){
    var h=Math.max( $('body').height(),$(document).height() );
    $('.mask').height(h);
}

function setDtop (){
    var sT=$(window).scrollTop();
    $('.dialog:visible').css('top',sT+120);
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


/*
 function setDocW (){
 var w=document.body.clientWidth;
 if(w>=1100){
 alert(w);
 $('body,.header-vctive,.container-vctive,.banner').css({
 'width': w+'px',
 'overflow': 'hidden'
 });
 }
 }



function railsTop (){
    var initT = uiData.sT;
    var curT = $(window).scrollTop();
    var differ = curT-initT;
    var railT = parseInt( $('.nicescroll-rails').css('top') );
    var railGo = railT+differ;

    console.log('initT:'+initT);
    console.log('curT:'+curT);
    console.log('railT:'+railT);
    console.log('railGo:'+railGo);

    $('.nicescroll-rails').css('top',railGo);

}
$(window).scroll(function () {
    setDtop();
    railsTop();
});
*/