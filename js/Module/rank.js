window.rankModule = Object.create(baseModule);

(function(){	
	var selfModule = {
		el:$('#rank'),
		listel:$('.list_item'),
		getlayer_content:function(){
			var str = 	'<div id="layer_master" class="layer_master"></div>'+
						'<div class="layer_content">'+
							'<div class="rule_title">活动规则</div>'+
							'<p>滴滴巴⼠将奔赴各城,填写您的乘车需求,参战城市排位战,城市排名靠前的城市就有可能第⼀时间坐到滴滴巴士,获取免费上下班的机会!</p>'+
							'<div id="rule_submit" class="rule_submit">我要参战</div>'+
						'</div>'					 
			return str;
		},
		init:function(){
			this.getData();
			this.bindEvent();
		},
		renderContent:function(obj){
			var str = '';
			var count = 0;
			var targetNum = null;
			for(var key in obj){
				if(count == 0){
					targetNum = obj[key];
				}
				var LEFT_OFFSET_REM = 9.5;
				var dotted_num = LEFT_OFFSET_REM/targetNum;
				var left = dotted_num * obj[key];
				if(left < 2.8) {
					left = 2.8 + left;
				}
				count++;
				str += 	'<li>'+
							'<div class="left_pane inl">'+
								'<div class="rank_num inl">' + count + '</div>'+
								'<div class="rank_city inl">' + key + '</div>'+
							'</div>'+
							'<div data-left="'+ left +'" class="right_pane inl">'+
								'<div class="bus_info inl">' + obj[key] + '</div>'+
							'</div>'+
							'<div class="bar_line"></div>'+
							'<div class="city_bar" style="animation:runcity '+ (3 - obj[key]/targetNum ) +'s infinite linear both 1.5s;-webkit-animation:runcity '+ (3 - obj[key]/targetNum ) +'s infinite linear both 1.5s;"></div>'+
						'</li> '
			}
			this.listel.html(str);
			setTimeout(function(){
				$(".right_pane").each(function(index,val){
				    val.style.left =  val.dataset.left +'rem';
				})
			},1000)
		},
		bindEvent:function(){
			var me = this;
			this.el.find('.submit_button').click(function(){
				location.href = '#/form_bus';
			});
			this.el.find('.header_rule').click(function(event){
				$(EventCenter).trigger('layer',me.getlayer_content());
			});
		},
		getData:function(){
			var me=this;
			$.ajax({
				url:'js/Data.json',
				type:'get',
				success:function(res){
					if(typeof res === "string"){
						res = JSON.parse(res);
					}else{
						res = res;
					}
					me.renderContent(res);
					$(EventCenter).trigger('iscroll_load');
					console.log(res);
				},
				error:function(){
					console.log(res);
				}
			})
		}
	}
	$.extend(rankModule,selfModule);
})();