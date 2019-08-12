// Generated by CoffeeScript 1.12.7
(function() {
  var getValue, inputEditor,
    slice = [].slice;

  inputEditor = require('../../widget/editor/inputEditor');

  getValue = function(e) {
    var t;
    t = util.ct(e);
    return [t.attr('name'), t.val() || t.attr('value'), t.attr('stype') || 's', t.attr('op')];
  };

  util.setQ = function() {
    var ctn, i, it, len, p, q, v;
    ctn = arguments[0], p = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (ctn == null) {
      ctn = $('body');
    }
    q = {};
    for (i = 0, len = p.length; i < len; i++) {
      it = p[i];
      v = ctn.find("[name=" + it + "]").val();
      v && (q[it] = v);
    }
    return q;
  };

  $.extend(true, cf.view.collection.prototype, {
    exEvents: {
      'change .searchBox>div>input[name]': function(e) {
        var c, k, o, opt, ref, t, v;
        if (this.searchIt) {
          return this.searchIt(e);
        } else {
          ref = getValue(e), k = ref[0], v = ref[1], t = ref[2], o = ref[3];
          c = this.collection;
          opt = {};
          if (v) {
            if (o === 'eq') {
              opt[k] = v;
            } else if (o === 'mt') {
              opt[k] = {
                $regex: ".*" + v + ".*"
              };
            }
          } else {
            util.del(k, c.criteria.q);
          }
          c.criteria.offset = 0;
          c.setCriteria(opt);
          return c.resetFetch();
        }
      },
      'click .sort': function(e) {
        var c, k, o, ref, t, v;
        t = util.ct(e);
        util.setActive(t.parent());
        ref = getValue(e), k = ref[0], v = ref[1], t = ref[2], o = ref[3];
        c = this.collection;
        c.setCriteria(k, v, "order_" + v);
        c.resetFetch();
        return t.closest('.btn-group').removeClass('open');
      },
      'change .toolbar>select': function(e) {
        var b, c, d, fm, k, o, op, ref, t, v;
        if (this.filterIt) {
          c = this.filterIt(e);
        } else {
          ref = getValue(e), k = ref[0], v = ref[1], t = ref[2], o = ref[3];
          c = this.collection;
          if (t === 'd') {
            d = new Date();
            fm = 'yyyy-MM-dd HH:mm:ss';
            switch (v) {
              case 'today':
                d.setHours(18);
                e = d.pattern(fm);
                d.addDays(-1);
                b = d.pattern(fm);
                break;
              case 'week':
                d.sunday();
                e = d.pattern(fm);
                d.monday();
                d.addDays(-1);
                d.setHours(18);
                b = d.pattern(fm);
                break;
              case 'month':
                d.lastDayOfMonth();
                e = d.pattern(fm);
                d.firstDayOfMonth();
                d.addDays(-1);
                d.setHours(18);
                b = d.pattern(fm);
                break;
            }
            c.setCriteria(k, v, "bt_" + t + "_" + b + "_" + e);
          } else if (t === 's') {
            op = {};
            op[k] = v;
            c.setCriteria(op);
          }
          if (v === '0') {
            util.del(k, c.criteria.q);
          }
        }
        return c && c.resetFetch();
      },
      'click .status>a': function(e) {
        var c, k, o, ref, t, v;
        t = util.ct(e);
        util.setActive(t.parent());
        ref = getValue(e), k = ref[0], v = ref[1], t = ref[2], o = ref[3];
        c = this.collection;
        c.setCriteria(k, v, "eq_" + t + "_" + v);
        return c.resetFetch();
      }
    },
    getNewInput: function(k, opt) {
      var name, po, tag, tp;
      name = k.split('__')[0];
      opt.name = name;
      if (opt.title == null) {
        opt.title = iie(this.entity, name);
      }
      if (opt.type === 'text') {
        opt.ph = opt.title;
      }
      tag = $(cf.rtp('formItem', opt));
      tag.children('div').append(inputEditor(opt));
      po = $.extend({
        form: this,
        name: k,
        parent: tag
      }, opt.attrs);
      tp = cf.view[opt.xtype];
      if (tp.fun) {
        tp.fun(po);
      } else {
        new tp(po);
      }
      return tag;
    },
    getInput: function(type, k, stype, op) {
      var cra, name, opt;
      name = k.split('__')[0];
      switch (type) {
        case 'text':
          return cf.rtp(require('./searchBox.jade'), {
            name: k,
            label: iie(this.entity, name),
            attr: {
              stype: stype,
              op: op
            }
          });
        case 'select':
          opt = this.meta.prop.codeBy(k) || {};
          opt.name = name;
          opt.type = 'select';
          opt.form = this;
          cra = this.collection.criteria;
          if (cra && cra.q && cra.q[k]) {
            opt.val = this.collection.criteria.q[k];
          }
          opt.title = iie(this.collection.entity, k);
          if (cf.st && k.endsWith('tatus')) {
            opt.data = cf.st[this.entity + "_" + k + "_hash"];
            if (opt.label) {
              opt.title = opt.label;
            }
          } else if (k === 'status__ex') {
            opt.title = '异常';
            opt.data = cf.st[this.entity + "_status_exp_hash"];
          }
          return inputEditor(opt);
      }
    },
    setTools: function() {
      var ft, i, k, len, op, ref, res, stype, type, v;
      if (this.noFilter) {
        return;
      }
      this.toolbar = this.$('.toolbar');
      if (ft = this.meta.filter) {
        if (_.isArray(ft)) {
          for (i = 0, len = ft.length; i < len; i++) {
            v = ft[i];
            res = v.type === 'btn' ? util.genBtn(v) : v.xtype ? $(this.getNewInput(v.code, v)) : $(inputEditor(v));
            res.attr('data-type', v.stype || 's');
            this.toolbar.append(res);
          }
        } else {
          for (k in ft) {
            v = ft[k];
            if (_.isString(v)) {
              ref = v.split(':'), type = ref[0], stype = ref[1], op = ref[2];
              res = $(this.getInput(type, k, stype, op));
            } else if (v.type === 'btn') {
              res = util.genBtn(v);
            } else if (v.xtype) {
              op = v.stype;
              res = $(this.getNewInput(k, v));
            }
            res.attr('data-type', op || 's');
            this.toolbar.append(res);
          }
        }
      }
      if (this.meta.sort) {
        return log('zzz');
      }
    }
  });

}).call(this);

//# sourceMappingURL=filter.js.map