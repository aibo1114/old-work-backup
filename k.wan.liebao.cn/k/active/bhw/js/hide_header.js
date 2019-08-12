function hide_header(){
	var $head_block = $('.collection');
	var $head_bg = $('.header_bg');
	var $container = $('.container');
	$head_block.hide();
	$head_bg.css({"background":"#ffffff"});
	$container.css({"margin":"62px auto 0 auto"});
}

$(function(){
	var $game_box_suffix = window.location.search;
	if($game_box_suffix == "?source=gamebox"){
		Cookies.set('suffix',"?source=gamebox",{expires:1});
	}

	if(Cookies.get('suffix')){
		hide_header();
	}
})