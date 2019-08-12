// Generated by CoffeeScript 1.12.7
(function() {
  var router, uu;

  router = require('./userRouter').extend({
    _exr: [require('./func/mobLogin')],
    wtAutoLogin: true,
    checkAuth: true
  });

  uu = require('./model/wechatUser');

  require('./terminal/wt');

  require('./mobV2');

  W.ctn = $('#content');

  module.exports = function() {
    if (typeof cf._init === "function") {
      cf._init();
    }
    W.user = new uu(cf._uData, cf._uOpt);
    return new router(cf._rOpt);
  };

}).call(this);

//# sourceMappingURL=wtRouter.js.map
