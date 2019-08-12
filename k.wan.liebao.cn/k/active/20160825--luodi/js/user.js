
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
                // '<i class="ico ico-close" id="ico-close"></i>'+
                '</div>'+
                '</div>'+
                '<div class="login-detail">'+
                '<div class="caption">'+
                '<ul id="button">'+
                '<li class="register-btn-change select" id="register-btn-change"><a href="#a" hidefocus="true" >新用户注册</a>'+
                '</li>'+
                '<li class="login-btn-change " id="login-btn-change"><a href="#" hidefocus="true" >安趣用户登录</a>'+
                '</li>'+
                '</ul>'+
                '</div>'+
                '<div id="content">'+
                '<div class="con login-info" style="display:none;" id="login">'+
                '</div>'+
                '<div class="con" style="display: block;" id="register">'+
                '</div>'+
                '</div>'+
                '</div>';
       var strMask= '<div class="regMask"></div>';
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
        login.hide();    
        register.show();
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
        this.yl = $('#yl-login',this.l);
        this.username=$('#keymail',this.l);
        this.password=$('#password',this.l);
        this.nameError=$('.nameError',this.l);
        this.bindEvent();//各种事件绑定函数执行
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
        // this.username.on('keydown',function(){login.nameError.hide()})
        // this.password.on('keydown',function(){login.nameError.hide()})
        
    },
    show:function(){
        this.l.show();
    },
    hide:function(){
        this.l.hide();
    },
    appendHtml:function(){
        
        var str='<p class="loginInput common-input">'+
                '<label class="login_icon_user fl">用户名</label>'+
                '<input id="keymail" name="username" type="text" autocomplete="off" class="fl">'+
                '<span class="not nameError"></span>'+
                '</p>'+
                '<p class="loginInputPwd common-input">'+
                '<label class="login_icon_password fl">登录密码</label>'+
                '<input id="password" name="password"  type="password"  autocomplete="false" class="fl">'+
                '<span class="not pwdError"></span>'+
                '</p>'+
                
                '<p class="rmline">'+
                '<input type="checkbox" name="rm" id="rm" checked="checked" disabled="disabled">'+
                '<label for="rm" class="rm" id="rm">记住用户名</label>'+
                '</p>'+
                '<p class="login-btn">'+
                '<a href="javascript:void(0)" hidefocus="true" id="yl-login"></a>'+
                '</p>'
        this.l.append(str);
    },
    
    checkUser: function( bTips) {
      
        return login.username.val() != '';
    },
    checkPwd: function(){
       
        return login.password.val() !='';
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
            
        }
    },
    tryLogin: function() {
        // TODO
        // 检测帐号密码和code
        // this.checkUser(true);
        // this.checkPwd();
        // this.checkCode(true);
        this.checkIsNull();
        if(this.checkUser(true) && this.checkPwd()){
           
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
                        "autologin":autologin
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            dlg.destory();
                           // location.href = data.goto;
                          // console.log(data);
                        }else{
                            
                            login.cb();
                           
                        }
                    }
                });
       
           
        }
    }
}
var register={
    init:function(){

        this.r = $('#register');
        this.appendHtml();
        this.yl = $('#yl-register',this.r);
        this.pass = $('#passport',this.r);
        this.pwd = $('#password-regist',this.r);
        this.rePwd=$('#repassword',this.r);
        this.reNameError=$('.reNameError',this.r);
        this.rePwdError=$('.rePwdError',this.r);
        this.rePwdtError=$('.rePwdtError',this.r);
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
        // this.rimg.on('click',function(){register.changeCode(true)})
        this.pass.on('keyup',function(){register.checkUserAjax()})
        this.pass.on('keyup',function(){register.hidePassError()})
        this.pass.on('keyup',function(){register.checkUser(true)})
        // this.pass.on('focus',function(){$(this).addClass('hasFocus')})
        // this.pass.on('blur',function(){$(this).removeClass('hasFocus')})
        this.pwd.on('keyup',function(){register.checkPwd()})
        this.pwd.on('keyup',function(){register.checkRePwd()})
        // this.pwd.on('focus',function(){$(this).addClass('hasFocus')})
        // this.pwd.on('blur',function(){$(this).removeClass('hasFocus')})
        this.rePwd.on('keyup',function(){register.checkRePwd()})
        // this.rePwd.on('focus',function(){$(this).addClass('hasFocus')})
        // this.rePwd.on('blur',function(){$(this).removeClass('hasFocus')})
        
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
    appendHtml:function(){
        var str='<div class="regist-inner">'+
                ''+
                '<p class="formline clearfix">'+
                '<label for="passport" class="hasMust">用户名</label>'+
                '<input type="text" class="txt" name="pp" id="passport" tabindex="1" placeholder="请输入6-12位字母数字下划线的组合">'+
                '<span class="not reNameError" ></span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="password" class="hasMust">登录密码</label>'+
                '<input type="password" class="txt" name="pwd" id="password-regist" tabindex="2" placeholder="请输入6-20位的密码">'+
                '<span class="not rePwdError"></span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="repassword" class="hasMust">重复密码</label>'+
                '<input type="password" class="txt" name="pwd" id="repassword" tabindex="3" placeholder="再次输入登录密码">'+
                 '<span class="not rePwdtError"></span>'+
                '</p>'+
                '<p class="bts clearfix">'+
                '<a href="javascript:void(0);" class="regbtn zhuce" hidefocus="true" class="" id="yl-register"></a>'+
                // '<a href="javascript:void(0);" id="qqlogin" class="qqlogin" tabindex="-1" onclick="javascript:qqLogin(\'webgameqq\');" hidefocus="true">QQ登录</a>'+
                '</p>'+
                '</div>'
        this.r.append(str);
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
        if(register.checkUser(true)) {
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
        if(this.checkUser(true) && this.checkPwd()&&this.checkRePwd()){
                $.ajax({
                    url:baseUrl+'account/api/1/register',
                    data:{
                        "username":register.pass.val(),
                        "password":register.pwd.val()
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            dlg.destory();
			 Account.reInit();	
                        }else{
                            
                        }
                    }
                });
        }
    }
}

var Account = {
    // 初始化
    init: function() {
        // 初始化框架
        dlg.init();
        // 拉去用户信息
        $.ajax({
            url:baseUrl+'account/api/1/islogin',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret!='1'){
                    dlg.show();
                    return;
                }
                // 用户已登录 销毁框架
                dlg.destory();
                // 填充用户uid
                Account.setID(data.data.uid);
                Account.setName(data.data.username);
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
                   location.reload();
                }
            }
        });
    }
}

var baseUrl='http://web.anqu.com/';
login.setCB(function(){
    login.nameError.html("用户名或者密码错误");
});
/*判断账号是否满足要求的错误提示信息*/
register.setPassError(function(){
    register.reNameError.html('格式不正确');
})
register.hidePassError(function(){
    register.reNameError.html('');
})
/*密码不一致*/
register.setRepwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.rePwdError.html('格式正确');
})
register.hideRepwdError(function(){
    register.rePwdError.html('');
})
register.setpwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.rePwdtError.html('两次密码不一致');
})
register.hidepwdError(function(){
    register.rePwdtError.html('');
})
/*用户名是否已注册*/
register.setUserError(function(){
    register.reNameError.html('该用户名已被注册');
})
register.hideUserError(function(){
    register.reNameError.html('');
})

Account.init();
