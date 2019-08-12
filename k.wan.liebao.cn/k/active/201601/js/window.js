function Window(){
	this.cfg={
		width:500,
		height:300,
		title:'系统消息',
		content:'',
		hasCloseBtn:true,
		hasMask:true,
		/*isDraggable:true,*/
		dragHandle:null,
		skinClassName:null,
		text4AlertBtn:'确定',
		text4ConfirmBtn:'确定',
		text4CancelBtn:'取消',
		text4PromptBtn:'确定',
		isPromptInputPassword:false,
		defaultValue4PromptInput:'',
		maxlength4PromptInput:10,
		handler4AlertBtn:null,
		handler4CloseBtn:null,
		handler4ConfirmBtn:null,
		handler4CancelBtn:null,
		handler4PromptBtn:null
	};
}

Window.prototype=$.extend({},new Widget(),{
	renderUI:function(){
		var window_body=null;
		var headerContent='<div class="window_header">'+this.cfg.title+'</div>';
		var footerContent='';
		var bdContent=this.cfg.content;
		switch(this.cfg.winType){
			case 'alert':
				footerContent='<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn" />';
				break;
			case 'confirm':
				footerContent='<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn" />'+
							'<input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn" />';
				break;
			case 'prompt':
				bdContent='<div class="window_promptInputWrapper">'+
								'<label for="a" class="window_promptLabel">'+this.cfg.content+'</label>'+
								'<input id="a" type="'+(this.cfg.isPromptInputPassword ? 'password' : 'text')+'" value="'+this.cfg.defaultValue4PromptInput+'" maxlength="'+this.cfg.maxlength4PromptInput+'" class="window_promptInput" />'+
							'</div>';
				footerContent='<input type="button" value="'+this.cfg.text4SubmitBtn+'" class="window_promptBtn" />'+
							'<input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn" />';
				break;
		}
		this.boundingBox=$(
				'<div class="window_boundingBox">'+
					headerContent+
					'<div class="window_body">'+bdContent+'</div>'+
					footerContent+
				'</div>'
			);
		if(this.cfg.hasMask){
			this._mask=$('<div class="window_mask"></div>');
			this._mask.appendTo('body');
		}

		if(this.cfg.hasCloseBtn){
			this.boundingBox.append('<span class="window_closeBtn">X</span>');
		}
		this.boundingBox.appendTo(document.body);

		this._promptInput=this.boundingBox.find('.window_promptInput');
	},
	bindUI:function(){
		var that=this;
		this._keydownHandler=function(e){
			if(e.keyCode==13){
				e.preventDefault();
				switch(that.cfg.winType){
					case 'alert':
						that.fire('alert');
						break;
					case 'confirm':
						that.fire('confirm');
						break;
					case 'prompt':
						that.fire('prompt',that._promptInput.val());
						break;
					default:
						break;
				}
				that.destory();
			}
			if(e.keyCode==27){
				e.preventDefault();
				that.destory();
			}
		}
		document.addEventListener('keydown',that._keydownHandler);
		this.boundingBox.delegate('.window_alertBtn','click',function(){
			that.fire('alert');
			that.destory();
		}).delegate('.window_closeBtn','click',function(){
			that.fire('close');
			that.destory();
		}).delegate('.window_confirmBtn','click',function(){
			that.fire('confirm');
			that.destory();
		}).delegate('.window_cancelBtn','click',function(){
			that.fire('cancel');
			that.destory();
		}).delegate('.window_promptBtn','click',function(){
			that.fire('prompt',that._promptInput.val());
			that.destory();
		});

		if(this.cfg.handler4AlertBtn){
			this.on('alert',this.cfg.handler4AlertBtn);
		}
		if(this.cfg.handler4CloseBtn){
			this.on('close',this.cfg.handler4CloseBtn);
		}
		if(this.cfg.handler4ConfirmBtn){
			this.on('confirm',this.cfg.handler4ConfirmBtn);
		}
		if(this.cfg.handler4CancelBtn){
			this.on('cancel',this.cfg.handler4CancelBtn);
		}
		if(this.cfg.handler4PromptBtn){
			this.on('prompt',this.cfg.handler4PromptBtn);
		}
	},
	syncUI:function(){
		this.boundingBox.css({
			width:this.cfg.width+'px',
			height:this.cfg.height+'px',
			left:(this.cfg.x || (window.innerWidth-this.cfg.width)/2)+'px',
			top:(this.cfg.y || (window.innerHeight-this.cfg.height)/2)+'px'
		});
		if(this.cfg.skinClassName){
			this.boundingBox.addClass(this.cfg.skinClassName);
		}
		/*
		if(this.cfg.isDraggable){
			if(this.cfg.dragHandle){
				this.boundingBox.draggable({handle:this.cfg.dragHandle});
			}else{
				this.boundingBox.draggable();
			}
		}
		*/
	},
	destructor:function(){
		document.removeEventListener('keydown',this._keydownHandler);
		this._mask && this._mask.remove();
	},
	alert:function(cfg){
		$.extend(this.cfg,cfg,{winType:'alert'});
		this.render();
		return this;
	},
	confirm:function(cfg){
		$.extend(this.cfg,cfg,{winType:'confirm'});
		this.render();
		return this;
	},
	prompt:function(cfg){
		$.extend(this.cfg,cfg,{winType:'prompt'});
		this.render();
		//自动获得焦点
		this._promptInput.focus();
		return this;
	}
});