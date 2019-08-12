// Generated by CoffeeScript 1.12.7
(function() {
  var router, topline, wechatUser;

  require('./style/mob.css');

  require('../../../lib/mob');

  cf.loadTmpl = function(name) {
    return require("./" + name + ".jade");
  };

  cf.loadLibTmpl = function(name) {
    return require("../../../lib/tmpl/" + name + ".jade");
  };

  router = require("../../../lib/userRouter");

  wechatUser = require('../../../lib/model/wechatUser');

  require('../../../lib/func/entityAction');

  require('../../../lib/widget/slide/app');

  W.ctn = $('#content');

  window.user = new wechatUser({}, {
    check: function() {
      return true;
    }
  });

  topline = $('.topline .navbar-collapse');

  topline.addClass('in');

  topline.addClass('subnav');

  $('#bs-navbar').append(topline);

  new router({
    _exr: [require('../../../lib/func/mobLogin')],
    dfPath: 'userInfo',
    checkAuth: true,
    wtAutoLogin: true
  });

}).call(this);

//# sourceMappingURL=mob.js.map
