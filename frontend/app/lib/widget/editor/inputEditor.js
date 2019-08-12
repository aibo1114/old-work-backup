// Generated by CoffeeScript 1.12.7
(function() {
  var addItemAfterAjax, setVal;

  setVal = function(it, inp) {
    var v;
    if (_.isObject(it.val)) {
      v = it.val[it.attrs.keyVal.split(',')[0]];
    } else {
      v = it.val;
    }
    if (v) {
      return inp.children("option[value='" + v + "']").attr('selected', true);
    } else {
      return inp.children("option").first().attr('selected', true);
    }
  };

  $.extend(util, {
    genOptionItem: function(data, kv) {
      var d, j, k, len, ref, results, results1, v;
      if (kv) {
        ref = kv.split(','), k = ref[0], v = ref[1];
      } else {
        k = 'val';
        v = 'label';
      }
      if (_.isArray(data)) {
        results = [];
        for (j = 0, len = data.length; j < len; j++) {
          d = data[j];
          if (_.isString(d)) {
            results.push("<option value='" + d + "'>" + d + "</option>");
          } else {
            results.push("<option value='" + d[k] + "'>" + d[v] + "</option>");
          }
        }
        return results;
      } else {
        results1 = [];
        for (k in data) {
          v = data[k];
          results1.push("<option value='" + k + "'>" + v + "</option>");
        }
        return results1;
      }
    },
    genCheckItem: function(data, it, k, v) {
      var ck, cv, d, i, j, kk, len, name, op, p, res, rs, val, vv;
      name = it.code;
      val = it.val != null ? it.val.toString().split(',') : [];
      res = $('<div/>');
      if (!_.isArray(data)) {
        data = (function() {
          var results;
          results = [];
          for (kk in data) {
            vv = data[kk];
            rs = {};
            rs[k] = kk;
            rs[v] = vv;
            results.push(rs);
          }
          return results;
        })();
      }
      if (it.attrs.checkAll) {
        op = {};
        op[k] = '_all';
        op[v] = '全选';
        data.push(op);
      }
      for (j = 0, len = data.length; j < len; j++) {
        d = data[j];
        if (_.isString(d)) {
          ck = d;
          cv = d;
        } else {
          ck = d[v];
          cv = d[k];
        }
        p = $("<label></label>");
        if (it.attrs.inline) {
          p.addClass(it.type + "-inline");
        }
        i = $("<input type='" + it.type + "' name='" + name + "' value='" + cv + "'/>");
        if (cv === '_all') {
          i.removeAttr('name');
        }
        if ((cv && val.has(cv.toString())) || d.selected) {
          i.attr('checked', true);
        }
        p.append(i);
        if (it.attrs.c) {
          p.addClass('c-input c-radio');
          p.append('<span class="c-indicator"></span>');
        }
        p.append(ck);
        res.append(p);
      }
      return res;
    }
  });

  addItemAfterAjax = function(res, it, id) {
    var d, inp, op;
    if (res.count === 0) {
      return;
    }
    inp = $('#' + id, it.form ? it.form.$el : 'body');
    d = res.entities || res;
    op = it.attrs;
    if (op.parse) {
      d = op.parse(d);
    }
    inp.append(util.genOptionItem(d, op.keyVal));
    (it.val != null) && inp.children("option[value='" + it.val + "']").attr('selected', true);
    if (it.addBtn) {
      inp.append("<label><a class='new'>" + (iim('add')) + "</a></label>");
    }
    return inp.data('sdata', d);
  };

  module.exports = cf._inputEditor = function(it, fm) {
    var d, id, inp, k, ooc, op, opt, p, ph, ref, ref1, ref2, ref3, st, v, val;
    if (!it.type) {
      it.type = 'text';
    }
    val = it.val;
    if (it.view) {
      if (it.showText) {
        val = it.showText(it.val, this.data || {}, fm != null ? fm.meta : void 0);
      }
      if (it.code === 'status') {
        val = cf.st.text(it.form.entity, it.val);
      } else if ((ref = it.type) === 'select' || ref === 'radio') {
        if (+it.val) {
          if (it.attrs.data) {
            val = _.result(it.attrs, 'data')[+it.val];
          }
        }
      } else if (it.type === 'custom') {
        val = it.content(it);
      }
      inp = $("<div class='form-control-static'>" + val + "</div>");
      it.cls = it.type;
    } else {
      switch (it.type) {
        case 'text':
        case 'file':
        case 'url':
        case 'password':
        case 'email':
        case 'number':
        case 'range':
        case 'tel':
        case 'texteara':
        case 'search':
        case 'datetime':
        case 'date':
          inp = $('<input/>');
          inp.attr("type", it.type);
          inp.val(val);
          break;
        case 'textarea':
          inp = $('<textarea></textarea>');
          inp.attr('rows', it.attrs.rows || 6);
          if (it.attrs.max) {
            inp.keyup(function(e) {
              var c, max, n, t;
              t = util.ct(e);
              n = t.parent();
              max = n.attr('pMax');
              c = t.val().length;
              if (c <= max) {
                return n.attr('max', max - c);
              } else {
                return t.val(t.val().substr(0, max));
              }
            });
          }
          inp.text(val);
          break;
        case 'select':
          inp = $("<select></select>");
          id = it.id || util.randomChar(5);
          inp.attr('id', id);
          p = {
            title: ii('pleaseSelect'),
            keyVal: 'val,label'
          };
          _.extend(p, it.attrs);
          if (p.data) {
            d = _.result(p, 'data');
            inp.append(util.genOptionItem(d, p.keyVal));
            inp.data('sdata', d);
          } else if (p.entity) {
            if (p.url == null) {
              p.url = util.restUrl(p.entity);
            }
            opt = $.extend(_.result(p, 'criteria'), {
              _attrs: p._attrs || p.keyVal
            });
            $.get(p.url, opt, function(res) {
              if (res.count === 0) {
                return;
              }
              inp = $('#' + id, it.form ? it.form.$el : 'body');
              d = res.entities;
              if (p.parse) {
                d = p.parse(d);
              }
              inp.append(util.genOptionItem(d, p.keyVal));
              if (it.addBtn) {
                inp.append("<label><a class='new'>" + (iim('add')) + "</a></label>");
              }
              inp.data('sdata', d);
              setVal(it, inp);
              if (it.trigger) {
                return inp.trigger(it.trigger);
              }
            });
          } else if (it.url && it.jsonp) {
            st = '?';
            if (it.url.indexOf('?') > -1) {
              st = '&';
            }
            $.getJSON((it.url + st) + "callback=?").done(function(res) {
              return addItemAfterAjax(res, it, id);
            });
          }
          if (p.title) {
            inp.prepend("<option value='0'>" + p.title + "</option>");
          }
          setVal(it, inp);
          break;
        case 'checkbox':
        case 'radio':
          inp = $("<div class='" + it.type + "'></div>");
          it.id = id = util.randomChar(5);
          inp.attr('id', id);
          op = (it.attrs != null ? it.attrs : it.attrs = {});
          if (op.keyVal) {
            ref1 = op.keyVal.split(','), k = ref1[0], v = ref1[1];
          } else {
            k = 'val';
            v = 'label';
          }
          if (op.data) {
            inp.append(util.genCheckItem(_.result(op, 'data'), it, k, v));
          } else if (op.entity) {
            op.url || (op.url = util.restUrl(op.entity));
            ooc = op.criteria ? op.criteria(it) : {};
            opt = $.extend(ooc, {
              _attrs: op.keyVal
            });
            $.get(op.url, opt, function(res) {
              var btn;
              inp.append(util.genCheckItem(res.entities, it, k, v));
              if (op.addBtn) {
                btn = $("<label class='checkbox-inline'><a class='new'>" + (iim('add')) + "</a></label>").click(function(e) {
                  return cf.dm.l('form', 'air', {
                    entity: op.entity || 'cat',
                    prop: [_ep('code'), _ep('label'), m._textarea('description')],
                    data: {
                      type: 'commodity'
                    },
                    _saveSuccess: (function(_this) {
                      return function(model, res) {
                        $('#' + id).children().append(util.genCheckItem([res.entity], it, k, v));
                        return model.view.$el.modal("hide");
                      };
                    })(this)
                  });
                });
                return inp.children('div').append(btn);
              }
            });
          }
          if (op.checkAll) {
            inp.on('click', "input[value='_all']", function(t) {
              var ip, j, l, len, len1, results, results1;
              t = util.ct(t);
              p = t.parent().parent().find('input[name]');
              if (t.is(':checked')) {
                results = [];
                for (j = 0, len = p.length; j < len; j++) {
                  ip = p[j];
                  if (!$(ip).is(':checked')) {
                    results.push($(ip).trigger('click'));
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
              } else {
                results1 = [];
                for (l = 0, len1 = p.length; l < len1; l++) {
                  ip = p[l];
                  if ($(ip).is(':checked')) {
                    results1.push($(ip).trigger('click'));
                  } else {
                    results1.push(void 0);
                  }
                }
                return results1;
              }
            });
          }
          break;
        case 'view':
        case 'label':
          inp = $("<p class='form-control-static'>" + val + "</p>");
          break;
        case 'holder':
          inp = $('<div class="holder"></div>');
          break;
        case 'custom':
          inp = it.content(it);
      }
    }
    if ((ref2 = it.type) === 'text' || ref2 === 'url' || ref2 === 'password' || ref2 === 'email' || ref2 === 'number' || ref2 === 'range' || ref2 === 'tel' || ref2 === 'select' || ref2 === 'textarea' || ref2 === 'datetime' || ref2 === 'date') {
      ph = it.ph || si(((ref3 = it.form) != null ? ref3.entity : void 0) + "_" + it.code + "_ph");
      ph && inp.attr("placeholder", ph);
      if (!it.noName) {
        inp.attr('name', it.code);
      }
      it.readonly && inp.attr('readOnly', true);
      it.disabled && inp.attr('disabled', 'disabled');
      inp.addClass(it.cls || _st.inputCls);
    }
    (it.id && !it.xtype) && inp.attr('id', it.id);
    it.cls && inp.addClass(it.cls);
    if (it.trigger && fm) {
      fm._trigger.push({
        elem: inp,
        trigger: it.trigger
      });
    }
    return inp;
  };

}).call(this);

//# sourceMappingURL=inputEditor.js.map
