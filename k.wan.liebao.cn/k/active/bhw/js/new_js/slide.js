var $slide_content = $(".slide_content");
var $slide_small_pic = $(".slide_small_content");
function auto_right(){
			/*大图*/
			if(!$slide_content.is(":animated")){
				$slide_content.animate({"left":"-340px"},500,function(){
					$(".slide_content li").first().remove().insertAfter($(".slide_content li").last());
				}).animate({"left":"0px"},0);
			}
			if($(".slide_small_pic_selected").index()<2){
				//小于2因为小图index最大为2
				$slide_small_pic.find(".slide_small_pic_selected").next().addClass("slide_small_pic_selected").siblings().removeClass("slide_small_pic_selected");
				
			}else{
				if(!$slide_small_pic.is(":animated")){
					$slide_small_pic.animate({"left":"-110px"},500,function(){
						$(".slide_small_content a").first().detach().insertAfter($(".slide_small_content a").last());
						$(".slide_small_content a").eq(2).addClass("slide_small_pic_selected").siblings().removeClass("slide_small_pic_selected");
					}).animate({"left":"0"},0);
				}
			}
		}
$(function(){
	/*以下为非广告轮播效果*/
	var $news_downslide_left = $(".news_slide_btn_left");
	var $news_downslide_right = $(".news_slide_btn_right");
	$news_downslide_left.click(function(){
		if(!$(".news_slide_group").is(":animated")){
			if($(".news_slide_group").css("left")!=="0px"){
				$(".news_slide_group").animate({"left":"+=1000px"},500);
			}else{
				$(".news_slide_group").animate({"left":"-2000px"},500);
			}
		}
	})
	$news_downslide_right.click(function(){
		if(!$(".news_slide_group").is(":animated")){
			if($(".news_slide_group").css("left")!=="-2000px"){
				$(".news_slide_group").animate({"left":"-=1000px"},500);
			}else{
				$(".news_slide_group").animate({"left":"0px"},500);
			}
		}
	})

	/*以下为首页轮播大图*/
		/*按钮滑入效果*/
		var $slide_left = $("#left_btn");
		var $slide_right = $("#right_btn");
		var $slide_bulk = $(".slide");
		
		$slide_bulk.hover(function(){
			if(!$slide_left.is(":animated")&&!$slide_right.is(":animated")){
				$slide_left.animate({"left":"0"},200);
				$slide_right.animate({"left":"300px"},200)
			}
		},function(){
			if(!$slide_left.is(":animated")&&!$slide_right.is(":animated")){
				$slide_left.animate({"left":"-40px"},200);
				$slide_right.animate({"left":"340px"},200)	
			}
		})
		
		/*以下为鼠标移上小图边框变化*/
		
		var $left_now = parseInt($slide_content.css("left"));
		$(".slide_small_content a").mouseover(function(){
			if(!$slide_content.is(":animated")){
				var $slide_index = $(".slide_small_pic_selected").index();//轮播当前index
				var $user_factor = $(this).index();//用户的index
				if($user_factor>$slide_index){
					$slide_content.animate({"left":"-"+($user_factor-$slide_index)*340+"px"},500,function(){
						$(".slide_content li:lt("+($user_factor-$slide_index)+")").detach().insertAfter($(".slide_content li").last());
					}).animate({"left":"0px"},0);

					$(this).addClass("slide_small_pic_selected").siblings().removeClass("slide_small_pic_selected");
				}else if($user_factor<$slide_index){
					var $test = -($user_factor-$slide_index);
					$slide_content.animate({"left":"-"+($slide_index-$user_factor)*340+"px"},0,function(){
						$(".slide_content li:gt("+(3-$test)+")").detach().insertBefore($(".slide_content li").first());
					}).animate({"left":"0px"},500);
					$(this).addClass("slide_small_pic_selected").siblings().removeClass("slide_small_pic_selected");
				}
			}
		})

		/*以下为大图轮播效果*/
		
		$slide_left.click(function(){
			if(!$slide_content.is(":animated")){
				$slide_content.animate({"left":"-340px"},0,function(){
					$(".slide_content li").last().remove().insertBefore($(".slide_content li").first());
				}).animate({"left":"0px"},500);
			}
			if($(".slide_small_pic_selected").index()>0){
				$slide_small_pic.find(".slide_small_pic_selected").prev().addClass("slide_small_pic_selected").siblings().removeClass("slide_small_pic_selected");
				
			}else{
				if(!$slide_small_pic.is(":animated")){
					$slide_small_pic.animate({"left":"-110px"},0,function(){
						$(".slide_small_content a").last().detach().insertBefore($(".slide_small_content a").first());
						
					}).animate({"left":"0px"},500,function(){
						$(".slide_small_content a").eq(0).addClass("slide_small_pic_selected").siblings().removeClass("slide_small_pic_selected");
					});
				}
			}
		})

		
		$slide_right.click(auto_right);

		slide_auto = setInterval("auto_right()",2000);
			$slide_bulk.hover(function(){
				clearInterval(slide_auto);
			},function(){
				slide_auto = setInterval("auto_right()",2000);
		});
})