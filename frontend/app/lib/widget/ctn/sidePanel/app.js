// Generated by CoffeeScript 1.12.7
(function() {
  var tmpl;

  tmpl = require('./tmpl.jade');

  module.exports = cf.view.sidePanel = cf.view.tag.extend({
    head: true,
    tmpl: tmpl,
    tagClass: 'clearfix',
    auto: true,
    events: {
      'click .ent': function(e) {
        util.setActive(e);
        return typeof this.afterPick === "function" ? this.afterPick(e) : void 0;
      }
    }
  });

}).call(this);

//# sourceMappingURL=app.js.map
