			var $left_btn = $("#left_btn");
			var $right_btn = $("#right_btn");
			var $slide_pics = $(".slide_content")
			var $page_all = $("#slide_pics li").length;
			var $page_current = 1;
			var $loader = $(".loader");
			var $slide_group = $('.slide');
			function loader_style_change(){
				var $pic_num = parseInt($("#slide_pics li").first().attr("class"));
				if($pic_num < 4){/*只有4张轮播图*/
					$(".loader_pos").eq($pic_num).addClass("loader_pos_current").siblings().removeClass("loader_pos_current");
				}else{
					$pic_num = $pic_num-4;
					$(".loader_pos").eq($pic_num).addClass("loader_pos_current").siblings().removeClass("loader_pos_current");
				}
			}
			function slide_function_right(){
				/*if(!$loader.is(":animated")){
					if($page_current == $page_all){
							$loader.animate({width:"25%"},800)
							$page_current = 1;
						}else{	
							$loader.animate({width:"+=25%"},800)
							$page_current++;
						}
					}*/
				if(!$('.slide_content').is(":animated")){
					loader_style_change();
					$('.slide_content').stop().animate({left:"-349px"},800,function(){$('#slide_pics li').first().remove().insertAfter($('#slide_pics li').last());}).animate({left:"0px"},0);
					
				}
			}
			function slide_function_left(){
				
				/*if(!$loader.is(":animated")){
					if($page_current == 1){
							$loader.animate({width:"100%"},800)
							$page_current = $page_all;
						}else{
							$loader.animate({width:"-=25%"},800)
							$page_current--;
						}
					}*/	
				function turn_left(){
						$('#slide_pics li').last().remove().insertBefore($('#slide_pics li').first());
					}
				if(!$('.slide_content').is(":animated")){
					/*loader效果*/
					var $pic_num = parseInt($("#slide_pics li").first().attr("class"));
					$(".loader_pos").eq($pic_num-2).addClass("loader_pos_current").siblings().removeClass("loader_pos_current");
						
					$('.slide_content').stop().animate({left:"-349px"},0).animate({left:"0px"},800,turn_left());
				}
			}

			/*自动轮播*/
			slide_auto = setInterval("slide_function_right()",2000);
			$slide_group.hover(function(){
				clearInterval(slide_auto);
			},function(){
				slide_auto = setInterval("slide_function_right()",2000);
			});



			$(document).ready(function(){				
				for(var a=0;a<4;a++){
					var $li_num = $('#slide_pics li');
					var $new_li_num = parseInt($li_num.eq(a).attr('class'))+1;
					$li_num.eq(a).attr('class',$new_li_num);
				}
				/*批量更改li的class*/
			
				var $pic_slide = $('#slide_pics li');
				$right_btn.click(slide_function_right);
				$left_btn.click(slide_function_left);

				/*以下为loader效果*/
				var $loader_module = $(".loader .loader_pos");
				$loader_module.click(function(){
					$(this).addClass("loader_pos_current").siblings().removeClass("loader_pos_current");/*loader蓝色样式*/
					var $index_pick = $(this).index();/*用户选择的图片index*/
					var $tar_pic = $("#slide_pics").find("li."+($index_pick+1));/*用户选择的图片*/
					if(!$("#slide_pics li").first().hasClass($index_pick+1)){
						var $act_pos = $("#slide_pics li."+($index_pick+1)).index();/*实际该图片的索引值位置*/
						if(!$('.slide_content').is(":animated")){/*判断第一张是否为所选图片*/
							$('.slide_content').stop().animate({left:"-349"*$act_pos},800,function(){$("#slide_pics li:lt("+$act_pos+")").remove().insertAfter($("#slide_pics li").last());}).animate({left:"0px"},0);
						}
					}
					
				})
				
			})
			
			
			
			
			
			/*由于自动轮播，需要单拿出来*/
			/*function right_move(){
					if($page_current == $page_all){
						
						$loader.animate({width:"25%"},800)
						$page_current = 1;
					}else{
						
						$loader.animate({width:"+=25%"},800)
						$page_current++;
					}
				}*/
			/*slide_auto = setInterval("right_move()",3000);
			$slide_group.hover(function(){
				clearInterval(slide_auto);
			},function(){
				slide_auto = setInterval("right_move()",3000);
			});*//*
$(document).ready(function(){	
			if(!$slide_pics.is(":animated")){
				$right_btn.click(right_move);
				$left_btn.click(function(){
					if($page_current == 1){
						$slide_pics.animate({left:"-1047px"},800);
						$loader.animate({width:"100%"},800)
						$page_current = $page_all;
					}else{
						$slide_pics.animate({left:"+=349px"},800);
						$loader.animate({width:"-=25%"},800)
						$page_current--;
					}
				})
			}
		})*/