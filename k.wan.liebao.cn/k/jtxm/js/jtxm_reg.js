/**
 * @fileOverview Login & Register
 * @author LongZhou
 * @version 1.0.1
 */
var WebApp = WebApp || {};

/**
 * @namespace
 */
WebApp.index = (function() {
    /**
     * @private
     * @description disable regist
     */ 
    var disableBtn = function() {
        $('#registbtn').addClass('disable');
    };

    /**
     * @private
     * @description enable regist
     */
    var enableBtn = function() {
        $('#registbtn').removeClass('disable');
    };

    /**
     * @private
     * @description init event
     */ 
    var initEvent = function() {
        // checkbox status
        $('#agree').bind('click', function() {
            if ($(this).attr('checked') === 'checked') {
                enableBtn();
            } else {
                disableBtn();
            }
        });

        // recommend btn event
        $('.notice').delegate('.recommend', 'click', function() {
            $('#passport').val($(this).attr('data-recommend')).blur();
        });
        // regist btn
        $('#registbtn:not(.disable)').live('click', function() {
            disableBtn();

            // all check
            $('#passport, #password, #repassword, #c').blur();
            if ($('.regbox input.error').length >0) {
                enableBtn();
                return;
            }

            var passport = $('#passport').val();
            var password = $('#password').val();
            var c = $('#c').val();

            var url = '/u.php?a=register';
            var data = {
                'passport': passport,
                'password': password,
                'c': c
            };
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                async: false,
                success: function(json) {
                    var code = json.code;
                    switch(code) {
                        // 成功
                        case '100':
                            _gaq.push(["_trackPageview", '/virtual/account/register/jtxm']);
                            var redirect = json.url + '&service=' + "http%3A%2F%2Fwan.xoyo.com%2Fv%2F%3Fa%3Dloginwebgame%26webgame_serverid%3D1" + "%26src%3D41403";
                            location.href = redirect;
                            return;
                        // 用户已存在
                        case '102':
			    if (json.recommend === '') {
                                var str = '账号已存在';
                            } else {
                                var str = '账号已存在，推荐您使用 <input type="radio" class="recommend" data-recommend="' + json.recommend + '" style="vertical-align:middle;" />' + json.recommend  + '';
                            }
                            $("#passport").addClass('error')
                                          .focus()
					  .siblings('.notice')
                                   	  .html(str);
                            enableBtn();
                            $('#code').click();
                            break;
                        // 验证码错误
                        case '104':
                            $("#c").addClass('error')
                                   .focus()
                                   .siblings('.notice')
                                   .text('验证码错误');
                            enableBtn();
                            $('#code').click();
                            break;
                        // 参数错误
                        case '101':
                        // 用户不存在
                        case '103':
                        // 用户名输入错误
                        case '105':
                        // 用户名过滤错误
                        case '106':
                        // 登录密码输入错误
                        case '107':
                            $("#passport").siblings('.notice')
                                          .text('未知错误' + code);
                            enableBtn();
                            $('#code').click();
                            break;
                        default:
                            $("#passport").siblings('.notice')
                                          .text('未知错误' + code);
                            enableBtn();
                            $('#code').click();
                            break;
                    }
                }
            });
        });
        
        // passport check
        $('#passport').bind('blur', function() {
            var $target = $(this);
            var passport = $('#passport').val();

            // length dely
            if (passport.length < 5 || passport.length > 18) {
                $target.addClass('error')
                       .siblings('.notice')
                       .text('账号长度必须为5-18位');
                return;
            }

            // underline begin dely
            if (passport.substr(0, 1) === '_') {
                $target.addClass('error')
                       .siblings('.notice')
                       .text('账号不能以下划线开头');
                return;
            }
            
            // style dely
            var reg = /^[a-zA-Z\d_]+$/;
            if (!reg.test(passport)) {
                $target.addClass('error')
                       .siblings('.notice')
                       .text('账号由字母、数字或下划线组成');
                return;
            }

            // unable words
            var diswords = ['bjsupport', 'kingsoft', 'cb', 'ks', 'gm', 'test', 'fs', 'jx', 'db', 'cq', 'blog', 'passport', 'vip', 'wps', 'system', 'duba', 'ciba', 'xoyo', 'kol', 'shqz', 'hujintao', 'wenjiabao', 'jiangzemin', 'zhurongji', 'qiubojun', 'leijun', 'flg', 'falun', 'minghui', 'lihongzhi', 'tmd', 'nmd', 'fuck', 'sex', 'xxx', 'penis', 'viagra', 'tits', 'pussy', 'shit', 'damn', 'bastard', 'asshole', 'bitch', 'vagina', 'breast', 'root', 'admin', 'gm', 'gamemaster'];
            for (var i = 0; i < diswords.length; i++) {
                if (passport.toLowerCase().indexOf(diswords[i]) !== -1) {
                    $target.addClass('error')
                           .siblings('.notice')
                           .text('账号包含非法字符');
                    return;
                }
            }

            // exist passport
            var url = '/u.php?a=isexistedu';
            var data = {
                'passport': passport
            };
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function(json) {
                    var code = json.code;
                    switch(code){
                        // 用户已存在
                        case '102':
                            if (json.recommend === '') {
                                var str = '账号已存在';
                            } else {
                                var str = '账号已存在，推荐您使用 <input type="radio" class="recommend" data-recommend="' + json.recommend + '" style="vertical-align:middle;" />' + json.recommend  + '';
                            }
                            $target.addClass('error')
                                   .siblings('.notice')
                                   .html(str);
                            return;
                        // 用户不存在
                        case '103':
                            // passport currect
                            $target.removeClass('error')
                                   .siblings('.notice')
                                   .html('<span style="color:#22C101;">恭喜，账号可用</span>');
                            return;
                        default:
                            break;
                    }
                }
            });
        });

        // password check
        $('#password').bind('blur', function() {
            var $target = $(this);
            var password = $('#password').val();

            // length dely
            if(password.length < 8 || password.length > 32) {
                $target.addClass('error')
                       .siblings('.notice')
                       .text('密码由8-32位字符组成');
                return;
            }
            
            // password currect
            $target.removeClass('error')
                   .siblings('.notice')
                   .text('');
            return;
        });

        // repassword check
        $('#repassword').bind('blur', function() {
            var $target = $(this);
            var password = $('#password').val();
            var repassword = $('#repassword').val();

            // uneq dely
            $target.removeClass('error');
            if(password !== repassword) {
                $target.addClass('error')
                       .siblings('.notice')
                       .text('两次输入密码不一致');
                return;
            }
            
            // repassword currect
            $target.removeClass('error')
                   .siblings('.notice')
                   .text('');
            return;
        });

        // code check
        $('#c').bind('blur', function() {
            var $target = $(this);
            var code = $('#c').val();

            // length dely
            if (code.length === 0) {
                $target.addClass('error')
                       .siblings('.notice')
                       .text('请输入图片中的验证码');
                return;
            }

            // code currect
            $target.removeClass('error')
                   .siblings('.notice')
                   .text('');
            return;
        }).bind('keydown', function(event) {
            if (event.which === 13) {
                $('#registbtn').click();
            }
        });

        // change code
        $('#code').bind('click', function() {
            $('#code').attr('src', '/service/?a=captcha&t=' + new Date().getTime());
        });
    };
    
    /**
     * @scope WebApp.index
     */
    return {
        /**
         * @description init namespace 
         */ 
        init: function() {
            initEvent();
            $('#code').click();
        }
    };
}());

$(document).ready(function() {
    WebApp.index.init();
});

