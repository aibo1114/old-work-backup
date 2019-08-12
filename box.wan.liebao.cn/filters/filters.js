app.filter('unique',function(){
    return function (array){
        var arr = [];//临时数组
        for(var i = 0;i < array.length; i++){
            if(arr.indexOf(array[i]) == -1) arr.push(array[i]);
        }
        return arr;
    }
});