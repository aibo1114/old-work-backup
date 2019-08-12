
	var $left_btn = $('.left_btn');
	var $right_btn = $('.right_btn');

	
	var $slide_block = $('.slide_block');
	

	function click_right(){
		if(!$slide_block.is(":animated")){
			var $content = $('.slide_content');
			$slide_block.animate({left:"-1200px"},2000,function(){$content.first().remove().insertAfter($content.last())}).animate({"left":"0"},0);
		}
	}
	
	
	slide_auto = setInterval("click_right()",4000);
	$('.slide_content_main').hover(function(){
		clearInterval(slide_auto);
	},function(){
		slide_auto = setInterval("click_right()",4000);
	})
	


	$(function(){
		$left_btn.click(function(){
		clearInterval(slide_auto);
		if(!$slide_block.is(":animated")){
			var $content = $('.slide_content');
			$content.last().remove().insertBefore($content.first());
			$slide_block.css("left","-1200px").animate({left:"0"},2000);
		}	
	})
	
		$right_btn.click(click_right);
	
	})