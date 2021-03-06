// Generated by CoffeeScript 1.12.7
(function() {
  var form, inputEditor, sForm;

  require('./style.less');

  sForm = require('./app');

  inputEditor = require('../../widget/editor/inputEditor');

  $.extend(m._.fmBtn, {
    prev: function() {
      return {
        cls: _st.btn(null, 'lg')
      };
    },
    next: function() {
      return {
        cls: _st.btn('primary', 'lg')
      };
    },
    back: function() {
      return {
        cls: _st.btn(null, 'lg')
      };
    },
    save: function() {
      return {
        cls: _st.btn('primary', 'lg')
      };
    },
    finish: function() {
      return {
        cls: _st.btn('primary', 'lg')
      };
    },
    closeDlg: function() {
      return {
        cls: _st.btn('info', 'lg')
      };
    }
  });

  module.exports = form = cf.view.form = sForm.extend({
    num: 0,
    saveByStep: true,
    mode: _st.mode,
    head: true,
    foot: true,
    style: _st.mode + "-info",
    cleanAll: true,
    cols: 'col-md-2 col-xs-3:col-md-10 col-xs-9',
    noLabel: false,
    itemTmpl: 'formItem',
    colon: true,
    es: [],
    _trigger: [],
    _briefSize: 200,
    asterisk: true,
    simpleHead: false,
    colon: true,
    btns: ['save'],
    init: function() {
      if (typeof this.beforeForm === "function") {
        this.beforeForm();
      }
      this._snote = {};
      if (this.className.indexOf('break') > -1) {
        this.cols = null;
      }
      this.listenTo(this.model, 'invalid', this.renderError);
      this.listenTo(this.model, 'valid', this.removeError);
      if (this.prop == null) {
        this.prop = this.meta.prop || [];
      }
      if (typeof this.exProp === "function") {
        this.exProp();
      }
      if (this.prePage) {
        return this.showPrePage();
      }
    },
    showPrePage: function() {
      this.$el.html(this.prePage.tmpl ? cf.rtp(this.prePage.tmpl, this.prePage) : this.prePage.content);
      util.sTop();
      this.auto = false;
      return this.$el.find('.startRender').click((function(_this) {
        return function() {
          _this.auto = true;
          return _this.render();
        };
      })(this));
    },
    showSufPage: function() {
      this.$el.html(this.sufPage.tmpl ? cf.rtp(this.sufPage.tmpl, this.sufPage) : this.sufPage.content);
      return util.sTop();
    },
    title: function() {
      var k;
      k = this.model.isNew() ? 'm_add' : 'm_edit';
      return iim(k, ii(this.entity));
    },
    setBtns: function() {
      var btns, it, j, k, len, res;
      btns = _.result(this, 'btns');
      if (!btns) {
        return [];
      }
      res = [];
      for (j = 0, len = btns.length; j < len; j++) {
        k = btns[j];
        it = null;
        if (_.isString(k)) {
          if (this.meta.fmBtn && this.meta.fmBtn[k]) {
            it = this.meta.fmBtn[k]();
          }
          if (!it && m._.fmBtn[k]) {
            it = m._.fmBtn[k]();
          }
          if (it) {
            if (it.label == null) {
              it.label = iic(k);
            }
            it.cls += ' ' + k;
          }
        } else {
          it = k;
        }
        if (it && this.isShow(it)) {
          res.push(it);
        }
      }
      return res;
    },
    addItems: function(it, index) {
      if (index) {
        return this.curItems().splice(index, 0, it);
      } else {
        return this.curItems().push(it);
      }
    },
    removeItems: function(it) {
      return this.curItems().remove(it);
    },
    complex: function(attr) {
      var k, mm, results, toDel, v;
      toDel = {};
      results = [];
      for (k in attr) {
        v = attr[k];
        if (k.indexOf('::') > 1) {
          mm = k.split('::');
          toDel[mm[0]] = true;
          if (attr[mm[0]]) {
            if (_.isString(attr[mm[0]])) {
              attr[mm[0]] = JSON.parse(attr[mm[0]]);
            }
          } else {
            attr[mm[0]] = {};
          }
          attr[mm[0]][mm[1]] = v;
          results.push(util.del(k, attr));
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    before: function(attr) {
      if (this.prop.codeBy('brief' && !attr.brief && attr.content)) {
        attr.brief = util.adjustText($("<div>" + attr.content + "</div>").text(), this._briefSize);
      }
      this.withAttr && (attr._attrs = this._attrs());
      if (this.rsMsg) {
        cf._rsMsg = this.rsMsg;
      }
      this.complex(attr);
      return attr;
    },
    preRender: function() {
      if (typeof this.beforeRender === "function") {
        this.beforeRender();
      }
      this.data || (this.data = {});
      if (this.noLabel) {
        this.$el.addClass('noLabel');
      }
      if (!this.id) {
        this.$el.attr('id', this.entity + 'Form');
      }
      this.genForm();
      if (!this.isDlg()) {
        this.afterRender();
      }
      return util.loadPic("#" + this.entity + "Form");
    },
    afterRender: function() {
      var i, it, j, len, ref;
      this.renderXEditor();
      ref = this._trigger;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        it = ref[i];
        this._trigger.splice(i, 1);
        it.elem.trigger(it.trigger);
      }
      this._trigger.clear();
      if (this.focus) {
        this.ctn.children(':first').children('div').children().focus();
      }
      if (cf.mob) {
        this.foot.find('.btnCtn .btn').addClass('btn-block');
      }
      return this;
    },
    renderXEditor: function(xeditor) {
      var j, len, ref, v;
      if (xeditor == null) {
        xeditor = this.xeditor;
      }
      ref = this.xeditor;
      for (j = 0, len = ref.length; j < len; j++) {
        v = ref[j];
        if (_.isString(v.xtype)) {
          v.xtype = cf.view[v.xtype];
        }
        if (v.xtype.fun) {
          v.xtype.fun(v.opt);
        } else {
          new v.xtype(v.opt);
        }
      }
      return xeditor = [];
    },
    getVal: function(it, k) {
      var kk, val;
      if (!it.code) {
        return null;
      }
      if (this.data) {
        kk = it.code;
        kk = kk.replace('::', '.');
        if (kk.indexOf('.') > 0) {
          val = util.seqProp(this.data, kk);
        } else {
          val = this.data[kk];
        }
      }
      if ((val == null) && (it.val != null)) {
        if (_.isFunction(it.val)) {
          val = it.val.call(this, this.data);
        } else {
          val = it.val;
        }
      }
      it.convert && (val = it.convert(val));
      return val;
    },
    addSubTitle: function(it) {
      return this.ctn.mk('div', {
        "class": 'form-group subTitle'
      }, $.mk('label', it.label));
    },
    addAsterisk: function(it, p) {
      if (it.valid && it.valid.required) {
        return p.append('<em class="required asterisk">*</em>');
      }
    },
    itemContext: function(it, name) {
      var label, opt, ref;
      if (it.noLabel || this.noLabel) {
        label = '';
      } else if (it.label != null) {
        label = it.label;
      } else if (name) {
        label = iie(this.entity, name) || ii(name);
      }
      if ((label != null) && label.trim() && this.colon) {
        label += (cf.lang === 'zh' ? '：' : ':');
      }
      opt = {
        label: label,
        form: this
      };
      if (it.noCol) {
        this.cols = 'col-xs-12:col-xs-12';
      }
      if (this.cols) {
        ref = this.cols.split(':'), opt.labelWidth = ref[0], opt.inputWidth = ref[1];
      }
      if (!label) {
        opt.inputWidth = 'col-xs-12';
      }
      if (it.pCls) {
        opt.pCls = it.pCls;
      }
      return opt;
    },
    genFormItem: function(it, v) {
      var dl, help, ib, ic, id, ip, item, j, k, kk, kkk, len, ref, ref1, ref2, ti;
      if (v == null) {
        v = this.getVal(it);
      }
      if (it.rid) {
        $('#' + it.rid).remove();
      }
      k = it.code;
      it.val = v;
      it.form = this;
      item = $(cf.rtp(this.itemTmpl, this.itemContext(it, it.code)));
      if (it.sRow && cf.mob) {
        item.children('label').attr('class', 'control-label');
        item.children('div').removeAttr('class');
      }
      ip = inputEditor(it, this);
      ic = item.children('div');
      if (it.group) {
        ib = $.mk('div', {
          "class": 'input-group'
        });
        it.group.pre && ib.mk('span', {
          "class": 'input-group-addon'
        }, it.group.pre);
        ib.append(ip);
        it.group.suf && ib.mk('span', {
          "class": 'input-group-addon'
        }, it.group.suf);
        ip = ib;
      }
      if (it.exBtn) {
        ib = $.mk('div', {
          "class": "input-group"
        });
        ib.append(ip);
        ib.append(cf.rtp('inputBtnGroup', {
          btns: it.exBtn,
          cls: it.cls
        }));
        ip = ib;
      }
      ic.append(ip);
      if (!it.xtype && (it.type === 'text') && (it.attrs && it.attrs.data || it.entity)) {
        id = util.randomChar(4);
        dl = item.children('div').mk('datalist', {
          id: id
        });
        item.find('input').attr('list', id);
        if (it.attrs.data) {
          ref = _.result(it.attrs, 'data');
          for (j = 0, len = ref.length; j < len; j++) {
            it = ref[j];
            dl.mk('option', {
              value: it
            });
          }
        } else if (it.entity) {
          $.get(util.restUrl(it.entity), {
            _attrs: it._attrs,
            max: 100
          }, function(res) {
            var l, len1, ref1, results;
            item.find('input').data('sdata', res.entities);
            it.data = _.uniq(_.compact(_.pluck(res.entities, it.listName)));
            it.entity = null;
            ref1 = it.data;
            results = [];
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              it = ref1[l];
              results.push(dl.mk('option', {
                value: it
              }));
            }
            return results;
          });
        }
      }
      if (it.type === 'textarea' && it.attrs.max) {
        ic.attr('max', it.attrs.max).attr('pMax', it.attrs.max).addClass('maxLen');
      }
      if (it.events) {
        ref1 = it.events;
        for (k in ref1) {
          v = ref1[k];
          if (_.isString(v)) {
            v = this[v];
          }
          if (item[0].tagName === 'DIV') {
            ti = item.find('input,select');
          } else {
            ti = item;
          }
          if (k.indexOf(' ') > -1) {
            ref2 = k.split(' '), kk = ref2[0], kkk = ref2[1];
            ti = ti.parent();
            ic.on(kk, kkk, _.bind(v, it.form));
          } else {
            ti.on(k, _.bind(v, it.form));
          }
        }
      }
      (help = it.help || si(this.entity + "_" + it.name + "_help")) && ic.mk('span', {
        "class": 'help-block'
      }, help);
      it.hidden && item.hide();
      if (it.rid) {
        item.attr('id', it.rid);
      }
      return item;
    },
    cleanAttr: function(res) {
      var it, j, len, r, toDel;
      r = [];
      toDel = {};
      for (j = 0, len = res.length; j < len; j++) {
        it = res[j];
        if (it) {
          if (it.charAt(0) === '^') {
            it = it.substring(1);
          }
          if (it.indexOf('::') > 1) {
            toDel[it.split('::')[0]] = true;
          } else {
            r.push(it);
          }
          if (it.indexOf('Pic') > -1) {
            r.addUniq('refFile');
          }
        }
      }
      r = r.concat(_.keys(toDel));
      return r.join(',');
    },
    _attrs: function() {
      var it, res, str;
      res = (function() {
        var j, len, ref, results;
        ref = this.prop;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          it = ref[j];
          results.push(it.code);
        }
        return results;
      }).call(this);
      str = this.cleanAttr(res);
      if (this.entity === 'user') {
        str = str.replace('password,', '').replace('rpsd,', '');
      }
      return str;
    },
    enhanceContent: function() {
      var opt, ref, ref1;
      if (cf.mob || ((ref = this.className) === 'form-inline' || ref === 'break')) {
        return this.foot.append('<div class="btnCtn"></div>');
      } else {
        opt = {
          label: ' '
        };
        if (this.cols) {
          ref1 = this.cols.split(':'), opt.labelWidth = ref1[0], opt.inputWidth = ref1[1];
        }
        this.foot.append(cf.rtp(this.itemTmpl, opt));
        return this.foot.find('div div').addClass('btnCtn');
      }
    },
    renderSpeProp: function(it, ctn) {
      var item;
      if (ctn == null) {
        ctn = this.ctn;
      }
      item = this.genFormItem(it);
      if (it.rid) {
        $('#' + it.rid).remove();
        item.attr('id', it.rid);
      }
      return ctn.append(item);
    },
    reRenderProp: function(idx) {
      var it;
      it = this.prop[idx];
      this.ctn.find(".form-group:eq(" + idx + ")").replaceWith(this.genFormItem(it));
      if (it.xtype) {
        return this.renderXEditor();
      }
    },
    showTip: function() {
      var msg;
      if (this.tip) {
        msg = cf.rtp('alert', {
          msg: this.tip,
          type: 'info m-a-1',
          closed: true,
          icon: _st.sign.info
        });
        return this.ctn.mk('div', null, msg, 'prepend');
      }
    },
    genForm: function(elems, ctn, clean) {
      var dp, dv, id, it, j, k, len, opt, p, pp, results, str, tt, v;
      if (elems == null) {
        elems = this.prop;
      }
      if (ctn == null) {
        ctn = this.ctn;
      }
      if (clean == null) {
        clean = true;
      }
      if (clean) {
        ctn.empty();
      }
      this.showTip();
      this.xeditor = [];
      results = [];
      for (j = 0, len = elems.length; j < len; j++) {
        it = elems[j];
        if (it.noEdit) {
          continue;
        }
        if (!this.isShow(it)) {
          continue;
        }
        it = _.clone(it);
        k = it.code;
        v = this.getVal(it);
        if (dp = it.dep) {
          dv = this.ctn.mk('div', {
            dep: dp.code,
            code: it.code
          });
          (function(_this) {
            return (function(it, dv) {
              return _this.listenTo(_this.model, "change:" + dp.code, function(v) {
                dv.empty();
                if (v === it.dep.val) {
                  return this.renderSpeProp(it, dv);
                } else if (v === '0') {
                  return this.model.unset(it.code, {
                    silent: true
                  });
                }
              });
            });
          })(this)(it, dv);
          continue;
        }
        switch (it.type) {
          case 'hidden':
            results.push(this.model.set(k, v));
            break;
          case 'tmpl':
            results.push(this.ctn.append(cf.rtp(it.attrs.tmpl, ((p = it.attrs.prop) ? v[p] : v))));
            break;
          case 'pic':
            pp = {
              style: 'margin:0 auto',
              "class": 'img-responsive',
              src: it.url()
            };
            results.push(this.$el.mk('div', {
              "class": 'text-center'
            }, $.mk('img', pp), 'prepend'));
            break;
          case '_tag':
            str = it.attrs.tag === 'hr' ? $.mk('hr') : $.mk(it.attrs.tag, null, it.attrs.title || '');
            it.attrs.id && str.attr('id', it.attrs.id);
            it.attrs.cls && str.addClass(it.attrs.cls);
            results.push(ctn.append(str));
            break;
          default:
            if (this.model.id && it.noChange) {
              it.disabled = true;
            }
            tt = this.genFormItem(it, v);
            ctn.append(tt);
            if (it.xtype) {
              if (it.attrs && $.isFunction(it.attrs.data)) {
                it.attrs.data = it.attrs.data(this.data);
              }
              if (it.id) {
                id = it.id;
              } else {
                id = it.id = util.randomChar(4);
              }
              if (tt.children('div').length) {
                tt.children('div').attr('id', id);
              } else {
                tt.attr('id', id);
              }
              opt = {
                form: this,
                name: k,
                val: v,
                ph: it.ph
              };
              if (it.bind) {
                opt.el = tt.find('#' + id);
                opt.parent = null;
              } else if (it.type === 'holder') {
                opt.parent = this.$("#" + id + " .holder");
              } else {
                opt.parent = this.$('#' + id);
              }
              results.push(this.xeditor.push({
                xtype: it.xtype,
                opt: $.extend({}, it.attrs, opt)
              }));
            } else {
              results.push(void 0);
            }
        }
      }
      return results;
    },
    onClose: function() {
      var it, j, k, l, len, len1, ref, ref1, ref2, ref3, v;
      ref = this._snote;
      for (k in ref) {
        v = ref[k];
        v.summernote('destroy');
      }
      ref1 = this.$('._datetime');
      for (j = 0, len = ref1.length; j < len; j++) {
        it = ref1[j];
        $(it).datetimepicker('remove');
      }
      ref2 = this.$('[data-cid]');
      for (l = 0, len1 = ref2.length; l < len1; l++) {
        it = ref2[l];
        if ((ref3 = $(it).data('_item')) != null) {
          ref3._close();
        }
      }
      return typeof this.afterForm === "function" ? this.afterForm() : void 0;
    }
  });

  $.extend(cf.dm, {
    form: function(p, entity, opt) {
      var init;
      init = {
        cleanAll: true,
        entity: entity,
        toFetch: false,
        parent: p
      };
      return cf.dm.l('form', p, cf._packOpt(init, entity, 'form', opt));
    },
    add: function(p, entity, opt) {
      var init;
      init = {
        cleanAll: true,
        entity: entity,
        toFetch: false,
        parent: p
      };
      return cf.dm.l('form', p, cf._packOpt(init, entity, 'addForm', opt));
    },
    edit: function(p, entity, eid, opt) {
      var init, pdd;
      pdd = {};
      if (eid) {
        pdd[cf.id] = eid;
      }
      init = {
        cleanAll: true,
        entity: entity,
        parent: p,
        toFetch: true,
        data: pdd
      };
      return cf.dm.l('form', p, cf._packOpt(init, entity, 'editForm', opt));
    },
    addOrEdit: function(p, entity, query, opt) {
      return $.get(util.restUrl(entity), query, function(res) {
        if (res.entities.length > 0) {
          opt.toFetch = false;
          opt.data = res.entities[0];
          return app.dm.edit(p, entity, opt.data._id, opt);
        } else {
          return app.dm.add(p, entity, opt);
        }
      });
    }
  });

}).call(this);

//# sourceMappingURL=form.js.map
