// Generated by CoffeeScript 1.12.7
(function() {
  m._vcode = function(code, opt) {
    var url;
    if (code == null) {
      code = 'vcode';
    }
    if (opt == null) {
      opt = {};
    }
    url = opt.url || util.actUrl('smsVerify');
    return $.extend(true, {
      code: code,
      isShow: function() {
        return !user.isLogin();
      },
      type: "text",
      id: 'verification',
      readonly: true,
      valid: {
        required: true
      },
      exBtn: [
        {
          text: iim('m_get', ii('vcode')),
          cls: 'getCode'
        }
      ],
      events: {
        'click .getCode': function(e) {
          var fm, t, v;
          fm = this;
          t = this.$('input[name="phone"]');
          v = t.val().trim();
          if (t.parent().hasClass('has-error') || !v.length) {
            alert('请输入正确的电话号码');
            return;
          }
          return $.get(url, {
            phone: t.val(),
            sTmpl: 'sendVcode'
          }, function(res) {
            if (res._vcode) {
              fm.model.set('_vcode', res._vcode);
              fm.$('[name="vcode"]').removeAttr('readonly');
              util.ct(e).text('短息已发送...').removeClass('getCode').addClass('disabled');
              return cf.bbEvt.trigger('newPsd', 'fpForm');
            } else if (res._exsit) {
              if (fm._vcodeExist) {
                return fm._vcodeExist();
              } else {
                return popMsg('本手机已注册,请更换手机号', 'warning');
              }
            } else {
              return popMsg('获取验证码失败');
            }
          });
        }
      }
    }, opt);
  };

  m.common.vcode = m._vcode();

}).call(this);

//# sourceMappingURL=vcode.js.map
