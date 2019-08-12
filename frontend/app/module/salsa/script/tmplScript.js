// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = {
    _init: function(ctx) {
      ctx._cd = {
        post: {
          func: 'head',
          text: 'brief'
        },
        content: {
          func: 'head',
          text: 'brief'
        }
      };
      ctx.pWt = 'PETSNS';
      return {
        _cat: function(cb) {
          return dao.find(ctx.c.code, 'cat', {}, {}, function(res) {
            var i, it, len, opt;
            opt = {};
            for (i = 0, len = res.length; i < len; i++) {
              it = res[i];
              opt[it.code] = it;
            }
            return cb(null, opt);
          });
        },
        wt: function(cb) {
          return dao.get(ctx.c.code, 'pubAccount', {
            code: 'PostEnglishTime'
          }, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    index: function(ctx, req, rsp) {
      var filter, opt;
      opt = {
        limit: 5,
        sort: {
          row: -1,
          lastUpdated: -1
        }
      };
      filter = {
        status: 2
      };
      return {
        head: function(cb) {
          return dao.get(ctx.c.code, 'head', {
            channel: 'index'
          }, function(res) {
            return cb(null, res);
          });
        },
        indexShow: function(cb) {
          return dao.get(ctx.c.code, 'head', {
            channel: 'indexShow'
          }, function(res) {
            return cb(null, res);
          });
        }
      };
    }
  };

}).call(this);

//# sourceMappingURL=tmplScript.js.map
