$(function(){
	/*查找所有带相关class的img*/
	var $target_img = $(".enlarge");
	$target_img.parent().hover(function(){
		if(!$(this).find(".enlarge").is(":animated")){
			$(this).find(".enlarge").animate({width:"105%",height:"105%","margin-left":"-2%","margin-top":"-2%"},200);
		}
	},function(){
		if(!$(this).find(".enlarge").is(":animated")){
			$(this).find(".enlarge").animate({width:"100%",height:"100%","margin-left":"0","margin-top":"0"},200);
		}	
	})
	/*放大效果：长度宽度分别扩大20%,同时margin分别减少20%*/
})