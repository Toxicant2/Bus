window.loginModule = Object.create(baseModule);

(function(){	
	var selfModule = {
		el:$('#login'),
		telDom:$('#tel'),
		codeDom:$('#code'),
		confirm:$('.confirm'),
		submit_btn:$('.submit_btn'),
		renderContent:function(){
			console.log("我是登录模块");		
		},
		bindEvent:function(){
			var me = this;
			$('input').on('input',function(){
				me.checkValidFrom();
			})
			this.submit_btn.bind('click',function(){
				if($(this).hasClass('ok')){
					var obj = {
						name:me.telDom.val(),
						password:me.codeDom.val()
					}
					Tool.store('login_person',obj);
					location.href = '#/form_bus';
				}
			})
		},
		checkValidFrom:function(){
			var flag = false;
			var telval = this.telDom.val();
			var codeval = this.codeDom.val();

			if(telval == '' || !/^\d{11}$/.test(telval)){
				flag = true;
				this.confirm.removeClass('ok');
			}else{
				this.confirm.addClass('ok');
			}
			if(codeval == '' || !/^\d{4}$/.test(codeval)){
				flag = true;
				this.submit_btn.removeClass('ok');
				console.log("验证码不对");
			}
			if(!flag){
				console.log("通过了检测");
				this.submit_btn.addClass('ok');
			}
		}
	}
	$.extend(loginModule,selfModule);
})();