$(function(){
	/*var $ulHover = $(".relativePos ul");

	$ulHover.mouseover(function(){
		$(this).css("z-index","2")
	}).mouseout(function(){
		$(this).css("z-index","1");
			});

	var $overlayLeftRight = $(".girls_middle_overlay li");

	$overlayLeftRight.mouseover(function(){
		$(this).css("z-index","2").siblings().css("z-index","1");
	}).mouseout(function(){
		$(this).css("z-index","1");
	})*/
	/*以下为浮动标题效果*/
	var $hover_pics = $(".relativePos ul li");
	if(!$(".girls_index_title_block").is(':animated')){
		$hover_pics.mouseover(function(){
			$(this).find(".girls_index_title_block").stop().animate({"bottom":"3px","opacity":"1"},200);
		}).mouseout(function(){
			$(this).find(".girls_index_title_block").stop().animate({"bottom":"-17px","opacity":"0"},200);
		});
	}
})