//<img src="'+helper.domain+'/images/a.jpg" />
function Window(){
	this.cfg={
		winType:'',
		width:554,
		height:344,
		hasMask:true,
		icon4nochange:'a.png',
		text4nochange:'很遗憾！您的抽奖机会不足！',
		btn4nochange:'b.png',
		icon4get:'c.png',
		text4get:'',
		btn4get:'d.png',
		icon4norecord:'e.png',
		title4norecord:'很抱歉',
		text4norecord:'您暂时还没有获奖记录',
		title4record:'我的中奖纪录',
		content4record:'',
		handler4CloseBtn:null,
		handler4PageDown:null,
		handler4PageUp:null
	}
}
Window.prototype=$.extend({},new Widget(),{
	renderUI:function(){
		var winContent;
		switch(this.cfg.winType){
			case 'nochange':
				winContent='<span class="icon icon-nochange"></span>'+
							'<h3>'+this.cfg.text4nochange+'</h3>'+
							'<a href="http://wan.liebao.cn/pay/" target="_blank" class="btn btn-nochange"></a>';
				break;
			case 'get':
				winContent='<span class="icon icon-get"></span>'+
							'<h3>'+this.cfg.text4get+'</h3>'+
							'<a class="btn btn-get window_closeBtn"></a>';
				break;
			case 'norecord':
				winContent='<span class="icon icon-norecord"></span>'+
							'<h2>'+this.cfg.title4norecord+'</h2>'+
							'<p class="text">'+this.cfg.text4norecord+'</p>';
				break;
			case 'record':
				winContent='<h3 class="title-record">'+this.cfg.title4record+'</h3>';
				break;
		}
		this.boundingBox=$(
			'<div class="window_boundingBox">'+
				'<div class="window_body">'+winContent+'</div>'+
			'</div>'
		);
		if(this.cfg.hasMask){
			this._mask=$('<div class="window_mask"></div>');
			this._mask.appendTo('body');
		}
		this.boundingBox.append('<span class="window_closeBtn window_forkBtn">X</span>');
		this.boundingBox.appendTo(document.body);
		if(this.cfg.content4record){
			$(this.cfg.content4record).insertAfter('.title-record');
		}

	},
	bindUI:function(){
		var that=this;
		this.boundingBox.delegate('.window_closeBtn','click',function(){
			that.fire('close');
			that.destory();
		}).delegate('.window_pageDown','click',function(){
			that.fire('pageDown');
		}).delegate('.window_pageUp','click',function(){
			that.fire('pageUp');
		});

		if(this.cfg.handler4CloseBtn){
			this.on('close',this.cfg.handler4CloseBtn);
		}
		if(this.cfg.handler4PageDown){
			this.on('pageDown',this.cfg.handler4PageDown);
		}
		if(this.cfg.handler4PageUp){
			this.on('pageUp',this.cfg.handler4PageUp);
		}
	},
	syncUI:function(){
		this.boundingBox.css({
			width:this.cfg.width+'px',
			height:this.cfg.height+'px',
			// left:(this.cfg.x || (window.innerWidth-this.cfg.width)/2)+'px',
			left:(this.cfg.x || ($(window).width()-this.cfg.width)/2)+'px',
			top:(this.cfg.y || (window.innerHeight-this.cfg.height)/2)+'px'
		});
		if(this.cfg.skinClassName){
			this.boundingBox.addClass(this.cfg.skinClassName);
		}
	},
	destructor:function(){
		this._mask && this._mask.remove();
	},
	nochange:function(cfg){
		$.extend(this.cfg,cfg,{winType:'nochange'});
		this.render();
		return this;
	},
	get:function(cfg){
		$.extend(this.cfg,cfg,{winType:'get'});
		this.render();
		return this;
	},
	norecord:function(cfg){
		$.extend(this.cfg,cfg,{winType:'norecord'});
		this.render();
		return this;
	},
	record:function(cfg){
		$.extend(this.cfg,cfg,{winType:'record'});
		this.render();
		return this;
	}
});