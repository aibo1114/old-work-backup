(function(){
	/*以下为美女囧图放大模块*/
	var $ulHover = $(".relativePos ul");

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
	});
})();