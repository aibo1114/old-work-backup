// Generated by CoffeeScript 1.12.7
(function() {
  var nm, ta, vd;

  vd = m._radio();

  nm = m._number();

  ta = m._textarea({
    rows: 3
  });

  m.common.toFetch = vd;

  cf.ccfg = {
    dTime: {
      defOpt: {
        format: "yyyy-mm-dd hh:ii:ss"
      }
    },
    select: {
      defOpt: {
        data: [],
        toFetch: false
      },
      prop: [
        m._select('type', {
          label: '类型',
          attrs: {
            data: ['select', 'radio', 'widget'],
            trigger: 'change'
          },
          events: {
            change: function(e) {
              var t;
              t = util.ct(e);
              return this.form.model.set('type', t.val());
            }
          }
        }), m._select('dType', {
          label: '数据类型',
          attrs: {
            data: ['localStr', 'localObj', 'remote'],
            trigger: 'change'
          },
          events: {
            change: function(e) {
              var items, v;
              v = util.ct(e).val();
              items = (function() {
                switch (v) {
                  case 'localStr':
                    return [
                      {
                        code: 'data',
                        xtype: 'listEditor',
                        attrs: {
                          setVal: function() {
                            var atr;
                            atr = this.form.model.get('attrs');
                            atr.data = this.data;
                            return this.form.model.set('attrs', atr);
                          }
                        }
                      }
                    ];
                  case 'localObj':
                    return [
                      {
                        code: 'data',
                        xtype: 'propEditor',
                        attrs: {
                          data: {}
                        }
                      }
                    ];
                  default:
                    return [
                      m._select('entity', {
                        attrs: {
                          data: function() {
                            return ['post', 'content'];
                          }
                        }
                      }), m._text('keyVal', {
                        attrs: {
                          val: 'id,title'
                        }
                      })
                    ];
                }
              })();
              this.form.genForm(items, this.$('.reShow'));
              return this.form.renderXEditor();
            }
          }
        }), m._tag('div', 'reShow')
      ]
    },
    listEditor: {
      defOpt: {
        data: [],
        toFetch: false
      },
      meta: {
        data: {
          xtype: 'listEditor'
        }
      }
    },
    textarea: {
      defOpt: {
        rows: 5,
        max: 200
      },
      prop: [m._number('rows'), m._number('max')]
    },
    refFileCollection: {
      label: '图片上传与管理',
      defOpt: {
        func: 'head',
        pickBtn: true,
        multi: true,
        ordered: true
      },
      prop: [
        m._text('func', {
          label: '图片变量'
        }), m._radio('multi', {
          label: '是否多图'
        }), m._radio('ordered', {
          label: '是否有序'
        }), m._radio('pickBtn', {
          label: '图库'
        })
      ]
    },
    content: {
      defOpt: {
        height: 300,
        type: 'full'
      },
      meta: {
        height: nm,
        type: {
          type: 'select',
          data: {
            simple: '简单',
            full: '完整'
          }
        }
      }
    },
    selectBox: {
      label: '图片上传与管理'
    }
  };

}).call(this);

//# sourceMappingURL=widget.js.map