// Generated by CoffeeScript 1.12.7
(function() {
  var lg;

  require('../../lib/meta/user');

  require('../../lib/meta/extend/vcode');

  $.extend(true, m.user, {
    loginUrl: util.actUrl('auth', 'login'),
    loginProp: [_ep('username'), _ep('password')],
    regProp: [_ep('username'), _ep('phone'), _ep('vcode'), _ep('password'), _ep('rpsd')]
  });

  $.extend(m._.fmBtn, {
    login: function() {
      return {
        cls: _st.btn('primary', 'lg', true, 'save')
      };
    },
    forgetPsd: function() {
      return {
        cls: "lost fl"
      };
    },
    reg: function() {
      return {
        cls: _st.btn('primary', 'lg', true, 'save')
      };
    },
    register: function() {
      return {
        cls: _st.btn('primary', 'lg', true, 'save')
      };
    }
  });

  $.extend(m._.event, {
    lost: {
      type: 'click',
      fun: function() {
        if (this.mode === 'modal') {
          this.$el.modal("hide");
        }
        return lg.forgetPsdForm('air');
      }
    },
    reg: {
      type: 'click',
      fun: function() {
        if (this.mode === 'modal') {
          this.$el.modal("hide");
        }
        return lg.regForm('air');
      }
    }
  });

  lg = {
    feedbackForm: function(p, opt) {
      return app.dm.form(p, 'feedback', opt);
    },
    settingForm: function(opt) {
      return app.dm.form('air', 'user', $.extend({
        title: iic('cfg'),
        btns: ['save'],
        prop: [_ep('title')],
        callback: this._cCallback
      }, opt));
    },
    changePsdForm: function(p, opt) {
      return app.dm.form(p, 'user', $.extend({
        title: iic('account'),
        toFetch: false,
        id: 'cPsdFm',
        data: function() {
          return user.pick('_id', 'username', 'email');
        },
        prop: [
          _ep('username', {
            readonly: true
          }), _ep('opsd', {
            exBtn: [
              {
                text: iim('m_valid', ii('password')),
                cls: 'verifyPsd'
              }
            ],
            events: {
              'click .verifyPsd': function() {
                return $.post(util.actUrl('auth/checkPsd'), {
                  _id: user.id,
                  password: this.$('input[name="opsd"]').val().trim()
                }, (function(_this) {
                  return function() {
                    cf.bbEvt.trigger('newPsd', 'cPsdFm');
                    return _this.$('.save').removeClass('disabled');
                  };
                })(this));
              }
            }
          })
        ],
        btns: ['save'],
        callback: function() {
          return this.$('.save').addClass('disabled');
        },
        info: '为了保护您账户和资料的安全，请定期修改您的密码',
        _saveSuccess: function(model) {
          if (model.view.mode === 'modal') {
            model.view.closeDlg();
          } else {
            cf.slider.slidePage();
          }
          return util.deleteCookie('_vCode');
        },
        before: function(p) {
          util.del('opsd', p);
          util.del('rpsd', p);
          return p;
        }
      }, opt));
    },
    forgetPsdForm: function(ctn, opt) {
      var p;
      if (ctn == null) {
        ctn = 'air';
      }
      if (opt == null) {
        opt = {};
      }
      p = opt.setEmail ? [_ep('email')] : [
        _ep('phone'), m._vcode(null, {
          url: util.actUrl('smsFindPsd')
        })
      ];
      return app.dm.form(ctn, 'user', $.extend({
        id: "fpForm",
        title: '忘记密码',
        toFetch: false,
        entity: "user",
        noTopAdd: true,
        asterisk: false,
        prop: p,
        btns: ["save"],
        eventList: ['sKey'],
        urlRoot: util.actUrl('auth/resetPsd'),
        saveSuccess: function(model, resp, options) {
          model.view.closeDlg();
          popMsg('密码修改成功');
          util.deleteCookie('_vCode');
          if (user.isLogin()) {
            return user.logout();
          }
        }
      }, opt));
    },
    regForm: function(p, opt) {
      return app.dm.form(p, 'user', $.extend({
        id: "regForm",
        toFetch: false,
        prop: m.user.regProp,
        title: '用户注册',
        btns: ['reg']
      }, opt));
    },
    loginForm: function(p, opt) {
      if (p == null) {
        p = 'air';
      }
      return app.dm.form(p, 'user', $.extend({
        id: "loginForm",
        title: function() {
          return ii('login');
        },
        urlRoot: m.user.loginUrl,
        style: 'panel-primary',
        toFetch: false,
        asterisk: false,
        prop: m.user.loginProp,
        btns: ["login", "forgetPsd"],
        eventList: ['sKey', 'lost', 'reg'],
        callback: this._cCallback,
        before: function(attr) {
          var n, v;
          cf.view.form.prototype.before.call(this, attr);
          n = attr.username;
          v = this.model.validator;
          if (!v.email(n)) {
            attr.email = n;
          } else if (!v.telephone(n)) {
            attr.phone = n;
          }
          return attr;
        },
        saveSuccess: function(model, resp, options) {
          model.view.closeDlg();
          return user.login(resp.user);
        }
      }, opt));
    }
  };

  cf.bbEvt.on('newPsd', function(fid) {
    var fm, mo;
    fm = $('#' + fid);
    if (fm.length && (mo = fm.data('_item'))) {
      mo.renderSpeProp(_ep('password', {
        label: '新密码'
      }));
      return mo.renderSpeProp(_ep('rpsd', {
        valid: {
          equalTo: "#" + fid + " #rpsd",
          required: true
        }
      }));
    }
  });

  module.exports = lg;

}).call(this);

//# sourceMappingURL=login.js.map
