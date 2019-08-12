app.factory('isBox',[function(){
    return function(){
        var mb=myBrowser(),
            isBox= mb=='IE' && window.external;
        function myBrowser(){
            var userAgent = navigator.userAgent;
            var isOpera = userAgent.indexOf("Opera") > -1;
            if (isOpera) {
                return "Opera"
            }
            if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                return "IE";
            }
        }
        return isBox;
    }
}]);