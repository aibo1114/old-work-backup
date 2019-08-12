$(function(){
	var $items = $('.news_list .l-txt-bhw li');
	
	/*var $hotNews = $("<span class='hot_news'></span>");*/

	/*var $target = $items.eq(0).children();
	$hotNews.appendTo($target);*/
	for(n=1;n<$items.length;n++){
		if((6*n)%30 != 0){
			$items.eq(6*n).addClass('news_list_spacing');
		}
	}
})