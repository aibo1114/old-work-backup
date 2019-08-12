
var registerDlg = {
    init:function(){
        // 初始化界面hide
        this.appendHtml();
        this.w = $('#login-warp');
        this.closeBtn = $('#ico-close',this.w);
        this.loginBtn = $('#login-btn-change',this.w);
        this.registerBtn = $('#register-btn-change',this.w);
        this.bindEvent();

        register.init();
    },
    bindEvent:function(){
        /*某人说的高大上*/
        this.closeBtn.on('click',registerDlg.destory)
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
                // '<li class="register-btn-change select" id="register-btn-change"><a href="#a" hidefocus="true" >新用户注册</a>'+
                // '</li>'+
                // '<li class="login-btn-change " id="login-btn-change"><a href="#" hidefocus="true" >安趣用户登录</a>'+
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
        registerDlg.w.remove();
        $('.regMask').remove();
    },
    show:function(){
        this.w.show();
        register.show();
        $('.regMask').show();
        // TODO 显示
    },
    hide:function(){
        this.w.hide();
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
                '<input type="text" class="txt" name="pp" id="passport" tabindex="1" placeholder="6-12位字母数字下划线的组合">'+
                '<span class="not reNameError" ></span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="password" class="hasMust">登录密码</label>'+
                '<input type="password" class="txt" name="pwd" id="password-regist" tabindex="2" placeholder="6-20位的密码">'+
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
        var url=window.location.href;
        var frm=getQueryStr(url,'frm');
        if(this.checkUser(true) && this.checkPwd()&&this.checkRePwd()){
                $.ajax({
                    url:baseUrl+'account/api/1/register_rp',
                    data:{
                        "username":register.pass.val(),
                        "password":register.pwd.val(),
                        "frm":frm
                    },
                    type:'post',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            registerDlg.destory();
                            Account.reInit();
                        }else{
                            
                        }
                    }
                });
        }
    }
}

var registerAccount = {
    init:function() {
        // 初始化框架
        registerDlg.init();

        // 拉去用户信息
        $.ajax({
            url:baseUrl+'account/api/1/islogin',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret!='1'){
                    registerDlg.show();
                    $('#regMask').show();
                    return;
                }
                // 用户已登录 销毁框架
               // $('#regMask').remove();
                registerDlg.destory();

            }
        });
    }
}


var baseUrl='http://api.web.anqu.com/';
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
function getQueryStr(url,str) {
    var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(url), tmp;
    if (tmp = rs) {
        return tmp[2];
    }
    return "";
}

