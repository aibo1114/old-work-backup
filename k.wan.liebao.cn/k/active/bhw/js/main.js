(function(){
    /*mod txt*/
    $('.li-txt-bhw').each(function(){
        if( $(this).index()==0 && $(this).attr('the-id')=='special' ){
            $(this).addClass('special-txt-bhw');
        }
    }).hover(function(){
        if($(this).attr('the-id')=='special' ){
            $(this).addClass('special-txt-bhw').siblings('.li-txt-bhw').removeClass('special-txt-bhw');
            return;
        }
        $(this).addClass('hover-txt-bhw');
    },function(){
        if($(this).attr('the-id')=='special' ){
            // $(this).removeClass('special-txt-bhw');
            return;
        }
        $(this).removeClass('hover-txt-bhw');
    });
    /*mod txt2*/
    $('.li-txt2-bhw').hover(function(){
        $(this).addClass('hover-txt2-bhw');
    },function(){
        $(this).removeClass('hover-txt2-bhw');
    });

    /*mod media*/
    $('.link-media-bhw,.obj-media3-bhw,.media_slide').hover(function(){
        $(this).find('.btn').addClass('btn-hover').siblings('.mask').hide();
    },function(){
        $(this).find('.btn').removeClass('btn-hover').siblings('.mask').show();
    });
	/*list page mdeia*/
	$('.link-media-bhw,.obj-list-page-media3-bhw').hover(function(){
        $(this).find('.btn').addClass('btn-hover').siblings('.mask').hide();
    },function(){
        $(this).find('.btn').removeClass('btn-hover').siblings('.mask').show();
    });

    /*mod ol rank*/
    $('.li-ol-bhw').each(function () {
        if( $(this).index()==0 && $(this).attr('the-id')!='special-oli' ){
            $(this).find('.static').hide().siblings('.hover').show();
        }
    }).hover(function(){
        if( $(this).attr('the-id')=='special-oli' ){
            $(this).children('.static').addClass('hover-simple');
            return;
        }
        $(this).children('.static').hide().siblings('.hover').show();
        $(this).siblings('.li-ol-bhw').find('.static').show().siblings('.hover').hide();
    },function(){
        if( $(this).attr('the-id')=='special-oli' ){
            $(this).children('.static').removeClass('hover-simple');
        }
    });
	/*以下为判断当前页面并在导航上添加下划线样式*/
	var href_curr = window.location.href;
	var check_url = /\b\d{2}\b/i;
	var match = check_url.exec(href_curr);;
	//console.log(match);
	if(match == null){
		$('.nav_index').addClass('nav_selected').siblings().removeClass('nav_selected');
	}else{	
		switch(match[0]){
			case "13":
				$('.nav_news').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			case "21":
				$('.nav_webgame').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			case "23":
				$('.nav_vr').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			case "27":
				$('.nav_mobile').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			case "29":
				$('.nav_pc').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			case "18":
				$('.nav_video').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			case "51":
				$('.nav_girls').addClass('nav_selected').siblings().removeClass('nav_selected');
				break;
			default:
				$('.nav_index').addClass('nav_selected').siblings().removeClass('nav_selected');
		}
	}
	/*以下为检测IE6的弹窗*/
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") { 
	alert('浏览器版本太低！为保障您的正常浏览，建议升级IE浏览器或访问资讯站网址 http://b.liebao.cn'); 
	return false;
	} 
})();
