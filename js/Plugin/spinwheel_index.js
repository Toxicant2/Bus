  	//时间插件
window.datePickter = function(){
        var weekConf = ['日','一','二','三','四','五','六'];
        var ddDate = setDate();
        var ddHour = setHourMinute();
        var ddMinute = setHourMinute('minute');

        // var $box = document.querySelector('[data-datewheel]'),
        //     $desc = $box.querySelector('.desc'),
        //     $detail = $box.querySelector('.detail'),
        //     $time = $box.querySelector('.time');


        function format(datetime,temp){
            var temp = temp || 'YYYY-MM-DD';
            var year = datetime.getFullYear(),
                month = datetime.getUTCMonth() + 1,
                day = datetime.getUTCDate();

            temp = temp.replace(/YYYY/ig,year)
                        .replace(/MM/g,month<10 ? ('0'+ month + '') : month)
                        .replace(/DD/g,day<10 ? ('0' + day + '') : day)
                        .replace(/weekday/gi,weekConf[datetime.getDay()]);

            return temp;
        }
        
        function setDate(offset){ 
            var offset = offset || 0;
            var dms = 1000*60*60*24;
            var ts = new Date(new Date().getTime() + dms * offset).getTime();
            var data= {};

            for(var i = 0; i < 3 - offset; i++){
                var datetime =  new Date(ts + dms * i);
                data[i] = format(datetime);
            }

            return data;
        }

        function setHourMinute(unit,start){
            var unit,step,
            temp={},
            suff,str;

            var i = start || 0;

            if(unit){
                unit = 60;
                step = 10;
                suff = '分';
            }else{
                unit = 24;
                step = 1;
                suff = '点';
            }

            for(; i<unit; i=i+step){
                str = i<10 ? ('0' + i + '') : i; 
                str += suff;
                temp[i+1]  = str;
            }
            return temp;
        }

        function getDefaultDatetime(){    
            var hourRange = setHourMinute(null, 0);
            var minuteRange = setHourMinute('分', 0);
            return {
                'hourRange' : hourRange,
                'minuteRange' : minuteRange
            } 
        }

        function hideBg(){
            var $bg = document.querySelector('#sw-bg');
            $bg && document.body.removeChild($bg);
            SpinningWheel.destroy();
        }

        function done(target) {
            //点击时间选择器完成操作，会执行里面的内容
        	if(typeof target !== 'undefined') {
	            var results = SpinningWheel.getSelectedValues();
	            var key = results.keys;
	            var value = results.values;
	       		var hour = value[0].substr(0, 2);
	       		var minute = value[1].substr(0, 2);
	       		var second = hour * 3600 + minute * 60;
	       		target.data('val', second);
                $(EventCenter).trigger(target.data('key')+'_change', target.data('tips') + ' ' + hour + ':' + minute);
	       		target.html(target.data('tips') + ' ' + hour + ':' + minute);
       		}
            cancel();
        }

        function cancel() {
            //alert('cancel');
            hideBg();
        }

        function openBirthDate(target) {
            var $bg = document.querySelector('#sw-bg'); 
            
            if($bg){
                return false;
            }
            
            $bg = document.createElement('div');

            $bg.id = 'sw-bg' ;
            $bg.className = 'sw-bg';
            document.querySelector('body').appendChild($bg);
            var hour = target.data('starttime') || 0;
            //var defaultHourMinute = getDefaultHourMinute()
            var defaultDatetime = getDefaultDatetime(hour);

            SpinningWheel.addSlot(defaultDatetime.hourRange, 'center', hour);

            SpinningWheel.addSlot(defaultDatetime.minuteRange, 'center', 0);
            
            SpinningWheel.setCancelAction(function(){
                cancel();
            });
            SpinningWheel.setDoneAction(function(){
                done(target);
            });
            SpinningWheel.open();

        }

        return {
            init : function(){
            	$('body').on('click', '[data-datewheel]', function(event) {
                    event.preventDefault();
                    var $se = $(this);
                    openBirthDate($se);
            	});
              
                document.body.addEventListener('touchend', function(ev){
                    if (ev.target.id == 'sw-bg') {
                        hideBg()
                    }
                });
            } ,
            done : function(){
                done(); 
            },
            curTop: 0
        }


    }();