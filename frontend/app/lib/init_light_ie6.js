// Generated by CoffeeScript 1.12.7
(function() {
  var code, ssp, u;

  u = require('./util');

  window.W = window;

  W.$ = W.jQuery = $;

  if (W.cf == null) {
    W.cf = {};
  }

  $.extend(W, {
    util: u,
    popMsg: u.popMsg,
    warnMsg: u.warnMsg,
    log: u.log,
    _: require('underscore')
  });

  cf.agent = {
    iphone: /iPhone/i.test(navigator.userAgent),
    android: /android/i.test(navigator.userAgent),
    ipad: /iPad/i.test(navigator.userAgent)
  };

  cf.mob = cf.agent.iphone || cf.agent.android || cf.wechat || (document.body.clientWidth < 480);

  code = cf.code;

  cf._ld = $('#loading');

  $.extend(cf, {
    meta: {},
    model: {},
    view: {},
    widget: {},
    i18n: {},
    _tid: new Date().getTime(),
    popTime: 1000,
    _exr: [],
    _es: [],
    body: $('body')
  }, ssp = /\s+/, {
    ss: 'show',
    rsPre: "/r/",
    actPre: "/a/",
    root: (cf.mode ? "/module/" + code + "/" : "/"),
    resPrefix: (cf.mode ? "/module/" + code + "/" : "/"),
    resFolder: "upload/",
    rPath: (cf.mode ? "/res/" : cf.dm + "/"),
    modPath: (cf.mode ? "http://127.0.0.1:8088/" : cf.dm + "/upload/" + cf.code + "/lib/"),
    loadJS: require('./func/loadJS'),
    showPic: require('./func/showPic'),
    modPath: $("script[src*='lib.js']").attr('src').split('?')[0].replace('lib.js', ''),
    infoc: function(action) {
      var opt;
      opt = {
        code: cf.code,
        pathname: location.pathname,
        url: location.href,
        method: 'GET',
        agent: navigator.userAgent,
        lang: navigator.language
      };
      document.referrer && (opt.refer = document.referrer);
      if (action) {
        opt.action = action;
        opt.type = 'action';
      } else {
        opt.type = 'pv';
      }
      return $.post('/userTrack', opt);
    },
    ajaxOk: function(e, xhr, settings) {
      var m, result;
      if (!cf._jsonp && xhr.responseText && xhr.responseText.charAt(0) === '{') {
        result = JSON.parse(xhr.responseText);
        if (result.action) {
          eval(result.action);
        }
        if (typeof cf._mkOkMsg === "function") {
          cf._mkOkMsg(result);
        }
        if (result.msg && !cf.noReply) {
          m = result.msg.startsWith('m_') ? iim(result.msg, result._e) : result.msg;
          popMsg(m, "success");
        }
        return cf.noReply = false;
      }
    },
    ajaxErr: function(e, xhr, settings) {
      var result, sign, text;
      if (typeof this.ajaxStop === "function") {
        this.ajaxStop();
      }
      result = $.parseJSON(xhr.responseText);
      if (xhr.status < 300) {
        sign = "success";
      } else if (xhr.status >= 300 && xhr.status < 500) {
        sign = "warning";
      } else {
        sign = "danger";
      }
      if (result.action) {
        eval(result.action);
      }
      if (cf._mkErrMsg) {
        return cf._mkErrMsg(sign, result);
      } else {
        text = result.msg;
        if (text && text.indexOf('m_' > -1)) {
          text = ii(text, 'post');
        }
        if (result.msg && !cf.noReply) {
          popMsg(text, sign);
        }
        return cf.noReply = false;
      }
    },
    ajaxStart: function() {
      cf._ld.show();
      if (cf.blockLine) {
        return cf.blockBtn();
      }
    },
    ajaxStop: function() {
      cf._ld.hide();
      if (cf.blockLine) {
        cf.blockLine.removeClass('disabled');
        cf.blockLine.html(cf.blockText);
        if (cf.blockClass) {
          cf.blockLine.attr('class', cf.blockClass);
        }
        return cf.blockClass = cf.lockText = cf.blockLine = null;
      }
    },
    initAjax: function() {
      return $(document).ajaxStart(this.ajaxStart).ajaxStop(this.ajaxStop).ajaxSuccess(this.ajaxOk).ajaxError(this.ajaxErr);
    },
    blockBtn: function() {
      if (cf.blockLine.hasClass('glyphicon')) {
        cf.blockClass = this.blockLine.attr('class');
        cf.blockLine.removeAttr('class');
      }
      cf.blockText = cf.blockLine.text();
      cf.blockLine.addClass('disabled');
      return cf.blockLine.html("<span class='ajax-loader'>" + (ii('loading')) + "</span>");
    }
  });

  cf.initAjax();

  module.exports = cf;

}).call(this);

//# sourceMappingURL=init_light_ie6.js.map
