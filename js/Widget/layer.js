window.Layer = (function(){
	var cssLoad = false;
	var instance ;
	function init(layerContent){
		if(!cssLoad){
			var head = document.getElementsByTagName('head')[0];
			var styleStr = '.layer{position: fixed;top:0;left: 0;right: 0;bottom: 0;z-index: 99999;height: 100%;display: none;}.layer_master{position: fixed;top:0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,.6);z-index: 1;height: 100%;}'
			var style = document.createElement('style');
			style.innerHTML = styleStr;
			head.appendChild(style);
			cssLoad = true;
		};
		if(!instance){
			instance= document.createElement('div');
			instance.setAttribute('class','layer');
			var rank = document.getElementById('rank');
			rank.appendChild(instance);		
		};
		instance.innerHTML = layerContent;
		bindEvent();
		show();
		return instance;
	};
	function bindEvent(){
		var dom = document.getElementById('layer_master');
		dom.onclick = function(){
			hide();
		};
		var domsub = document.getElementById('rule_submit');
		domsub.onclick = function(){
			hide();
			location.href = '#/form_bus';
		}

	};
	function show(){
		instance.style.display = 'block';
	};
	function hide(){
		instance.style.display = 'none';
	};
	return {
		init:init
	}
})();