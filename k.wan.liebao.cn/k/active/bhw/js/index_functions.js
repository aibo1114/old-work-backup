$(function(){
	/*检查屏幕大小是否隐藏广告*/
	var $rightAd = $(".right_ad");

	if($(window).width()<1500){
		$rightAd.css({"display":"none"});
	}

	/*以下为资讯轮播图*/
	var $news_slide_leftbtn = $('.news_slide_btn_left');
	var $news_slide_rightbtn = $('.news_slide_btn_right');
	var $video_all = $('.down_slide ul');
	
	if(!$('.down_slide').find('ul').is(":animated")){
		$news_slide_leftbtn.click(function(){
			$('.down_slide').find('ul').animate({'left':'-=174px'},100);
			if($('.third_ul').css('left') == '522px'){
				$('.first_ul').remove().clone().animate({'left':'1044px'},0).insertAfter($('.third_ul'));		
			}
			if($('.first_ul').css('left') == '522px'){
				$('.second_ul').remove().clone().animate({'left':'1044px'},0).insertAfter($('.first_ul'));
			}
			if($('.second_ul').css('left') == '522px'){
				$('.third_ul').remove().clone().animate({'left':'1044px'},0).insertAfter($('.second_ul'));
			}
		})
		
		$news_slide_rightbtn.click(function(){
			$('.down_slide').find('ul').animate({'left':'+=174px'},100);
			if($('.first_ul').css('left') == '0px'){
				$('.third_ul').remove().clone().animate({'left':'-522px'},0).insertBefore($('.second_ul'));
			}
			if($('.third_ul').css('left') == '-348px'){
				$('.second_ul').remove().clone().animate({'left':'-870px'},0).insertBefore($('.first_ul'));
			}
			if($('.second_ul').css('left') == '-348px'){
				$('.first_ul').remove().clone().animate({'left':'-870px'},0).insertBefore($('.third_ul'));
			}
		})
	}
	
	/*以下为左侧轮播图*/
	var $left_btn = $("#left_btn");
	var $right_btn = $("#right_btn");
	var $slide_pics = $(".slide_content")
	var $page_all = $("#slide_pics li").length;
	var $page_current = 1;
	var $loader = $(".loader");
			
			if(!$slide_pics.is(":animated")){
				$right_btn.click(function(){
					if($page_current == $page_all){
						$slide_pics.animate({left:"0px"},800);
						$loader.animate({width:"25%"},800)
						$page_current = 1;
					}else{
						$slide_pics.animate({left:"+=349px"},800);
						$loader.animate({width:"+=25%"},800)
						$page_current++;
					}
				})
				$left_btn.click(function(){
					if($page_current == 1){
						$slide_pics.animate({left:"1047px"},800);
						$loader.animate({width:"100%"},800)
						$page_current = $page_all;
					}else{
						$slide_pics.animate({left:"-=349px"},800);
						$loader.animate({width:"-=25%"},800)
						$page_current--;
					}
				})
			}
	
	/*以下为右侧导航二维码消失动画*/
	var $qrcode = $('.downloadStarter');
	var $qrcode_btn = $('.downloadLocate');
	
	$qrcode.mouseover(function(){
		$qrcode_btn.css({"display":"block"})
	}).mouseout(function(){
		$qrcode_btn.css({"display":"none"})
	})

	$qrcode_btn.mouseover(function(){
		$(this).css({"display":"block"})
	}).mouseout(function(){
		$(this).css({"display":"none"})
	})

/*以下为添加收藏js代码*/
function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function setHome(url) { 
	
	if (document.all){ 
		document.body.style.behavior='url(#default#homepage)'; 
		document.body.setHomePage(url); 
		}
	else if(window.sidebar){ 
			if(window.netscape){ 
				try{ 
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
			}catch (e){ 
				alert("感谢您添加我们的网站！");
			} 
		} if(window.confirm("你确定要设置"+url+"为首页吗？")==1){ 
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
			prefs.setCharPref('browser.startup.homepage',url); 
		} 
	}else{
		alert('该操作被浏览器拒绝，请检查您的浏览器配置。');
	}
}
})();