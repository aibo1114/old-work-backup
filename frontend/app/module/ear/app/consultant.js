// Generated by CoffeeScript 1.12.7
(function() {
  var cs;

  require('./meta/consultant');

  require('./meta/brand');

  cs = [
    _ep('username'), _ep('user:gender'), _ep('phone'), m._text('qq'), {
      code: 'exp',
      type: 'text',
      xtype: 'dTime',
      attrs: {
        minView: 2,
        startView: 4
      }
    }, m._select('workTitle', {
      attrs: {
        data: ['二级验配师(最高)', '三级验配师', '四级验配师', '其他']
      }
    }), m._select('major', {
      attrs: {
        data: ['听力学', '医学相关', '教育心理相关', '管理经济相关', '其他']
      }
    }), _ep('goodAtBrand'), m._checkbox('strength', {
      attrs: {
        data: ['成人助听器验配', '儿童助听器验配', '声场评估测试', '真耳分析', '听力咨询', '康复指导']
      }
    }), _ep('description'), m._pic('head')
  ];

  cf.view.ipBtn('', 'consultant', ctn, {
    check: function(f) {
      if (f === 'edit' || f === 'add') {
        if (W.wt) {
          wt.setWtJs();
        }
      }
      if (f === 'add' || f === 'list') {
        if (!cf._sh) {
          throw 'rt::consultant';
        }
      }
    },
    func: function() {
      var opt;
      opt = {
        q: {
          'owner._id': user.id
        }
      };
      return $.get(util.restUrl('shop'), opt, (function(_this) {
        return function(res) {
          cf._sh = res.entities[0];
          if (cf._sh) {
            return cf.r('consultant/list');
          } else {
            popMsg("请先录入验配中心信息", 'warning');
            return cf.r('home/shop');
          }
        };
      })(this));
    },
    listOpt: {
      _attrs: function() {
        return 'username,shop,strength,refFile';
      },
      modelOpt: {
        tagName: 'a'
      },
      itemContext: function(d) {
        return $.extend(d, {
          imgCls: 'img-circle square',
          subTitle: d.shop.title,
          title: d.username,
          brief: d.strength,
          btn: true
        });
      },
      criteriaOpt: function() {
        return {
          q: {
            'shop._id': cf._sh._id
          }
        };
      }
    },
    editFormOpt: {
      prop: cs
    },
    addFormOpt: {
      prop: cs,
      before: function(d) {
        d.shop = _.pick(cf._sh, meta.shop.selectOpt.split(','));
        return d;
      }
    }
  });

  app.enhance({
    routes: {
      '!/consultant/addInfo': 'addInfo'
    },
    addInfo: function() {
      return this.dm.addOrEdit(ctn, 'consultant', {
        q: {
          phone: user.get('phone') || 'noPhone'
        }
      }, {
        prop: cs,
        data: function() {
          return {
            uid: user.id,
            phone: user.get('phone')
          };
        }
      });
    }
  });

}).call(this);

//# sourceMappingURL=consultant.js.map
