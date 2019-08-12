// Generated by CoffeeScript 1.12.7
(function() {
  var router, uu;

  router = require('../module/console/app/lib/consoleRouter').extend({
    loadMod: function() {
      require('../module/console/app/mods/data');
      return cf.exLabel();
    },
    checkFail: function() {
      return cf.r('login');
    }
  });

  uu = require('./model/user');

  require('./terminal/h5');

  require('./terminal/h5_ft_login');

  require('./terminal/h5_mgm');

  W.ctn = $('#main');

  cf._uOpt = $.extend({
    logoutUrl: util.actUrl('logout'),
    permission: ['console'],
    roles: [
      {
        title: 'admin'
      }
    ],
    check: function() {
      return true;
    }
  }, cf._uOpt);

  cf._rOpt = $.extend({
    logoutPath: 'login',
    checkAuth: false
  }, cf._rOpt);

  module.exports = function() {
    cf._scf = true;
    cf.view.form.prototype.btns = ['back', 'save'];
    cf.view.table.prototype.noLastTime = true;
    if (typeof cf._init === "function") {
      cf._init();
    }
    W.user = new uu(cf._uData, cf._uOpt);
    return new router(cf._rOpt);
  };

}).call(this);

//# sourceMappingURL=ccRouter.js.map