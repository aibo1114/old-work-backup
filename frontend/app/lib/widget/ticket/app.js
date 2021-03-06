// Generated by CoffeeScript 1.12.7
(function() {
  var tmpl;

  require('./style.less');

  tmpl = require('./tmpl.jade');

  module.exports = cf.view.ticket = cf.view.tag.extend({
    tmpl: tmpl,
    regBtn: '.regBtn',
    auto: true,
    init: function() {
      this.regBtn = $(this.regBtn);
      this.regBtn.prop('disabled', true);
      return this.ctx != null ? this.ctx : this.ctx = this.form.model;
    },
    events: {
      'click .ticket-item': function(e) {
        var d, t;
        t = util.ct(e);
        if (t.hasClass('active')) {
          util.del('__ticket', cf);
          this.ctx.unset('ticket');
          this.regBtn.prop('disabled', true);
          return t.removeClass('active');
        } else {
          util.setActive(t);
          d = this.data[t.index()];
          this.ctx.set('ticket', _.pick(d, 'title', 'price', 'amount'));
          return this.regBtn.prop('disabled', false);
        }
      }
    }
  });

}).call(this);

//# sourceMappingURL=app.js.map
