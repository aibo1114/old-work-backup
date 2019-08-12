function AddFavorite(sURL, sTitle)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function setHome(url) { 
	
	if (document.all){ 
		document.body.style.behavior='url(#default#homepage)'; 
		document.body.setHomePage(url); 
		}
	else if(window.sidebar){ 
			if(window.netscape){ 
				try{ 
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
			}catch (e){ 
				alert("感谢您添加我们的网站！");
			} 
		} if(window.confirm("你确定要设置"+url+"为首页吗？")==1){ 
			var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
			prefs.setCharPref('browser.startup.homepage',url); 
		} 
	}else{
		alert('该操作被浏览器拒绝，请检查您的浏览器配置。');
	}
} 