window.cityListModule = Object.create(baseModule);

(function(){	
	var selfModule = {
		el:$('#cityList'),
		all_hot_city:$('.all_hot_city'),
		all_city_caps:$('.all_city_caps'),
		allcityContainer:$('.allcityContainer'),
		init:function(){
			this.getData();
		},
		renderHotCity:function(data){
			var str = '';
			for(var i=0;i < data.length;i++){
				str += '<span class="hot_city_name">' + data[i].name + '</span>';
			}
			this.all_hot_city.html(str);
		},
		renderCityCaps:function(data){
			var str = '';
			for(var key in data){
				str += '<span class="city_caps">' + key + '</span>'
			}
			this.all_city_caps.html(str);
		},
		renderCityList:function(data){
			var str = '';
			for(var i = 0; i < data.length;i++){
				str += '<span class="cityName">' + data[i].name + '</span>'
			}
			return str;
		},
		renderContainer:function(data){
			var me = this;
			var str = '';
			for(var key in data){
				var ListItem = data[key];
				str += '<div class="city_caps-single" data-caps = "' + key + '">' + key + '</div>'+
						'<div class="city_container bd bd-w">'+
							me.renderCityList(ListItem)+
						'</div>'
			}
			this.allcityContainer.html(str);
		},
		bindEvent:function(){
			$(".all_city_caps span").click(function(){
			    var str  = $(this).text();
			    var top  = $('[data-caps = '+ str +']')[0].offsetTop;
			    window.scrollTo(0,top)
			});
			$(".all_hot_city span").click(function(){
			    var str  = $(this).text();
			    location.href = '#/form_bus';
			   	$(".selcity").html(str);
			})
			$(".cityName").click(function(){
			    var str = $(this).text();
			    location.href = '#/form_bus';
			   	$(".selcity").html(str);
			})
		},
		getData:function(){
			var me = this;
			$.ajax({
				url:'js/citydata.json',
				type:'get',
				success:function(res){
					console.log(res);
					me.renderHotCity(res.city.hot_city);
					me.renderCityCaps(res.city.city_list);
					me.renderContainer(res.city.city_list);
					me.bindEvent();
				},
				error:function(res){
					console.log(res);
				}
			})
		}
	}
	$.extend(cityListModule,selfModule);
})();