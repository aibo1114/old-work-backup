function _evtCore(ele, evt, fn) {
    return ele.attachEvent ? ele.attachEvent('on' + evt, function(){ fn.call(ele); }) : ele.addEventListener(evt, fn, false);
}

function _bindEvt (ele,evt,fn){
    var eleLen=ele.length;
    if(eleLen){
        for (var i=0; i<eleLen; i++) _evtCore(ele[i],evt,fn);
    }else{
        _evtCore(ele,evt,fn);
    }
}

function _getNdx (obj,ele){
    for (var i=0,len=obj.length; i<len; i++){
        if (obj[i]===ele) return i;
    }
}

function _setSlc (selectId, checkValue){
    var select = document.getElementById(selectId);
    for(var i=0,len=select.options.length; i<len; i++){
        if(select.options[i].value == checkValue){
            select.options[i].selected = true;
            break;
        }
    }
}


function _strToJson(str){
    var json = eval('(' + str + ')');
    return json;
}

function callCApi (n,p){
    var parm=p || '';
    var res;
    if( !window.external ) return false;
    // alert(typeof parm);

    try  {
        res = _strToJson( window.external.call("kieframe", n, parm) );
        return res;
    } catch(err) {
        alert('页面需要在特定环境使用');
        return {isSuccess:0};
    }
}


Element.prototype.addClass=function(cls){
    var clsVal=this.getAttribute("class");
    clsVal=clsVal.concat(' '+cls);
    this.setAttribute('class', clsVal);
};


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
HTMLSelectElement.prototype._getSelected=function(){
    var ndx=this.selectedIndex;
    var v=this.options[ndx].value;
    var t=this.options[ndx].text;

    return {
        value:v,
        text:t
    }
};





/**
 * Created by aibo on 2017/11/9.
 */

/*
 var ie8EleCollection=[
 HTMLUnknownElement,HTMLUListElement,HTMLTitleElement,
 HTMLTextAreaElement,HTMLTableSectionElement,
 HTMLTableRowElement,HTMLTableElement,HTMLTableColElement,
 HTMLTableCellElement,HTMLTableCaptionElement,
 HTMLStyleElement,HTMLSpanElement,HTMLSelectElement,
 HTMLScriptElement,HTMLParamElement,HTMLParagraphElement,
 HTMLOptionElement,HTMLObjectElement,HTMLOListElement,
 HTMLMetaElement,HTMLMarqueeElement,HTMLMapElement,
 HTMLLinkElement,HTMLLegendElement,HTMLLabelElement,
 HTMLLIElement,HTMLInputElement,HTMLImageElement,
 HTMLIFrameElement,HTMLHtmlElement,HTMLHeadingElement,
 HTMLHeadElement,HTMLHRElement,HTMLFrameSetElement,
 HTMLFrameElement,HTMLFormElement,HTMLFontElement,
 HTMLFieldSetElement,HTMLEmbedElement,HTMLDivElement,
 HTMLDListElement,HTMLButtonElement,HTMLBodyElement,
 HTMLBaseElement,HTMLBRElement,HTMLAreaElement,
 HTMLAnchorElement,HTMLDocument
 ];
 */
