window.Tool = {
 	store:function(namespace,data,remove){
 		if(arguments.length > 2){
 			localStorage.removeItem(namespace);
 		}else if(arguments.length > 1){
 			localStorage.setItem(namespace,JSON.stringify(data));
 		}else{
 			var strobj = localStorage.getItem(namespace);
 			return (strobj && JSON.parse(strobj)) || {};
 		}
 	}
}