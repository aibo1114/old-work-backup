$(function(){
	var $rightAd = $(".side_ads_right");
	/*����Ϊ����ӹ��ܣ���С�����Ҳ���������ƶ���ֹ����*/
	var $side_bar = $(".sidebars");
	if($(window).width()<1500){
		$rightAd.css({"display":"none"});
		$side_bar.css({"top":"35%"});
	}
	/*����Ϊ����ر������水ť*/
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