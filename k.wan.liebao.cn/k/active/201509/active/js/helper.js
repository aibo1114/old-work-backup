var helper={};

// ks_user.uid='4018629956';

helper.data=ks_user;
// helper.domain='http://10.33.29.84:7031';

helper.domain='http://api.wan.liebao.cn';

helper.userLogin=function(){
	var data=this.data;
	if (!data || data.length==0){
		//调弹窗
		Login.show();
		$('[the-id=logStatus]').text('登录').removeClass('in').addClass('out');
		// $('#m_mask').show();
	}else{
		var username=data.showname;
		$('[the-id=username]').text(username);
		$('[the-id=logStatus]').text('退出').removeClass('out').addClass('in');
	}
};

helper.userinfo=function(cb){
	var opt={
		domain:this.domain,
		uid:this.data.uid
	};
	$.ajax({
        type: 'get',
        async:false,
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback:'test',
        url: opt.domain+'/pagegame/activity/zhongqiu/get/userinfo?uid='+opt.uid,
        success : function(data){
    		switch (data.ret){
    			case 1 :
					var acount=parseInt(data.data.acount),
						ucount=parseInt(data.data.ucount),
						scount=acount-ucount,
						money=data.data.money;

					helper.record=data.data.history;
					helper.recordRet=data.ret;
					if(data.data.history.length==0){
						helper.recordRet=0;
					}

					$('[the-id=acount]').text(acount);
					$('[the-id=ucount]').text(ucount);
					$('[the-id=scount]').text(scount);
					$('[the-id=money]').text(money);
					break;
				default :
					break;
			}
			cb && cb();
        }
    });
};

helper.prize=function(){
	var opt={
		domain:this.domain,
		uid:this.data.uid
	};
	$.ajax({
        type: 'get',
        async: false,
        dataType: 'jsonp',
        jsonp: 'callback',
        // jsonpCallback: 'test',
        url: opt.domain+'/pagegame/activity/zhongqiu/get/prize?uid='+opt.uid,
        success : function(data){
			var ret=data.ret;
			switch(ret){
				case 1 :
					if(scount==0){
						new Window().nochange({
							y:100,
							handler4CloseBtn:helper.eggGoback
						});
					}else{
						var prizeCode=data.data.prize_code;
						var prizeId=data.data.prize_id;
						var scount=parseInt($('[the-id=scount]').text());
						var ucount=parseInt($('[the-id=ucount]').text());
						var txt='恭喜您！获得';
						if( prizeCode=='' ){
							switch(prizeId){
								case '1' :
									txt+='小米路由器'
									break;
								case '2' :
									txt+='罗技K400r无线键盘'
									break;
								case '3' :
									txt+='小米手环'
									break;
								case '4' :
									txt+='鼠标垫'
									break;
								default:
									txt='系统出错了'
									break;
							}
						}else{
							switch(prizeId){
								case '1' :
									txt+='10倍积分加速券<br />'+prizeCode
									break;
								case '2' :
									txt+='5倍积分加速券<br />'+prizeCode
									break;
								case '3' :
									txt+='3倍积分加速券<br />'+prizeCode
									break;
								default:
									txt='系统出错了'
									break;
							}
						}
						new Window().get({
							y:100,
							text4get:txt,
							handler4CloseBtn:helper.eggGoback
						});
						scount=scount-1;
						ucount=ucount+1;
						$('[the-id=scount]').text(scount);
						$('[the-id=ucount]').text(ucount);
					}
					break;
				case 0 :
					new Window().nochange({
						y:100,
						handler4CloseBtn:helper.eggGoback
					});
					break;
				default :
					alert('服务器繁忙');
					helper.eggGoback();
					break;
			}
		},
		error:function(){
			helper.eggGoback();
		}
    });
};

helper.record=function(lst){
	// lst.ctime=

};
helper.eggGoback=function(){
	var ndx=$('.js-egg').index();
	$('.egg-prize:eq('+ndx+')').removeClass('broken-'+ndx).removeClass('js-egg');
};


helper.userLogin();
helper.userinfo();



//http://10.33.29.84:7031/api/get/userinfo?uid=502669657
//http://10.33.29.84:7031/api/get/prize?uid=502669657
//http://api.wan.liebao.cn/pagegame/activity/zhongqiu/get/userinfo
//http://api.wan.liebao.cn/pagegame/activity/zhongqiu/get/prize









