// Generated by CoffeeScript 1.12.7
(function() {
  var router;

  cf.id = '_id';

  router = require('./router');

  Backbone.Model.prototype.idAttribute = cf.id;

  module.exports = router.extend({
    checkAuth: true,
    wtAutoLogin: false,
    dfPath: 'home',
    _mod_ctn: '#content',
    noAuthPath: ['login', 'reg'],
    loginPath: 'login',
    logoutPath: 'login',
    initialize: function(opt) {
      this.initMod();
      this.init();
      if (user) {
        if (this.checkAuth) {
          return user.offlineCheck();
        } else if (this.checkSvrAuth) {
          return user.onlineCheck();
        } else {
          return this.start();
        }
      } else {
        return this.start();
      }
    },
    checkFail: function() {
      return cf.r('login');
    }
  });

}).call(this);

//# sourceMappingURL=userRouter.js.map
