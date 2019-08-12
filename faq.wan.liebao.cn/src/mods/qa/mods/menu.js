$._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
    action:'menu'
}, function(m){

});

function renderMenu (m, typeid){
    var items=null;

    //view
    var content=document.getElementById('qaMenu');
    var tpl='<ul class="l-menu-qa">';

    for (var i=0,len=m.length; i<len; i++) tpl+='<li class="li-menu-qa" type-id="'+m[i].type+'">'+m[i].name+'</li>';
    tpl+='</ul>';
    content.innerHTML=tpl;

    //status
    items=document.getElementsByClassName('li-menu-qa');
    $._exFn.addCurCls(items[ndx],'li-menu-qa','cur-menu-qa');

    //evts
    $._exFn.bindEvt(items,'click', function(){
        var t=this.getAttribute('type-id'),
            n=this.innerText;

        setStatus(t, n);

        $._exFn.addCurCls(this,'li-menu-qa','cur-menu-qa');
    });
}

function isExist (typeId, m) {
    var exist=false;
    for (var i=0,len=m.length; i<len; i++){
        if (m[i].cid==typeId) exist=m[i].cid;
    }
    return exist;
}

function setStatus (t, n){
    this.typeId=t;
    this.name=n;

    fetchList(t, 1);
}


function fetchList (t, page){
    $._XMLHttp.sendJsonp('http://b.liebao.cn/api/faq_list.php', {
        action: 'list',
        page: page,
        type: t
    }, function(){});
}