$(function(){
	var $webgame_list = $('ul.l-txt2-bhw');
	var $switch_btns = $('.serv_pages_switch');
	var $next_btn = $('.list_next');
	var $prev_btn = $('.list_prev');

	var $item_num = $webgame_list.children().length;
	var $pages = Math.ceil($item_num/8);
	var $item_num_factor = Math.floor($item_num/8);

	var $item_leftOver = $item_num-$item_num_factor*8;

	if($item_num<=8){
		$switch_btns.hide();
	}else{
		/*以下为页面item为8的整数倍情况*/
		$('ul.l-txt2-bhw li').hide();
		$('ul.l-txt2-bhw li:lt(8)').show();
		var $a=1;
		/*$a为当前页数，$pages为总页数包含所有item,$item_num_factor为满足item个数为8的页数*/
		$next_btn.click(function(){
			if($a<=$item_num_factor){
				for(n=7*$a+$a-8;n<=7*$a+$a-1;n++){
					$('ul.l-txt2-bhw li').eq(n+8).show();	
					$('ul.l-txt2-bhw li').eq(n).hide();
				}
				if($a==$pages){
					for(m=7*$a+$a-8;m<$item_num;m++){
					$('ul.l-txt2-bhw li').eq(m).show();
					}
				}
				$a+=1;
			}
		})
		/*以上为下一页的效果*/
		$prev_btn.click(function(){
			if($a<=$pages&&$a>1){
				for(n=7*$a+$a-8;n<=7*$a+$a-1;n++){
					$('ul.l-txt2-bhw li').eq(n).hide();	
					$('ul.l-txt2-bhw li').eq(n-8).show();
				}
				$a-=1;
			}
		})
		/*以上为上一页效果*/
	}
})