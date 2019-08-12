$(function(){
	/*检查屏幕大小是否隐藏广告*/
	var $rightAd = $(".right_ad");
	var $sidebar = $(".sidebars");
	if($(window).width()<1500){
		$rightAd.css({"display":"none"});
		$sidebar.css({"top":"20%"});
	}
	/*以下为根据盒子来判断是否隐藏两侧对联广告,并隐藏头部*/
	var $game_box_suffix = window.location.search;
	var $head_block = $('.collection');
	var $head_bg = $('.header_bg_index');
	if($game_box_suffix == "?source=gamebox"){
		$head_block.hide();
		$head_bg.hide();
	}
})