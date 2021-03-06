// Generated by CoffeeScript 1.12.7
(function() {
  var async;

  async = require('async');

  module.exports = {
    _init: function(ctx) {
      ctx._cd = {
        post: {
          func: 'head',
          text: 'brief'
        },
        shop: {
          func: 'slide',
          text: 'address'
        },
        consultant: {
          func: 'head',
          text: 'description'
        },
        product: {
          func: 'slide',
          text: 'description'
        }
      };
      return {
        wt: function(cb) {
          return dao.get(ctx.c.code, 'pubAccount', {}, function(res) {
            return cb(null, res);
          });
        },
        _guest: function(cb) {
          var filter;
          filter = {
            title: 'guest'
          };
          return dao.find(ctx.c.code, 'role', filter, {}, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    post: function(ctx, req, res) {
      return {
        postList: function(cb) {
          var opt;
          opt = {
            skip: 0,
            limit: 10,
            sort: {
              lastUpdated: -1
            }
          };
          return dao.find(ctx.c.code, 'post', {
            status: 2
          }, opt, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    index: function(ctx, req, res) {
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
        shopList: function(cb) {
          return dao.find(ctx.c.code, 'shop', filter, opt, function(res) {
            return cb(null, res);
          });
        },
        consultantList: function(cb) {
          return dao.find(ctx.c.code, 'consultant', filter, opt, function(res) {
            return cb(null, res);
          });
        },
        productList: function(cb) {
          return dao.find(ctx.c.code, 'product', filter, opt, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    itemList: function(ctx, req, res) {
      var et, filter, opt;
      opt = {
        limit: 5,
        sort: {
          row: -1
        }
      };
      et = req.query.entity;
      filter = {
        type: "post",
        code: {
          $regex: et + "_.*"
        }
      };
      return {
        _item: function(cb) {
          var data;
          data = {};
          return dao.find(ctx.c.code, 'cat', filter, {}, function(res) {
            var cbs, code, it;
            cbs = (function() {
              var i, len, results;
              results = [];
              for (i = 0, len = res.length; i < len; i++) {
                it = res[i];
                code = it.code;
                data[code] = {
                  title: it.title,
                  code: code
                };
                results.push((function(code) {
                  return function(ccb) {
                    return dao.find(ctx.c.code, 'post', {
                      cat: code
                    }, opt, function(r) {
                      data[code].items = r;
                      return ccb(null, r);
                    });
                  };
                })(code));
              }
              return results;
            })();
            return async.parallel(cbs, function(err, rr) {
              return cb(null, _.values(data));
            });
          });
        }
      };
    },
    seckillingList: function(ctx, req, rsp) {
      var filter, opt;
      opt = {
        limit: 5,
        sort: {
          row: -1
        }
      };
      filter = {};
      return {
        list: function(cb) {
          return dao.find(ctx.c.code, 'seckilling', filter, opt, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    consultant: function(ctx, req, rsp) {
      return {
        answer: function(cb) {
          var filter;
          filter = {
            'user._id': ctx.uid,
            status: 2
          };
          return dao.find(ctx.c.code, 'answer', filter, {}, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    shop: function(ctx, req, rsp) {
      return {
        answer: function(cb) {
          var filter;
          filter = {
            'shop._id': ctx._id,
            status: 2
          };
          return dao.find(ctx.c.code, 'answer', filter, {}, function(res) {
            return cb(null, res);
          });
        },
        consultant: function(cb) {
          return dao.find(ctx.c.code, 'consultant', {
            'shop._id': ctx._id
          }, {}, function(res) {
            return cb(null, res);
          });
        }
      };
    },
    cardList: function(ctx, req, rsp) {
      var filter, opt;
      opt = {
        limit: 5,
        sort: {
          row: -1
        }
      };
      filter = {};
      return {
        list: function(cb) {
          return dao.find(ctx.c.code, 'card', filter, opt, function(res) {
            return cb(null, res);
          });
        }
      };
    }
  };

}).call(this);

//# sourceMappingURL=tmplScript.js.map
