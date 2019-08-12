(function(){
	$("#marquee").kxbdMarquee({
		direction:"right",
		isEqual:true,
		loop:0
	});
	$("#txtMarquee").kxbdMarquee({
		isEqual:false
	});
	$('.egg-prize').mouseenter(function(){
		var thisTop=parseInt($(this).css('top')),
			tops=thisTop-10;
		if( !$(this).hasClass('broken') ){
			if( !$(this).is(':animated') ){
				$(this).animate({
					'top':tops
				},300,function(){
					$(this).animate({
					'top':thisTop
					},300);
				});
			}
		}
	});

	$('.egg-prize').click(function(){
		if(!helper.data || helper.data.length==0){
			Login.show();
		}else{
			var $this=$(this);
			var ndx=$(this).index();
			var hLft=parseInt($('.hammer').css('left'));
			var thisLft=parseInt( $(this).css('left') )+130;
			if( !$(this).hasClass('broken-'+ndx)){
				if( !$(this).is(':animated') && !$('.hammer').is(':animated') ){
					$('.hammer').animate({
						'left':thisLft
					},800,function(){
						$('.hammer').addClass('hammer-active');
						$this.addClass('broken-'+ndx).addClass('js-egg');
						//prize ajax
						helper.prize(ndx);

						$('.hammer').animate({
							'left':hLft
						},1200,function(){
							$('.hammer').removeClass('hammer-active');
						});
					});
				}
			}
		}
	});

	$('[the-id=check_prize]').click(function(){
		helper.userinfo(function(){
			var judge=helper.recordRet,
				arr=helper.record,
				itemPerPage=4,
				count=arr.length,
				chapter=Math.ceil(count/itemPerPage),
				curC=0;
			var content=$('<div></div>'),
				time,
				title,
				prizeCode,
				prizeId,
				ft='<div class="pagination">'+
						'<span class="window_pageUp">上一页</span>'+
						'<span class="window_pageDown">下一页</span>'+
					'</div>',
				bd='<div class="box-record">';
			for (var x=0;x<chapter;x++){
				bd+='<ul class="l-record">';
				for (var i=0;i<itemPerPage;i++){
					var ndx=i+curC*itemPerPage;
					if(ndx>=count){
						break;
					}
					time=arr[ndx].ctime;
					prizeCode=arr[ndx].prize_code;
					prizeId=arr[ndx].prize_id;
					if( prizeCode=='' ){
						switch(prizeId){
							case '1' :
								title='小米路由器'
								break;
							case '2' :
								title='罗技K400r无线键盘'
								break;
							case '3' :
								title='小米手环'
								break;
							case '4' :
								title='鼠标垫'
								break;
							default:
								break;
						}
					}else{
						switch(prizeId){
							case '1' :
								title='10倍积分加速券&nbsp;&nbsp;'+prizeCode
								break;
							case '2' :
								title='5倍积分加速券&nbsp;&nbsp;'+prizeCode
								break;
							case '3' :
								title='3倍积分加速券&nbsp;&nbsp;'+prizeCode
								break;
							default:
								break;
						}
					}
					bd+='<li>';
					bd+='<span class="time">'+time+'</span>';
					bd+='<span class="title">'+title+'</span>';
					bd+='</li>';
				}
				bd+='</ul>';
				curC++;
			}
			bd+='</div>';

			$(bd).appendTo(content);
			$(ft).appendTo(content);

			switch(judge){
				case 1 :
					new Window().record({
						y:100,
						content4record:content[0],
						handler4PageDown:function(){
							var ndx=$('.l-record:visible').index();
							if(ndx<(chapter-1)){
								ndx++
								$('.l-record').hide();
								$('.l-record:eq('+ndx+')').show();
							}
						},
						handler4PageUp:function(){
							var ndx=$('.l-record:visible').index();
							if(ndx>0){
								ndx--
								$('.l-record').hide();
								$('.l-record:eq('+ndx+')').show();
							}
						}
					});
					$('.l-record:eq(0)').show();
					break;
				case 0 :
					new Window().norecord({
						y:100
					});
					break;
				default:
					alert('服务器繁忙')
					break;
			}
		});
	});

	$('[the-id=logStatus]').click(function(e){
		if($(this).hasClass('out')){
			e.preventDefault();
			Login.show();
		}else{
			// window.location.href('http://wan.liebao.cn/action/logout.php?bu=http%3A%2F%2Fwan.liebao.cn%2Fbbs%2F');
		}
	});
})();