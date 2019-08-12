
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
       
        $(document.body).append(str);
    },



    destory:function(){
        // 清除init插入的内容
        //this.fn();
        dlg.w.remove();
    },
    show:function(){
        this.w.show();
        login.show();    
        register.hide();
        // TODO 显示
    },
    hide:function(){
        this.w.hide();
    }
}
var login={
    init:function(){
        this.appendHtml();
        this.l = $('#login');
        this.cimg = $('#codebyImg',this.l);
        this.yl = $('#yl-login',this.l);
        this.verify = $('#identifyingcode',this.l);
        this.err = $('.login-error',this.l);
        this.err1 = $('.login-error1',this.l);
        this.username=$('#keymail',this.l);
        this.password=$('#password',this.l);
        this.href = encodeURIComponent("http://i.wan.liebao.cn/login?go="+encodeURIComponent(encodeURIComponent(location.href)) );
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
        this.username.on('keydown',function(){login.err.hide()})
        this.password.on('keydown',function(){login.err.hide()})
        this.verify.on('keydown',function(){login.err.hide()})

        this.username.on('keyup',function(){login.showTips()})
        this.password.on('keyup',function(){login.showTips()})
        this.verify.on('keyup',function(){login.showTips()})
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
                '<input id="keymail" name="username" placeholder="用户名/邮箱/手机号" type="text" autocomplete="off" class="fl">'+
                '<a class="login_delete info_del_1"></a>'+
                '</p>'+
                '<p class="loginInputPwd common-input">'+
                '<span class="login_icon_password fl"></span>'+
                '<input id="password" name="password"  placeholder="请输入您的密码" type="password"  autocomplete="false" class="fl">'+
                '</p>'+
                '<p class="loginInputCode common-input-code">'+
                '<span class="login_icon_code"></span>'+
                '<input id="identifyingcode" name="identifyingcode"  placeholder="请输入验证码" type="text"  autocomplete="false">'+
                '</p>'+
                '<img src="" alt="" class="codebyImg" id="codebyImg">'+
                '<p class="rmline">'+
                ''+
                ''+
                '<a href="http://i.ijinshan.com/forget?act=forget" target="_blank" class="fogbtn" hidefocus="true">忘记密码？</a>'+
                '<div style="clear:both"></div></p>'+
                '<p class="login-line"></p>'+
                '<p class="login-btn">'+
                '<a href="javascript:void(0)" hidefocus="true" id="yl-login">登录</a>'+
                '<a href="javascript:void(0)" hidefocus="true" onclick="javascript:qqLogin(\'webgameqq\')" >QQ登录</a>'+
                '</p>'
        $('#login').append(str);
    },
    changeCode: function() {
        // 更换验证码
        $.ajax({
            url:baseUrl+'code/1/get',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    login.cimg.attr('src',data.data.url);
                    login.md5Code = data.data.code;
                    register.rimg.attr('src',data.data.url);
                    register.md5Code=data.data.code;
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
        var code = login.verify.val();
        //检测验证码
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
    tryLogin: function() {
        // TODO
        // 检测帐号密码和code
        if(this.checkUser(true) && this.checkPwd() && this.checkCode(true)){
            if(login.verify.val()==''){
                login.errorCb();
            }else{
                 $.ajax({
                    url:baseUrl+'account/1/login',
                    data:{
                        "username":login.username.val(),
                        "password":hex_md5(login.password.val()),
                        "code":login.verify.val(),
                        "service":Account.getHref()
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            dlg.destory();
                            location.href = data.goto;
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
        this.appendHtml();
        this.r = $('#register');
        this.yl = $('#yl-register',this.r);
        this.rimg = $('#regist-img',this.r);
        this.verify = $('#code-regist',this.r);
        this.pass = $('#passport',this.r);
        this.pwd = $('#password-regist',this.r);
        this.rePwd=$('#repassword',this.r);
        this.passport_msg=$('#passport_msg',this.r);
        this.agree=$('#agree',this.r).prop('checked');
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
       // this.verify.on('blur',function(){register.checkCode(true)})
        //this.verify.on('focus',function(){register.errorHide()})
        this.pass.on('keyup',function(){register.checkUserAjax()})
        this.pass.on('keyup',function(){register.hidePassError()})
        this.pass.on('keyup',function(){register.checkUser(true)})

        this.pwd.on('keyup',function(){register.checkPwd()})
        this.pwd.on('keyup',function(){register.checkRePwd()})
        this.rePwd.on('keyup',function(){register.checkRePwd()})
        this.verify.on('keyup',function(){register.checkCode(true)})
        //this.verify.on('keyup',function(){ console.log("1111");register.checkCode(true)})
        // this.verify.on('keyup',function(){register.errorHide()})
        //this.verify.on('focus',function(){register.hideError()})
        //this.verify.on('focus',function(){login.errorHide()})
        //this.verify.on('keyup',function(){login.errorHide()})
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
    setRepwdError:function(f){
        this.setRepwdError=f;
    },
    hideRepwdError:function(f){
        this.hideRepwdError=f;
    },
    appendHtml:function(){
        var str='<div class="regist-inner">'+
                '<p class="formline clearfix">'+
                '<label for="passport">帐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>'+
                '<input type="text" class="txt" name="pp" id="passport" tabindex="1" placeholder="请输入帐号">'+
                '<span class="not" id="passport_msg">由5-18位字母、数字或下划线组成</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="password">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>'+
                '<input type="password" class="txt" name="pwd" id="password-regist" tabindex="2" placeholder="请输入密码">'+
                '<span class="not" id="password_msg">由6-32位字符组成（区分大小写）</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="repassword">确认密码</label>'+
                '<input type="password" class="txt" name="pwd" id="repassword" tabindex="3" placeholder="再次输入密码">'+
                '<span class="not" id="repassword_msg">再次输入登录密码</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="code-regist">验&nbsp;证 &nbsp;码</label>'+
                '<input type="text" class="code-regist" name="pwd" id="code-regist" tabindex="3" placeholder="请输入验证码">'+
                '<img src="" alt="" class="regist-img" id="regist-img">'+
                '</p>'+
                '<p class="rmline-reg">'+
                '<input type="checkbox" name="agree" id="agree" class="checked" checked="checked" readonly="readonly" disabled="disabled">'+
                '<label for="agree" class="agree">已阅读且同意</label>'+
                '<a href="http://www.duba.net/protocol/serverUse.shtml" target="_blank">《<span>金山网络服务协议</span>》</a>'+
                '</p>'+
                '<p class="bts clearfix">'+
                '<a href="javascript:void(0);" class="regbtn zhuce" hidefocus="true" class="" id="yl-register">注册</a>'+
                '<a href="javascript:void(0);" id="qqlogin" class="qqlogin" tabindex="-1" onclick="javascript:qqLogin(\'webgameqq\');" hidefocus="true">QQ登录</a>'+
                '</p>'+
                '</div>'
        $('#register').append(str);
    },
    changeCode: function() {               
        // 更换验证码
        $.ajax({
            url:baseUrl+'code/1/get',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    register.rimg.attr('src',data.data.url);
                    register.md5Code=data.data.code;
                    login.cimg.attr('src',data.data.url);
                    login.md5Code = data.data.code;
                   // register.errorHide();
                    register.verify.val('');
                }else{
                    alert('changeCode'+data.msg);
                }
            }
        });
    },
    checkCode: function( bTips) {
        var code = register.verify.val();
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
        if(!username.match(/^[a-zA-Z0-9_]{5,18}$/)){
            if (bTips) {
                register.setPassError();
            }
            return false;
        }
        return true;        
    },
    checkUserAjax:function(){
        if(register.checkUser()) {
            $.ajax({
                url:baseUrl+'account/1/exist',
                data:{
                    "username":register.pass.val()
                },
                type:'post',
                dataType:"jsonp",
                success:function(data){
                    if(data.ret=='1'){
                        if (!data.exist) {
                            //register.checkUserError();
                            register.hidePassError();
                        } else {
                            register.setPassError();
                            
                        }
                    }else{
                        alert('checkUser'+data.msg);
                    }
                }
            });
        }
    },
    checkPwd:function() {
        var password=register.pwd.val();
        var repassword=register.rePwd.val();
        //&& password == repassword
        if(password.match(/^[a-zA-Z0-9]{6,32}$/)) {
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
    hidepwdError:function(f){
        this.hidepwdError=f;
    },
    setpwdError:function(f){
        this.setpwdError=f;
    },
    checkUserError:function(f){
        this.checkUserError=f;
    },
    isTheSame:function(){

    },
    isRead:function(){

    },
    tryRegister: function() {
        // TODO
        // 检测帐号密码和code
        if(this.checkUser(true) && this.checkPwd() && this.checkCode(true)&&this.checkRePwd()){
            if(register.verify.val()==''){
                register.errorCb();
            }else{
                $.ajax({
                    url:baseUrl+'account/1/register',
                    data:{
                        "username":register.pass.val(),
                        "password":hex_md5(register.pwd.val()),
                        "code":register.verify.val(),
                        "service":Account.getHref()
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            dlg.destory();
                            location.href = data.goto;
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
function qqLogin(a) {
    var e = encodeURIComponent(decodeURIComponent(Account.getHref()) + "&_qqlog=1");
    var b = "https://login.ijinshan.com/ologin?opentype=201";
    var d = "http://qq.login.ijinshan.com/qqconn/oauth/redirect_to_login.php?newpp=no&ver=7&t=1&p2url=" + encodeURIComponent(b) + ((e != undefined && e != "") ? "&service=" + e : "") + ((a != undefined && a != "") ? "&source=" + encodeURIComponent(a) : "");
    childWindow = window.open(d);
    return
}
var Account = {
    init: function() {
        dlg.init();
        this.href = encodeURIComponent("http://i.wan.liebao.cn/login?go="+encodeURIComponent(encodeURIComponent(location.href)) );
        $.ajax({
            url:baseUrl+'account/1/get',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret=='1'){
                    dlg.destory();
                    Account.setID(data.data.uid);
                    if(data.data.nickname.length==0) {
                        Account.setName(data.data.username);
                    }else{
                        Account.setName(data.data.nickname);
                    }
                }else{

                    dlg.show(); 
                }
            }
        })
    },
    setID: function(id){
        this.id = id
    },
    setName: function(name){
        this.name = name
    }, 
    getID : function() {
        return this.id
    },
    getName: function() {
        return this.name
    },
    getHref: function() {
        return this.href
    },
    loginOut:function(){
        $.ajax({
            url:baseUrl+'account/1/logout',
            type:'get',
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                   
                }else{
                    alert('loginOut'+data.msg);
                }
            }
        });
    }
}

var baseUrl='http://api.wan.liebao.cn/';
login.setCB(function(){
    login.err.show();
    login.err.text("用户名或者密码错误");
});
login.setError(function(){
    login.verify.parent().addClass('yl-error');
    login.err1.show();
    login.err1.text("验证码错误请重新输入");

   // $('').append('<p class="login-error">用户名或密码错误</p>')
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
})
register.hideError(function(){
    register.verify.removeClass('yl-error');
})
/*判断账号是否满足要求的错误提示信息*/
register.setPassError(function(){
    register.pass.addClass('ableColor');
})
register.hidePassError(function(){
    register.pass.removeClass('ableColor');
})
/*密码不一致*/
register.setRepwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.pwd.addClass('ableColor');
})
register.hideRepwdError(function(){
    register.pwd.removeClass('ableColor');
})
register.setpwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.rePwd.addClass('ableColor');
})
register.hidepwdError(function(){
    register.rePwd.removeClass('ableColor');
})
Account.init();
