// Generated by CoffeeScript 1.12.7
(function() {
  require('../../../lib/meta/partner');

  app.enhance({
    routes: {
      '!/home': 'home',
      '!/home/partner': 'partner',
      '!/home/shop': 'shop',
      '!/home/profile': 'profile',
      '!/home/order': 'order',
      '!/home/order/view/:id': 'orderView'
    },
    checkPage: function(name) {
      if (name === 'order' || name === 'shop' || name === 'consultant') {
        if (!user.hasRole('manager')) {
          popMsg('请先录入个人信息与邀请码');
          cf.r('home/profile');
          return false;
        }
      }
      return true;
    },
    home: function() {
      return log('home');
    },
    orderView: function(id) {
      return this.dm.view(ctn, 'order', id, {
        btns: ['back']
      });
    },
    order: function() {
      var opt;
      opt = {
        q: {
          'owner._id': user.id
        }
      };
      return $.get(util.restUrl('shop'), opt, (function(_this) {
        return function(res) {
          var sh;
          sh = res.entities[0];
          if (sh) {
            return _this.dm.collection(ctn, 'order', {
              _attrs: function() {
                return 'username,status,appointmentTime,symptom,consultant';
              },
              itemBtns: ['processOrderStatus', 'del'],
              criteriaOpt: function() {
                return {
                  q: {
                    'shop._id': sh._id
                  }
                };
              },
              itemContext: function(d) {
                return $.extend(d, {
                  btn: true,
                  tag: 'a',
                  subTitle: "<span class='label label-info'>" + (cf.st.text('order', d.status)) + "</span> " + (d.appointmentTime.dStr(16)),
                  title: d.username + " <small>" + d.symptom + "</small>",
                  content: null,
                  attrs: {
                    href: util.navUrl('home/order/view', d._id)
                  }
                });
              }
            });
          } else {
            popMsg("请先录入验配中心信息", 'warning');
            return cf.r('home/shop');
          }
        };
      })(this));
    },
    partner: function() {
      var ctn, et, opt;
      ctn = this.ctn;
      et = 'partner';
      opt = {
        q: {
          'zz': 1
        }
      };
      return $.get(util.restUrl(et), opt, (function(_this) {
        return function(res) {
          var es;
          es = res.entities;
          if (es.length > 1) {
            return _this.dm.collection(ctn, et, {
              data: res.entities,
              toFetch: false
            });
          } else {
            if (es.length === 1) {
              return _this.dm.edit(ctn, et, es[0]._id, {
                data: es[0]
              });
            } else {
              return _this.dm.add(ctn, et, {
                data: {
                  owner: user.pick()
                }
              });
            }
          }
        };
      })(this));
    },
    shop: function(e) {
      var opt, prop;
      prop = [_ep('title')];
      opt = {
        q: {
          'owner._id': user.id
        }
      };
      return $.get(util.restUrl('shop'), opt, (function(_this) {
        return function(res) {
          var es;
          es = res.entities;
          if (es.length > 1) {
            return _this.dm.collection(ctn, 'shop', {
              data: res.entities,
              toFetch: false
            });
          } else {
            if (es.length === 1) {
              return _this.dm.edit(ctn, 'shop', es[0]._id, {
                prop: prop,
                data: es[0],
                cols: 'col-xs-3:col-xs-9'
              });
            } else {
              return _this.dm.add(ctn, 'shop', {
                prop: prop,
                data: {
                  owner: user.pick()
                },
                cols: 'col-xs-3:col-xs-9'
              });
            }
          }
        };
      })(this));
    },
    profile: function() {
      var data;
      if (window.wt) {
        wt.setWtJs();
      }
      data = user.attributes;
      if (user.roles) {
        return this.dm.edit(ctn, 'user', user.id, {
          cleanAll: true,
          title: '用户信息',
          toFetch: false,
          cols: 'col-xs-3:col-xs-9',
          btns: ['save'],
          prop: [_ep('username'), _ep('user:gender'), _ep('phone'), _.text('wid'), _ep('email'), _ep('title'), _ep('address'), _ep('introduction'), _.pic('portrait')],
          data: data,
          _saveSuccess: function(model, res) {
            user.set(res.entity);
            user.storeAuth();
            return cf.r(app.dfPath);
          }
        });
      } else {
        return this.dm.add(ctn, 'user', {
          data: data,
          title: '新建用户',
          prop: [
            _ep('username'), _ep('phone'), _.text('wid'), _.text('roleCode'), m._hidden('afterSave', {
              val: 'assignRoleByCode'
            })
          ],
          _saveSuccess: function(model, res) {
            popMsg('注册成功');
            user.logout();
            return user.loginByWoid();
          }
        });
      }
    }
  });

}).call(this);

//# sourceMappingURL=home.js.map
