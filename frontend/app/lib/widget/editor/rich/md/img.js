// Generated by CoffeeScript 1.12.7
(function() {
  var initEditor;

  initEditor = function(opt) {
    var p, t;
    p = $(opt.parent);
    t = p.find('textarea');
    return t.markdown({
      autofocus: false,
      language: _lang,
      additionalButtons: {
        name: 'pickImg',
        toggle: true,
        icon: _st.icon('img'),
        callback: function(e) {
          return log(111);
        }
      }
    });
  };

  module.exports = {
    fun: function(opt) {
      util.lcss(cf.rPath + "js/bootstrap-markdown/css/bootstrap-markdown.min.css");
      return cf.loadJS(cf.rPath + 'js/bootstrap-markdown/js/bootstrap-markdown.js', function() {
        if (_lang === 'zh') {
          return cf.loadJS(cf.rPath + ("js/bootstrap-markdown/locale/bootstrap-markdown." + _lang + ".js"), function() {
            return initEditor(opt);
          });
        } else {
          return initEditor(opt);
        }
      });
    }
  };

  m._markdown = function(code, opt) {
    return $.extend(true, {
      code: code,
      type: 'textarea',
      xtype: 'markdown',
      attrs: {}
    }, opt);
  };

}).call(this);

//# sourceMappingURL=img.js.map
