var helper={};
helper.data=ks_user;
helper.uri='http://credit.wan.liebao.cn/index.php/api/';


helper.userLogin=function(){
	var data=this.data;
	if (!data || data.length==0){
		Login.show();
	}
	console.log(ks_user);
};

helper.dEvent=function(){
	var docH=Math.max( $(document).height(),$('body').height() );
	$('.dialog-mask').height(docH);
	$('.btn-closeD').click(function(){
		$('.dialog-mask').hide();
		$('.dialog-alert').hide();
		$('.dailog-confirm').hide();
		$('.dialog-msg').text('');
	});

	$('.reloadPage').click(function(){
		window.location.reload();
	});
}

helper.userLogin();
(function(){
	if(helper.data && helper.data.length!=0){
		//get baseInfo
		$.ajax({
			url:helper.uri+'OneBuyData',
			type:'GET',
			dataType:"jsonp",
			success:function(data){
				var ret=data.code;
				var num=parseInt(data.data.totalNum) || 0;
				var msg=data.msg;
				var remain=150-num;
				var percent=(num*2)+'%';
				$('#alreadyNum').text(num);
				$('#remainNum').text(remain);
				$('.progress-bar').width(percent);
			}
		});

		//get Installments
		$.ajax({
			url:helper.uri+'getWinNumber',
			type:'GET',
			dataType:"jsonp",
			success:function(data){
				console.log('Installments');
				console.log(data);
				var ret=data.ret;
				var arr=data.data;
				var installment=arr.length+1;

				if(arr.length){
					for (var i=0,len=arr.length;i<len;i++){
						console.log(arr[i]);
						$('#intallments td:eq('+i+')').text(arr[i].number).find('span').removeClass('unopen');
					}
				}
				$('#installment').text(installment);
			}
		});

		$('.glyphicon-plus').click(function(){
			var partVal=parseInt( $('#perCount').val() );
			var remainNum=parseInt( $('#remainNum').text() );
			partVal++;
			if(partVal>remainNum) return;
			$('#perCount').val(partVal);
		});
		$('.glyphicon-minus').click(function(){
			var partVal=parseInt( $('#perCount').val() );
			partVal--;
			if(partVal<=0) return;
			$('#perCount').val(partVal);
		});


		//buy now
		$('#buyResource').click(function(){
			$('.dialog-mask').show();
			$('.dailog-confirm').show();
			helper.dEvent();
		});

		$('#confirmBuy').click(function(){
			$('.dialog-mask').hide();
			$('.dailog-confirm').hide();
			var countVal=parseInt( $('#perCount').val() );
			$.ajax({
				url:helper.uri+'getOneBuy?part='+countVal,
				type:'GET',
				dataType:"jsonp",
				success:function(data){
					var ret=data.code;
					var msg=data.msg;
					$('.dialog-mask').show();
					$('.dialog-alert').show();
					if(ret!=1){
						$('.dialog-msg').text(msg);
						return;
					}
					$('.dialog-msg').text('购买成功');
					$('.btn-closeD').addClass('reloadPage');
					helper.dEvent();
				}
			});
		});

		//history
		$('#codeTicket').click(function(){
			if( !$(this).is(':animated') ){
				if( $(this).hasClass('opended') ){
					$('.history-ticket').hide();
					$(this).removeClass('opended').animate({width:134});
					$('.l-history-ticket').html('');
					return;
				}
				$.ajax({
					url:helper.uri+'getUserNumber',
					type:'GET',
					dataType:"jsonp",
					success:function(data){
						var ret=data.code;
						var msg=data.msg;
						var arr=data.data;
						if(ret!=1){
							$('.dialog-mask').show();
							$('.dialog-alert').show();
							$('.dialog-msg').text(msg);
							return;
						}
						if( arr && arr.length!=0 ){
							$('#codeTicket').addClass('opended').animate({
								width:1000
							},function(){
								var items='';
								for (var i=0,len=arr.length;i<len;i++){
									items+='<li>'+arr[i]+'</li>';
								}
								$('.l-history-ticket').html(items);
								$('.history-ticket').show();
							});
						}
						console.log('getUserNumber');
						console.log(data);
					}
				});
			}
		});
	}
})();


