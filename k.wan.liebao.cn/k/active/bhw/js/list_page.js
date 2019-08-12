$(function(){
	var $news_list = $('.li-txt-bhw');
	var $page_all = Math.ceil($news_list.length/30);/*一共有多少页*/
	var $page_full = Math.floor($news_list.length/30);/*满30的有多少页*/

	var $page_more = $("<li class='normal_btn_more'><span>...</span></li>")
	var $btn_block = $('.li_page_count_next_btn');
	/*以下为创建翻页按钮代码*/
	
	for(var g=1;g<=$page_all;g++){
		var $page_btns = $("<li class='normal_btn'><a href='javascript:void(0);'>"+g+"</a></li>");
		$page_btns.insertBefore($btn_block);
	}

	var $page_icon = $('.normal_btn');
	/*以下为大于5页按钮隐藏*/
	if($page_icon.length>5){
		$('.normal_btn:gt(4)').hide();
		$page_more.insertBefore($btn_block);
	}
	$page_icon.eq(0).addClass('normal_btn_current');
	var $btn = $('.btn_go');
	$('.li-txt-bhw:gt(29)').hide();/*初始化将大于30条数据隐藏*/
	/*以下为固定页数代码*/
	$page_icon.click(function(){
		$(this).addClass('normal_btn_current').siblings().removeClass('normal_btn_current');
		var $page_num = $(this).text();
		for(var a=0;a<30;a++){
			$news_list.eq(($page_num-1)*30+a).show();
			$(".li-txt-bhw:lt("+(($page_num-1)*30)+")").hide();
			$(".li-txt-bhw:gt("+(($page_num-1)*30+29)+")").hide();
		}
	})
		/*以下为跳转代码*/
	$('.jumping_btn').click(function(){
		var $page_jump_to = $('#list_page_to').val();
		if($page_jump_to>0){
			if(!isNaN($page_jump_to)){
					if($page_jump_to<=$page_all){
						for(var i=0;i<30;i++){
							$news_list.eq(($page_jump_to-1)*30+i).show();
							$(".li-txt-bhw:lt("+(($page_jump_to-1)*30)+")").hide();
							$(".li-txt-bhw:gt("+(($page_jump_to-1)*30+29)+")").hide();
						}
						/*以下为跳转到相关按钮块*/
						var $jump_ratio = Math.ceil($page_jump_to/5);
						var $page_ratio_jumpuse = Math.ceil($page_icon.length/5);
						$page_icon.eq($page_jump_to-1).addClass('normal_btn_current').siblings().removeClass('normal_btn_current');
						$page_icon.hide();
						if($jump_ratio == 1){
							$(".normal_btn:lt(5)").show();
						}else{
							$(".normal_btn:lt("+$jump_ratio*5+"):gt("+($jump_ratio*5-6)+")").show();
						}
						/*以下为隐藏最后省略号*/
						if($jump_ratio == $page_ratio_jumpuse){
							$page_more.hide();
						}else{
							$page_more.show();
						}
				}else{
					alert('没有指定的页码！');
				}	
			}else{
				alert('您输入的页码有误！');
			}
		}else{
			alert('您输入的页码有误！');
			return false;
		}
	})
		/*以下为前后页按钮代码*/
	var $next_btn = $('.page_count_next_btn');
	var $prev_btn = $('.page_count_prev_btn');
	
	$next_btn.click(function(){
		var $page_btn_current = $('.normal_btn_current');
		var $current_page = $page_btn_current.text();
		if($current_page<$page_all){
			$page_icon.eq($current_page).addClass('normal_btn_current').siblings().removeClass('normal_btn_current');
			for(var n=0;n<30;n++){
				$news_list.eq($current_page*30+n).show();
				$(".li-txt-bhw:lt("+(($current_page)*30)+")").hide();
				$(".li-txt-bhw:gt("+(($current_page)*30+29)+")").hide();
			}
			$current_page++;
		}
		/*以下为按钮隐藏逻辑*/
		var $page_ratio = Math.ceil($page_icon.length/5);
		var $current_page_ratio = Math.ceil($current_page/5);

		if(($current_page-1)%5 == 0){
			$(".normal_btn:lt("+($current_page-1)+")").hide();
			$(".normal_btn:lt("+($current_page+4)+"):gt("+($current_page-2)+")").show();
			if($current_page_ratio == $page_ratio){
				$page_more.hide();
			}
		}
	})
	
	$prev_btn.click(function(){
		var $page_btn_current2 = $('.normal_btn_current');
		var $current_page2 = $page_btn_current2.text();
		if($current_page2-2>=0){
			$page_icon.eq($current_page2-2).addClass('normal_btn_current').siblings().removeClass('normal_btn_current');
			for(var m=0;m<30;m++){
				$news_list.eq(($current_page2-2)*30+m).show();
				$(".li-txt-bhw:lt("+(($current_page2-2)*30)+")").hide();
				$(".li-txt-bhw:gt("+(($current_page2-2)*30+29)+")").hide();
			}
			$current_page2--;
		}
		/*以下为按钮隐藏逻辑2*/
		var $page_ratio = Math.ceil($page_icon.length/5);
		var $current_page_ratio2 = Math.ceil($current_page2/5);

		if($current_page2 == 5){
			$(".normal_btn:gt("+($current_page2-1)+")").hide();
			$(".normal_btn:lt(5)").show();
			$page_more.show();
		}else if($current_page2%5 == 0){
			$(".normal_btn:gt("+($current_page2-1)+")").hide();
			$(".normal_btn:lt("+$current_page2+"):gt("+($current_page2-6)+")").show();
			if($current_page_ratio2 != $page_ratio){
				$page_more.show();
			}
		}
	})
})