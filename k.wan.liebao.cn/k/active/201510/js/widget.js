function Widget(){
	this.boundingBox=null; //属性：最外层容器
}
Widget.prototype={
	on:function(type,handler){
		if(typeof this.handlers[type] == 'undefined'){
			this.handlers[type]=[];
		}
		this.handlers[type].push(handler);
		return this;
	},
	fire:function(type,data){
		if(this.handlers[type] instanceof Array){
			var handlers=this.handlers[type];
			for (var i=0,len=handlers.length;i<len;i++){
				handlers[i](data);
			}
		}
	},
	renderUI:function(){},//接口 子类去实现 添加dom节点
	bindUI:function(){},//接口 子类去实现	监听事件
	syncUI:function(){},//接口 子类去实现	初始化组件属性
	destructor:function(){}, //接口：销毁前的预处理函数
	render:function(container){
		this.renderUI();
		this.handlers={};
		this.bindUI();
		this.syncUI();
		$(container || document.body).append(this.boundingBox);
	},
	destory:function(){
		this.destructor();
		this.boundingBox.off();
		this.boundingBox.remove();
	}
};