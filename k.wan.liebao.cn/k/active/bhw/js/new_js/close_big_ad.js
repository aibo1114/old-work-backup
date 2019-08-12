$(function(){
	var $big_ad_close_btn = $('.big_bg_close_btn');
	var $big_ad = $('.big_bg_ad');
	var $body_content = $(".main_content_groups");
	$big_ad_close_btn.click(function(){
		$big_ad.hide();
		$body_content.css("margin-top","-110px");
	})
})