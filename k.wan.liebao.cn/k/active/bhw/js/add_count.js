/*���������������,��λ�ò���Ϊclass��*/
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
		/*����Ϊ�滻����*/

		var $target_href_num = $(".add_count");/*ץȡ���д���class��a��ǩ,һ������*/
		for(i=0;i<$target_href_num.length;i++){/*��дhref*/
			var $target_href = $target_href_num.eq(i).attr("href");
			/*���һ������*/
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
		/*����Ƶ����Ӷ�����׺*/
		var $target_href_num_l2 = $(".add_count_l2");/*���ж�������ץȡ��class*/
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

		/*����Ϊ���������������*/
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