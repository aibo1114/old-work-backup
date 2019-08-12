var aqlogin={
    init:function(){
        this.aqLogin=$('#aq-login');
        this.appendHtml();
        this.l = $('#login');
        this.cimg = $('#codebyImg',this.l);
        this.yl = $('#yl-login',this.l);
        this.verify = $('#identifyingcode',this.l);
        this.err = $('.login-error',this.l);
        this.err1 = $('.login-error1',this.l);
        this.username=$('#keymail',this.l);
        this.password=$('#password',this.l);
        
        this.bindEvent();//各种事件绑定函数执行
        this.changeCode();
    },
     destory:function(){
        $('#aq-login').html('');
        //location.reload();
    },
    bindEvent:function(){
        this.yl.on('click',function(e){
            if(e&&e.preventDefault){
                e.preventDefault();
            }else{
                window.event.returnValue = false; 
            }
            aqlogin.tryLogin();
        })
        this.cimg.on('click',function(){aqlogin.changeCode(true)})
        this.verify.on('keyup',function(){aqlogin.checkCode(true)})
        // this.verify.on('focus',function(){login.hideError1()})
        this.verify.on('focus',function(){aqlogin.hideError1()})
        this.username.on('keydown',function(){aqlogin.err.hide()})
        this.password.on('keydown',function(){aqlogin.err.hide()})
        this.verify.on('keydown',function(){aqlogin.err.hide()})
    },
    show:function(){
        this.l.show();
    },
    hide:function(){
        this.l.hide();
    },
    appendHtml:function(){
        
        var str='<div id="content">'+
                '<div class="con login-info" style="display: block;" id="login">'+
                '<p class="login-error" style="display: none;">用户名或密码错误</p>'+
                '<p class="login-error1" style="display: block;">验证码错误请重新输入</p>'+
                '<p class="loginInput common-input">'+
                '<span class="login_icon_user fl">账号</span>'+
                '<input id="keymail" name="username" type="text" autocomplete="off" class="fl" /><a class="login_delete info_del_1"></a></p>'+
                '<p class="loginInputPwd common-input">'+
                '<span class="login_icon_password fl">密码</span>'+
                '<input id="password" name="password"  type="password" autocomplete="false" class="fl hasFocus" /></p>'+
                '<p class="loginInputCode common-input-code ">'+
                '<span class="login_icon_code">验证码</span>'+
                ''+
                '<input id="identifyingcode" name="identifyingcode"  type="text" autocomplete="false" /></p>'+
                '<img src="http://xcaptcha2.ksmobile.com/images/116f846a4beb4ebb4aeb71c98ee38a78" alt="" class="codebyImg" id="codebyImg" />'+
                '<p class="rmline"><input type="checkbox" name="rm" id="rm" checked="checked" disabled="disabled"/>'+
                '<label for="rm" class="rm" id="rm">记住用户名</label><a href="http://user.anqu.com/webmember/checkname" target="_blank" class="fogbtn" hidefocus="true">忘记密码？</a></p>'+
                '<div style="clear:both"></div>'+
                '<p></p>'+
                '<p class="login-btn"><a href="javascript:void(0)" hidefocus="true" id="yl-login">登录</a></p>'+
                '</div>'
                
        this.aqLogin.append(str);
    },
    changeCode: function() {
        // 更换验证码
        $.ajax({
            url:baseUrl+'account/api/1/validimg',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    aqlogin.cimg.attr('src',data.data.img);
                    aqlogin.md5Code = data.data.codem;
                    // register.rimg.attr('src',data.data.url);
                    // register.md5Code=data.data.code;
                    aqlogin.hideError1();
                    aqlogin.verify.val('');
                }else{
                    alert('changeCode1'+data.msg);
                }
            }
        });
    },
    checkUser: function( bTips) {
        return aqlogin.username.val() != '';
    },
    checkPwd: function(){
        return aqlogin.password.val() !='';
    },
    checkCode: function( bTips ) {
        var code = aqlogin.verify.val().toLowerCase();
        //检测验证码
        if(code==''){
            return false;
        }
        if(code!=''&& hex_md5(code) != aqlogin.md5Code){
            if (bTips) {
                aqlogin.errorCb();
            }
            return false;
        }
         if (bTips) {
             aqlogin.errorHide();
        }
        return true;
        //return true;
    },
    setCB:function(f) {
        this.cb = f
    },
    setError:function(f){
        this.errorCb=f
    },
    hideError:function(f){
        this.errorHide=f
    },
    hideError1:function(f){
        this.hideError1=f;
    },
    checkIsNull:function(){
         if(aqlogin.username.val() == ''){
             aqlogin.err.show();
             aqlogin.err.text("用户名不能为空");

        }else if(aqlogin.password.val() ==''){
             aqlogin.err.show();
             aqlogin.err.text("密码不能为空");
            
        }else if(aqlogin.verify.val().toLowerCase()==''){
             aqlogin.err.show();
             aqlogin.err.text("验证码不能为空");
        }

    },
    tryLogin: function() {
        // TODO
        // 检测帐号密码和code
        this.checkIsNull();
        if(this.checkUser(true) && this.checkPwd() && this.checkCode(true)){
            if(aqlogin.verify.val()==''){
               // login.errorCb();
            }else{
                var auto=$('#rm').prop('checked');
                    if(auto==true){
                        autologin=1;
                    }else{
                         autologin=0;
                    }
                 $.ajax({
                    url:baseUrl+'account/api/1/login_rp',
                    data:{
                        "username":aqlogin.username.val(),
                        "password":aqlogin.password.val(),
                        "code":aqlogin.verify.val().toLowerCase(),
                        "autologin":autologin
                        // "service":Account.getloginHref(),
                        // "type":"wb"
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            aqlogin.destory();
                            Account.reInit();
                        }else{
                            aqlogin.cb();
                            setTimeout(aqlogin.changeCode(),3000);
                        }
                    }
                });
            }
           
        }
    }
}

var Game = {
    init: function() {
        var game_id=$('#header').attr('gid');
        $.ajax({
            url:baseUrl+'game/api/1/history_game',
            data:{
                "game_id":game_id
            },
            type:'post',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    Game.setName(data.data.game_name);
                    Game.setServerName(data.data.server_name);
                    Game.setURL(data.data.game_url);
                    Account.successCallback();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    getName : function() {
        return this.name
    },
    setName: function(name){
        this.name = name
    },
    getServerName : function() {
        return this.serverName
    },
    setServerName: function(serverName){
        this.serverName = serverName
    },
    getURL: function() {
        return this.url
    },
    setURL: function(url) {
        this.url = url
    }
}

var Account = {
    // 初始化
    init: function(successCallback) {
        this.successCallback = successCallback;
        this.bLogin = false;
        // 初始化框架
        $.ajax({
            url:baseUrl+'account/api/1/islogin',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret!='1'){
                    aqlogin.init();
                    Account.bLogin = false;
                    return;
                }
                // 用户已登录 销毁框架
                aqlogin.destory();
                Game.init();
                // TODO 调用获取区服数据
                Account.setName(data.data.username);
                Account.setTime(data.data.lastlogintime);
                Account.bLogin = true;
            }
        });
    },
    reInit: function() {
        this.init(this.successCallback);
    },
    // 设置uid
    setID: function(id){
        this.id = id
    },
    // 设置昵称
    setName: function(name){
        this.name = name
    }, 
    // 获取uid
    getID : function() {
        return this.id
    },
    // 获取昵称
    getName: function() {
        return this.name
    },
    getTime : function() {
        return this.time
    },
    setTime: function(time){
        this.time = time
    },
    // 登出
    logout:function(){
        $.ajax({
            url:baseUrl+'account/api/1/logout',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            }
        });
    },
    isLogin:function () {
        return this.bLogin;
    }
}

var baseUrl='http://api.web.anqu.com/';
aqlogin.setCB(function(){
    aqlogin.err.show();
    aqlogin.err.text("用户名或者密码错误");
});
aqlogin.setError(function(){
    aqlogin.err.show();
    aqlogin.err.text("验证码错误请重新输入");
})
aqlogin.hideError(function(){
    aqlogin.err.hide();
})
aqlogin.hideError1(function(){
    aqlogin.err1.hide();
})
