$(function(){
	var $qrcode = $('.downloadStarter');
	var $qrcode_btn = $('.downloadLocate');
	
	$qrcode.mouseover(function(){
		$qrcode_btn.css({"display":"block"})
		$('.side_qrceode').css('background-position','0 0');
	}).mouseout(function(){
		$qrcode_btn.css({"display":"none"})
		$('.side_qrceode').css('background-position','0 -50px');
	})

	$qrcode_btn.mouseover(function(){
		$(this).css({"display":"block"})
		$('.side_qrceode').css('background-position','0 0');
	}).mouseout(function(){
		$(this).css({"display":"none"})
		$('.side_qrceode').css('background-position','0 -50px');
	})
	/*以下为当页面向下滚动时显现向上按钮*/
	var $up_btn = $('.backTop');
	$up_btn.hide();
	var $hide_mark = $(".qr_mark");
	var $bar_mark = $(".downloadStarter");
	$(document).scroll(function(){
		var $up_btn_distance = $bar_mark.offset().top;
		var $mark_distance = $hide_mark.offset().top;
		if($up_btn_distance>=$mark_distance){
			$up_btn.show();
		}else{
			$up_btn.hide();
		}
	});
})