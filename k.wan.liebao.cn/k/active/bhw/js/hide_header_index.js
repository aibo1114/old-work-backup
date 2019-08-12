function hide_header_index(){
	/*以下为根据盒子来判断是否隐藏两侧对联广告,并隐藏头部*/
	var $ad_left = $('.side_ads_left');
	var $head_block = $('.collection');
	var $head_bg = $('.header_bg_index');
	$ad_left.hide();
	$head_block.hide();
	$head_bg.hide();
}

$(function(){
	var $game_box_suffix = window.location.search;
	if($game_box_suffix == "?source=gamebox"){
		Cookies.set('suffix',"?source=gamebox",{expires:1});
	}

	if(Cookies.get('suffix')){
		hide_header_index();
	}
})



