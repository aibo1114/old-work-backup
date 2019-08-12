$(function(){
	$(".relativePos li").hover(function(){
		if(!$(this).find(".girls_index_title_block").is(":animated")){
			$(this).find(".girls_index_title_block").animate({"bottom":"0"},500);
		}
	},function(){
			$(this).find(".girls_index_title_block").animate({"bottom":"-20px"},500);
	})
})