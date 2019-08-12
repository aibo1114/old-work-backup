$(function(){
	var $icon = $('.national_icon');
	var $time_cur = Date.now();
	var $time_down = Date.parse("2016-10-08,00:00:00");
	if($time_cur>$time_down){
		$icon.hide();
	}
})