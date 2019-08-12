clockApp.factory('hh',[function(){
    return function(date){
        var hh='';
        var arr=[];
        if(date){
            //,'YYYY-MM-DD HH:mm:ss'
            if( moment(date).format()=='Invalid date'){
                date=moment().format('YYYY-MM-DD')+' '+date;
            }
            hh=moment(date).format('HH')+'时';
            return hh;
        }
        for (var i=0;i<24;i++){
            var h=i.toString();
            h.length==1 ? h='0'+h+'时' : h=h+'时';
            arr.push(h);
        }
        return arr;
    };
}]);
clockApp.factory('mm',[function(){
    return function(date){
        var mm='';
        var arr=[];
        if(date){
            if( moment(date).format()=='Invalid date'){
                date=moment().format('YYYY-MM-DD')+' '+date;
            }
            mm=moment(date).format('mm')+'分';
            return mm;
        }
        for (var i=0;i<60;i++){
            var m=i.toString();
            m.length==1 ? m='0'+m+'分' : m=m+'分';
            arr.push(m);
        }
        return arr;
    };
}]);