window.homeModule = Object.create(baseModule);

(function(){	
	var selfModule = {
		el:$('#home'),
		renderContent:function(){

		},
		bindEvent:function(){
			this.el.click(function(){
				var me = $(this);
				me.find('.header_logo').addClass('header_logo_out');
				me.find('.header_title').addClass('header_title_out');
				me.find('.middle_bus').addClass('middle_bus_out');
				me.find('.people_down').addClass('people_down_out');
				me.find('.people_up').addClass('people_up_out');
				timer=setTimeout(function(){
					me.find('.header_logo').removeClass('header_logo_out');
					me.find('.header_title').removeClass('header_title_out');
					me.find('.middle_bus').removeClass('middle_bus_out');
					me.find('.people_down').removeClass('people_down_out');
					me.find('.people_up').removeClass('people_up_out');
					location.href = '#/rank';
				},1500)
			})
		}
	}
	$.extend(homeModule,selfModule);
})();