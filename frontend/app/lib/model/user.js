// Generated by CoffeeScript 1.12.7
(function() {
  var entity;

  entity = require('./entity');

  require('./../meta/user');

  module.exports = entity.extend({
    entity: 'user',
    username: null,
    _func: {
      label: ii('prop'),
      icon: 'th',
      children: [
        {
          href: util.navUrl('home/profile'),
          icon: 'user',
          isShow: function() {
            return !cf._scf && cf.index !== 'console';
          },
          label: ii('profile')
        }, {
          func: 'app.account()',
          icon: 'wrench',
          label: ii('account')
        }, {
          func: 'app.setting()',
          isShow: function() {
            return user.isAdmin() && cf.index === 'console';
          },
          icon: 'cog',
          label: ii('setting')
        }, 'hr', {
          func: 'user.logout()',
          icon: 'log-out',
          label: ii('logout')
        }
      ]
    },
    setMenu: function(home, suf) {
      var mg, res;
      res = this.menu ? this.menu.slice(0) : [];
      if (home) {
        res.unshift(home);
      }
      mg = suf ? suf($.extend(true, {}, this._func)) : this._func;
      return res.concat(mg);
    },
    pStr: function() {
      return "username,email,roles#" + cf.cid + "__" + cf.lang;
    },
    update: function(ob, cb) {
      return this.save(ob, {
        patch: true,
        success: function() {
          if (typeof cb === "function") {
            cb();
          }
          return user.storeAuth();
        }
      });
    },
    storeAuth: function(s) {
      if (!s) {
        s = JSON.stringify(this.toJSON());
      }
      if (localStorage) {
        localStorage.setItem('lc', new Date().getTime());
        return localStorage.setItem('lur', s);
      }
    },
    removeData: function() {
      var i, it, len, ref;
      ref = ['id', 'username', 'roles', 'orgs', 'menu', 'entities', 'permission'];
      for (i = 0, len = ref.length; i < len; i++) {
        it = ref[i];
        util.del(it, this);
      }
      util.deleteCookie('woid');
      util.deleteCookie('wCode');
      this.clear();
      if (localStorage) {
        localStorage.removeItem('lc');
        localStorage.removeItem('lur');
        return localStorage.removeItem('woid');
      }
    },
    onlineCheck: function() {
      log('check online');
      cf.noReply = true;
      return $.get(app.checkSvrAuth).done(function(res) {
        return user.auth(res.user ? res.user : res);
      }).fail(function() {
        app.start();
        return cf.r(app.logoutPath);
      });
    },
    offlineCheck: function() {
      var res, time;
      log('check offline');
      if (localStorage) {
        time = localStorage.getItem('lc');
        res = localStorage.getItem('lur');
        if (time && res) {
          if ((new Date().getTime() - time) < 20 * 60 * 1000) {
            this.auth($.parseJSON(res));
            return;
          }
        }
      }
      if (app.wtAutoLogin && (app.woid = util.getCookie('woid'))) {
        return this.loginByWoid();
      } else {
        return app.start();
      }
    },
    entityAuth: function(entity, code) {
      var c;
      if (!this.mgm || !this.mgm.entity || !this.mgm.entity[entity]) {
        return true;
      }
      c = this.mgm.entity[entity];
      if (_.isNumber(c) || (c && c.indexOf(code) > -1) || c === 'x') {
        return true;
      } else {
        return false;
      }
    },
    pageAuth: function(page) {
      var c;
      if (page == null) {
        page = cf.index;
      }
      if (!this.permission || !this.permission[page]) {
        return true;
      }
      c = !this.permission[page];
      if (c.indexOf(page) > -1) {
        return true;
      } else {
        return false;
      }
    },
    check: function() {
      return this.isLogin() && (this.permission.length === 0 || this.permission.has(cf.index));
    },
    auth: function(op) {
      log('auth...');
      this.storeAuth(JSON.stringify(op));
      this.roles = util.del('roles', op);
      this.orgs = util.del('orgs', op);
      this.menu = util.del('menu', op);
      this.entities = util.del('entities', op);
      this.permission = util.del('permission', op);
      this.username = op.username;
      this.set(op);
      util.setCookie('__ux', this.id + ":" + this.username);
      this.trigger('login');
      if (this.check()) {
        this._afterLogin();
        if (typeof this.extraData === "function") {
          this.extraData();
        }
      } else {
        this.failAuth();
      }
      if (this.afterAuth) {
        return this.afterAuth(function() {
          return app.start();
        });
      } else {
        return app.start();
      }
    },
    _afterLogin: function() {
      if (typeof this.afterLogin === "function") {
        this.afterLogin();
      }
      if (cf._toLogin) {
        cf.r(cf._toLogin);
        return util.del('_toLogin', cf);
      } else if (location.hash === util.navUrl('login')) {
        return location.hash = util.navUrl(app.dfPath);
      }
    },
    failAuth: function() {
      popMsg('权限不足', 'warning');
      this.removeData();
      return cf.r('login');
    },
    login: function(op) {
      this.auth(op);
      return this;
    },
    isOwner: function(id) {
      return this.id === id;
    },
    isLogin: function() {
      return this.id && !this.fake;
    },
    is3rdLogin: function() {
      return this.agent;
    },
    failLogin: function() {
      popMsg('m.login_d', 'warning');
      return this.logout();
    },
    logout: function() {
      if (this.isLogin()) {
        $.post(this.logoutUrl || util.actUrl(cf.auth || "auth", "logout"));
        this.trigger('logout');
      }
      if (typeof this.afterLogout === "function") {
        this.afterLogout();
      }
      this.removeData();
      if (app.logoutPath) {
        return cf.r(app.logoutPath);
      }
    },
    isPermit: function(str) {
      return this.isAdmin() || (this.permission && this.permission.include(str));
    },
    isNav: function(model, action) {
      var c, f, i, j, k, len, len1, len2, m, ref, ref1, ref2;
      if (this.isAdmin()) {
        return true;
      }
      ref = this.channel;
      for (i = 0, len = ref.length; i < len; i++) {
        c = ref[i];
        if (c.href === '#!' + location.href.split('#!')[1]) {
          return true;
        }
      }
      ref1 = this.menu;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        m = ref1[j];
        if (m.entity === model) {
          if (m.action === action) {
            return true;
          }
        }
      }
      ref2 = this.footer;
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        f = ref2[k];
        if (f.href === '#!' + location.href.split('#!')[1]) {
          return true;
        }
      }
      return false;
    },
    hasRole: function(role) {
      var i, it, len, ref;
      if (this.roles) {
        ref = this.roles;
        for (i = 0, len = ref.length; i < len; i++) {
          it = ref[i];
          if (role.indexOf(it.title) > -1) {
            return true;
          }
        }
      }
      return false;
    },
    isRoot: function() {
      return this.toJSON()._root;
    },
    isAdmin: function() {
      return this.isRoot() || this.hasRole('admin');
    },
    qrId: function() {
      return 30000 + this.id;
    },
    mergeUser: function(title, wCode, cb) {
      if (title == null) {
        title = '同步用户信息';
      }
      return app.dm.form('air', 'user', {
        title: title,
        data: function() {
          return {
            uid: user.id,
            wCode: wCode,
            woid: util.getCookie('woid')
          };
        },
        prop: [_ep('user:phone'), _ep('user:wid')],
        btns: ['save'],
        _save: function(t) {
          var v;
          v = this;
          cf.blockLine = t;
          return $.post(util.actUrl('auth/merge'), this.model.toJSON(), function(res) {
            user.logout();
            user.auth(res.user);
            v.closeDlg();
            return typeof cb === "function" ? cb() : void 0;
          });
        }
      });
    },
    pick: function(str) {
      var opt;
      if (str == null) {
        str = '';
      }
      opt = [cf.id, 'username'];
      return _.pick(this.attributes, opt.concat(str.split(',')));
    }
  });

}).call(this);

//# sourceMappingURL=user.js.map
