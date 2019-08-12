$(function(){
	var $ads = $(".rightdown_ad_blocks");
	var $ad_mark = $(".rightdown_mark");
	$ad_mark.mouseover(function(){
		$(this).find(".rightdown_ad_blocks").css("display","block");
		$(this).siblings().find(".rightdown_ad_blocks").css("display","none");

		$(this).find(".rightdown_words").css("display","none");
		$(this).siblings().find(".rightdown_words").css("display","inline-block");

		$(this).find(".pub_time").css("display","none");
		$(this).siblings().find(".pub_time").css("display","inline-block");
	})
})