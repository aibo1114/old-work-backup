$(function(){
	var $server_list = $('.choose_servers_list');
	var $game_current_id = $('#header').attr('gid');
	//var $game_current_id = 1000;
	$.ajax({
		url:"http://api.web.anqu.com/game/api/1/server?game_id="+$game_current_id,
		type:"GET",
		dataType:"jsonp",
		crossDomain:true,
		success:function(servers){
			var statusTxt='火爆开启';
			//console.log(servers);
			if(Account.isLogin()){
				if(servers.ret == 1){
					$.each(servers.data.servers,function(num){
						var time_current = new Date().getTime();
						var get_server_times = servers.data.servers[num].starttime;
						var server_times_set = Date.parse(new Date(get_server_times));
							if(time_current>server_times_set){	
										var $btn = $("<div class='server_page_choose_server server_page_inline_block server_page_btn_mg_rt_22 server_page_btn_mg_tp_20'></div>");
										$btn.appendTo($server_list);
										var $link = $("<a href='http://api.web.anqu.com/game/api/1/gateway?game_id="+servers.data.game.game_id+"&server_id="+servers.data.servers[num].server_id+"&callback=1"+"'class='server_page_inline_block servers_btn' target='_blank'></a>");
										$link.appendTo($btn);
										var $server_name = $("<span class='server_name server_page_ft_16'>"+servers.data.servers[num].server_name+"</span>");
										$server_name.appendTo($link);
										var $game_name = $("<span class='server_game_name server_page_ft_16'>"+servers.data.game.game_name+"</span>");
										$game_name.appendTo($link);
							}
						})
					var $servers_btns_on = $('.servers_btn');
					for(var i=0;i<3;i++){
							var $add_btn = $servers_btns_on[i]
							var $status = $("<span class='server_status server_page_ft_16 server_page_ft_wt_color'>"+statusTxt+"</span>");
							$status.appendTo($add_btn);
						}
					}else{
						alert(servers.msg);	
					}
				}else{
					alert('请登录！');
				}
			}
		})
	})