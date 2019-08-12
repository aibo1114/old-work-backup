$(function(){
	var $rightAd = $(".side_ads_right");
	/*以下为新添加功能，在小屏下右侧电梯向上移动防止挡道*/
	var $side_bar = $(".sidebars");
	if($(window).width()<1500){
		$rightAd.css({"display":"none"});
		$side_bar.css({"top":"35%"});
	}
	/*以下为点击关闭两侧广告按钮*/
	var $close_ad_left = $('.close_ad_left');
	var $close_ad_right = $('.close_ad_right');
	
	var $ads_left = $('.side_ads_left');
	var $ads_right = $('.side_ads_right');
	$close_ad_left.click(function(){
		$ads_left.hide();
	})
	$close_ad_right.click(function(){
		$ads_right.hide();
	})
})