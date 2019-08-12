$(function(){
	var $btn = $('#check');
	var $info_tb = $('.info_table tbody');
	$btn.click(function(){
		var $mode_change = $('#select option:selected').val();
		var $input_info = $('#input_info').val();
		if($mode_change == 'pp'){
			$.ajax({
				url:'http://api.web.anqu.com/account/api/1/getuidbypp?username='+$input_info+'&sign=2c8c0b548a883e7fff9d2414b64f7af4&',
				type:"GET",
				dataType:"jsonp",
				crossDomain:true,
				success:function(result){
					if(result.ret !=1){
						alert('错误！不存在此账户！');
					}else{
						var $infos = $('<tr></tr>');
						$infos.appendTo($info_tb);
						var $pp = $('<td>金山passport</td>');
						$pp.appendTo($infos);
						var $pp_info = $("<td>"+$input_info+"</td>");
						$pp_info.insertAfter($pp);
						var $uid = $('<td>uid</td>');
						$uid.insertAfter($pp_info);
						var $uid_info = $("<td>"+result.data.uid+"</td>");
						$uid_info.insertAfter($uid);
					}
				}
			})

		}else if($mode_change == 'uid'){
			$.ajax({
				url:'http://api.web.anqu.com/account/api/1/getppbyuid?uid='+$input_info+'&sign=2c8c0b548a883e7fff9d2414b64f7af4&',
				type:"GET",
				dataType:"jsonp",
				crossDomain:true,
				success:function(result2){
					if(result2.ret != 1){
						alert('错误！');
					}else{
						var $infos2 = $('<tr></tr>');
						$infos2.appendTo($info_tb);
						var $pp2 = $('<td>金山passport</td>');
						$pp2.appendTo($infos2);
						var $pp_info2 = $("<td>"+result2.data.username+"</td>");
						$pp_info2.insertAfter($pp2);
						var $uid2 = $('<td>uid</td>');
						$uid2.insertAfter($pp_info2);
						var $uid_info2 = $("<td>"+$input_info+"</td>");
						$uid_info2.insertAfter($uid2);
					}
				}
			})
		}
	})

	
	
})