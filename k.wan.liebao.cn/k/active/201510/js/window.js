function Window(){
	this.cfg={
		winType:'',
		width:554,
		height:'',
		hasMask:true,
		winContent:'',
		handler4CloseBtn:null,
		handler4PageDown:null,
		handler4PageUp:null
	}
}
Window.prototype=$.extend({},new Widget(),{
	renderUI:function(){
		var winContent=this.cfg.winContent;
		/*
		switch(this.cfg.winType){
			case 'normal':
				winContent='<span class="icon icon-nochange"></span>'+
							'<h3>'+this.cfg.text4nochange+'</h3>'+
							'<a href="http://wan.liebao.cn/pay/" target="_blank" class="btn btn-nochange"></a>';
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
		*/
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

		/*
		if(this.cfg.content4record){
			$(this.cfg.content4record).insertAfter('.title-record');
		}
		*/

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
		var h;
		if(this.cfg.height){
			h=this.cfg.height+'px';
		}else{
			h:'auto'
		}
		this.boundingBox.css({
			width:this.cfg.width+'px',
			height:h,
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
	madeContent:function(cfg){
		$.extend(this.cfg,cfg,{winType:'madeContent'});
		this.render();
		return this;
	}
});