$(function(){
	/*自动加载广告,并将左边广告放置正确位置*/
	var $ads_index = $(".ad_auto_index");//首页
	var $ads_detail = $(".ad_auto_detail");//详情页
	var $left_ad = $(".left_ad");//配合已修改相关css
	var $right_ad = $(".right_ad");
	var auto_ads = function(){
		$ads_index.css({"width":"168","height":"480"});
		$ads_detail.css({"width":"256","height":"186"});
		if(document.all && document.compatMode && !window.XMLHttpRequest){
			//ie6的情况下
			$left_ad.css({"margin-left":"-50%"});
			$left_ad.css({"margin-top":"80px"});
			$right_ad.css({"right":"0"});
			$right_ad.css({"margin-top":"80px"});
		}else if(document.all && window.XMLHttpRequest && !document.querySelector){
			//ie7的情况下
			$left_ad.css({"margin-left":"-50%"});
			$right_ad.css({"right":"0px"});
		}else{
			//非ie情况下
			$left_ad.css({"margin-left":"-682px"});
			$right_ad.css({"margin-left":"514px"});
		}
	}
	setTimeout(auto_ads,500);
})