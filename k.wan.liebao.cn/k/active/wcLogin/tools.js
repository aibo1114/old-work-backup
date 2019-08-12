if(!document.getElementsByClassName){
    document.getElementsByClassName = function(className){
        var children = document.getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j=0; j<classNames.length; j++){
                if (classNames[j] == className){
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    };
}
if(!Array.prototype.map){
    Array.prototype.map = function(callback, thisArg) {
        var T, A, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (Object.prototype.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        A = new Array(len);
        k = 0;
        while(k < len) {
            var kValue, mappedValue;
            if (k in O) {
                kValue = O[ k ];
                mappedValue = callback.call(T, kValue, k, O);
                A[ k ] = mappedValue;
            }
            k++;
        }
        return A;
    };
}

function urlObjToStr (ipt){
    var pStr='';
    for (i in ipt){
        pStr+=i+'='+ipt[i]+'&';
    }
    return pStr.substring(0,pStr.length-1);
}
function sendJsonp (url, data, cb){
    var head= document.head || document.getElementsByTagName('head')[0],
        script=document.createElement('script'),
        p='',
        r=Math.random();

    window.process= cb;

    if(data) p+= urlObjToStr(data);

    p ? script.src = url+'?v='+r+'&callback=process'+'&'+p : script.src = url+'?v='+r+'&callback=process';

    head.appendChild(script);
    /*ie 78*/
    script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            head.removeChild(script);
        }
    };
    /*others*/
    if( window.navigator.appVersion.indexOf('MSIE')===-1 ) script.onload=function(){ head.removeChild(script);};

}


function evtCore (ele, evt, fn) {
    return ele.attachEvent ? ele.attachEvent('on' + evt, function(e){ fn.call(ele, e); }) : ele.addEventListener(evt, fn, false);
}
function bindEvt (ele,evt,fn){
    var eleLen=ele.length;
    if(eleLen){
        for (var i=0; i<eleLen; i++) evtCore(ele[i],evt,fn);
    }else{
        evtCore(ele,evt,fn);
    }
}


function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }else{
        var expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function deleteCookie(name) {
    setCookie(name,"",-1);
}


function createStyleSheet (styles) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    head.appendChild(style);
    style.styleSheet ? style.styleSheet.cssText = styles : style.appendChild(document.createTextNode(styles));
}

module.exports = {
    sendJsonp: sendJsonp,
    bindEvt: bindEvt,
    createStyleSheet: createStyleSheet,
    setCookie: setCookie,
    getCookie: getCookie,
    deleteCookie: deleteCookie
};