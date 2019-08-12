$(function(){
	var $close_btn = $(".wordbar_option").last();
	$close_btn.click(function(){
		if($(this).hasClass("upArrow")){
			$(this).removeClass("upArrow").addClass("downArrow");
			$(this).siblings().fadeOut(500);
			$(this).animate({"top":"0"},1000);
		}else{
			$(this).removeClass("downArrow").addClass("upArrow");
			$(this).siblings().fadeIn(1500);
			$(this).animate({"top":"250"},1000);
		}
	})
})