if(!document.getElementsByClassName) {
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

if (!Array.prototype.map) {
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




var _exFn ={
    evtCore: function (ele, evt, fn) {
        return ele.attachEvent ? ele.attachEvent('on' + evt, function(e){ fn.call(ele, e); }) : ele.addEventListener(evt, fn, false);
    },
    bindEvt: function (ele,evt,fn){
        var eleLen=ele.length;
        if(eleLen){
            for (var i=0; i<eleLen; i++) this.evtCore(ele[i],evt,fn);
        }else{
            this.evtCore(ele,evt,fn);
        }
    },
    getNdx: function (obj,ele){
        for (var i=0,len=obj.length; i<len; i++){
            if (obj[i]===ele) return i;
        }
    },
    setSlc: function (selectId, checkValue){
        var select = document.getElementById(selectId);
        for(var i=0,len=select.options.length; i<len; i++){
            if(select.options[i].value == checkValue){
                select.options[i].selected = true;
                break;
            }
        }
    },
    strToJson: function(str){
        var json = eval('(' + str + ')');
        return json;
    },
    addCurCls: function(curEle,cls,curCls){
        var others=document.getElementsByClassName(cls);
        var adCls=cls.concat(' '+curCls);
        var rmCls=cls.replace(curCls,'');


        for (var i=0,len=others.length; i<len; i++) {
            if (curEle===others[i]) continue;
            others[i].className= rmCls;
            // others[i].setAttribute('class', rmCls);
        }

        curEle.className= adCls;
        // curEle.setAttribute('class', adCls);
    },
    createStyleSheet: function (styles) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.type = 'text/css';

        head.appendChild(style);

        if (style.styleSheet) { //for ie
            style.styleSheet.cssText = styles;
        } else {//for w3c
            style.appendChild(document.createTextNode(styles));
        }
    },
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    urlObjToStr: function (ipt){
        var pStr='';
        for (i in ipt){
            pStr+=i+'='+ipt[i]+'&';
        }
        return pStr.substring(0,pStr.length-1);
    },
    hasClass: function ( elements,cName ){
        return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") );
    },
    addClass: function( elements,cName ){
        if( !this.hasClass( elements,cName ) ){
            elements.className += " " + cName;
        }
    },
    removeClass: function( elements,cName ){
        if( this.hasClass( elements,cName ) ){
            elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
        }
    }
};

var _XMLHttp={
    instancePool:[],
    getInstance:function(){
        if(this.instancePool.length>=1){
            for (var i=0,len=this.instancePool.length; i<len; i++){
                if (this.instancePool[i].readyState==0 || this.instancePool[i].readyState ==4) return this.instancePool[i];
            }
        }

        this.instancePool[this.instancePool.length-1]= this.createInstance();
        return this.instancePool[this.instancePool.length-1];
    },
    createInstance:function(){
        var xmlHttp=null;
        var msXml=['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];

        if(window.XMLHttpRequest){
            xmlHttp= new XMLHttpRequest();
        }else {
            for (var x=0,len=msXml.length; x<len; x++){
                try {
                    xmlHttp=new ActiveXobject( msXml[n] );
                    break;
                }catch(e) {}
            }
        }

        //mozilla 一些版本没有readyState属性
        if(xmlHttp.readyState==null || !xmlHttp.readyState || xmlHttp.readyState==undefined){
            xmlHttp.readyState= 0;
            xmlHttp.addEventListener('load', function(){
                xmlHttp.readyState= 4;
                if (typeof xmlHttp.onreadystatechange == 'function') xmlHttp.onreadystatechange();
            }, false);
        }

        return xmlHttp;
    },
    sendReq:function(m, url, data, cb){
        var req= this.getInstance();

        with(req){
            try {
                url.indexOf('?') > 0 ? url+= '&r='+Math.random() : url+= '?r='+Math.random();
                if( (m=='get' || m=='GET') && data ) url+= this.urlObjToStr(data);

                open(m, url, true);
                setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

                m=='post' || m=='POST' ? send(data) : send();

                onreadystatechange=function(){
                    if(req.readyState==4 && (req.status==200 || req.status==304) ) cb(req);
                }
            }catch (e){alert(e);}
        }
    },
    sendJsonp: function(url, data, cb){
        var head= document.head || document.getElementsByTagName('head')[0],
            script=document.createElement('script'),
            p='';

        window.process= cb;

        if(data) p+= this.urlObjToStr(data);

        script.src = url+'?callback=process'+'&'+p;
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

    },
    urlObjToStr: function (ipt){
        var pStr='';
        for (i in ipt){
            pStr+=i+'='+ipt[i]+'&';
        }
        return pStr.substring(0,pStr.length-1);
    }
};


module.exports._exFn=_exFn;
module.exports._XMLHttp=_XMLHttp;































/*
 if (!document.querySelectorAll) {
 document.querySelectorAll = function (selectors) {
 var style = document.createElement('style'), elements = [], element;
 document.documentElement.firstChild.appendChild(style);
 document._qsa = [];

 style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
 window.scrollBy(0, 0);
 style.parentNode.removeChild(style);

 while (document._qsa.length) {
 element = document._qsa.shift();
 element.style.removeAttribute('x-qsa');
 elements.push(element);
 }
 document._qsa = null;
 return elements;
 };
 }

 if (!document.querySelector) {
 document.querySelector = function (selectors) {
 var elements = document.querySelectorAll(selectors);
 return (elements.length) ? elements[0] : null;
 };
 }
 */







/*
var Element= Element || '',
    HTMLCollection= HTMLCollection || '',
    HTMLSelectElement= HTMLSelectElement || '';


if(Element){
    Element.prototype.addClass=function(cls){
        var clsVal=this.getAttribute("class");
        clsVal=clsVal.concat(' '+cls);
        this.setAttribute('class', clsVal);
    };
}
if(HTMLCollection){
    HTMLCollection.prototype.removeClass=function(cls){
        for (var i=0,len=this.length; i<len; i++){
            var clsVal=this[i].getAttribute("class");
            clsVal = clsVal.replace(cls,"");
            this[i].setAttribute('class', clsVal);
        }
    };
    HTMLCollection.prototype._toggle=function(ndx){
        for (var i=0,len=this.length; i<len; i++){
            this[i].style.display='none';
        }
        this[ndx].style.display='block';
    };
}
if(HTMLSelectElement){
    HTMLSelectElement.prototype._getSelected=function(){
        var ndx=this.selectedIndex;
        var v=this.options[ndx].value;
        var t=this.options[ndx].text;

        return {
            value:v,
            text:t
        }
    };
}
*/




/*
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}
 */