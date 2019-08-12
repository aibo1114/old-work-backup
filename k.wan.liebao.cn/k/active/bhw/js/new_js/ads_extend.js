/*以下为大屏广告轮播效果,用于提前封装*/
	var $pic_width = $(document).width();
	var $ad_slide_group = $(".ads_slide");

	var $ads_loader = $(".ads_slide_indicate_group");

	function slide_right(){
		if(!$ad_slide_group.is(":animated")){
			if($ad_slide_group.css("left") !== "-"+$pic_width*2+"px"){
				$ad_slide_group.animate({"left":"-="+$pic_width+"px"},500);
			}else{
				$ad_slide_group.animate({"left":"0"},500);
			}
			var $factor2 = -(parseInt($ad_slide_group.css("left"))/$pic_width)-2;
			$ads_loader.children().eq($factor2).removeClass("ads_slide_indicate").addClass("ads_slide_indicate_current").siblings().removeClass("ads_slide_indicate_current").addClass("ads_slide_indicate");
		}
	}
	
$(function(){
	/*以下为广告推边效果*/
	/*找到相关图片*/
	var $trigger_btn = $(".ad_extender");
	$trigger_btn.hover(function(){
		if(!$(this).is(":animated")){
			/*当鼠标放上去变化*/
			switch($(this).index()){
				case 0:
				$(this).css("z-index","1").children().find(".ad_extend_pic").stop().animate({"width":"756px"},500).css("z-index","99999");
				break;

				case 1:
				$(this).animate({"left":"-250px"},500);
				$(this).css("z-index","1").children().find(".ad_extend_pic").stop().animate({"width":"756px"},500).css("z-index","99999");
				break;

				case 2:
				$(this).animate({"left":"-501px"},500);
				$(this).css("z-index","1").children().find(".ad_extend_pic").stop().animate({"width":"756px"},500).css("z-index","99999");
				break;

				case 3:
				$(this).animate({"left":"-751px"},500);
				$(this).css("z-index","1").children().find(".ad_extend_pic").stop().animate({"width":"756px"},500).css("z-index","99999");
				break;
			}	
		}
	},function(){
		/*当鼠标移开还原*/
			$(this).animate({"left":"0"},500,function(){
				$(this).css("z-index","0");
			});
			$(this).children().find(".ad_extend_pic").animate({"width":"0"},500,function(){
				$(this).css("z-index","0");
			});
	})


	/*以下为变换长条广告组*/
	var $ad_left_btn = $(".ad_extend_btn_left");
	var $ad_right_btn = $(".ad_extend_btn_right");

	var $ad_extend_group = $(".ad_extend_group");
	$ad_right_btn.click(function(){
		if(!$ad_extend_group.is(":animated")){
			if($ad_extend_group.css("margin-left")!=="-2000px"){
				$ad_extend_group.animate({"margin-left":"-=1000px"},500);
			}else{
				$ad_extend_group.animate({"margin-left":"0"},500);
			}
		}
	})

	$ad_left_btn.click(function(){
		if(!$ad_extend_group.is(":animated")){
			if($ad_extend_group.css("margin-left")!=="0px"){
				$ad_extend_group.animate({"margin-left":"+=1000px"},500);
			}else{
				$ad_extend_group.animate({"margin-left":"-2000px"},500);
			}
		}
	})
	/*以下为大屏广告轮播效果*/
	var $ad_slide_btn_left = $(".ads_slide_btn_left");
	var $ad_slide_btn_right = $(".ads_slide_btn_right");

	$ad_slide_btn_left.click(function(){
		if(!$ad_slide_group.is(":animated")){
			if($ad_slide_group.css("left") !== "0px"){
				$ad_slide_group.animate({"left":"+="+$pic_width+"px"},500);
			}else{
				$ad_slide_group.animate({"left":"-"+$pic_width*2+"px"},500);
			}
			var $factor = -(parseInt($ad_slide_group.css("left"))/$pic_width)-1;
			$ads_loader.children().eq($factor).removeClass("ads_slide_indicate").addClass("ads_slide_indicate_current").siblings().removeClass("ads_slide_indicate_current").addClass("ads_slide_indicate");
		}
	})
	$ad_slide_btn_right.click(slide_right);

	/*以下为广告下标导航*/
	var $loaders =$(".ads_slide_indicate_group a"); 
	$loaders.mouseover(function(){
		var $loader_factor = parseInt($(this).index())*$pic_width;
		$ad_slide_group.animate({"left":"-"+$loader_factor+"px"},500);
		$loaders.eq(parseInt($(this).index())).removeClass("ads_slide_indicate").addClass("ads_slide_indicate_current").siblings().removeClass("ads_slide_indicate_current").addClass("ads_slide_indicate");
	})

	
	/*以下为大屏广告自动轮播3s*/
	slide_auto2 = setInterval("slide_right()",3000);
	$(".adv-banner").hover(function(){
		clearInterval(slide_auto2);
	},function(){
		slide_auto2 = setInterval("slide_right()",3000);
	})
})