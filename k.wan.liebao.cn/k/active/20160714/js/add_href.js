$(function(){
	var $get_href = window.location.href;
	var $suffix = $get_href.slice(51);
	var $down_href = $('.download_btn a').attr("href");
	var $final_href = $down_href.concat($suffix);
	$('.download_btn a').attr("href",$final_href);
})