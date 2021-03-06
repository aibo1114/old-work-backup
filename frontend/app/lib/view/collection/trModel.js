// Generated by CoffeeScript 1.12.7
(function() {
  var itemView;

  itemView = require('./tdView');

  module.exports = cf.view.model.extend({
    cleanAll: false,
    tagName: 'tr',
    itemTag: 'td',
    setContent: function() {
      var i, len, ref, td, v;
      this.data = this.model.attributes;
      this.$el.attr('data-id', this.model.id);
      if (this.itemTmpl) {
        td = $('<td/>').append(cf.rtp(this.itemTmpl, this.data));
        this.$el.append(td);
      }
      ref = this.collection.cols;
      for (i = 0, len = ref.length; i < len; i++) {
        v = ref[i];
        if (v.type === 'hide') {
          continue;
        }
        td = $('<' + this.itemTag + '/>');
        if (v.type === 'ckb') {
          td.addClass('text-center');
        }
        td.append(itemView(this.data, v, this.entity, this.meta, this));
        v.cls && td.addClass(v.cls);
        if (v.type === 'btns' || v.code === '_btn') {
          td.addClass('btnCtn');
        }
        if (v.handle) {
          v.handle(this.data, td);
        }
        this.$el.append(td);
      }
      return typeof this.decorate === "function" ? this.decorate() : void 0;
    }
  });

}).call(this);

//# sourceMappingURL=trModel.js.map
