// Generated by CoffeeScript 1.12.7
(function() {
  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $.extend(cf.router.prototype, {
    checkPage: function(p) {
      var i, it, len, ref;
      if (!p) {
        return false;
      } else if (indexOf.call(this.noAuthPath, p) >= 0) {
        return true;
      }
      if (user.isLogin()) {
        if (user.authPage) {
          ref = user.authPage;
          for (i = 0, len = ref.length; i < len; i++) {
            it = ref[i];
            if (p.indexOf(it) > -1) {
              return true;
            }
          }
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    checkFail: function() {
      cf._toLogin = location.hash || app.loginPath;
      return cf.r('login');
    }
  });

}).call(this);

//# sourceMappingURL=userRouterCheck.js.map