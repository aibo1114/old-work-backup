(function(){
    //var ua = navigator.userAgent.toLowerCase();
    //var rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
    //var match = rMsie.exec(ua);


    var tabs=document.getElementById('tabList').children || childNode;
    var contents=document.getElementById('tabContents').children || childNode;
    var cfgBtn=document.getElementById('cfgBtn');
    var starBtn=document.getElementById('starBtn');
    var btnList=document.getElementById('btnList');
    var toggleBtn=document.getElementById('toggleBtn');
    var closeBtn=document.getElementById('closeBtn');

    var mainMission=document.getElementById('mainMission');
    var viceMission=document.getElementById('viceMission');
    var prize=document.getElementById('prize');
    var star=document.getElementById('star');

    var initObj=  callCApi("initassist"),initRet,hasCfg,isRun=0,cfg=null;

    //alert('用户代理:  '+ua);
    //if (match!=null) {
    //    var uaObj={ browser : "IE", version : match[2] || "0" };
    //    alert('browser: '+uaObj.browser);
    //    alert('version: '+uaObj.version);
    //}


    if (initObj){
        initRet=initObj.isSuccess;
        hasCfg=initObj.hasConfig;
        isRun=initObj.isRun;
    }

    if(initRet==1 && hasCfg==1){
        // cfg=JSON.parse( initObj.data);
        cfg=initObj.data;

        setInit(cfg);
        runStyle(isRun);
        runtime(isRun);
    }

    _bindEvt(tabs, 'click', function(){
        var ndx=_getNdx(tabs,this);
        tabs.removeClass('current-tab-aide');
        this.addClass('current-tab-aide');
        contents._toggle(ndx);
    });
    _bindEvt(cfgBtn, 'click', function(){
        tabs[1].click();
    });

    _bindEvt(starBtn, 'click', function(){
        var mV=mainMission.checked;
        var vV=viceMission.checked;
        if(!mV && !vV) {
            alert('请至少选择一个任务线');
            return false;
        }
        isRun=1;
        runStyle(isRun);
        startAbc();
    });

    _bindEvt(toggleBtn, 'click', function(){
        var ret;
        // alert(isRun);
        isRun==1 ? ret=callCApi('assistsuspend') : ret=callCApi('assistcontinue');
        if (ret.isSuccess){
            isRun == 1 ? isRun=2 : isRun=1;
            runStyle(isRun);
        }
    });
    _bindEvt(closeBtn, 'click', function(){
        var ret=callCApi('assiststop');
        if(ret.isSuccess){
            isRun =0;
            runtime(isRun);
            runStyle(isRun);
        }
    });


    function setInit (cfg){

        var mV=cfg.autozx;
        var vV=cfg.autocm;
        var pV=cfg.cmdata.bsnum;
        var sV=cfg.cmdata.xj;

        runStyle(isRun);

        mainMission.checked=mV;
        viceMission.checked=vV;

        _setSlc('prize',pV);
        _setSlc('star',sV);
    }
    function runStyle (isRun){
        switch (isRun){
            case 0:
                btnList.style.display='none';
                starBtn.style.display='block';
                break;
            case 1:
                starBtn.style.display='none';
                btnList.style.display='block';
                toggleBtn.innerHTML='暂停';
                break;
            case 2:
                starBtn.style.display='none';
                btnList.style.display='block';
                toggleBtn.innerHTML='继续';
                break;
            default:
                break;
        }
    }
    function runtime(ing){
        if (ing){
            mainMission.disabled=true;
            viceMission.disabled=true;
            prize.disabled=true;
            star.disabled=true;
        }else{
            mainMission.disabled=false;
            viceMission.disabled=false;
            prize.disabled=false;
            star.disabled=false;
        }
    }

    function startAbc (){
        var mV=mainMission.checked;
        var vV=viceMission.checked;
        var pV=prize._getSelected().value;
        var sV=star._getSelected().value;

        mV ? mV=1 : mV=0;
        vV ? vV=1 : vV=0;

        var obj={
            autozx:mV,
            autocm:vV,
            cmdata: {
                bsnum:pV,
                xj:sV
            }
        };
        var strP=JSON.stringify(obj);

        var res=callCApi("assiststart",strP );
        if(res.isSuccess==1) runtime(true);
    }
})();

// var tabs=document.querySelectorAll('.li-tab-aide');
// var contents=document.querySelectorAll('.content-tab-aide');


// console.log( contents instanceof NodeList);
// console.log( contents instanceof HTMLCollection);
// console.log( contents instanceof NamedNodeMap);

//var aide = strToJson( window.external.call("kieframe", "initassist", "") );
//alert(aide.isSuccess);