var _tools=require('./tools');
var hex_md5=require('./md5');
var style=require('./main.css');

_tools.createStyleSheet(style);

window.WLogin=function (hasMask){
    //view
    this.hasMask=hasMask;
    this.hd= function(_title){ return '<div class="hd-window-wl"><span class="fork-window-wl deny-window-wl">X</span><h3 id="wlTitle" class="title-window-wl">'+_title+'</h3></div>'};
    this.notice= '<h4 class="tip-window-wl">为了您的账号安全，微信账号需要绑定已有页游账号进行游戏</h4>';
    this.errtip= '<p id="wlErrTip" class="errtip-window-wl"></p>';

    this.tipClose= '<span class="fork-window-wl close-window-wl">X</span>';
    this.denyTxt= '<p class="txt-deny-wl">为了您的账号安全，请绑定页游账号如不绑定则后续无法继续绑定其他已有页游账号。</p>';
    this.failTitle= '<h3 class="title-fail-wl">绑定失败</h3>';
    this.failTxt= '<p class="txt-fail-wl">该账号已经绑定其他微信账号，<br />建议您返回后重新绑定其他账号。</p>';
    this.playedTitle= '<h3 class="title-fail-wl">提示</h3>';
    this.playedTxt= '<p class="txt-played-wl">检测到您当前微信下已有平台游戏账号，绑定后您将放弃微信下的游戏账号，<span class="txt-remind-wl">请慎重选择</span></p>';
    this.tipBtns= function(confirmTxt){
        var txt= confirmTxt || '返回绑定';
        var btns='<ul class="l-btn-wltip">';

        confirmTxt ? btns+='<li id="tipPlayedBtn" class="li-btn-wltip back-btn-wltip">'+txt+'</li>' : btns+='<li id="tipBackBtn" class="li-btn-wltip back-btn-wltip">'+txt+'</li>';
        btns+='<li class="li-btn-wltip close-btn-wltip close-window-wl">不绑定，直接登录</li></ul>';
        return btns;
    };

    this.errs={
        'passport': {
            'len': '账号长度为5-18位，请重新输入',
            'underscore': '账号不能以下划线开头',
            'union': '账号必须为字母、数字或下划线组成',
            'diswords': '账号包含非法字符，请重新输入',
            'exist': '账号已存在',
            'recommend': function (pp) { return '，推荐使用'+pp; }
        },
        'password': {
            'tip': '由数字、字母、特殊字符组成且8-16位',
            'len': '长度为8-16个字符',
            'err': '必须包含字母、数字、符号中至少2种',
            'repeat': '请勿使用与您账号名称相似的密码'
        },
        'repassword': {
            'tip': '再次输入登陆密码',
            'len': '再次输入登陆密码',
            'short': '长度为8-16个字符',
            'err': '必须包含字母、数字、符号中至少2种',
            'dislike': '两次输入密码不一致，请重新输入'
        },
        'realname': {
            'tip': '请输入您的姓名',
            'len': '姓名不能为空',
            'ch': '姓名只能为中文'
        },
        'idcard': {
            'tip': '请输入您的身份证号',
            0: '身份证格式正确',
            1: '身份证号码位数不对',
            2: '身份证号码出生日期超出范围或含有非法字符',
            3: '身份证号码校验错误',
            4: '身份证地区非法'
        }

    };

    this.getUid=function(){
        var ks_user,uid;
        window.self === window.top ? ks_user=window.ks_user : ks_user=window.top.ks_user;
        ks_user ? uid=ks_user.uid : uid=false;
        return uid;
    };
    this.closedBind=function(){
        var uid=this.getUid();
        return uid ? _tools.getCookie('closeWcbind'+uid)==='1' : false;
    };

    this.accountCheck=false;
    this.passwordCheck=false;
    this.rePsdCheck=false;
    this.realNameCheck=false;
    this.idCardCheck=false;
    this.codeCheck=false;

    this.createRoot=function(){
        var rootNode=document.createElement('div');

        rootNode.id= 'wlWindow';
        rootNode.className= 'window-wl';

        return rootNode;
    };
    this.createMask=function(){
        var mask=document.createElement('div');
        mask.id='wlMask';
        mask.className='mask-window-wl';
        mask.style.height=setH()+'px';

        return mask;

        function setH (){
            var h=Math.max(document.body.scrollHeight, document.documentElement.clientHeight);
            return h;
        }
    };

    this.createList= function(type){
        var list=document.createElement('ul');
        list.className= 'l-form-wl';

        if(type === 'login'){
            list.appendChild( createItem('text', 'wlAccount', '用户名', '用户名/邮箱/手机') );
            list.appendChild( createItem('password', 'wlPassword', '密码', '请输入登录密码') );
            list.appendChild( createItem('text', 'wlVerify', '验证码', '请输入验证码', '<div id="wlVerified" class="verified-li-wl"></div>', 'li-smipt-wl') );
            return list;
        }
        if(type === 'register'){
            list.appendChild( createItem('text', 'wlAccount', '用户名', '请输入用户账号', '<p id="accountErr" class="err-form-wl"></p>', 'pb25') );
            list.appendChild( createItem('password', 'wlPassword', '设置密码', '请输入密码', '<p id="passwordErr" class="err-form-wl"></p>', 'pb25') );
            list.appendChild( createItem('password', 'wlRePwd', '确认密码', '再次输入密码', '<p id="rePsdErr" class="err-form-wl"></p>', 'pb25') );
            list.appendChild( createItem('text', 'wlVerify', '验证码', '请输入验证码', '<div id="wlVerified" class="verified-li-wl"></div><p id="codeErr" class="err-form-wl"></p>', 'li-smipt-wl pb25') );
            list.appendChild( createItem('text', 'wlName', '姓名', '请输入真实姓名', '<p id="nameErr" class="err-form-wl"></p>', 'pb25') );
            list.appendChild( createItem('text', 'wlIdentity', '身份证号', '请输入身份证号码', '<p id="idCardErr" class="err-form-wl"></p>', 'pb25') );
            return list;
        }

        function createItem (type, code, label, plc, others, cls){
            var item= document.createElement('li'),
                addNode= others || '',
                addCls= cls || '',
                content='<label for="'+code+'">'+label+'</label><input type="'+type+'" id="'+code+'" name="'+code+'" placeholder="'+plc+'" class="ipt-form-wl" />'+addNode;

            item.className= 'li-form-wl '+addCls;
            item.innerHTML= content;

            return item;
        }
    };
    this.createLinks= function(){
        var content=document.createElement('div');
        var hmlTxt='<a class="forget-links-wl" href="http://i.ijinshan.com/forget?act=forget" target="_blank">忘记密码?</a><span class="deny-links-wl deny-window-wl">暂不绑定</span>';

        content.className='links-form-wl';
        content.innerHTML=hmlTxt;

        return content;
    };
    this.createBtn= function(type){
        var content=document.createElement('div');
        var btn='<button id="wlBtn" class="btn-window-wl">登录并绑定</button>';
        var contentCls='content-btn-wl';

        // if(type=='login') btn+='<a class="link-tencent-wl" href="javascript:qqLogin(\'webgameqq\');">tencent</a>';
        if(type === 'register') contentCls+=' register-btn-wl';

        content.id='wlBtnContent';
        content.className=contentCls;
        content.innerHTML=btn;

        return content;
    };
    this.createForm= function(type){
        var form= document.createElement('form'),
            list=this.createList(type),
            btn=this.createBtn(type),
            links=this.createLinks();

        form.id= 'wlForm';
        form.className= 'form-window-wl';

        form.appendChild(list);
        if(type === 'login') form.appendChild(links);
        form.appendChild(btn);

        return form;
    };
    this.getVerify=function(){
        var r=Math.random();
        _tools.sendJsonp('http://api.wan.liebao.cn/code/1/get?', null, function(res){
            if (res.ret !== 1) return;
            var container=document.getElementById('wlVerified');
            var img='<img src="'+res.data.url+'" />';
            container.innerHTML=img;
        });
    };
    this.createFooter= function(type){
        var content=document.createElement('div'),
            hmlTxt='<p class="tip-regis-wl">如果您没有金山猎豹页游账号</p>';

        content.id='wlFt';
        content.className='ft-window-fl';

        type === 'login' ? hmlTxt+='<p id="wlToRegister" class="aisle-regis-wl">注册新账号</p>' : hmlTxt+='<p id="wlToLogin" class="aisle-login-wl">返回绑定已有账号</p>';
        content.innerHTML=hmlTxt;

        return content;
    };
    this.renderUI=function (type, title){
        var rootNode= this.createRoot();
        var mask= this.createMask();
        var body= document.getElementsByTagName('body')[0];
        var formNode=this.createForm(type);
        var footerNode=this.createFooter(type);
        var _hasMask= document.getElementById('wlMask') != undefined;

        rootNode.innerHTML=this.hd(title)+this.notice+this.errtip;
        rootNode.appendChild(formNode);
        rootNode.appendChild(footerNode);

        if(this.hasMask && !_hasMask) body.appendChild(mask);
        body.appendChild(rootNode);
    };

    this.renderLogin=function(err){
        var closedBind=this.closedBind();
        if(closedBind) return;

        this.renderUI('login','绑定金山猎豹页游账号');
        this.getVerify();
        this.bindLoginEvts();

        if(err) this.errTxt('wlErrTip', err);
    };
    this.renderRegister=function(err){
        var closedBind=this.closedBind();
        if(closedBind) return;

        this.renderUI('register','注册金山猎豹页游账号');
        this.getVerify();
        this.bindRegisterEvts();

        if(err) this.errTxt('wlErrTip', err);
    };
    this.renderTip=function(type, cb){
        var closedBind=this.closedBind();
        if(closedBind) return;

        var body= document.getElementsByTagName('body')[0];
        var rootNode= this.createRoot();
        var hmlTxt= this.tipClose;

        switch (type) {
            case false :
                hmlTxt+=(this.failTitle+this.failTxt);
                break;
            case 'deny' :
                hmlTxt+=this.denyTxt;
                break;
            case 'played' :
                hmlTxt+=(this.playedTitle+this.playedTxt);
                break;
            default :
                hmlTxt+=(this.failTitle+this.failTxt);
        }
        // type === 'deny' ? hmlTxt+=this.denyTxt : hmlTxt+=(this.failTitle+this.failTxt);

        type === 'played' ? hmlTxt+= this.tipBtns('绑定') : hmlTxt+= this.tipBtns();
        // hmlTxt+= this.tipBtns();

        rootNode.innerHTML=hmlTxt;
        body.appendChild(rootNode);

        cb ? this.bindTipEvts(cb) : this.bindTipEvts();
    };

    this.removeWindow=function(rmMask){
        var body=document.getElementsByTagName('body')[0];
        var container=document.getElementById('wlWindow');
        var mask=document.getElementById('wlMask');

        body.removeChild(container);
        if(rmMask) body.removeChild(mask);
    };

    //evts
    this.bindEvts=function(cb){
        var that=this;
        var wlVerified=document.getElementById('wlVerified');
        var denyBtns=document.getElementsByClassName('deny-window-wl');
        var formIpt=document.getElementsByClassName('ipt-form-wl');
        _tools.bindEvt(wlVerified,'click',function(e){
            that.getVerify();
        });
        _tools.bindEvt(denyBtns,'click',function(e){
            that.removeWindow();
            that.renderTip('deny');
        });
        _tools.bindEvt(formIpt,'focus',function(e){
            var cls=this.className;
            cls+=' focus-form-wl';
            this.className=cls;
        });
        _tools.bindEvt(formIpt,'blur',function(e){
            var cls=this.className;
            if (this.className.indexOf('focus-form-wl')!==-1) cls=cls.replace(' focus-form-wl','');
            this.className=cls;
        });
    };
    this.bindLoginEvts=function(){
        var that=this;
        var toRegister=document.getElementById('wlToRegister');
        var submitBtn=document.getElementById('wlBtn');

        _tools.bindEvt(toRegister,'click',function(e){
            that.removeWindow();
            that.renderRegister();
        });
        _tools.bindEvt(submitBtn, 'click', function(e){
            e.preventDefault ?  e.preventDefault() : e.returnValue = false;

            this.disabled= true;
            that.sendLoginBind();
        });

        this.bindEvts();
    };
    this.bindRegisterEvts=function(){
        var that=this;
        var toLogin=document.getElementById('wlToLogin');
        var account=document.getElementById('wlAccount');
        var password=document.getElementById('wlPassword');
        var rePsd=document.getElementById('wlRePwd');
        var realName=document.getElementById('wlName');
        var idCard=document.getElementById('wlIdentity');
        var codeBtn=document.getElementById('wlVerify');
        var submitBtn=document.getElementById('wlBtn');

        _tools.bindEvt(toLogin,'click', function(e){
            that.removeWindow();
            that.renderLogin();
        });
        _tools.bindEvt(account, 'blur', function(e){
            that.checkPassport();
        });
        _tools.bindEvt(password, 'blur', function(e){
            that.passwordCheck= that.checkPassword();
        });
        _tools.bindEvt(rePsd, 'blur', function(e){
            that.rePsdCheck= that.checkRepassword();
        });
        _tools.bindEvt(realName, 'blur', function(e){
            that.realNameCheck= that.checkRealName();
        });
        _tools.bindEvt(idCard, 'blur', function(e){
            that.idCardCheck= that.checkIdCard();
        });
        _tools.bindEvt(codeBtn, 'blur', function(e){
            that.codeCheck= that.checkCode();
        });
        _tools.bindEvt(submitBtn,'click',function(e){
            e.preventDefault ?  e.preventDefault() : e.returnValue = false;
            this.disabled= true;
            that.sendRegisterBind();
        });

        this.bindEvts();
    };
    this.bindTipEvts=function(cb){
        var that=this;
        var close= document.getElementsByClassName('close-window-wl');
        var back= document.getElementById('tipBackBtn');
        var sendBind= document.getElementById('tipPlayedBtn');

        _tools.bindEvt(close,'click',function(e){
            var uid=that.getUid();
            // e.preventDefault ?  e.preventDefault() : e.returnValue = false;
            if(uid) _tools.setCookie('closeWcbind'+uid, '1', 365);
            that.removeWindow(true);
        });
        if (back){
            _tools.bindEvt(back,'click',function(e){
                that.removeWindow();
                that.renderLogin();
            });
        }
        if (sendBind){
            _tools.bindEvt(sendBind,'click',function(e){
                if(cb) cb();
            });
        }
    };

    this.loginRequest= function (ctx, opt, inTip){
        _tools.sendJsonp('http://api.wan.liebao.cn/account/1/wx/pgloginbind', {
            username: opt.u,
            password: opt.p,
            code: opt.v,
            service: opt.s
        }, function(res){
            var ret=res.ret;
            if (ret !== 1){
                if (!inTip){
                    ctx.getVerify();
                    ctx.errTxt('wlErrTip', res.msg);
                    opt.btn.disabled= false;
                }else{
                    ctx.removeWindow();
                    ctx.renderLogin(res.msg);
                }
            }else{
                window.location.href=res.goto;
            }
        });
    };

    this.registerRequest = function(ctx, opt, inTip){
        _tools.sendJsonp('http://api.wan.liebao.cn/account/1/wx/pgregisterbind',{
            username: opt.username,
            password: opt.password,
            code: opt.code,
            service: opt.s
        },function(res){
            var ret=res.ret;
            if (ret!=1){
                if(!inTip){
                    ctx.getVerify();
                    ctx.errTxt('wlErrTip', res.msg);
                    opt.btn.disabled= false;
                }else{
                    ctx.removeWindow();
                    ctx.renderRegister(res.msg);
                }
            }else{
                window.location.href=res.goto;
            }
        })
    };

    this.sendLoginBind=function(){
        var that=this;
        var played=window.ks_user.play_history;
        var u=document.getElementById('wlAccount').value;
        var p=hex_md5(document.getElementById('wlPassword').value);
        var v=document.getElementById('wlVerify').value.toLowerCase();
        var s= window.encodeURI('http://i.wan.liebao.cn/login?go=');
        var l= window.encodeURI(window.location.href);
        var btn=document.getElementById('wlBtn');
        var obj= {};
        s=s+l;

        obj.u=u;
        obj.p=p;
        obj.v=v;
        obj.s=s;
        obj.btn=btn;

        if (!u || !p || !v){
            that.errTxt('wlErrTip', '请填写完整的登录信息');
            btn.disabled= false;
            return;
        }
        if (played && played.length!==0){
            that.removeWindow();
            that.renderTip('played', function(){
                that.loginRequest(that, obj, true);
            });
            // btn.disabled= false;
            return;
        }

        this.loginRequest(that, obj);
    };
    this.sendRegisterBind=function(){
        var that=this;
        var played=window.ks_user.played;
        var username=document.getElementById('wlAccount').value;
        var password=hex_md5(document.getElementById('wlPassword').value);
        var code=document.getElementById('wlVerify').value.toLowerCase();
        var s=window.encodeURI('http://i.wan.liebao.cn/login?go=');
        var l=window.encodeURI(window.location.href);
        var realName=document.getElementById('wlName').value;
        var idCard=document.getElementById('wlIdentity').value;
        var btn=document.getElementById('wlBtn');
        var obj={};
        s=s+l;

        obj.username=username;
        obj.password=password;
        obj.code=code;
        obj.s=s;
        obj.btn=btn;

        if (!this.accountCheck || !this.passwordCheck || !this.rePsdCheck || !this.realNameCheck || !this.idCardCheck || !this.codeCheck) {
            btn.disabled= false;
            return;
        }

        if (played && played.length!==0){
            that.removeWindow();
            that.renderTip('played', function(){
                that.registerRequest(that, obj, true);
            });
            // btn.disabled= false;
            return;
        }

        this.registerRequest(that, obj);
    };



    //register check
    this.errTxt=function(nodeId, err){
        var errtip=document.getElementById(nodeId);
        errtip.innerText=err;
    };
    this.checkPassport=function(){
        var that=this;
        var passport=document.getElementById('wlAccount').value;
        var diswords = ['bjsupport', 'kingsoft', 'cb', 'ks', 'gm', 'test', 'fs', 'jx', 'db', 'cq', 'blog', 'passport', 'vip', 'wps', 'system', 'duba', 'ciba', 'xoyo', 'kol', 'shqz', 'hujintao', 'xijinping', 'wenjiabao', 'jiangzemin', 'zhurongji', 'qiubojun', 'leijun', 'xidada', 'kuanyi', 'kuannong', 'flg', 'falun', 'minghui', 'lihongzhi', 'tmd', 'nmd', 'fuck', 'sex', 'xxx', 'penis', 'viagra', 'tits', 'pussy', 'shit', 'damn', 'bastard', 'asshole', 'bitch', 'vagina', 'breast', 'root', 'admin', 'gm', 'gamemaster'];
        var reg = /^[a-zA-Z\d_]+$/;

        if (passport.length < 5 || passport.length > 18) {
            this.errTxt('accountErr', this.errs.passport.len);
            this.accountCheck=false;
            return;
        }
        if (passport.substr(0, 1) === "_") {
            this.errTxt('accountErr',this.errs.passport.underscore);
            this.accountCheck=false;
            return;
        }
        if (!reg.test(passport)) {
            this.errTxt('accountErr',this.errs.passport.union);
            this.accountCheck=false;
            return;
        }
        for (var i = 0; i < diswords.length; i++) {
            if (passport.toLowerCase().indexOf(diswords[i]) !== -1) {
                this.errTxt(this.errs.passport.diswords);
                this.accountCheck=false;
                return;
            }
        }
        _tools.sendJsonp('http://i.wan.liebao.cn/register/chk_u',{
            passport: passport
        }, function(res){
            var ret=res.code;
            switch (ret) {
                case -2:
                    res.data.recommend === '' ? that.errTxt('accountErr',that.errs.passport.exist) : that.errTxt('accountErr',that.errs.passport.exist+that.errs.passport.recommend(res.data.recommend));
                    that.accountCheck=false;
                    break;
                case 1:
                    that.errTxt('accountErr', '');
                    that.accountCheck= true;
                    break;
                default:
                    break
            }
        });
    };
    this.checkPassword=function(){
        var password=document.getElementById('wlPassword').value;
        var passport=document.getElementById('wlAccount').value;
        var rePwd=document.getElementById('wlRePwd').value;
        var pattern1 = /^(?=.*?[0-9])(?=.*?[^A-Za-z0-9])[A-Za-z0-9\W_]{8,16}$/;
        var pattern2 = /^(?=.*?[A-Za-z])(?=.*?[^A-Za-z0-9])[A-Za-z0-9\W_]{8,16}$/;
        var pattern3 = /^(?=.*?[A-Za-z])(?=.*?[0-9])[A-Za-z0-9\W_]{8,16}$/;
        if (password === '') {
            this.errTxt('passwordErr', this.errs.password.tip);
            return false;
        }
        if (password == passport) {
            this.errTxt('passwordErr', this.errs.password.repeat);
            return false;
        }
        if (password.length < 8 || password.length > 16) {
            this.errTxt('passwordErr', this.errs.password.len);
            return false;
        }
        if (!pattern1.test(password) && !pattern2.test(password) && !pattern3.test(password)) {
            this.errTxt('passwordErr', this.errs.password.err);
            return false;
        }
        this.errTxt('passwordErr', '');
        checked=true;

        if (password && rePwd) {
            if (password !== rePwd) {
                this.errTxt('rePsdErr', this.errs.repassword.dislike);
                return false;
            } else {
                this.errTxt('rePsdErr', '');
                return true;
            }
        }

        return true;
    };
    this.checkRepassword=function(){
        var rePwd=document.getElementById('wlRePwd').value;
        var password=document.getElementById('wlPassword').value;
        var pattern1 = /^(?=.*?[0-9])(?=.*?[^A-Za-z0-9])[A-Za-z0-9\W_]{8,16}$/;
        var pattern2 = /^(?=.*?[A-Za-z])(?=.*?[^A-Za-z0-9])[A-Za-z0-9\W_]{8,16}$/;
        var pattern3 = /^(?=.*?[A-Za-z])(?=.*?[0-9])[A-Za-z0-9\W_]{8,16}$/;

        if (rePwd === '') {
            this.errTxt('rePsdErr', this.errs.repassword.len);
            return false;
        }
        if (rePwd.length < 8 || rePwd.length > 16) {
            this.errTxt('rePsdErr', this.errs.repassword.short);
            return false;
        }
        if (!pattern1.test(rePwd) && !pattern2.test(rePwd) && !pattern3.test(rePwd)) {
            this.errTxt('rePsdErr', this.errs.repassword.err);
            return false;
        }
        if (password !== rePwd) {
            this.errTxt('rePsdErr', this.errs.repassword.dislike);
            return false;
        }

        this.errTxt('rePsdErr', '');
        return true;
    };
    this.checkRealName=function(){
        var realname=document.getElementById('wlName').value;
        var reg = /^[\u4e00-\u9fa5]+$/i;

        if (realname.length === 0) {
            this.errTxt('nameErr', this.errs.realname.len);
            return false;
        }
        if (!reg.test(realname)) {
            this.errTxt('nameErr', this.errs.realname.ch);
            return false;
        }

        this.errTxt('nameErr', '');
        return true;
    };
    this.checkIdCard=function(){
        var idCard=document.getElementById('wlIdentity').value;
        var ret = idCardTest(idCard);

        if (ret !== 0) {
            this.errTxt('idCardErr', this.errs.idcard[ret]);
            return false;
        }
        this.errTxt('idCardErr', '');
        return true;


        function idCardTest (idcard) {
            var area = {
                11: "北京",
                12: "天津",
                13: "河北",
                14: "山西",
                15: "内蒙古",
                21: "辽宁",
                22: "吉林",
                23: "黑龙江",
                31: "上海",
                32: "江苏",
                33: "浙江",
                34: "安徽",
                35: "福建",
                36: "江西",
                37: "山东",
                41: "河南",
                42: "湖北",
                43: "湖南",
                44: "广东",
                45: "广西",
                46: "海南",
                50: "重庆",
                51: "四川",
                52: "贵州",
                53: "云南",
                54: "西藏",
                61: "陕西",
                62: "甘肃",
                63: "青海",
                64: "宁夏",
                65: "xinjiang",
                71: "台湾",
                81: "香港",
                82: "澳门",
                91: "国外"
            };
            var idcard, Y, JYM;
            var S, M;
            var idcard_array = [];
            idcard_array = idcard.split("");
            if (area[parseInt(idcard.substr(0, 2))] === null)return 4;
            switch (idcard.length) {
                case 15:
                    if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/
                    } else {
                        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/
                    }
                    if (ereg.test(idcard))return 0; else return 2;
                    break;
                case 18:
                    if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                        ereg = /^[1-9][0-9]{5}(18|19|20)?\d{2}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/
                    } else {
                        ereg = /^[1-9][0-9]{5}(18|19|20)?\d{2}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/
                    }
                    if (ereg.test(idcard)) {
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10X98765432";
                        M = JYM.substr(Y, 1);
                        if (M === idcard_array[17])return 0; else return 3
                    } else {
                        return 2
                    }
                    break;
                default:
                    return 1;
                    break
            }
        }
    };
    this.checkCode=function(){
        var code=document.getElementById('wlVerify').value;

        if(!code) {
            this.errTxt('codeErr', '请填写验证码');
            return false;
        }
        this.errTxt('codeErr', '');
        return true;
    }
};
/*
_tools.sendJsonp('http://api.wan.liebao.cn/account/1/wx/pgloginbind', {
    username: u,
    password: p,
    code: v,
    service: s
}, function(res){
    var ret=res.ret;
    if (ret !== 1){
        that.getVerify();
        that.errTxt('wlErrTip', res.msg);
        btn.disabled= false;
    }else{
        window.location.href=res.goto;
    }
});


_tools.sendJsonp('http://api.wan.liebao.cn/account/1/wx/pgregisterbind',{
    username: username,
    password: password,
    code: code,
    service: s
},function(res){
    var ret=res.ret;
    if (ret!=1){
        that.getVerify();
        that.errTxt('wlErrTip', res.msg);
        btn.disabled= false;
    }else{
        window.location.href=res.goto;
    }
});
*/