$(function(){
	var $server_open_list = $('.anqu_servers_open_list');
	for(var num = 0;num<11;num++){
		var $server_li = $("<li class='li-txt2-bhw'></li>");
		$server_li.appendTo($server_open_list);
		
		var $game_href=ks_list_xmt[num].gameUrl;
		var $game_href_create = $("<a href='"+$game_href+"' target='_blank'></a>");
		$game_href_create.appendTo($server_li);
		var $get_time = ks_list_xmt[num].openTime;
		var $time_format = $get_time.substring(5,10);
		var $open_time = $("<span class='time-txt2-bhw'>"+$time_format+"</span>");/*时间字段需要截取*/
		$open_time.appendTo($game_href_create);
		var $game_logo = $("<span class='server_logo'><img src='"+ks_list_xmt[num].logo+"'></span>");
		$game_logo.insertAfter($open_time);
		var $game_name = $("<h4 class='title-txt2-bhw'>"+ks_list_xmt[num].gameName+"</h4>");
		$game_name.insertAfter($game_logo);
		var $game_server = $("<span class='serv-txt2-bhw'>"+ks_list_xmt[num].server+"</span>");
		$game_server.insertAfter($game_name);
		var $game_link = $("<span class='enter-txt2-bhw'>\u8fdb\u5165\u0026\u0067\u0074\u003b</span>");
		$game_link.insertAfter($game_server);
	}
		var $find_li = $('.li-txt2-bhw');
		$find_li.hover(function(){
			$(this).addClass('hover-txt2-bhw');
		},function(){
			$(this).removeClass('hover-txt2-bhw');
		})
})