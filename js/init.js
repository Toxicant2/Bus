window.EventCenter = {};
window.myScroll = null;

$(EventCenter).bind('iscroll_load', function(){
	myScroll = new IScroll('.rank_list', {
       scrollbars: true,
       bounce:true
    });
});

$(EventCenter).bind('city_change', function(event,cityName){
	form_busModule.changeCityName(cityName);
});

$(EventCenter).bind('returnTop', function(){
	if (myScroll) {
		myScroll.scrollTo(0, 0);
	};
});

$(EventCenter).bind('layer', function(event,str){
	Layer.init(str);
});

$(EventCenter).bind('dataPicker_Init', function(event){
	datePickter.init();
});

new Router({
	'/:pageName': function (pageName) {
		routeModule.router(pageName)
	}.bind(this)
}).init('/home');