$(function(){
	var $lis = $('.li_anqu_content a');
	var $li_icons = $('.anqu_news_icon');
	$lis.mouseover(function(){
		$(this).find('.anqu_news_icon').css('background-position','0 0');
	}).mouseout(function(){
		$(this).find('.anqu_news_icon').css('background-position','-7px 0');
	});
});