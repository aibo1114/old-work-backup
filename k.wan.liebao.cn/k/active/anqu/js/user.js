
var dlg = {
    init:function(){
        // 初始化界面hide
        this.appendHtml();
        this.w = $('#login-warp');
        this.closeBtn = $('#ico-close',this.w);
        this.loginBtn = $('#login-btn-change',this.w);
        this.registerBtn = $('#register-btn-change',this.w);
        this.bindEvent();

        login.init();
        register.init();
    },
    bindEvent:function(){
        /*某人说的高大上*/
        this.closeBtn.on('click',dlg.destory)
        this.loginBtn.on('click',function(e){
            if(e&&e.preventDefault){
                e.preventDefault();
            }else{
                window.event.returnValue = false; 
            }
            $(this).addClass('select').siblings().removeClass('select');
            login.show();
            register.hide();
        })
        this.registerBtn.on('click',function(e){
            if(e&&e.preventDefault){
                e.preventDefault();
            }else{
                window.event.returnValue = false; 
            }
            //alert("1")
            $(this).addClass('select').siblings().removeClass('select');
            login.hide();
            register.show();
        })
    },
    /*动态添加面板页面*/
    appendHtml:function(){
        
        var str='<div class="login-warp" id="login-warp">'+
                '<div class="login-top">'+
                '<div class="login-close">'+
                '<i class="ico ico-close" id="ico-close"></i>'+
                '</div>'+
                '</div>'+
                '<div class="login-detail">'+
                '<div class="caption">'+
                '<ul id="button">'+
                '<li class="login-btn-change select" id="login-btn-change"><a href="#" hidefocus="true" >登录</a>'+
                '</li>'+
                '<li class="register-btn-change" id="register-btn-change"><a href="#a" hidefocus="true" >注册</a>'+
                '</li>'+
                '</ul>'+
                '</div>'+
                '<div id="content">'+
                '<div class="con login-info" style="display: block;" id="login">'+
                '</div>'+
                '<div class="con" style="display: none;" id="register">'+
                '</div>'+
                '</div>'+
                '</div>'
        //$(body).append(str);
       
        var strMask= '<div class="regMask"></div>'
        $(document.body).append(str);
        $(document.body).append(strMask);
    },



    destory:function(){
        // 清除init插入的内容
        //this.fn();
        dlg.w.remove();
        $('.regMask').remove();
    },
    show:function(){
        this.w.show();
        login.show();    
        register.hide();
        $('.regMask').show();
        // TODO 显示
    },
    hide:function(){
        this.w.hide();
    }
}
var login={
    init:function(){
        
        this.l = $('#login');
        this.appendHtml();
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
    showTips:function(){//登录按钮是否可点击(尽量取相同的名字)
       // console.log(login.checkUser(true))
        //console.log(login.checkPwd())
       // console.log(login.checkCode(true))
        if( login.checkUser(true) && login.checkPwd() && login.checkCode(false)){
            login.yl.addClass('ableColor');
        }else{
            login.yl.removeClass('ableColor');
        }
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
        this.verify.on('blur',function(){login.checkCode(true)})
        this.verify.on('focus',function(){login.hideError1()})
        this.verify.on('keyup',function(){login.hideError1()})
        this.password.on('focus',function(){$(this).parent().addClass('hasFocus')})
        this.password.on('blur',function(){$(this).parent().removeClass('hasFocus')})
        this.username.on('keydown',function(){login.err.hide()})
        this.username.on('focus',function(){$(this).parent().addClass('hasFocus')})
        this.username.on('focus',function(){$(this).parent().addClass('hasFocus')})
        this.username.on('blur',function(){$(this).parent().removeClass('hasFocus')})
        this.password.on('keydown',function(){login.err.hide()})
        this.password.on('focus',function(){$(this).addClass('hasFocus')})
        this.verify.on('keydown',function(){login.err.hide()})
        this.verify.on('focus',function(){$(this).parent().addClass('hasFocus')})
        this.verify.on('blur',function(){$(this).parent().removeClass('hasFocus')})

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
        
        var str='<p class="login-error">用户名或密码错误</p>'+
                '<p class="login-error1"></p>'+
                '<p class="loginInput common-input">'+
                '<span class="login_icon_user fl"></span>'+
                '<input id="keymail" name="username" placeholder="请输入用户名" tabindex="1" type="text" autocomplete="off" class="fl">'+
                '<a class="login_delete info_del_1"></a>'+
                '</p>'+
                '<p class="loginInputPwd common-input">'+
                '<span class="login_icon_password fl"></span>'+
                '<input id="password" name="password"  placeholder="请输入您的密码" tabindex="2" type="password"  autocomplete="false" class="fl">'+
                '</p>'+
                '<p class="loginInputCode common-input-code">'+
                '<span class="login_icon_code"></span>'+
                '<input id="identifyingcode" name="identifyingcode"  placeholder="请输入验证码" tabindex="3" type="text"  autocomplete="false">'+
                '</p>'+
                '<img src="" alt="" class="codebyImg" id="codebyImg">'+
                '<p class="rmline">'+
                '<input type="checkbox" name="rm" id="rm" checked="checked" disabled="disabled">'+
                '<label for="rm" class="rm" id="rm">下次自动登录</label>'+
                '<a href="http://user.anqu.com/webmember/checkname" target="_blank" class="fogbtn" hidefocus="true">忘记密码？</a>'+
                '<div style="clear:both"></div></p>'+
                // '<p class="login-line"></p>'+
                '<p class="login-btn">'+
                '<a href="javascript:void(0)" hidefocus="true" id="yl-login" tabindex="4">马上登录</a>'+
                // '<a href="javascript:void(0)" hidefocus="true" onclick="javascript:qqLogin(\'webgameqq\')" >QQ登录</a>'+
                '</p>'
        this.l.append(str);
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
                    register.rimg.attr('src',data.data.img);
                    register.md5Code=data.data.codem;
                    login.hideError1();
                    login.verify.val('');
                }else{
                    alert('changeCode1'+data.msg);
                }
            }
        });
    },
    checkUser: function( bTips) {
        // if(login.username.val() == ''){
        //     login.err.show();
        //     login.err.text("用户名不能为空");
        // }
        return login.username.val() != '';
    },
    checkPwd: function(){
        // if(login.password.val() ==''){
        //     login.err.show();
        //     login.err.text("密码不能为空");
        // }
        return login.password.val() !='';
    },
    checkCode: function( bTips ) {
        var code = login.verify.val().toLowerCase();
        //检测验证码
        // if(code==''){
        //     login.err.show();
        //     login.err.text("验证码不能为空");
        // }
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
        // this.checkUser(true);
        // this.checkPwd();
        // this.checkCode(true);
        this.checkIsNull();
        if(this.checkUser(true) && this.checkPwd() && this.checkCode(true)){
            if(login.verify.val()==''){
                login.errorCb();
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
                            dlg.destory();
                            Account.reInit();
                            location.reload();
                            //location.href="www.baidu.com";
                           // location.href = data.goto;
                          // console.log(data);
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
var register={
    init:function(){

        this.r = $('#register');
        this.appendHtml();
        this.yl = $('#yl-register',this.r);
        this.rimg = $('#regist-img',this.r);
        this.verify = $('#code-regist',this.r);
        this.pass = $('#passport',this.r);
        this.pwd = $('#password-regist',this.r);
        this.rePwd=$('#repassword',this.r);
        this.passport_msg=$('#passport_msg',this.r);
        this.agree=$('#agree',this.r).prop('checked');
        this.err=$('.register-error',this.r);
        this.email=$('#email',this.r);
        this.realname=$('#realname',this.r)
        this.cardid=$('#cardid',this.r);
        this.bindEvent();
    },
    bindEvent:function(){
        this.yl.on('click',function(e){
            if(e&&e.preventDefault){
                e.preventDefault();
            }else{
                window.event.returnValue = false; 
            }
            register.tryRegister();
        })
        this.rimg.on('click',function(){register.changeCode(true)})
        this.pass.on('keyup',function(){register.checkUserAjax()})
        this.pass.on('keyup',function(){register.hidePassError()})
        this.pass.on('keyup',function(){register.checkUser(true)})
        this.pass.on('focus',function(){$(this).addClass('hasFocus')})
        this.pass.on('blur',function(){$(this).removeClass('hasFocus')})
        this.pwd.on('keyup',function(){register.checkPwd()})
        this.pwd.on('keyup',function(){register.checkRePwd()})
        this.pwd.on('focus',function(){$(this).addClass('hasFocus')})
        this.pwd.on('blur',function(){$(this).removeClass('hasFocus')})
        this.rePwd.on('keyup',function(){register.checkRePwd()})
        this.verify.on('keyup',function(){register.checkCode(true)})
        this.rePwd.on('focus',function(){$(this).addClass('hasFocus')})
        this.rePwd.on('blur',function(){$(this).removeClass('hasFocus')})
        this.verify.on('focus',function(){$(this).addClass('hasFocus')})
        this.verify.on('blur',function(){$(this).removeClass('hasFocus')})
        //email
        this.email.on('focus',function(){$(this).addClass('hasFocus')})
        this.email.on('blur',function(){$(this).removeClass('hasFocus')})
        this.email.on('keyup',function(){register.checkEmail()})
        this.email.on('focus',function(){register.hideEmailError()})
        //realName
        this.realname.on('focus',function(){$(this).addClass('hasFocus')})
        this.realname.on('blur',function(){$(this).removeClass('hasFocus')})
        this.realname.on('keyup',function(){register.checkRealname()})
        this.realname.on('focus',function(){register.hiderealnameError()})
        //cardId
        this.cardid.on('focus',function(){$(this).addClass('hasFocus')})
        this.cardid.on('blur',function(){$(this).removeClass('hasFocus')})
        this.cardid.on('keyup',function(){register.checkCardid()})
        this.cardid.on('focus',function(){register.hidecardidError()})
       
    },
    show:function(){
        //this.changeCode();
        this.r.show();
    },
    hide:function(){
        this.r.hide();
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
    setPassError:function(f){
        this.setPassError=f;
    },
    hidePassError:function(f){
        this.hidePassError=f;
    },
    setUserError:function(f){
        this.setUserError=f;
    },
    hideUserError:function(f){
        this.hideUserError=f;
    },
    setRepwdError:function(f){
        this.setRepwdError=f;
    },
    hideRepwdError:function(f){
        this.hideRepwdError=f;
    },
    //email
    setEmailError:function(f){
        this.setEmailError=f;
    },
    hideEmailError:function(f){
        this.hideEmailError=f;
    },
    //realname
    setrealnameError:function(f){
        this.setrealnameError=f;
    },
    hiderealnameError:function(f){
        this.hiderealnameError=f;
    },
    //cardid
    setcardidError:function(f){
        this.setcardidError=f;
    },
    hidecardidError:function(f){
        this.hidecardidError=f;
    },
    appendHtml:function(){
        var str='<div class="regist-inner">'+
                '<p class="register-error"></p>'+
                '<p class="formline clearfix">'+
                '<label for="passport" class="hasMust">帐号</label>'+
                '<input type="text" class="txt" name="pp" id="passport" tabindex="1" placeholder="请输入6-12位字母数字下划线的组合">'+
                // '<span class="not" id="passport_msg">由5-18位字母、数字或下划线组成</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="password" class="hasMust">密码</label>'+
                '<input type="password" class="txt" name="pwd" id="password-regist" tabindex="2" placeholder="请输入6-20位的密码">'+
                // '<span class="not" id="password_msg">由6-32位字符组成（区分大小写）</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="repassword" class="hasMust">确认密码</label>'+
                '<input type="password" class="txt" name="pwd" id="repassword" tabindex="3" placeholder="再次输入登录密码">'+
                // '<span class="not" id="repassword_msg">再次输入登录密码</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="code-regist" class="hasMust">验证码</label>'+
                '<input type="text" class="code-regist" name="pwd" id="code-regist" tabindex="4" placeholder="请输入验证码">'+
                '<img src="" alt="" class="regist-img" id="regist-img">'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="email">邮箱</label>'+
                '<input type="text" class="txt" name="pp" id="email" tabindex="5" placeholder="用于密码找回（选填）">'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="realname">姓名</label>'+
                '<input type="text" class="txt" name="pp" id="realname" tabindex="6" placeholder="选填">'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="cardid">身份证</label>'+
                '<input type="text" class="txt" name="pp" id="cardid" tabindex="7" placeholder="选填">'+
                '</p>'+
                '<p class="rmline-reg">'+
                '<input type="checkbox" name="agree" id="agree" class="checked" checked="checked" readonly="readonly" disabled="disabled">'+
                '<label for="agree" class="agree">已阅读且同意</label>'+
                '<a href="http://www.anqu.com/news/anqu/240328.shtml" target="_blank">《<span>安趣网网络服务使用协议</span>》</a>'+
                '</p>'+
                '<p class="bts clearfix">'+
                '<a href="javascript:void(0);" class="regbtn zhuce" tabindex="8" hidefocus="true" class="" id="yl-register">注册</a>'+
                // '<a href="javascript:void(0);" id="qqlogin" class="qqlogin" tabindex="-1" onclick="javascript:qqLogin(\'webgameqq\');" hidefocus="true">QQ登录</a>'+
                '</p>'+
                '</div>'
        this.r.append(str);
    },
    changeCode: function() {               
        // 更换验证码
        $.ajax({
            url:baseUrl+'account/api/1/validimg',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    register.rimg.attr('src',data.data.img);
                    register.md5Code=data.data.codem;
                    login.cimg.attr('src',data.data.img);
                    login.md5Code = data.data.codem;
                   // register.errorHide();
                    register.verify.val('');
                }else{
                    alert('changeCode'+data.msg);
                }
            }
        });
    },
    checkCode: function( bTips) {
        var code = register.verify.val().toLowerCase();
        //检测验证码
        if(code!='' && hex_md5(code) != register.md5Code){
            if (bTips) {
                register.errorCb();
                //console.log('1')
            }
            return false;
        }
        if (bTips) {
            register.errorHide();
            //console.log('2')
        }
        return true;
    },
    checkUser: function( bTips) {
        // TODO
        // 检测帐号是否可用
        var username=register.pass.val();
        // console.log(username);
        if(username!=''){
            if(!username.match(/^[a-zA-Z0-9_]{6,12}$/)){
                if (bTips) {
                    register.setPassError();
                }
                return false;
            }
            return true;     
        }
           
    },
    //判断用户名是否已注册
    checkUserAjax:function(){
        if(register.checkUser()) {
            $.ajax({
                url:baseUrl+'account/api/1/checkusername',
                data:{
                    "username":register.pass.val()
                },
                type:'post',
                dataType:"jsonp",
                success:function(data){
                    if(data.ret=='1'){
                        register.hideUserError();
                    }else{
                        register.setUserError();
                    }
                }
            });
        }
    },
    checkPwd:function() {
        var password=register.pwd.val();
        var repassword=register.rePwd.val();
        //&& password == repassword
        if(password.match(/^.{6,20}$/)) {
            register.hideRepwdError();
            return true;

        }else{
            register.setRepwdError();
            return false;
        }
    },
    checkRePwd:function(){
        var password=register.pwd.val();
        var repassword=register.rePwd.val();
        //&& password == repassword
        if(repassword!=''){
             if(password == repassword) {
                register.hidepwdError();
                return true;

            }else{
                register.setpwdError();
                return false;
            }
        }
       
    },
    checkEmail:function() {
        var email=register.email.val();
        //&& password == repassword
        if(email!=''){
            if(email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ )) {
                register.hideEmailError();
                return true;

            }else{
                register.setEmailError();
                return false;
            }
        }
        
    },
    checkRealname:function() {
        var realname=register.realname.val();
        if(realname!=''){
            if(realname.match(/^[\u4e00-\u9fa5]+$/)) {
                register.hiderealnameError();
                return true;

            }else{
                register.setrealnameError();
                return false;
            }
        }
        
    },
    checkCardid:function() {
        var cardid=register.cardid.val();
        //&& password == repassword
        if(cardid.match(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)) {
            register.hidecardidError();
            return true;

        }else{
            register.setcardidError();
            return false;
        }
    },
    hidepwdError:function(f){
        this.hidepwdError=f;
    },
    setpwdError:function(f){
        this.setpwdError=f;
    },
    checkUserError:function(f){
        this.checkUserError=f;
    },
   
    tryRegister: function() {
        // TODO
        // 检测帐号密码和code
        var url=window.location.href;
        var frm=getQueryStr(url,'frm');
        if(this.checkUser(true) && this.checkPwd() && this.checkCode(true)&&this.checkRePwd()){
            if(register.verify.val()==''){
                register.errorCb();
            }else{
                $.ajax({
                    url:baseUrl+'account/api/1/register',
                    data:{
                        "username":register.pass.val(),
                        "password":register.pwd.val(),
                        "code":register.verify.val().toLowerCase(),
                        "email":register.email.val(),
                        "realname":register.realname.val(),
                        "cardid":register.cardid.val(),
                        "frm":frm
                        // "service":Account.getloginHref()
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            dlg.destory();
                            Account.reInit();
                            location.reload();
                            //location.href="www.baidu.com";
                            // location.href = data.goto;
                        }else{
                            register.changeCode();
                            //register.cb();
                        }
                    }
                });
            }
        }
    }
}

var Account = {
    // 初始化
    init: function(successCallback) {
        // 初始化框架
        dlg.init();
        this.successCallback=successCallback;
        // 拉去用户信息
        $.ajax({
            url:baseUrl+'account/api/1/islogin',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret!='1'){
                    dlg.show();
                    Account.bLogin = false;
                    return;
                }
                // 用户已登录 销毁框架
                dlg.destory();
                Account.setID(data.data.uid);
                Account.setName(data.data.username);
                Account.successCallback();
                Account.bLogin = true;
                //location.href="www.baidu.com";
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
    // 登出
    logout:function(){
        $.ajax({
            url:baseUrl+'account/api/1/logout',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                   location.reload();
                }
            }
        });
    },
    reInit: function() {
        this.init(this.successCallback);
    },
    isLogin:function () {
        return this.bLogin;
    }
}

var baseUrl='http://api.web.anqu.com/';
login.setCB(function(){
    login.err.show();
    login.err.text("用户名或者密码错误");
});
login.setError(function(){
    login.verify.parent().addClass('yl-error');
    login.err1.show();
    login.err1.text("验证码错误请重新输入");

})
login.hideError(function(){
    login.verify.parent().removeClass('yl-error');
    login.err.hide();
    //jaerror.text("验证码错误请重新输入");
})
login.hideError1(function(){
    login.verify.parent().removeClass('yl-error');
    login.err1.hide();
    //jaerror.text("验证码错误请重新输入");
})
register.checkUserError(function(){
    register.passport_msg.text("账号已存在");
    register.pass.addClass('yl-error');
})
/*注册验证码错误提示信息*/
register.setError(function(){
    register.verify.addClass('yl-error');
    register.err.html('验证码无效，请重新输入');
})
register.hideError(function(){
    register.verify.removeClass('yl-error');
    register.err.html('');
})
/*判断账号是否满足要求的错误提示信息*/
register.setPassError(function(){
    register.pass.addClass('ableColor');
    register.err.html('请输入6-12位字母数字下划线的组合');
})
register.hidePassError(function(){
    register.pass.removeClass('ableColor');
    register.err.html('');
})
/*密码不一致*/
register.setRepwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.err.html('请输入6-20位密码');
    register.pwd.addClass('ableColor');
})
register.hideRepwdError(function(){
    register.err.html('');
    register.pwd.removeClass('ableColor');
})
register.setpwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.err.html('两次密码不一致');
    register.rePwd.addClass('ableColor');
})
register.hidepwdError(function(){
    register.err.html('');
    register.rePwd.removeClass('ableColor');
})
/*用户名是否已注册*/
register.setUserError(function(){
    register.pass.addClass('ableColor');
    register.err.html('该用户名已被注册');
})
register.hideUserError(function(){
    register.pass.removeClass('ableColor');
    register.err.html('');
})
//邮箱错误信息验证
register.setEmailError(function(){
    register.email.addClass('ableColor');
    register.err.html('请输入正确的邮箱');
})
register.hideEmailError(function(){
    register.email.removeClass('ableColor');
    register.err.html('');
})
//真实姓名验证
register.setrealnameError(function(){
    register.realname.addClass('ableColor');
    register.err.html('请输入真实姓名');
})
register.hiderealnameError(function(){
    register.realname.removeClass('ableColor');
    register.err.html('');
})
//身份证号验证
register.setcardidError(function(){
    register.cardid.addClass('ableColor');
    register.err.html('请输入正确的身份证号');
})
register.hidecardidError(function(){
    register.cardid.removeClass('ableColor');
    register.err.html('');
})
function getQueryStr(url,str) {
    var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(url), tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
}
