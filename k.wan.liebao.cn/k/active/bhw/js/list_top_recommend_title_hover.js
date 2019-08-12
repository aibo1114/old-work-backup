$(function(){
	/*以下为头部鼠标移动出现标题的效果*/
	var $icons = $('.list_top_recommend_games ul li');
	if(!$icons.is(':animated')){
		$icons.mouseover(function(){
			$(this).find('.icon_title_block').stop().show().animate({'top':'80px','opacity':'1','filter':'alpha(opacity=100)'},200);
		}).mouseout(function(){
			$(this).find('.icon_title_block').stop().animate({'top':'100px','opacity':'0','filter':'alpha(opacity=30)'},200);
		})
	}
})