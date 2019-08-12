/*以下为详情页广告吸附样式*/
	var $append_ads_distance = $(".list_downwards_ad").offset().top;
	var $bottom_ad_distance_mark = $(".bottom_ad").offset().top-348;
	var $bottom_ad_distance_mark_ie = $(".footer_bg").offset().top;
	var $left_ad = $(".left_ad");//配合已修改相关css
	var $right_ad = $(".right_ad");
	var $doc_height = $(document).height();
	window.onscroll = function(){
		var $current_pos = $(window).scrollTop();
		if($current_pos>=$append_ads_distance){
			$(".list_downwards_ad").addClass("detail_ads_append");
		}else{
			$(".list_downwards_ad").removeClass("detail_ads_append");
		}
		if($current_pos>=$bottom_ad_distance_mark){
			$(".detail_ads_append").css("top","-100px");
		}else{
			$(".detail_ads_append").css("top","5px");
		}
		//ie 浏览器
		var scrolltop_ie = document.body.scrollTop;
		if(document.all && document.compatMode && !window.XMLHttpRequest){
			//ie6的情况下
			if(scrolltop_ie<=$bottom_ad_distance_mark_ie){
				$left_ad.css({"top":(scrolltop_ie+80)+"px"});
				$right_ad.css({"top":(scrolltop_ie+80)+"px"});
			}
			
			if(scrolltop_ie>=1500){
				$(".list_downwards_ad").css({"position":"absolute","top":(scrolltop_ie-300)+"px"});
			}else{
				$(".list_downwards_ad").css({"position":"static"});
			}
			
		}else if(document.all && window.XMLHttpRequest && !document.querySelector){
			//ie7的情况下
			$left_ad.css({"margin-left":"-50%"});
			$right_ad.css({"right":"0px"});
		}
	}