$(function(){
	/*此处为封装方法*/
	var $sub_titles= $(".nav_subtitles_options");
	$(".nav_subtitles_options").find("a").hover(function(){
		$(this).prev().css("background-position","0");
	},function(){
		$(this).prev().css("background-position","-8px");
	});
	function subShow(btn){
		btn.hover(function(){
			$(this).find(".nav_subtitles").css("display","block");
		},function(){
			$(this).find(".nav_subtitles").css("display","none");
		});
	}
	/*此处为hover事件，hover时更改css属性+标签属性*/
	var $target_btns = new Array();
	$target_btns.push($(".nav_vr"),$(".nav_mobile"),$(".nav_pc"));
	for(var a=0;a<$target_btns.length;a++){
		subShow($target_btns[a]);
	}
})