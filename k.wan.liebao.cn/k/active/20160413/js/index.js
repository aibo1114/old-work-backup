/**
 * Created by Administrator on 2016/4/13.
 */
window.onscroll=function(){
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var dwith=document.documentElement.clientWidth||document.body.clientWidth||window.screen.availWidth;
    var tWd=(dwith-1018)/2-154;
    var dWd=(dwith-1018)/2-112;
    $('.chuanqibaye').css('right',dWd);
    $('.od_couplet_right').css('right',tWd);
    $('.od_couplet_left').css('left',tWd)
    //alert("scrollTop");
    if(scrollTop>773){
        $('#fixeddiv').removeClass('od_couplet');
        $('.chuanqibaye').addClass('fixed');
        $('.od_couplet_left').addClass('fixed');
        $('.od_couplet_right').addClass('fixed');
       // alert("222");
    }else{
        $('#fixeddiv').addClass('od_couplet');
        $('.od_couplet_left').removeClass('fixed');
        $('.od_couplet_right').removeClass('fixed');
        $('.chuanqibaye').removeClass('fixed');
    }

}
window.onresize=function(){
    var dwith=document.documentElement.clientWidth||document.body.clientWidth||window.screen.availWidth;
    var tWd=(dwith-1018)/2-154;
    var dWd=(dwith-1018)/2-112;
    //console.log(tWd+'======'+dwith);
    $('.chuanqibaye').css('right',dWd);
    $('.od_couplet_right').css('right',tWd);
    $('.od_couplet_left').css('left',tWd)
}
window.onload=function(){
    var dwith=document.documentElement.clientWidth||document.body.clientWidth||window.screen.availWidth;
    var tWd=(dwith-1018)/2-154;
    var dWd=(dwith-1018)/2-112;
    //console.log(tWd+'======'+dwith);
    $('.chuanqibaye').css('right',dWd);
    $('.od_couplet_right').css('right',tWd);
    $('.od_couplet_left').css('left',tWd)
}
$('.introduce').on('click',function(){
    $(document).scrollTop(742);
});
