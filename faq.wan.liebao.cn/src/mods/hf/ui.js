var $=require('../../lib/polyfill.js');

(function(){
    var curUrl=window.location.href;
    var statusIn=document.getElementById('headerUserTxt');
    var statusOut=document.getElementById('loginList');
    var loginlink=document.getElementById('headerLogin');

    var collectionbtn=document.getElementById('collectionBtn');
    var sethomebtn=document.getElementById('sethomeBtn');
    var desktopbtn=document.getElementById('desktopBtn');

    !ks_user || ks_user.length == 0 ? statusOutFn() : statusInFn();

    $._exFn.bindEvt(loginlink, 'click', toLogin);


    function statusInFn (){
        var username=document.getElementById('headerUsername');
        var quitlink=document.getElementById('headerLogout');

        username.innerHTML=ks_user.passport;
        quitlink.href='http://wan.liebao.cn/action/logout.php?bu='+curUrl;
        statusIn.style.display='block';

        statusOut.style.display='none';
    }

    function statusOutFn (){
        var regislink=document.getElementById('headerRegistered');

        regislink.href='http://wan.liebao.cn/user/register.html?bu='+curUrl;
        statusOut.style.display='block';

        statusIn.style.display='none';
    }

    function toLogin (){
        new SQ.LoginDialog({
            autoShow: !0,
            mask: !0
        });
    }























    $._exFn.bindEvt(collectionbtn, 'click', function(){
        AddFavorite(curUrl, document.title);
    });
    $._exFn.bindEvt(sethomebtn, 'click', function(){
        setHome(this, window.location);
    });
    $._exFn.bindEvt(desktopbtn, 'click', function(){
        var ieVersion=IEVersion();
        var data=document.getElementsByTagName('html')[0].outerHTML;
        if (ieVersion!=-1) {
            alert('暂不支持该浏览器，请更换');
            return false;
        }
        export_raw(document.title+'.html', data);
    });

    /*收藏，设首，下载 screw*/
    function AddFavorite(title,url) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            try {
                window.sidebar.addPanel(title, url, "");
            } catch (e) {
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    }

    function setHome(obj,url){
        try{
            obj.style.behavior='url(#default#homepage)';
            obj.setHomePage(url);
            alert('设置成功');
        }catch(e){
            if(window.netscape){
                try{
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }catch(e){
                    alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
                }
            }else{
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
            }
        }
    }

    function fake_click(obj) {
        var ev = document.createEvent("MouseEvents");
        ev.initMouseEvent(
            "click", true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
        );
        obj.dispatchEvent(ev);
    }

    function export_raw(name, data) {
        var urlObject = window.URL || window.webkitURL || window;

        var export_blob = new Blob([data]);

        var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        fake_click(save_link);
    }

    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = ( userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 || userAgent.indexOf("Windows NT 6.1; WOW64; Trident/7.0;") > -1  ) && !isIE; //判断是否IE的Edge浏览器
        if(isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if(fIEVersion == 7)
            { return "IE7";}
            else if(fIEVersion == 8)
            { return "IE8";}
            else if(fIEVersion == 9)
            { return "IE9";}
            else if(fIEVersion == 10)
            { return "IE10";}
            else if(fIEVersion == 11)
            { return "IE11";}
            else
            { return "0"}//IE版本过低
        }
        else if(isEdge) {
            return "Edge";
        } else {
            return "-1";//非IE
        }
    }
    /*收藏，设首，下载 screw end*/
})();