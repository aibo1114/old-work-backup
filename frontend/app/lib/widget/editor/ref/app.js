// Generated by CoffeeScript 1.12.7
(function() {
  cf.view.ref = cf.view.tag.extend({
    tmpl: 'cols',
    className: 'row',
    setAttrs: 'title,username,subTitle,refFile,brief',
    data: function() {
      return {
        cols: [
          {
            cls: 'col-md-3'
          }, {
            cls: 'col-md-9'
          }
        ]
      };
    },
    events: {
      'change select': function(e) {
        var t;
        t = util.ct(e);
        if (t.val() === '0') {
          return this.sBox.unsetVal();
        } else {
          return this.sBox.reset(t.val());
        }
      }
    },
    init: function() {
      return this.render();
    },
    preRender: function() {
      var ent;
      if (this.refCtn == null) {
        this.refCtn = this.$('.col-md-3');
      }
      if (this.entCtn == null) {
        this.entCtn = this.$('.col-md-9');
      }
      this.refCtn.append(cf._inputEditor({
        type: 'select',
        attrs: {
          data: this.refClass || cf.opt.entity.headRefEntity
        }
      }));
      this.entCtn.addClass('pl0').append(cf._inputEditor({
        type: 'text'
      }));
      if (this.val) {
        ent = this.val._e;
        this.refCtn.children().val(ent);
      }
      return this.sBox = new cf.view.selectBox($.extend({
        clickShow: true,
        form: this.form,
        name: this.name,
        val: this.val,
        el: this.entCtn,
        parent: null,
        trigger: true,
        label: 'title',
        hiddenValue: false,
        setAttrs: this.setAttrs,
        panelOpt: {
          entity: ent,
          noStr: 'Search User by username or Email'
        },
        unsetVal: function() {
          var ob;
          this.form.model.unset(this.name);
          this._picked = false;
          this.target.val('');
          ob = {};
          ob[this.name] = 1;
          return this.form.model.set('_unset', ob);
        }
      }, this.selectBoxOpt));
    }
  });

}).call(this);

//# sourceMappingURL=app.js.map