// Generated by CoffeeScript 1.12.7
(function() {
  var slice = [].slice;

  module.exports = cf.model.entity = Backbone.Model.extend({
    validator: require('./rules/validator'),
    initialize: function(data, opt) {
      if (opt && !this._col) {
        $.extend(this, opt);
      }
      if (this.entity == null) {
        this.entity = 'common';
      }
      if (this.meta == null) {
        this.meta = m[this.entity];
      }
      this.afterAjax && this.listenTo(this, 'sync', this.afterAjax);
      this._errors = [];
      if (typeof this.init === "function") {
        this.init();
      }
      return this;
    },
    addHandler: function(type, str) {
      var k, s;
      k = type + "Save";
      s = this.get(k);
      if (s) {
        if (s.indexOf(str) === -1) {
          s += ',' + str;
        }
      } else {
        s = str;
      }
      return this.set(k, s, {
        silent: true
      });
    },
    update: function(ob, cb) {
      return this.save(ob, {
        patch: true
      });
    },
    urlRoot: function() {
      if (this.pEntity) {
        return util.restUrl(this.pEntity, this.entity);
      } else {
        return util.restUrl(this.entity);
      }
    },
    saveAttr: function() {
      var i, it, len, ob, p, ps;
      p = arguments[0], ps = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      if (p) {
        if (_.isArray(p)) {
          ps = p;
        } else if (ps) {
          ps.push(p);
        } else {
          ps = [p];
        }
        ob = {};
        for (i = 0, len = ps.length; i < len; i++) {
          it = ps[i];
          ob[it] = this.get(it);
        }
      } else {
        ob = this.changedAttributes;
      }
      return this.save(ob, {
        patch: true
      });
    },
    parse: function(res) {
      var data, ref;
      data = res.entity && !res[cf.id] ? res.entity : res.entities && res.entities.length ? res.entities[0] : res;
      if ((ref = this.meta) != null) {
        if (typeof ref.handleData === "function") {
          ref.handleData(data);
        }
      }
      if (this.view) {
        this.view.data = data;
      }
      return data;
    },
    reset: function(data) {
      this._errors.clear();
      if (data) {
        this.clear({
          silent: true
        });
        if (data.id) {
          this.id = data.id;
        }
        if (data.version) {
          return this.version = data.version;
        }
      }
    },
    validate: function(attrs, opt) {
      var k, msg, v;
      for (k in attrs) {
        v = attrs[k];
        if (msg = this.validateItem(k, v)) {
          this.unset(k);
          opt.key = k;
          return msg;
        }
      }
      return null;
    },
    validateItem: function(k, v) {
      var it, m, msg, o, valid;
      m = this.view && this.view.prop ? this.view.prop.codeBy(k) : this.meta && this.meta.prop ? this.meta.prop.codeBy(k) : void 0;
      if (!m) {
        return;
      }
      if (valid = m.valid) {
        for (it in valid) {
          o = valid[it];
          if (this.validator[it] && this.validator[it](v, o)) {
            msg = ii("valid." + it, o);
            this.trigger('invalid', msg, m);
            this._errors.addUniq(k);
            return msg;
          }
        }
        this.trigger('valid', m);
      }
      this._errors.remove(k);
      return null;
    }
  });

}).call(this);

//# sourceMappingURL=entity.js.map