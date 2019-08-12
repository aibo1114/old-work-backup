var login={
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
        location.reload();
    },
    bindEvent:function(){
        this.yl.on('click',function(e){
            if(e&&e.preventDefault){
                e.preventDefault();
            }else{
                window.event.returnValue = false; 
            }
            login.tryLogin();
        })
        this.cimg.on('click',function(){login.changeCode(true)})
        this.verify.on('keyup',function(){login.checkCode(true)})
        // this.verify.on('focus',function(){login.hideError1()})
        this.verify.on('focus',function(){login.hideError1()})
        this.username.on('keydown',function(){login.err.hide()})
        this.password.on('keydown',function(){login.err.hide()})
        this.verify.on('keydown',function(){login.err.hide()})

        // this.username.on('keyup',function(){login.showTips()})
        // this.password.on('keyup',function(){login.showTips()})
        // this.verify.on('keyup',function(){login.showTips()})
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
                '<label for="rm" class="rm" id="rm">记住用户名</label><a href="http://i.ijinshan.com/forget?act=forget" target="_blank" class="fogbtn" hidefocus="true">忘记密码？</a></p>'+
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
                    login.cimg.attr('src',data.data.img);
                    login.md5Code = data.data.codem;
                    // register.rimg.attr('src',data.data.url);
                    // register.md5Code=data.data.code;
                    login.hideError1();
                    login.verify.val('');
                }else{
                    alert('changeCode1'+data.msg);
                }
            }
        });
    },
    checkUser: function( bTips) {
        return login.username.val() != '';
    },
    checkPwd: function(){
        return login.password.val() !='';
    },
    checkCode: function( bTips ) {
        var code = login.verify.val().toLowerCase();
        //检测验证码
        if(code==''){
            return false;
        }
        if(code!=''&& hex_md5(code) != login.md5Code){
            if (bTips) {
                login.errorCb();
            }
            return false;
        }
         if (bTips) {
            login.errorHide();
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
         if(login.username.val() == ''){
            login.err.show();
            login.err.text("用户名不能为空");

        }else if(login.password.val() ==''){
            login.err.show();
            login.err.text("密码不能为空");
            
        }else if(login.verify.val().toLowerCase()==''){
            login.err.show();
            login.err.text("验证码不能为空");
        }

    },
    tryLogin: function() {
        // TODO
        // 检测帐号密码和code
        this.checkIsNull();
        if(this.checkUser(true) && this.checkPwd() && this.checkCode(true)){
            if(login.verify.val()==''){
               // login.errorCb();
            }else{
                var auto=$('#rm').prop('checked');
                    if(auto==true){
                        autologin=1;
                    }else{
                         autologin=0;
                    }
                 $.ajax({
                    url:baseUrl+'account/api/1/login',
                    data:{
                        "username":login.username.val(),
                        "password":login.password.val(),
                        "code":login.verify.val().toLowerCase(),
                        "autologin":autologin
                        // "service":Account.getloginHref(),
                        // "type":"wb"
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            login.destory();
                            //location.href = data.goto;
                            //location.reload();
                        }else{
                            
                            login.cb();
                            setTimeout(login.changeCode(),3000);
                        }
                    }
                });
            }
           
        }
    }
}


var Account = {
    // 初始化
    init: function() {
        // 初始化框架
       
        $.ajax({
            url:baseUrl+'account/api/1/islogin',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret!='1'){
                    login.init();
                    return;
                }
                // 用户已登录 销毁框架
                login.destory();
            }
        })
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
    // 获取登录url
    getloginHref: function() {
        return this.loginHref
    },
    // 获取登出url
    getLogoutHref:function(){
        return this.logoutHref;
    },
    // 设置ticket
    setTicket:function(ticket){
        this.ticket = ticket
    },
    // 获取ticket
    getTicket:function(){
        return this.ticket;
    },
    // 登出
    logout:function(){
        $.ajax({
            url:baseUrl+'account/api/1/logout',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    //location.href = data.goto;
                   location.reload();
                }
            }
        });
    }
}

var baseUrl='http://web.anqu.com/';
login.setCB(function(){
    login.err.show();
    login.err.text("用户名或者密码错误");
});
login.setError(function(){
  //  login.verify.parent().addClass('yl-error');
    login.err.show();
    login.err.text("验证码错误请重新输入");

   // $('').append('<p class="login-error">用户名或密码错误</p>')
})
login.hideError(function(){
    //login.verify.parent().removeClass('yl-error');
    login.err.hide();
    //jaerror.text("验证码错误请重新输入");
})
login.hideError1(function(){
    //login.verify.parent().removeClass('yl-error');
    login.err1.hide();
    //jaerror.text("验证码错误请重新输入");
})
Account.init();
