// Generated by CoffeeScript 1.12.7
(function() {
  var inputEditor, propType, validEditor;

  require('../meta/widget');

  require('../../../../lib/widget/ctn/sidePanel/app');

  inputEditor = require('../../../../lib/widget/editor/inputEditor');

  cf.view.fixMeta = cf.view.form.extend({
    cols: 'col-md-3:col-md-9',
    tagName: 'div',
    mode: 'blank',
    foot: false,
    head: false,
    valChange: function(e) {
      var mo, ob, t;
      t = util.ct(e);
      mo = this.form.model;
      ob = mo.get(this.name) || {};
      ob[t.attr('name')] = t.val();
      mo.set(this.name, ob);
      e.stopPropagation();
      return e.preventDefault();
    }
  });

  validEditor = {
    required: m._radio(),
    minlength: m._number(),
    maxlength: m._number(),
    pattern: m._text(),
    min: m._number(),
    max: m._number()
  };

  propType = [
    {
      type: 'text',
      label: '文本'
    }, {
      type: 'email',
      label: '邮箱'
    }, {
      type: 'tel',
      label: '电话'
    }, {
      type: 'password',
      label: '密码'
    }, {
      type: 'number',
      label: '数值'
    }, {
      type: 'date',
      label: '日期'
    }, {
      type: 'date',
      label: '日期'
    }, {
      type: 'url',
      label: '网址'
    }, {
      type: 'select',
      label: '单选'
    }, {
      type: 'checkbox',
      label: '多选'
    }, {
      type: 'textarea',
      label: '文本域'
    }, {
      type: 'refFileCollection',
      extend: true,
      label: '文件上传'
    }, {
      type: 'listEditor',
      extend: true,
      label: '可变列表'
    }, {
      type: 'selectBox',
      extend: true,
      label: '复杂单选'
    }, {
      type: 'multiSelect',
      extend: true,
      label: '复杂多选'
    }, {
      type: 'inlineObj',
      extend: true,
      label: '对象'
    }, {
      type: 'geo',
      extend: true,
      label: '地理位置'
    }
  ];

  m.prop = {
    setLabel: function() {
      return m.prop.prop[1] = _ep('label');
    },
    setLang: function() {
      return m.prop.prop[1] = _ep(_lang);
    },
    prop: [
      _ep('code'), _ep('label'), _ep(_lang), _ep('ph'), _ep('val', {
        code: 'prop',
        xtype: 'collection',
        showText: function(v) {
          return v;
        },
        attrs: {
          data: propType,
          toFetch: false,
          afterAddAll: function() {
            var m, mo, tp;
            this._ir = true;
            mo = this.form.model;
            tp = mo.get('xtype') || mo.get('type');
            m = this.collection.where({
              type: tp
            });
            return m.length && m[0].view.$el.trigger('click');
          },
          events: {
            'click .btn': function(e) {
              var cfg, d, elems, it, m, rs, valid;
              if (util.ct(e).hasClass('btn-primary')) {
                return;
              }
              if (!this._ir) {
                this.form.model.set('valid', {});
                this.form.model.unset('attrs');
                this.form.model.unset('xtype');
                this.form.model.unset('type');
              }
              this._ir = false;
              util.setActive(e, 'btn-primary');
              d = this.findData(e).toJSON();
              if (d.extend) {
                this.form.model.set('xtype', d.type);
              } else {
                this.form.model.set('type', d.type);
              }
              elems = [];
              rs = ['required'].concat((function() {
                switch (d.type) {
                  case 'text':
                    return ['minlength', 'maxlength', 'pattern'];
                  case 'number':
                    return ['min', 'max'];
                  default:
                    return [];
                }
              })());
              rs = (function() {
                var i, len, results;
                results = [];
                for (i = 0, len = rs.length; i < len; i++) {
                  it = rs[i];
                  m = validEditor[it];
                  m.code = it;
                  results.push(m);
                }
                return results;
              })();
              valid = {
                rid: 'validIp',
                code: 'valid',
                type: 'holder',
                xtype: 'fixMeta',
                attrs: {
                  data: this.form.model.get('valid'),
                  prop: rs
                }
              };
              elems.push(valid);
              if (cfg = cf.ccfg[d.type]) {
                if (!(d = this.form.model.get('attrs'))) {
                  if (cfg.defOpt) {
                    d = _.clone(cfg.defOpt);
                  } else {
                    d = {};
                  }
                  this.form.model.set('attrs', d);
                }
                elems.push({
                  rid: 'attrId',
                  code: 'attrs',
                  type: 'holder',
                  xtype: 'fixMeta',
                  attrs: $.extend({
                    data: d
                  }, cfg)
                });
              }
              $('#attrId').remove();
              this.form.genForm(elems, null, false);
              return this.form.renderXEditor();
            }
          },
          modelOpt: {
            tagName: 'span',
            className: 'btn btn-default mt mr',
            setContent: function() {
              return this.$el.append(this.data.label);
            }
          }
        }
      })
    ],
    listOpt: {
      btns: ['popAdd', 'import']
    },
    btn: {
      "import": function(it, e) {
        return {
          label: ii('import'),
          icon: 'import',
          cls: cf.btnStr
        };
      }
    },
    event: {
      "import": {
        type: 'click',
        fun: function(e) {
          var cData, mo, name;
          cData = this.collection;
          mo = this.form.model;
          name = this.name;
          return cf.dm.l('sidePanel', 'air', {
            title: '属性选择器',
            data: {
              side: cf.__importedMeta || ['content', 'user']
            },
            afterPick: function(e) {
              var ent, that;
              if (this.main == null) {
                this.main = this.$('.main');
              }
              ent = util.ct(e).attr('ent');
              that = this;
              log(m[ent].prop);
              return app.dm.tb(this.main, 'prop', {
                mode: 'blank',
                tagClass: 'table table-striped',
                head: false,
                checkAll: true,
                max: 100,
                btn: [],
                itemBtns: [],
                toFetch: false,
                data: m[ent].prop,
                events: {
                  'click .importIt': function(e) {
                    var i, it, len, ref;
                    if (this.checkLen) {
                      ref = this.$('tbody .ckb:checked');
                      for (i = 0, len = ref.length; i < len; i++) {
                        it = ref[i];
                        cData.push(util.getModel($(it)).toJSON());
                      }
                      mo.set(name, cData.toJSON());
                      return that.closeDlg();
                    } else {
                      return alert('请选择属性后导入');
                    }
                  }
                },
                pagination: function() {
                  return this.foot.addClass('text-center').append(tu.btn('导入', 'importIt', 'primary mt mb'));
                }
              });
            }
          });
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=prop.js.map