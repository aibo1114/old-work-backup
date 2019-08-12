// Generated by CoffeeScript 1.12.7
(function() {
  var form, meta, showInTd;

  meta = require("../../../lib/meta/common");

  form = require("../../../lib/view/form");

  showInTd = require("../../../lib/func/showInTd");

  $.extend(meta.common, {
    zkservers: {
      type: 'text'
    },
    key: {
      type: 'text'
    },
    name: {
      type: 'text'
    },
    data: {
      type: 'text'
    }
  });

  $.extend(meta, {
    server: {
      _: {
        item: ['name'],
        action: function() {
          return ['del'];
        },
        event: {
          popAdd: {
            type: 'click',
            fun: function(e) {
              var cl;
              cl = this.collection;
              new form({
                entity: this.entity,
                toFetch: false,
                mode: 'modal',
                _saveSuccess: function(model, res) {
                  if (res.retcode === 0) {
                    cl.addByData({
                      key: model.get('name')
                    });
                    return model.view.closeDlg();
                  }
                }
              });
              return e.stopPropagation();
            }
          }
        }
      }
    },
    idc: {
      _: {
        btn: {
          comps: function(it, e) {
            return util.iBtn("th", "comps");
          }
        },
        item: ['name'],
        action: function() {
          return ['del'];
        },
        event: {
          popAdd: {
            type: 'click',
            fun: function(e) {
              var cl;
              cl = this.collection;
              new form({
                modelOpt: {
                  urlRoot: cl.url()
                },
                entity: this.entity,
                toFetch: false,
                mode: 'modal',
                _saveSuccess: function(model, res) {
                  if (res.retcode === 0) {
                    cl.addByData({
                      key: model.get('name')
                    });
                    return model.view.closeDlg();
                  }
                }
              });
              return e.stopPropagation();
            }
          }
        }
      }
    },
    version: {
      _: {
        btn: {
          mod: function(it, e) {
            if (it.key === 'edit') {
              return util.iBtn("th-list", "mod");
            }
          },
          dup: function(it, e) {
            if (it.key === 'edit') {
              return util.iBtn("paste", "dup");
            }
          },
          vm: function(it, e) {
            if (it.key !== 'edit') {
              return util.iBtn("search", "vm");
            }
          }
        },
        event: {
          mod: {
            type: 'click',
            fun: showInTd
          },
          dup: {
            type: 'click',
            fun: function(e) {
              var cl;
              cl = this.collection;
              new form({
                modelOpt: {
                  urlRoot: cl.url()
                },
                entity: this.entity,
                toFetch: false,
                mode: 'modal',
                _saveSuccess: function(model, res) {
                  if (res.retcode === 0) {
                    cl.addByData({
                      key: model.get('name')
                    });
                    return model.view.closeDlg();
                  }
                }
              });
              return e.stopPropagation();
            }
          },
          vm: {
            type: 'click',
            fun: function(e) {
              var t, url;
              t = util.ct(e);
              if (t.attr('showTip') === 'true') {
                t.popover('hide');
                return t.attr('showTip', 'false');
              } else {
                url = (this.collection.url()) + "/" + (this.findData(e).get('key'));
                return $.get(url, function(res) {
                  t.popover({
                    title: '详细信息',
                    trigger: 'manual',
                    placement: 'left',
                    content: res.body.replaceAll('\n', '<br/>'),
                    html: true
                  });
                  t.popover('show');
                  return t.attr('showTip', 'true');
                });
              }
            }
          }
        },
        tbItem: {
          radio: {
            type: 'radio',
            name: 'cur',
            noLabel: true,
            w: 40
          },
          key: {},
          _opt: {
            type: 'btns',
            w: 150
          }
        },
        item: ['name'],
        action: function() {
          return ['mod', 'dup', 'vm'];
        }
      }
    },
    selection: {
      _: {
        btn: {
          kv: function(it, e) {
            return util.iBtn("th-large", "kv");
          }
        },
        event: {
          kv: {
            type: 'click',
            fun: showInTd
          },
          popAdd: {
            type: 'click',
            fun: function(e) {
              var cl;
              cl = this.collection;
              new form({
                modelOpt: {
                  urlRoot: cl.url()
                },
                entity: this.entity,
                toFetch: false,
                mode: 'modal',
                _saveSuccess: function(model, res) {
                  if (res.retcode === 0) {
                    cl.addByData({
                      key: model.get('name')
                    });
                    return model.view.closeDlg();
                  }
                }
              });
              return e.stopPropagation();
            }
          }
        },
        tbItem: {
          key: {},
          _opt: {
            type: 'btns',
            w: 150
          }
        },
        item: ['name'],
        action: function() {
          return ['kv', 'del'];
        }
      }
    },
    kv: {
      _: {
        tbItem: {
          key: {},
          value: {},
          _opt: {
            type: 'btns',
            w: 150
          }
        },
        item: ['name', 'data'],
        event: {
          popAdd: {
            type: 'click',
            fun: function(e) {
              var cl;
              cl = this.collection;
              new form({
                modelOpt: {
                  urlRoot: cl.url()
                },
                entity: this.entity,
                toFetch: false,
                mode: 'modal',
                _saveSuccess: function(model, res) {
                  if (res.retcode === 0) {
                    cl.addByData({
                      key: model.get('name'),
                      value: model.get('data')
                    });
                    return model.view.closeDlg();
                  }
                }
              });
              return e.stopPropagation();
            }
          }
        },
        action: function() {
          return ['del'];
        }
      }
    }
  });

}).call(this);

//# sourceMappingURL=meta.js.map
