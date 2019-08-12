$(function(){
	var $server_list = $('#index_server_list');
	var $game_current_id_index = $('#header').attr('gid');
	$.ajax({
		type:"GET",
		url:"http://api.web.anqu.com/game/api/1/server?game_id="+$game_current_id_index,
		dataType:"jsonp",
		crossDomain:true,
		success:function(result){
			if(result.ret == 1){
				var len = Math.min(result.data.servers.length,5);
				for(i=0;i<len;i++){
					if(i!=len-1){
						var $li = $("<li class='anqu_pd12 index_server_bd_underline anqu_cb'></li>");
							$li.appendTo($server_list);
						var $server_link = $("<a href='http://api.web.anqu.com/game/api/1/gateway?game_id="+result.data.game.game_id+"&server_id="+result.data.servers[i].server_id+"'target='_blank'></a>");
							$server_link.appendTo($li);
						var $icon_arrow = $("<span class='anqu_server_arrow anqu_inline_block'></span>");
							$icon_arrow.appendTo($server_link);
						var $server_name = $("<span class='anqu_inline_block'>"+result.data.servers[i].server_name+"</span>");
							$server_name.appendTo($server_link);
						var $start_on = $("<span class='anqu_inline_block anqu_fr'>火爆开启</span>");
							$start_on.appendTo($server_link);
					}else{
						var $li = $("<li class='anqu_pd12 anqu_cb'></li>");
							$li.appendTo($server_list);
						var $server_link = $("<a href='http://api.web.anqu.com/game/api/1/gateway?game_id="+result.data.game.game_id+"&server_id="+result.data.servers[i].server_id+"'target='_blank'></a>");
							$server_link.appendTo($li);
						var $icon_arrow = $("<span class='anqu_server_arrow anqu_inline_block'></span>");
							$icon_arrow.appendTo($server_link);
						var $server_name = $("<span class='anqu_inline_block'>"+result.data.servers[i].server_name+"</span>");
							$server_name.appendTo($server_link);
						var $start_on = $("<span class='anqu_inline_block anqu_fr'>火爆开启</span>");
							$start_on.appendTo($server_link);
					}
				}
			}else{
				alert(result.msg);
			}
		}
	})
})