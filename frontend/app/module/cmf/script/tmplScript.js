// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    _init: function(ctx) {
      return {
        wt: function(cb) {
          return dao.get(ctx.c.code, 'pubAccount', {}, function(res) {
            log(res);
            return cb(null, res);
          });
        }
      };
    },
    index: function(ctx, req, rsp) {},
    mobReadThread: require('../../_mod/group/script/mobReadThread')
  };

}).call(this);

//# sourceMappingURL=tmplScript.js.map
