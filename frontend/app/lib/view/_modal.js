// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = function() {
    var cls;
    this.parent = null;
    this.mode = 'modal';
    cls = 'modal fade';
    if (this.fullScreen) {
      cls += ' fullScreen';
    }
    if (this.centerScreen) {
      cls += ' centerScreen';
    }
    if (this.btmScreen) {
      cls += ' btmScreen';
    }
    this.$el.addClass(cls);
    if (this.modalCls) {
      this.$el.addClass(this.modalCls);
    }
    this.layout();
    if (typeof this.preRender === "function") {
      this.preRender();
    }
    this.$el.on('show.bs.modal', (function(_this) {
      return function() {
        if (_this.fullScreen) {
          return util.setPageHeight(_this.$('.modal-content'), true);
        }
      };
    })(this));
    this.$el.on('shown.bs.modal', (function(_this) {
      return function(e) {
        _this.addEvents();
        if (typeof _this.afterRender === "function") {
          _this.afterRender();
        }
        _this.formDlgFirstTab = false;
        if (typeof _this.callback === "function") {
          _this.callback();
        }
        return util.loadPic('.modal');
      };
    })(this)).on('hidden.bs.modal', (function(_this) {
      return function(e) {
        if (typeof _this.afterDlgClose === "function") {
          _this.afterDlgClose();
        }
        return _this._close();
      };
    })(this));
    this.$el.data('_item', this);
    this.$el.modal($.extend({
      show: true
    }, this.dlgOpt || {}));
    return util.loadPic(this.ctn);
  };

}).call(this);

//# sourceMappingURL=_modal.js.map
