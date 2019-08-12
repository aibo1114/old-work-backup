/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			$.cookie(key, '', $.extend(options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

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
     * @description get query string
     * @param {string} keyname
     */ 
    var getQueryString = function(param) {
        // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
        if (location.href.indexOf("?") === -1 || location.href.indexOf(name + '=' ) === -1) {
            return '';
        }

        // 获取链接中参数部分
        var queryString = location.href.substring(location.href.indexOf("?") + 1);
        // 分离hash部分
        if (queryString.indexOf("#") !== -1) {
            queryString = queryString.substring(0, queryString.indexOf("#"));
        }

        // 分离参数对 ?key=value&key2=value2
        var parameters = queryString.split("&");

        var pos, paraName, paraValue;
        for (var i = 0; i < parameters.length; i++) {
            // 获取等号位置
            pos = parameters[i].indexOf('=');
            if (pos === -1) { continue; }

            // 获取name 和 value
            paraName = parameters[i].substring(0, pos);
            paraValue = parameters[i].substring(pos + 1);

            // 如果查询的param等于当前param，就返回当前值，同时，将链接中的+号还原成空格
            if (paraName === param) {
                return paraValue.replace(/\+/g, " ");
            }
        }
        return '';
    };

    /**
     * @private
     * @description disable regist
     */ 
    var disableBtn = function(str) {
        $('#registbtn').addClass('disable')
                       .text(str);
    };

    /**
     * @private
     * @description enable regist
     */
    var enableBtn = function() {
        $('#registbtn').removeClass('disable')
                       .text('注册账号');
    };

    /**
     * @private
     * @description switch status
     * @param {string} class
     */
    $.fn.switchStatus = function(str) {
        $(this).removeClass('alerm')
               .removeClass('success')
               .removeClass('normal')
               .addClass(str);
        return $(this);
    };

    /**
     * @private
     * @description init event
     */ 
    var initEvent = function() {
        // checkbox status
        $('.registinfo').delegate('.checkbox', 'click', function() {
            $(this).toggleClass('checkmark');
            if ($(this).hasClass('checkmark')) {
                enableBtn();
            } else {
                disableBtn('注册账号');
            }
        });

        // recommend btn event
        $('.notice').delegate('.recommend', 'click', function() {
            $('#passport').val($(this).attr('data-recommend')).blur();
        });
        
        // login window
        $('#loginwin').bind('click', function() {
            // get window mask size
            var $mask = $('<div></div>').addClass('mask');
            var $doc = $(document);
            
            $mask.css({
                'width': $doc.width(),
                'height': $doc.height(),
                'opacity': '0.5'
            }).appendTo($('body'));
        
            $mask.fadeIn('fast');
            var $loginwin = '<div class="win" id="win">' +
                            '<h2 class="login pngfix">login</h2>' +
                            '<div class="loginpad pngfix">' +
                            '<iframe src="" frameborder="0" width="509" height="288" allowtransparency="true"></iframe>' +
                            '</div>' +
                            '<a href="javascript:void(0);" class="closewin pngfix">close</a>' +
                            '</div>';
            var url = 'https://login.ijinshan.com/webgame/login.html?service=http://wan.xoyo.com/u.php?a=dologin&source=webgame#!/home';
            $loginwin = $($loginwin);
            $loginwin.appendTo($('body'))
                     .find('iframe')
                     .attr('src', url);
            // show login pad
            $loginwin.fadeIn('fast');

        });
        
        // mask cancel event
        $('.mask').live('click', function(){
            $(this).fadeOut('fast', function() {
                $(this).remove();
            });

            // hide login pad
            $('#win').fadeOut('fast', function() {
                $(this).remove();
            });
        });

        // closewin btn
        $('.closewin').live('click', function() {
            $('.mask').click();
        });

        // regist btn
        $('#registbtn:not(.disable)').live('click', function() {
            disableBtn('请稍候');

            // all check
            $('#passport, #password, #repassword, #c').blur();
            if ($('.registinfo input.error').length > 0) {
                // 有错误信息
                $('.registinfo input.error').each(function(index) {
                    var errortrace = $(this).attr('data-error');
                    WebApp.analytics.trace('151010', '401', '', '', 'gamename:vplatregpage|w:' + errortrace);
                });
            
                enableBtn();
                return;
            }
            
            var passport = $('#passport').val();
            var password = $('#password').val();
            var c = $('#c').val();
            var source = getQueryString('source');
            var success_href = getQueryString('redirect');
            var regsource = getQueryString('regsource') ? getQueryString('regsource') : $.cookie('regsource');
            var regsource_ext = getQueryString('regsource_ext') ? getQueryString('regsource_ext') : $.cookie('regsource_ext');

            var url = '/u.php?a=register';
            var data = {
                'passport': passport,
                'password': password,
                'c': c,
                'source'  : source,
                'redirect': success_href,
                'regsource': regsource,
                'regsource_ext': regsource_ext
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
                            var redirect = json.url;
                            $.removeCookie('regsource', {path: '/', 'domain':'wan.xoyo.com'});
                            $.removeCookie('regsource_ext', {path: '/', 'domain':'wan.xoyo.com'});
                            location.href = redirect;
                            return;
                        // 用户已存在
                        case '102':
                            if (json.recommend === '') {
                                var str = '账号已存在';
                            } else {
                                var str = '账号已存在，推荐您使用 <input type="radio" class="recommend" data-recommend="' + json.recommend + '" style="vertical-align:middle;" />' + json.recommend  + '';
                            }
                            $('#passport').siblings('.notice')
                                          .switchStatus('alerm')
                                          .html(str);
                            $("#passport").addClass('error')
                                          .focus();
                            enableBtn();
                            $("#code").click();
                            WebApp.analytics.trace('151010', '401', '', '', 'gamename:vplatregpage|w:ppexist');
                            break;
                        // 验证码错误
                        case '104':
                            $('#c').siblings('.notice')
                                   .switchStatus('alerm')
                                   .text('验证码错误');
                            $("#c").addClass('error')
                                   .focus();
                            enableBtn();
                            $("#code").click();
                            WebApp.analytics.trace('151010', '401', '', '', 'gamename:vplatregpage|w:errorcode');
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
                            $('#passport').siblings('.notice')
                                          .switchStatus('alerm')
                                          .text('未知错误' + code);
                            enableBtn();
                            $("#code").click();
                            WebApp.analytics.trace('151010', '401', '', '', 'gamename:vplatregpage|w:unknowerror' + code);
                            break;
                        default:
                            $('#passport').siblings('.notice')
                                          .switchStatus('alerm')
                                          .text('未知错误' + code);
                            enableBtn();
                            $("#code").click();
                            WebApp.analytics.trace('151010', '401', '', '', 'gamename:vplatregpage|w:unknowerror' + code);
                            break;
                    }
                }
            });
        });
        
        // passport check
        $('#passport').bind('blur', function() {
            var $target = $(this);
            var passport = $('#passport').val();
            var $notice = $target.siblings('.notice');

            // length dely
            if (passport.length < 5 || passport.length > 18) {
                $notice.switchStatus('alerm')
                       .text('账号长度为5-18位，请重新输入');
                $target.addClass('error')
                       .attr('data-error', 'pplengtherror');
                return;
            }
            
            // underline begin dely
            if (passport.substr(0, 1) === "_") {
                $notice.switchStatus('alerm')
                       .text('账号不能以下划线开头');
                $target.addClass('error')
                       .attr('data-error', 'ppunderscroeerror');
                return;
            }

            // style dely
            var reg = /^[a-zA-Z\d_]+$/;
            if (!reg.test(passport)) {
                $notice.switchStatus('alerm')
                       .text('账号必须为字母、数字或下划线组成');
                $target.addClass('error')
                       .attr('data-error', 'ppworderror');
                return;
            }

            // unable words
            var diswords = ['bjsupport', 'kingsoft', 'cb', 'ks', 'gm', 'test', 'fs', 'jx', 'db', 'cq', 'blog', 'passport', 'vip', 'wps', 'system', 'duba', 'ciba', 'xoyo', 'kol', 'shqz', 'hujintao', 'wenjiabao', 'jiangzemin', 'zhurongji', 'qiubojun', 'leijun', 'flg', 'falun', 'minghui', 'lihongzhi', 'tmd', 'nmd', 'fuck', 'sex', 'xxx', 'penis', 'viagra', 'tits', 'pussy', 'shit', 'damn', 'bastard', 'asshole', 'bitch', 'vagina', 'breast', 'root', 'admin', 'gm', 'gamemaster'];
            for (var i = 0; i < diswords.length; i++) {
                if (passport.toLowerCase().indexOf(diswords[i]) !== -1) {
                    $notice.switchStatus('alerm')
                           .text('账号包含非法字符，请重新输入');
                    $target.addClass('error')
                           .attr('data-error', 'ppdiswordserror');
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
                            $notice.switchStatus('alerm')
                                   .html(str);
                            $target.addClass('error')
                                   .attr('data-error', 'ppexist');
                            return;
                        // 用户不存在
                        case '103':
                            // passport currect
                            $notice.switchStatus('success')
                                   .text('恭喜，账号可用');
                            $target.removeClass('error');
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
            var $notice = $target.siblings('.notice');

            // length dely
            if(password.length < 8 || password.length > 32) {
                $notice.switchStatus('alerm')
                       .text('密码由8-32位字符组成');
                $target.addClass('error')
                       .attr('data-error', 'pswlengtherror');
                return;
            }
            
            // password currect
            $notice.switchStatus('normal')
                   .text('密码由8-32位字符组成（区分大小写）');
            $target.removeClass('error');
            return;
        });

        // repassword check
        $('#repassword').bind('blur', function() {
            var $target = $(this);
            var password = $('#password').val();
            var repassword = $('#repassword').val();
            var $notice = $target.siblings('.notice');

            // uneq dely
            if(password !== repassword) {
                $notice.switchStatus('alerm')
                       .text('两次输入密码不一致，请重新输入');
                $target.addClass('error')
                       .attr('data-error', 'repswerror');
                return;
            }
            
            // repassword currect
            $notice.switchStatus('normal')
                   .text('再次输入登陆密码');
            $target.removeClass('error');
            return;
        });

        // code check
        $('#c').bind('blur', function() {
            var $target = $(this);
            var code = $('#c').val();
            var $notice = $target.siblings('.notice');

            // length dely
            if(code.length === 0) {
                $notice.switchStatus('alerm')
                       .text('请输入图片中的验证码');
                $target.addClass('error')
                       .attr('data-error', 'codelengtherror');
                return;
            }

            // code currect
            $notice.switchStatus('normal')
                   .text('请输入图片中的验证码');
            $target.removeClass('error');
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

        // blur and focus
        $('input[type=text], input[type=password]').bind('focus', function() {
            $(this).addClass('focus');
        }).bind('blur', function() {
            $(this).removeClass('focus');
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


var valid = {
    map: {
        'passport': {
            'tip':'111',
            'alerm':''
        },
        'password': {
            'tip':'222',
            'alerm':''
        },
        'password2': {
            'tip':'333',
            'alerm':''
        },
        'c': {
            'tip':'333',
            'alerm':''
        }
    },
    alerm: function(key, content, callback) {
        map[key]['alerm'] = content;
        callback(key, content);
    },
    tip: function (key, content, callback) {
        map[key]['tip'] = content;
        callback(key, content);
    },
    fetch: function(key) {
        if(map[key]['alerm'] != null) {
            return map[key]['alerm'];
        }
        if(alerms.length != 0) {
            return alerms[0];
        }
        return map[key]['tip'];
    },
    alerms: function () {
        var ret = [];
        for(var k in map) {
            if(map[k]['alerm'] != '') {
                ret.push(map[k]['alerm']);
            }
        }
        return ret;
    }
}

/*
valid.alerm('passport', '内容', function(key, content) {
   $('#' + key).addClass('alerm'); 
});
valid.tip('passport', '内容', function(key, content) {
    $('#' + key).addClass('tip'); 
});

valid.fetch('passport');
*/
