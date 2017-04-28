window.form_busModule = Object.create(baseModule);

(function(){	
	var selfModule = {
		el:$('#form_bus'),
		selcity:$('.selcity'),
		homeinput:$('input[name=home_addr]'),
		workinput:$('input[name=work_addr]'),
		submitdom:$('.collect_submit'),
		morning:false,
		evening:false,
		renderContent:function(){
			
		},
		changeCityName:function(cityName){
			this.selcity.innerHTML = cityName;
		},
		bindEvent:function(){
			var me = this;
			$(EventCenter).bind('morning_change',function(event,hour){
				console.log('上班时间发生变化');
				me.morning = true;
				$('input[name=morning_time]').val(hour);
				me.checkValidForm();
			});
			$(EventCenter).bind('evening_change',function(event,hour){
				console.log('下班时间发生变化');
				me.evening = true;
				$('input[name=evening_time]').val(hour);
				me.checkValidForm();
			});
			$(EventCenter).trigger('dataPicker_Init');
			this.selcity.bind('click',function(){
				location.href = '#/cityList';
			})
			this.homeinput.bind('input',function(){
				me.checkValidForm();
			});
			this.workinput.bind('input',function(){
				me.checkValidForm();
			});
			this.submitdom.bind('click',function(){
				if(me.submitdom.hasClass('active')){
					var form = $(".form_content form");
					var formData = form.serializeArray();
					var obj = {};
					for(var i = 0;i<formData.length;i++){
						var item = formData[i];
						var key = formData[i].name;
						obj[key] = formData[i].value;
					}
					Tool.store('busform',obj);
					if(EventCenter.islogin){
						location.href = '#/rank';
					}else{
						location.href = '#/login';
					}
				}
			})
		},
		checkValidForm:function(){
			var flag = false;
			if(!this.morning){
				flag = true;
			}
			if(!this.evening){
				flag = true;
			}
			if(this.homeinput.val() === ''){
				flag = true;
			}
			if(this.workinput.val() === ''){
				flag = true;
			}
			if(!flag){
				console.log("通过检测");
				this.submitdom.addClass('active');
			}else{
				console.log('未通过检测');
				this.submitdom.removeClass('active');
			}
		},
		enter:function(){
			this.el.show();
			var userInfo = Tool.store('login_person');
			if(userInfo.name){
				EventCenter.islogin = true;
				var formInfo = Tool.store('busform');
				this.homeinput.val(formInfo.home_addr);
				this.workinput.val(formInfo.work_addr);
				this.morning = true;
				this.evening = true;
				$('.morning_time').html(formInfo.morning_time);
				$('.evening_time').html(formInfo.evening_time);
				$('input[name = morning_time]').val(formInfo.morning_time);
				$('input[name = evening_time]').val(formInfo.evening_time);
				this.submitdom.addClass('active');
			}		
		}
	}
	$.extend(form_busModule,selfModule);
})();