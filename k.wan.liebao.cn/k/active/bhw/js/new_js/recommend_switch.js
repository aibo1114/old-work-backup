function switch_group(btn,target){
	btn.mouseover(function(){
		btn.removeClass("recommend_normal").addClass("recommend_selected").siblings().removeClass("recommend_selected").addClass("recommend_normal");
		target.css("z-index","2").siblings().css("z-index","1");
	})
}

$(function(){
	var $recommend_btn1 = $(".recommend_btn1");
	var $recommend_btn2 = $(".recommend_btn2");

	var $group1 = $(".group1");
	var $group2 = $(".group2");
	switch_group($recommend_btn1,$group1);
	switch_group($recommend_btn2,$group2);
})