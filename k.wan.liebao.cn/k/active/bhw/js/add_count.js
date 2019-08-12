/*添加三级域名方法,其位置参数为class名*/
function add_href_l3(){
	for(var i=0;i<arguments.length;i++){
		var $lv3_suffix = arguments[i].slice(1);
		for(var a=0;a<$(arguments[i]).length;a++){
			var $lv3_href = $(arguments[i]).eq(a).attr("href").concat($lv3_suffix);	
			$(arguments[i]).eq(a).attr("href",$lv3_href);
		}
	}
}
$(function(){
	var href_suffix = window.location.search;
	if(href_suffix){
		var href_suffix_replaced = href_suffix.replace("?","&");
		/*以上为替换代码*/

		var $target_href_num = $(".add_count");/*抓取所有带此class的a标签,一级参数*/
		for(i=0;i<$target_href_num.length;i++){/*重写href*/
			var $target_href = $target_href_num.eq(i).attr("href");
			/*添加一级域名*/
			if($target_href != undefined){
				if($target_href_num.eq(i).attr("href").indexOf("referer") != -1){
					var $href_l1 = $target_href_num.eq(i).attr("href",$target_href.concat(href_suffix_replaced));
					var $href_l1_new = $target_href_num.eq(i).attr("href");	
				}else{
					var $href_l1 = $target_href_num.eq(i).attr("href",$target_href.concat(href_suffix));
					var $href_l1_new = $target_href_num.eq(i).attr("href");	
				}
			}
		}
		/*根据频道添加二级后缀*/
		var $target_href_num_l2 = $(".add_count_l2");/*所有二级参数抓取此class*/
		for(a=0;a<$target_href_num_l2.length;a++){
			var $target_href_get_num_l2 = $target_href_num_l2.eq(a).attr("href");
			switch($('.nav_selected').index()){
				case 0:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-sy-'));
				break;
				case 1:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-zx-'));
				break;
				case 2:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-yy-'));
				break;
				case 3:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-vr-'));
				break;
				case 4:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-sjyx-'));
				break;
				case 5:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-dj-'));
				break;
				case 6:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-sp-'));
				break;
				case 7:
				$target_href_num_l2.eq(a).attr("href",$target_href_get_num_l2.concat('-mv-'));
				break;
			}
		}

		/*以下为添加三级参数代码*/
		switch($('.nav_selected').index()){
			case 0:
			add_href_l3(".dlz",".dly",".rm1",".rm2",".rm3",".rm4",".rm5",".yyrm1",".yyrm2",".yyrm3",".yyrm4",".yyrm5",".yyrm6",".lb",".bq",".vr",".dj",".tl2");
			break;
			case 1:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
			case 2:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
			case 3:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
			case 4:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
			case 5:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
			case 6:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
			case 7:
			add_href_l3(".ycdt",".yxdt",".dbtl",".dbtj1",".dbtj2",".dbtj3",".dbtj4",".dbtj5",".dbtj6",".dbtj7",".dbtj8",".dlz",".dly");
			break;
		}
	}else{
		return false;
	}
})