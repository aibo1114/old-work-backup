// Generated by CoffeeScript 1.12.7
(function() {
  var r;

  r = function(file) {
    return require("./data/" + file);
  };

  module.exports = {
    data: {
      'role:title': r('role'),
      'lang:key': r('lang'),
      'content:title': r('content'),
      'post:title': r('post'),
      'cat:code': r('cat')
    },
    member: [code + ",admin", "u" + code + ",user"]
  };

}).call(this);

//# sourceMappingURL=data.js.map
