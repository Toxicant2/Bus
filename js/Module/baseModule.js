window.baseModule = {
	el:null,
	init:function(){
		this.render();
		this.bindEvent();
	},
	bindEvent:function(){
		
	},
	render:function(){
		this.renderContent();		
	},
	renderContent:function(){
		
	},
	enter:function(){
		this.el.show();
	},
	leave:function(){
		this.el.hide();
	}
}