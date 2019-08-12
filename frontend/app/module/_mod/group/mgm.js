// Generated by CoffeeScript 1.12.7
(function() {
  $.extend(true, m._, {
    event: {
      lockPub: {
        type: 'click',
        fun: function(e) {
          var code, d, opt, st, t;
          t = util.ct(e);
          d = this.findData(e);
          st = d.get('status');
          code = st === 2 ? 'disable' : st === 1 || st === 3 ? 'enable' : void 0;
          if (code) {
            opt = {
              ent: d.get('_e'),
              id: d.id
            };
            if (t.attr('ents')) {
              opt.ents = t.attr('ents');
            }
            return $.postJSON(util.actUrl("mgm/pubLock/" + code), opt);
          }
        }
      },
      isTop: {
        type: 'click',
        fun: function() {
          var code, d, opt;
          d = this.findData(e);
          code = d.get('top') === true ? 'false' : 'true';
          opt = {
            ent: d.get('_e'),
            id: d.id
          };
          return $.postJSON(util.actUrl("mgm/setTop/" + code), opt);
        }
      }
    },
    btn: {
      isTop: function() {
        return util.iBtn("user", "topIt ccBtn");
      },
      lockPub: function(it, e) {
        var res;
        res = null;
        if (cf.isMgm()) {
          res = it.status !== 2 ? util.iBtn("check", "pub ccBtn") : util.iBtn("lock", "lock ccBtn");
        }
        return res;
      }
    }
  });

  app.groupStat = function(e) {
    $.postJSON(util.actUrl('stat', 'group', 'all'), {}, function(res) {});
    return $(e).addClass('disabled').removeAttr('onclick');
  };

  cf.groupMgm = function() {
    if (app.prev(1).name === 'group') {
      return $('.mobView .card-header').mk('a', {
        "class": 'backBtn mgm ' + _st.icon('cog')
      }, null, null, 'click', function() {
        return cf.dm.l('pageEditor', 'slide', {
          title: '小组设置',
          entity: 'group',
          model: app.myGroup,
          prop: [
            {
              label: '小组统计',
              code: 'groupStat',
              noMod: true,
              prop: {
                onclick: 'app.groupStat(this)'
              }
            }, {
              label: '组员统计',
              code: 'stat',
              xtype: 'pageSelect',
              prop: {
                "class": 'm-b-1'
              },
              attrs: {
                data: function() {
                  var i, it, res;
                  res = ['统计当前'];
                  for (it = i = 1; i <= 8; it = ++i) {
                    res.push("第" + it + "周");
                  }
                  return res;
                },
                pick: function(e) {
                  var gd, gm, op, tt, v;
                  gd = app.myGroup.toJSON();
                  gm = app.groupMember.toJSON();
                  v = util.ct(e).index();
                  tt = v === 0 ? tt = new Date() : new Date(gd.startedDate).addDays((v - 1) * 7);
                  if (tt > new Date()) {
                    return popMsg('不能统计未来的数据', 'warning');
                  } else {
                    op = {
                      gm: gm.pk('_id', 'user._id'),
                      sTime: tt.monday(),
                      week: v,
                      task: gd.task.pk('perWeek', 'price', 'subData.code')
                    };
                    return $.postJSON(util.actUrl('stat', 'group', gd._id), op, function(res) {
                      return log('zzzz');
                    });
                  }
                }
              }
            }, {
              label: '停止申请',
              noMod: true,
              code: 'isApply'
            }, {
              label: '人员管理',
              noMod: true,
              code: 'isApply'
            }, {
              label: '开放申请',
              noMod: true,
              code: 'isApply'
            }, m._pic('qrcode', {
              prop: {
                "class": 'pv bb'
              }
            })
          ]
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=mgm.js.map