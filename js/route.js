window.routeModule = (function(){
	var pageMap = {
		home: homeModule,
		rank: rankModule,
		login: loginModule,
		form_bus: form_busModule,
		cityList: cityListModule
	};
	var pageCacheMap = {};
	var current = null;
	var pre_page = null;
	function routerControl(routeName){
		console.log(routeName+'发生了变化');
		var module = pageMap[routeName];
		if(pageMap[routeName]){
			if(typeof pageCacheMap[routeName] === "undefined"){
				console.log(routeName+"没有被初始化过");
				module.init();
				module.enter();
				pageCacheMap[routeName] = module;
				pre_page = current;
				current = module;
				if(pre_page){
					pre_page.leave();
				}
			}else{
				console.log(routeName+'已经被初始化了');
				module.enter();
				pre_page = current;
				current = module;
				if(pre_page){
					pre_page.leave();
				}
			}
		}else{
			pageMap['home'].init();
		}
	};
	return {
		router : routerControl
	};
})()