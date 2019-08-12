/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

// 用于在IE6和IE7浏览器中，支持Element.querySelectorAll方法
var qsaWorker = (function () {
    var idAllocator = 10000;

    function qsaWorkerShim(element, selector) {
        var needsID = element.id === "";
        if (needsID) {
            ++idAllocator;
            element.id = "__qsa" + idAllocator;
        }
        try {
            return document.querySelectorAll("#" + element.id + " " + selector);
        }
        finally {
            if (needsID) {
                element.id = "";
            }
        }
    }

    function qsaWorkerWrap(element, selector) {
        return element.querySelectorAll(selector);
    }

    // Return the one this browser wants to use
    return document.createElement('div').querySelectorAll ? qsaWorkerWrap : qsaWorkerShim;
})();


var _exFn ={
    evtCore: function (ele, evt, fn) {
        return ele.attachEvent ? ele.attachEvent('on' + evt, function(){ fn.call(ele); }) : ele.addEventListener(evt, fn, false);
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
        script.onload=function(){
            head.removeChild(script);
        };
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

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports) {

//  json2.js
//  2016-10-28
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
 eval, for, this
 */

/*property
 JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
 getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
 lastIndex, length, parse, prototype, push, replace, slice, stringify,
 test, toJSON, toString, valueOf
 */


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                f(this.getUTCMonth() + 1) + "-" +
                f(this.getUTCDate()) + "T" +
                f(this.getUTCHours()) + ":" +
                f(this.getUTCMinutes()) + ":" +
                f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
            typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case "string":
                return quote(value);

            case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value)
                    ? String(value)
                    : "null";

            case "boolean":
            case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

            case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

                if (!value) {
                    return "null";
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || "null";
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0
                        ? "[]"
                        : gap
                            ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                            : "[" + partial.join(",") + "]";
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === "object") {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        if (typeof rep[i] === "string") {
                            k = rep[i];
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                        gap
                                            ? ": "
                                            : ":"
                                    ) + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (
                                        gap
                                            ? ": "
                                            : ":"
                                    ) + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0
                    ? "{}"
                    : gap
                        ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                        : "{" + partial.join(",") + "}";
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                (typeof replacer !== "object" ||
                typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                        ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var $=__webpack_require__(1);
var style=__webpack_require__(8);
var menus=null, tags=null;
var ttype='', tname='', tgid='247';

$._exFn.createStyleSheet(style);

$._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
    action:'menu'
}, renderMenu);



function spaRouter (cb){
    var arr=document.location.hash.split('/');
    var obj={};
    obj.page=arr[1];
    obj._id=arr[2];

    cb(obj);
}

function listRoute(_id, menuItems){
    var ndx;
    _id=_id || 247;

    for (var i=0,len=menus.length; i<len; i++){
        if (menus[i].type == _id) {
            ttype=menus[i].type;
            tname=menus[i].name;
            ndx=i;
        }
    }

    $._exFn.addCurCls(menuItems[ndx],'li-menu-qa','cur-menu-qa');
    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: 1,
        type: ttype
    }, renderMain);
}

function resultRoute(){}

function articleRoute(){}



function renderMenu (data){
    // var data=JSON.parse(req.responseText).data;
    var content=document.getElementById('qaMenu');
    var list='<ul class="l-menu-qa">';
    var items;

    menus=data;

    for (var i=0,len=menus.length; i<len; i++) list+='<li class="li-menu-qa" type-id="'+menus[i].type+'"><a href="/#!/list/'+menus[i].type+'">'+menus[i].name+'</a></li>';
    list+='</ul>';
    content.innerHTML=list;

    items=document.getElementsByClassName('li-menu-qa');

    spaRouter( function(opt){
        var page=opt.page,
            _id=opt._id;

        switch (page){
            case 'list':
                listRoute(_id, items);
                break;
            case '':
        }
    });

    //绑定click事件
    $._exFn.bindEvt(items,'click', switchStatus);
}

function renderMain (res){
    var ret=res.code,
        questions=res.data.items,
        games=res.data.games,
        count=res.count,
        title=document.getElementById('qaSubtitle');

    title.innerText=tname;
    tags=games;

    if( ret==1 || ret==0){
        renderTags(games);
        renderList(questions);
    }
}

function renderTags (games){
    var content=document.getElementById('tagContent');
    var exList='<h5 class="title-tags-qa">选择游戏</h5><ul class="l-tags-qa">';
    var items;

    if (!games || games.length==0) {
        content.style.display='none';
        content.innerHTML='';
        return false;
    }

    tgid=='247' ? exList+='<li class="li-tags-qa cur-tags-qa">不限</li>' : exList+='<li class="li-tags-qa">不限</li>';
    for (var k in games){
        games[k].cid == tgid ? exList+='<li gid="'+games[k].cid+'" class="li-tags-qa cur-tags-qa">'+games[k].name+'</li>' : exList+='<li gid="'+games[k].cid+'" class="li-tags-qa">'+games[k].name+'</li>';
    }
    exList+='</ul>';

    content.style.display='block';
    content.innerHTML=exList;

    items=document.getElementsByClassName('li-tags-qa');
    $._exFn.bindEvt(items,'click', switchTag);
}

function renderList (questions){
    var content=document.getElementById('qaQuestions'),
        list='<ul class="l-questions-qa">';

    if (!questions || questions.length==0) {
        content.innerHTML='';
        return false;
    }


    for (var i=0,len=questions.length; i<len; i++) {
        i==len-1 ? list+='<li class="li-questions-qa lst-questions-qa"><a href="/#!/article/'+questions[i].tid+'">'+questions[i].title+'</a></li>' :list+='<li class="li-questions-qa"><a href="/#!/article/'+questions[i].tid+'">'+questions[i].title+'</a></li>';
        // i==len-1 ? list+='<li class="li-questions-qa lst-questions-qa"><a href="'+questions[i].url+'">'+questions[i].title+'</a></li>' :list+='<li class="li-questions-qa"><a href="'+questions[i].url+'">'+questions[i].title+'</a></li>';
    }
    list+='</ul>';

    content.innerHTML=list;
}


function switchStatus (){
    $._exFn.addCurCls(this,'li-menu-qa','cur-menu-qa');

    tname=this.innerText;
    ttype=this.getAttribute('type-id');

    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: 1,
        type: ttype
    }, renderMain);
}
function switchTag (){
    $._exFn.addCurCls(this,'li-tags-qa','cur-tags-qa');

    tgid=this.getAttribute('gid') || '247';

    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: 1,
        type: tgid
    }, renderMain);
}


// window.addEventListener("hashchange", function(){
//     spaRouter(function(opt){
//
//         if(opt.page==pageRt.page ) window.location.reload();
//     });
// }, false);



//renderTags:

// for (var n=0,len=games.length; n<len; n++) {
//     exList+='<li gid="'+games[n].gid+'" class="li-tags-qa">'+games[n].game_name+'</li>';
// }

// var pNode=document.getElementById('qaMain');
// var referNode=document.getElementById('qaQuestions');
// content.setAttribute('id','tagContent');
// content.setAttribute('class','content-tags-qa');
// if(!document.getElementById('tagContent')) pNode.insertBefore(content,referNode);




//1.切换current tabnav为this
//2.改变tname，ttype
//3. 重新拉取main (type 和 gid作参数)
//:3.1 重新拉取tag
//:3.2 重新拉取list


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*layout*/\r\nbody {\r\n    font-family: 'Microsoft Yahei','simsun';\r\n}\r\n.container-qa {\r\n    width:1320px;\r\n    margin:auto;\r\n    padding-top:46px;\r\n}\r\n.title-qa {\r\n    height:42px;\r\n    line-height:42px;\r\n    text-align: center;\r\n    font-size:26px;\r\n    color:#333;\r\n}\r\n\r\n.search-qa {\r\n    width: 628px;\r\n    margin:26px auto 0;\r\n}\r\n\r\n.content-qa {\r\n    margin-top:58px;\r\n}\r\n.content-qa:after {\r\n    content:'';\r\n    display: block;\r\n    height: 0;\r\n    overflow: hidden;\r\n    clear: both;\r\n}\r\n.left-main-qa {\r\n    width:308px;\r\n    float: left;\r\n}\r\n.right-main-qa {\r\n    width:974px;\r\n    float: right;\r\n}\r\n\r\n/*search*/\r\n.ipt-search-qa {\r\n    width: 566px;\r\n    height:50px;\r\n    line-height: 50px;\r\n    border:1px solid #dbdbdb;\r\n    padding:0 30px;\r\n    font-size:16px;\r\n    display: block;\r\n    color:#4c4c4c;\r\n}\r\n\r\n/*menu*/\r\n.l-menu-qa {}\r\n.li-menu-qa {\r\n    width:308px;\r\n    height:50px;\r\n    margin-bottom:1px;\r\n    background:#f5f5f5;\r\n    line-height:50px;\r\n    text-align: center;\r\n}\r\n.li-menu-qa a {\r\n    display: block;\r\n    font-size:16px;\r\n    color:#808080;\r\n}\r\n.cur-menu-qa {\r\n    width:306px;\r\n    height:48px;\r\n    background:url(" + __webpack_require__(21) + ") no-repeat 104px 21px #fff;\r\n    border:1px solid #ebebeb;\r\n    line-height:48px;\r\n}\r\n.cur-menu-qa a {\r\n    color:#f0641e;\r\n}\r\n\r\n/*main title*/\r\n.subtitle-qa {\r\n    margin:1px 0 12px;\r\n    height:25px;\r\n    padding-left:8px;\r\n    border-left:6px solid #f0641e;\r\n\r\n    line-height:25px;\r\n    font-size:20px;\r\n    color:#4c4c4c;\r\n}\r\n\r\n/*tags*/\r\n.content-tags-qa {\r\n    padding-top:20px;\r\n    border:1px solid #ebebeb;\r\n    font-size:14px;\r\n    color:#666;\r\n}\r\n.title-tags-qa {\r\n    width:124px;\r\n    height:26px;\r\n    float:left;\r\n    line-height:26px;\r\n    text-align: center;\r\n}\r\n.l-tags-qa {\r\n    padding-left:124px;\r\n}\r\n.l-tags-qa:after {\r\n    content:'';\r\n    display: block;\r\n    height:0;\r\n    overflow: hidden;\r\n    clear:both;\r\n}\r\n.li-tags-qa {\r\n    display: inline-block;\r\n    *display:inline;\r\n    *zoom:1;\r\n    height:26px;\r\n    margin:0 15px 15px;\r\n    padding:0 20px;\r\n    line-height:26px;\r\n    cursor:pointer;\r\n    float:left;\r\n}\r\n.cur-tags-qa {\r\n    border:1px solid #ff925d;\r\n    border-radius:5px;\r\n    height:24px;\r\n    line-height:24px;\r\n    padding:0 18px;\r\n    color:#ff925d;\r\n}\r\n/*list*/\r\n.l-questions-qa {\r\n    margin-top:25px;\r\n}\r\n.li-questions-qa {\r\n    height:50px;\r\n    padding-left:34px;\r\n    border-bottom:1px solid #ebebeb;\r\n    background:url(" + __webpack_require__(20) + ") no-repeat 12px 23px;\r\n    line-height:50px;\r\n    font-size:16px;\r\n    color:#666;\r\n}\r\n.lst-questions-qa {border:none;}\r\n/*result*/\r\n\r\n/*detail*/", ""]);

// exports


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fb8d001515290687a1e32320629f71c9.png";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3698bb28b89752d529fae185b8abbdef.png";

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(3);
module.exports = __webpack_require__(6);


/***/ })
/******/ ]);