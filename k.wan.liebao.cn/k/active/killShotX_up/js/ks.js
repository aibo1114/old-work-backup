$('.ks-download em').on('click',function(){
	$(this).parent().hide();
	$(this).parent().prev().hide();
})
$('.ks-jingqi em').on('click',function(){
	$(this).parent().hide();
	$('.ks-mark').hide();
	//$(this).parent().prev().hide();
})
$('.getmark').on('click',function(){
	$('.ks-mark').show();
	$('.ks-download').show();
})
$('.ks-ios').on('click',function(e){
	if(e&&e.preventDefault ){
		e.preventDefault ();
	}else{
		window.event.returnValue = false;
		return false;
	}
	$('.ks-mark').show();
	$('.ks-jingqi').show();
})
$('.video').on('click',function(){
	$('.ks-mark').show();
	$('.video-alert').show();
	$('.video-code').html('<embed width="100%" height="100%" title="视频鉴赏" wmode="transparent" src="http://download.wan.liebao.cn/media/header.swf" allowfullscreen="true" flashvars="vcastr_file=http://image.wan.liebao.cn/game/jyjh/css/flv/jyjh.flv&amp;LogoText=剑雨江湖&amp;IsAutoPlay=1" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">')
})
$('.video-close').on('click',function(){
	$('.ks-mark').hide();
	$('.video-alert').hide();
	$('.video-code').html('');
})
window.onscroll=function(){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var h=document.documentElement.clientHeight||document.body.clientHeight;
	if(scrollTop>h){
		$('.toTop').show();
	}else{
		$('.toTop').hide();
	}
}
$('.toTop').on('click',function(){
	$(document).scrollTop(0);
})
