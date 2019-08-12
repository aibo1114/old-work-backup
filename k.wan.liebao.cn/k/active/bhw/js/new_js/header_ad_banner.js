$(function(){
	var $header_small_ad = $(".header_ad");
	var $header_ad_showup = $(".header_ad_showUp");
	var $header_group = $(".header_ads_group");
	$header_ad_showup.hide();
	$header_group.mouseover(function(){
		$header_small_ad.hide();
		$header_ad_showup.show();
	}).mouseout(function(){
		$header_small_ad.show();
		$header_ad_showup.hide();
	})
})