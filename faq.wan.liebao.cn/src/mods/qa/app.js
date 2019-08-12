var $=require('../../lib/polyfill.js');
var P=require('../../lib/pagination.js');

var style=require('./css/main.css');
var menus=null, tags=null;
var ttype='', tname='', tgid='247',tid='';
var searchIpt=document.getElementById('qaSearchIpt');

$._exFn.createStyleSheet(style);

$._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
    action:'menu'
}, renderMenu);

function spaRouter (cb){
    var arr=document.location.hash.split('/');
    var obj={};
    obj.page=arr[1];
    obj._id=arr[2];

    window.pageRt=obj;
    cb(obj);
}

function setType (_id){
    var menuItems=document.getElementsByClassName('li-menu-qa'),
        ndx;

    _id=_id || 247;

    for (var i=0,len=menus.length; i<len; i++){
        if (menus[i].type == _id) {
            ttype=menus[i].type;
            tname=menus[i].name;
            ndx=i;
        }
    }

    ndx= ndx || 0;

    $._exFn.addCurCls(menuItems[ndx],'li-menu-qa','cur-menu-qa');
}

function listRoute(_id){
    setType(_id);
    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: 1,
        type: ttype
    }, renderMain);
}

function articleRoute(_id){
    tid=_id;
    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_view.php', {
        tid: _id
    }, renderArticle)
}


//main view
function renderMenu (data){
    // var data=JSON.parse(req.responseText).data;
    var content=document.getElementById('qaMenu');
    var list='<ul class="l-menu-qa">';
    var items;

    menus=data;

    for (var i=0,len=menus.length; i<len; i++) list+='<li class="li-menu-qa" type-id="'+menus[i].type+'"><a href="http://faq.wan.liebao.cn/#!/list/'+menus[i].type+'"><span class="dotted-menu-qa"></span>'+menus[i].name+'</a></li>';
    list+='</ul>';
    content.innerHTML=list;

    items=document.getElementsByClassName('li-menu-qa');

    spaRouter( function(opt){
        var page=opt.page,
            _id=opt._id;

        switch (page){
            case 'list':
                listRoute(_id);
                break;
            case 'article':
                articleRoute(_id);
                break;
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
        curpage=res.page_current,
        title=document.getElementById('qaSubtitle');

    title.innerText=tname;

    if (ttype==247) tags=games;

    if( ret==1 || ret==0){
        ttype!=257 && ttype!=258 && ttype!=259 && ttype!=260 && ttype!=261 && ttype!=262 && ttype!=287 ? renderTags(tags) : renderTags(null);
        renderList(questions);
        renderPageNation(count,'qaMain', {
            action: 'http://b.liebao.cn/api/faq_list.php',
            p :{
                action: 'list',
                type: ttype
            },
            cb :renderMain,
            curpage: curpage
        });
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
    for (var i=0,len=games.length; i<len; i++){
        games[i].cid == tgid ? exList+='<li gid="'+games[i].cid+'" class="li-tags-qa cur-tags-qa">'+games[i].name+'</li>' : exList+='<li gid="'+games[i].cid+'" class="li-tags-qa">'+games[i].name+'</li>';
    }
    exList+='</ul>';

    content.style.display='block';
    content.innerHTML=exList;

    items=document.getElementsByClassName('li-tags-qa');
    $._exFn.bindEvt(items,'click', switchTag);
}

function renderList (questions){
    var content=document.getElementById('qaContent'),
        list='<ul class="l-questions-qa">';

    if (!questions || questions.length==0) {
        content.innerHTML='';
        return false;
    }


    for (var i=0,len=questions.length; i<len; i++) {
        i==len-1 ? list+='<li class="li-questions-qa lst-questions-qa"><a href="http://faq.wan.liebao.cn/#!/article/'+questions[i].tid+'">'+questions[i].title+'</a></li>' :list+='<li class="li-questions-qa"><a href="http://faq.wan.liebao.cn/#!/article/'+questions[i].tid+'">'+questions[i].title+'</a></li>';
    }
    list+='</ul>';

    content.innerHTML=list;
}

function renderPageNation (count, rootNodeId, opt){
    var p= new P(count, rootNodeId, opt);
    p.renderUI();
}


//main evts
function switchStatus (){
    $._exFn.addCurCls(this,'li-menu-qa','cur-menu-qa');

    tname=this.innerText;
    ttype=this.getAttribute('type-id');
    tgid=247;
    // if(ttype=='247' && tgid!='247') ttype=tgid;

    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: 1,
        type: ttype
    }, renderMain);
}
function switchTag (){
    $._exFn.addCurCls(this,'li-tags-qa','cur-tags-qa');

    tgid=this.getAttribute('gid') || '247';
    ttype=this.getAttribute('gid') || '247';

    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: 1,
        type: tgid
    }, renderMain);
}


//article view
function renderArticle (res){
    var content=document.getElementById('qaContent'),
        typeTitle=document.getElementById('qaSubtitle'),
        tagContent=document.getElementById('tagContent'),
        pagination=document.getElementById('qaPagination'),
        title='<h2 class="title-article-qa">'+res.data.title+'</h2>',
        main='<div id="content" class="content-article-qa">'+res.data.content+'</div>',
        feedback='<div id="qaFeedback" class="feedback-article-qa">',
        fbItems;


    feedback+='<div class="top-feedback-qa"><p class="text-feedback-qa">您觉得这篇文章有帮助吗？</p><ul class="l-feedback-qa"><li class="li-feedback-qa">是</li><li class="li-feedback-qa">否</li></ul></div>';
    feedback+='<div class="btm-feedback-qa">若未解决您的问题，您还可以咨询<a class="customer-feedback-qa" href="http://wan.liebao.cn/action/redirect_kf.php" target="_blank">在线客服</a></div></div>';

    tagContent.style.display='none';
    if(pagination!=undefined) pagination.style.display='none';
    setType(res.data.type);

    typeTitle.innerText=tname;
    content.innerHTML=title+main+feedback;

    window.uParse('#content', {
        rootPath: 'http://x.wan.liebao.cn/ueditor/'
    });
    loadContentImgScript();

    fbItems=document.getElementsByClassName('li-feedback-qa');
    $._exFn.bindEvt(fbItems,'click',function(e){
        var disabled=$._exFn.hasClass(this, 'disable-feedback-qa'),
            msg=this.innerText,
            tar=e.target || e.srcElement;


        if(disabled) return;

        sendMsg(msg,tar);
    });

    function sendMsg(msg, tar){
        $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_view.php', {
            action: 'feedback',
            tid: tid,
            message: msg
        }, function(res){
            // if (res.code==1) document.getElementById('qaFeedback').style.display='none';
            var fbItems=document.getElementsByClassName('li-feedback-qa');
            if (res.code==1) {
                $._exFn.addClass(tar, 'clicked-feedback-qa');
                for (var i=0,len=fbItems.length; i<len; i++) $._exFn.addClass(fbItems[i], 'disable-feedback-qa')
            }
        });
    }
}
function loadContentImgScript (){
    // var head= document.head || document.getElementsByTagName('head')[0],
    //     s=document.createElement('script');
    //
    // s.id='imgStyleScript';
    // s.src='http://b.liebao.cn/script/imagecontrol.js';
    // if(document.getElementById('imgStyleScript')==undefined) head.appendChild(s);
    var imgMaxWidth=680;
    var content = document.getElementById("content");
    ImgLoad(content);
    function ImgLoad(obj) {
        for(var i=0;i<obj.getElementsByTagName("img").length;i++){
            var o=obj.getElementsByTagName("img")[i];
            if (o.width>imgMaxWidth){
                if (o.style.width){
                    o.style.width="";
                }
                o.width=imgMaxWidth;
                o.removeAttribute("height");
                o.setAttribute("title","ctrl+榧犳爣婊氳疆缂╂斁");
                o.style.cursor="hand";
                o.style.display="block";
                o.vspace=5;
                o.resized=1;
                o.onclick=ImgClick;
                o.onmousewheel=bbimg;
            }
        }
    }

    function ImgClick() {
        if (this.parentElement){
            if (this.parentElement.tagName!="A"){
                window.open(this.src);
            }
        }else{
            window.open(this.src);
        }
    }

    function bbimg() {
        if (event.ctrlKey){
            var zoom=parseInt(this.style.zoom, 10)||100;
            zoom+=event.wheelDelta/12;
            if (zoom>0) this.style.zoom=zoom+'%';
            return false;
        }else{
            return true;
        }
    }
}

//search
window.submitSearch= function (e){
    e.preventDefault ?  e.preventDefault() : e.returnValue = false;

    var ipt=document.getElementById('qaSearchIpt'),
        v=ipt.value;

    fetchSearch(v);
};

function fetchSearch (v){
    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action:'search',
        kw: v,
        page: 1
    }, renderResult);
}
function renderResult (res){
    var ret=res.code,
        count=res.count,
        curpage=res.page_current,
        items=res.data.items,
        kw=res.data.kw,
        tTitle=document.getElementById('qaSubtitle'),
        content=document.getElementById('qaContent'),
        tagContent=document.getElementById('tagContent'),
        list='<ul class="l-search-qa">',
        countTitle='<h3 class="title-res-qa">共搜索到<span class="count-res-qa">'+count+'</span>条搜索结果</h3>',
        title,summary,itemCls;

    if(ret==0) {
        content.innerHTML=countTitle;
    }

    if (ret==1) {
        for (var i=0,len=items.length; i<len; i++){
            summary=decodeURIComponent(items[i].summary) .replace(/(\s+)|(&emsp;)/g,'') .replace(new RegExp(kw,'g'), '<span class="kw-search-qa">'+kw+'</span>');
            title=items[i].title.replace(new RegExp(kw,'g'), '<span class="kw-search-qa">'+kw+'</span>');

            i==len-1 ? itemCls='li-search-qa lst-search-qa' : itemCls='li-search-qa';
            list+='<li class="'+itemCls+'"><h3 class="title-search-qa"><a class="link-title-articles" href="http://faq.wan.liebao.cn/#!/article/'+items[i].tid+'">'+title+'</a></h3><div class="text-search-qa"><a href="http://faq.wan.liebao.cn/#!/article/'+items[i].tid+'">'+summary+'</a></div></li>';
        }
        list+='</ul>';

        content.innerHTML=countTitle+list;

        bindSearchEvts();

        renderPageNation(count,'qaMain', {
            action: 'http://b.liebao.cn/api/faq_list.php',
            p :{
                action: 'search',
                kw: kw
            },
            cb :renderResult,
            curpage: curpage
        });
    }
    closeAuto();
    tagContent.style.display='none';
    tTitle.innerText='搜索结果';
}

function bindSearchEvts (){
    var articleLink= document.getElementsByClassName('link-title-articles');
    $._exFn.bindEvt(articleLink, 'click', function(e){
        articleRoute(document.location.hash.split('/')[2]);
    });
}

//autoComplete
$._exFn.bindEvt(searchIpt, 'focus', function(e){
    var ipt=this,
        v=ipt.value;

    if(!v){
        closeAuto();
        return;
    }

    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'association',
        kw: v
    }, renderAuto);
});

$._exFn.bindEvt(searchIpt, 'keyup', function(e){
    var ipt=this,
        v=ipt.value,
        kc=e.keyCode;

    if(!v){
        closeAuto();
        return;
    }

    if (kc=='13'||kc=='175'||kc=='174'||kc=='179'||kc=='173'||kc=='172'||kc=='180'||kc=='171'||kc=='9'||kc=='16'||kc=='17'||kc=='18'||kc=='20'||kc=='12'||kc=='27' ||kc=='33'||kc=='34'||kc=='35'||kc=='36'||kc=='37'||kc=='38'||kc=='39'||kc=='40'||kc=='45'||kc=='46'||kc=='144'||kc=='112'||kc=='113'||kc=='114'||kc=='115'||kc=='116'||kc=='117'||kc=='118'||kc=='119'||kc=='120'||kc=='121'||kc=='122'||kc=='123') return;
    // if (kc=='13'||kc=='175'||kc=='174'||kc=='179'||kc=='173'||kc=='172'||kc=='180'||kc=='171'||kc=='9'||kc=='16'||kc=='17'||kc=='18'||kc=='20'||kc=='12'||kc=='27'||kc=='32'||kc=='33'||kc=='34'||kc=='35'||kc=='36'||kc=='37'||kc=='38'||kc=='39'||kc=='40'||kc=='45'||kc=='46'||kc=='144'||kc=='112'||kc=='113'||kc=='114'||kc=='115'||kc=='116'||kc=='117'||kc=='118'||kc=='119'||kc=='120'||kc=='121'||kc=='122'||kc=='123') return;

    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'association',
        kw: v
    }, renderAuto);
});
function renderAuto (res){
    var ret=res.code,
        items=res.data.items,
        kw=res.data.kw,
        pNode=document.getElementById('qaSearchForm'),
        content= document.getElementById('qaAuto') || document.createElement('div'),
        list='<ul class="l-auto-kup">',
        itemTxt;
    if(ret==0){
        closeAuto();
        return;
    }
    if (ret!=1) return;

    content.id='qaAuto';
    content.className='auto-qa';
    for (var i=0,len=items.length; i<len; i++){

        itemTxt=items[i].replace(new RegExp(kw,'g'), '<span class="kw-auto-qa">'+kw+'</span>');

        list+='<li class="li-auto-kup">'+itemTxt+'</li>';
    }
    list+='</ul>';

    // console.log(res);
    // console.log(list);

    content.innerHTML=list;

    if (document.getElementById('qaAuto')==undefined) pNode.appendChild(content);
    content.style.display='block';

    setAutoItemEvts();
}
function setAutoItemEvts (){
    var autoItems=document.getElementsByClassName('li-auto-kup');

    $._exFn.bindEvt(autoItems, 'mouseover', function(e){
        $._exFn.addCurCls(this, 'li-auto-kup', 'hover-auto-kup');
    });
    $._exFn.bindEvt(autoItems, 'click', function(e){
        var v=this.innerText;
        searchIpt.value=v;
        fetchSearch(v);
        closeAuto();
    });
}
function closeAuto () {
    var searchForm=document.getElementById('qaSearchForm'),
        qaAuto=document.getElementById('qaAuto');

    if (qaAuto!=undefined){
        qaAuto.style.display='none';
        searchForm.removeChild(qaAuto);
    }
}


//hashchange
$._exFn.bindEvt(window,'hashchange', function(){
    spaRouter(function(opt){
        if(opt.page=='list' ){
            // var _id= opt._id;
            // console.log('hash change');
            // var _id=ttype || opt._id;
            // console.log('..');
            // console.log(ttype);
            // console.log(opt._id);
            // ttype!=257 && ttype!=258 && ttype!=259 && ttype!=260 && ttype!=261 && ttype!=262 && ttype!=287
            // opt._id!=257 && opt._id!=258 && opt._id!=259 && opt._id!=260 && opt._id!=261 && opt._id!=262 && opt._id!=287 ? _id=ttype || opt._id : _id= opt._id;
            listRoute(opt._id);
        }
        if(opt.page=='article' ){
            articleRoute(opt._id);
        }
    });
});

$._exFn.bindEvt(document,'click', function(e){
    var appv=window.navigator.appVersion,
        sIpt=document.getElementById('qaSearchIpt'),
        autoBox=document.getElementById('qaAuto'),
        tar=e.target || e.srcElement;

    if (tar!=sIpt && tar!=autoBox) closeAuto();

    if(appv.indexOf('MSIE 7')===-1 && appv.indexOf('MSIE 6')===-1) return;

    spaRouter(function(opt){
        var origin=document.location.hash;

        window.setTimeout(function(){
            var cur=document.location.hash;
            var page=document.location.hash.split('/')[1];

            if(origin==cur) return;
            if(page=='list' ){
                listRoute(document.location.hash.split('/')[2]);
            }
            if(page=='article' ){
                articleRoute(document.location.hash.split('/')[2]);
            }
        },500);
    });
});

/*
var originHash= document.location.hash;
function hashChangeFire (){
    spaRouter(function(opt){
        console.log('................');
        if(opt.page=='list' ){
            listRoute(opt._id);
        }
        if(opt.page=='article' ){
            articleRoute(opt._id);
        }
    });
}
setInterval(function() {
    var appv= window.navigator.appVersion;
    var curHash= document.location.hash;
    if(appv.indexOf('MSIE 7')===-1 && appv.indexOf('MSIE 6')===-1) return;

    console.log();
    console.log();
    if(originHash!=curHash) {
        hashChangeFire();
        originHash=curHash;
    }
}, 150);
*/