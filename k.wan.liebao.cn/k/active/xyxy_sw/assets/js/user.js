var dlg = {
    init:function(){
        // 初始化界面hide
        this.htmlW=$('#login-warp').html();
        if(this.htmlW!=undefined){
            return;
        }
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
                '<li class="register-btn-change" id="register-btn-change"><a href="#a" hidefocus="true" >注册</a>'+
                '</li>'+
                '<li class="login-btn-change select" id="login-btn-change"><a href="#" hidefocus="true" >登录</a>'+
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

        $('#toatlogin').append(str);
    },



    destory:function(){
        // 清除init插入的内容
        //this.fn();
       // dlg.w.remove();
       dlg.w.hide();
       $('.sq-dialog-masking').hide();
    },
    show:function(){
        try {
          this.w.show();
        } catch (e) {
        }
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
      try {
          this.l.show();
      } catch (e) {}
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
                '<a href="javascript:qqLogin(\'webgameqq\');" class="qqlogin" tabindex="-1">QQ登录</a>'+
                '</p>'
        this.l.append(str);
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
        var code = login.verify.val().toLowerCase();
        if (code=='请输入验证码') {
          return true;
        }
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
                        "code":login.verify.val().toLowerCase(),
                        "service":Account.getloginHref(),
                        "type":"wb"
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
//注册
var register={
    init:function(){
        this.r = $('#register');
        this.appendHtml();
        this.yl = $('#yl-register',this.r);
        this.rimg = $('#regist-img',this.r);
        this.verify = $('#code-regist',this.r);
        this.pass = $('#passport',this.r);
		      this.password_msg = $('#password_msg',this.r);
        this.pwd = $('#password-regist',this.r);
        this.rePwd=$('#repassword',this.r);
        this.passport_msg=$('#passport_msg',this.r);
        this.agree=$('#agree',this.r).prop('checked');
		      this.repwd_msg = $('#repassword_msg',this.r);
        this.identify_code_msg = $('#identify_code_msg',this.r);

        this.bindEvent();
    },
    bindEvent:function(){
        this.yl.on('click',function(e){
			//alert(register.passport_msg.text());
			if(register.passport_msg.text() !== '账号已被注册'){
				if(e&&e.preventDefault){
					e.preventDefault();
				}else{
					window.event.returnValue = false;
				}
				register.tryRegister();
			}
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
      try {
        this.r.hide();
      } catch (e) {}
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
                '<label for="passport">帐号</label>'+
                '<input type="text" class="txt" name="pp" id="passport" tabindex="1" placeholder="请输入帐号">'+
                '<span class="not" id="passport_msg">由5-18位字母、数字或下划线组成</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="password">密码</label>'+
                '<input type="password" class="txt" name="pwd" id="password-regist" tabindex="2" placeholder="请输入密码">'+
                '<span class="not" id="password_msg">由6-32位字符组成（区分大小写）</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="repassword">确认密码</label>'+
                '<input type="password" class="txt" name="pwd" id="repassword" tabindex="3" placeholder="再次输入密码">'+
                '<span class="not" id="repassword_msg">再次输入登录密码</span>'+
                '</p>'+
                '<p class="formline clearfix">'+
                '<label for="code-regist">验证码</label>'+
                '<input type="text" class="code-regist" name="pwd" id="code-regist" tabindex="4" placeholder="请输入验证码">'+
                '<img src="" alt="" class="regist-img" id="regist-img">'+
				'<span class="not" id="identify_code_msg">请输入验证码</span>'+
                '</p>'+
                '<p class="rmline-reg">'+
                '<input type="checkbox" name="agree" id="agree" class="checked" checked="checked" readonly="readonly" disabled="disabled">'+
                '<label for="agree" class="agree">已阅读且同意</label>'+
                '<a href="http://www.duba.net/protocol/serverUse.shtml" target="_blank">《<span>金山网络服务协议</span>》</a>'+
                '</p>'+
                '<p class="bts clearfix">'+
                '<a href="javascript:void(0);" class="regbtn zhuce" hidefocus="true" class="" id="yl-register" tabindex="5">注册</a>'+
                '</p>'+
                '</div>'
        this.r.append(str);
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
        var code = register.verify.val().toLowerCase();
        //检测验证码
        if(code!='' && hex_md5(code) != register.md5Code){
            if (bTips) {
                register.errorCb();
                //console.log('1')
				register.identify_code_msg.text("验证码错误，请重新输入");
				register.identify_code_msg.removeClass("not").addClass("error_msg");
            }
            return false;
        }
        if (bTips) {
            register.errorHide();
            //console.log('2')
			register.identify_code_msg.text("请输入验证码");
			register.identify_code_msg.removeClass("error_msg").addClass("not");
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
  		register.passport_msg.text("由5-18位字母、数字或下划线组成");
  		register.passport_msg.removeClass("error_msg").addClass("not");
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
							register.passport_msg.text("账号已被注册");
							register.passport_msg.removeClass("not").addClass("error_msg");
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
	judgeWarning:function(){
		var msgs = register.password_msg.text();
		if(msgs == '密码格式错误，请重新输入'){
			return false;
		}else{
			return true;
		}
	},/*此处为判断是否隐藏警告提示语*/
    checkRePwd:function(){
        var password=register.pwd.val();
        var repassword=register.rePwd.val();
        //&& password == repassword
  		if(repassword == ''){
  			register.hidepwdError();
  			return true;
  		}
  		if(repassword!=''&&password == repassword){
  			register.hidepwdError();
  			return true;
  		}else{
  			register.setpwdError();
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
                        "code":register.verify.val().toLowerCase(),
                        "service":Account.getloginHref(),
                        "type":'wb'
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
//确认是ie
function sureie(){
  if(!+[1,]){
    return false;
  }else {
    return true;
  }
}
function qqLogin(a) {
    var e = encodeURIComponent(decodeURIComponent(Account.getloginHref()) + "&_qqlog=1");
    var b = "https://login.ijinshan.com/ologin?opentype=201";
    var d = "http://qq.login.ijinshan.com/qqconn/oauth/redirect_to_login.php?newpp=no&ver=7&t=1&p2url=" + encodeURIComponent(b) + ((e != undefined && e != "") ? "&service=" + e : "") + ((a != undefined && a != "") ? "&source=" + encodeURIComponent(a) : "");
    if(sureie()){setTimeout(function(){
      window.open("","_self");
      window.close();
    },15000)}
    childWindow = window.open(d);
    return
}
var Account = {
    // 初始化
    init: function(funcLogutCallback) {
        // 初始化框架
        dlg.init();
        // 生成登录链接
        this.loginHref = encodeURIComponent("http://i.wan.liebao.cn/login?supplier_id=5&go="+encodeURIComponent(encodeURIComponent(location.href)) );
        // 生成登出链接
        this.logoutHref=encodeURIComponent("http://i.wan.liebao.cn/logout?supplier_id=5&go="+encodeURIComponent(encodeURIComponent(location.href)) );
        // 拉去用户信息
        // 设置登出回调函数
        this.setLogoutCallback(funcLogutCallback);
        $.ajax({
            url:baseUrl+'account/1/get',
            type:'get',
            dataType:'jsonp',
            success:function(data){
                if(data.ret!='1'){
                   // dlg.show();
                   if (Account.logoutCallback != undefined ) {
                       Account.logoutCallback();
                   }
                   return;
                }
                // 用户已登录 销毁框架
                dlg.destory();
                // 填充用户uid
                Account.setID(data.data.uid);
                // 填充用户昵称
                // 如果昵称不存在则使用用户名
                if(data.data.nickname.length==0) {
                    Account.setName(data.data.username);
                }else{
                    Account.setName(data.data.nickname);
                }
                // 拉取用户ticket
                $.ajax({
                    url:baseUrl+'account/1/maketicket',
                    type:'get',
                    dataType:"jsonp",
                    success:function(data){
                        if(data.ret=='1'){
                            //装填ticket
                            Account.setTicket(data.ticket);
                        }
                    }
                });
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
            url:baseUrl+'account/1/logout',
            type:'post',
            data:{
                    "service":Account.getLogoutHref()
            },
            dataType:"jsonp",
            success:function(data){
                if(data.ret=='1'){
                    location.href = data.goto;
                }
            }
        });
    },
    //显示注册
    showRegister:function(){
      $('.sq-dialog-masking').show();
        dlg.show();
        register.show();
        login.hide();
		    dlg.registerBtn.addClass('select').siblings().removeClass('select');
    },
    // 设置当前未登录通知回调
    setLogoutCallback:function(f){
        this.logoutCallback=f;
    },
    //显示登录框
    showDlg:function(){
      $('.sq-dialog-masking').show();
        dlg.show();
        try {
		dlg.registerBtn.removeClass('select').siblings().addClass('select');
        } catch (e) {}
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
    register.pass.closest('span').addClass('notColor');
	register.passport_msg.text("账号格式错误，请重新输入");
	register.passport_msg.removeClass("not").addClass("error_msg");
})
register.hidePassError(function(){
    register.pass.removeClass('ableColor');
    register.pass.closest('span').removeClass('notColor');
	register.passport_msg.text("由5-18位字母、数字或下划线组成");
	register.passport_msg.removeClass("error_msg").addClass("not");
})
/*密码不一致*/
register.setRepwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.pwd.addClass('ableColor');
    register.pwd.closest('span').addClass('notColor');
	register.password_msg.text("密码格式错误，请重新输入");
	register.password_msg.removeClass("not").addClass("error_msg");

})
register.hideRepwdError(function(){
    register.pwd.removeClass('ableColor');
    register.pwd.closest('span').removeClass('notColor');
	register.password_msg.text("由6-32位字符组成（区分大小写）");
	register.password_msg.removeClass("error_msg").addClass("not");

})
register.setpwdError(function(){
    //register.rePwd.addClass('ableColor');
    register.rePwd.addClass('ableColor');
    register.rePwd.closest('span').addClass('notColor');
	register.repwd_msg.text("两次输入密码不一致，请重新输入");
	register.repwd_msg.removeClass("not").addClass("error_msg");
})
register.hidepwdError(function(){
    register.rePwd.removeClass('ableColor');
	register.repwd_msg.text("再次输入登录密码");
	register.repwd_msg.removeClass("error_msg").addClass("not");
})
//Account.init(function(){alert('1')});
