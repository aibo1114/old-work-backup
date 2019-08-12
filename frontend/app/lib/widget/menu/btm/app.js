// Generated by CoffeeScript 1.12.7
(function() {
  require('./style.sass');

  module.exports = _exv('btmMenu', '_tag', {
    tmpl: require('./tmpl.jade'),
    dep: true,
    parent: 'body',
    data: {},
    _one: true,
    init: function() {
      if (this.dep) {
        this.listenTo(user, 'login', (function(_this) {
          return function(p, menu) {
            if (p == null) {
              p = 'login';
            }
            if (menu == null) {
              menu = user.menu;
            }
            return _this.setMenu(p, menu);
          };
        })(this));
        return this.listenTo(user, 'logout', (function(_this) {
          return function() {
            return _this._close();
          };
        })(this));
      }
    },
    setMenu: function(code, data) {
      var nc;
      nc = this.$el.children().attr('code');
      if (nc !== code) {
        this.data.menus = data;
        this.$el.children().attr('code', code);
        this.render();
        return this.show();
      }
    },
    render: function() {
      cf.view._tag.prototype.render.call(this);
      return this.$("[href='" + location.hash + "']").addClass('active');
    },
    events: {
      'click .nav-item': function(e) {
        var t;
        t = util.ct(e);
        t.siblings().children().removeClass('active');
        t.children().addClass('active');
        return typeof this.afterClick === "function" ? this.afterClick() : void 0;
      }
    },
    hide: function(hasBtm) {
      if (hasBtm == null) {
        hasBtm = false;
      }
      this.$el.hide();
      if (!hasBtm) {
        return cf.body.removeClass('hasBtmMenu');
      }
    },
    show: function() {
      this.$el.show();
      return cf.body.addClass('hasBtmMenu');
    }
  });

}).call(this);

//# sourceMappingURL=app.js.map
