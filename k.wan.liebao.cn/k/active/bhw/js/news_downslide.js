function slide_icon_change(){
		var $slide_target = $('.media_slide');
		$slide_target.mouseover(function(){
			$(this).find(".btn").css("background","url(http://statics.wan.liebao.cn/resource/998/images/play_btn_18.png) no-repeat 0 0");
		}).mouseout(function(){
			$(this).find(".btn").css("background","url(http://statics.wan.liebao.cn/resource/998/images/play_btn_16.png) no-repeat 0 0");
		});
	}
$(function(){
	var $news_slide_leftbtn = $('.news_slide_btn_left');
	var $news_slide_rightbtn = $('.news_slide_btn_right');
	var $video_all = $('.down_slide ul');
	
	slide_icon_change();
	if(!$('.down_slide').find('ul').is(":animated")){
		$news_slide_rightbtn.click(function(){
			slide_icon_change();
			$('.down_slide').find('ul').animate({'left':'-=174px'},100);
			if($('.third_ul').css('left') == '522px'){
				$('.first_ul').remove().clone().animate({'left':'1044px'},0).insertAfter($('.third_ul'));		
			}
			if($('.first_ul').css('left') == '522px'){
				$('.second_ul').remove().clone().animate({'left':'1044px'},0).insertAfter($('.first_ul'));
			}
			if($('.second_ul').css('left') == '522px'){
				$('.third_ul').remove().clone().animate({'left':'1044px'},0).insertAfter($('.second_ul'));
			}
		})
		
		$news_slide_leftbtn.click(function(){
			slide_icon_change();
			$('.down_slide').find('ul').animate({'left':'+=174px'},100);
			if($('.first_ul').css('left') == '0px'){
				$('.third_ul').remove().clone().animate({'left':'-522px'},0).insertBefore($('.second_ul'));
			}
			if($('.third_ul').css('left') == '-348px'){
				$('.second_ul').remove().clone().animate({'left':'-870px'},0).insertBefore($('.first_ul'));
			}
			if($('.second_ul').css('left') == '-348px'){
				$('.first_ul').remove().clone().animate({'left':'-870px'},0).insertBefore($('.third_ul'));
			}
		})
	}
})
