// Generated by CoffeeScript 1.12.7
(function() {
  var form, inlineTable, router, table, u, user;

  require('../style/main.css');

  require('../../../lib/init_light');

  require('../../../lib/init');

  cf.tp = $.extend(require('../../../lib/tmpl'), {
    serverItem: require('../tmpl/serverItem.jade')
  });

  require("./meta");

  Backbone.Model.setPost();

  Backbone.Model.prototype.idAttribute = 'key';

  router = require("../../../lib/userRouter");

  user = require('../../../lib/model/user');

  table = require("../../../lib/view/table");

  form = require("../../../lib/view/form");

  $.extend(table.prototype, {
    toFetch: false,
    btns: ['popAdd']
  });

  inlineTable = require("../../../lib/view/inlineTable");

  _i['c.title'] = '名称';

  cf.rsPre = '/k-zk-webmanager/';

  cf.actPre = '/k-zk-webmanager/';

  $.extend(user.prototype, require('../../../lib/func/userMenu'));

  user = user.extend({
    check: function() {
      log('user check......');
      return this.isAdmin() || this.hasRole('manager');
    },
    afterLogin: function() {
      if (this.isRoot()) {
        this.mgm.entity.community = 75;
      }
      this.renderMenu();
      return app.navigate(location.hash || util.navUrl('home'), {
        trigger: true
      });
    },
    afterLogout: function() {
      this.id = null;
      this.mgm = null;
      this.roles = null;
      $('#topbar').empty();
      app.navigate('', {
        trigger: true
      });
      return app.login();
    }
  });

  window.user = u = new user({}, {
    menu: {
      server: 1,
      user: 2
    }
  });

  new router({
    routes: {
      '': 'index',
      '!/login': 'login',
      '!/server(/:id)': 'server'
    },
    checkAuth: false,
    tmpl: cf.tp.console,
    context: function() {
      return {
        name: '配置管理系统'
      };
    },
    ajaxOk: function(e, xhr) {
      var r;
      if (xhr.responseText.charAt(0) === '{') {
        r = $.parseJSON(xhr.responseText);
        if (r.retcode !== 0) {
          return popMsg(r.msg, 'warning');
        }
      }
    },
    index: function() {
      return new form({
        title: '输入ip地址',
        mode: 'panel',
        parent: '#main',
        entity: 'common',
        items: ['zkservers'],
        btns: ['save'],
        toFetch: false,
        urlRoot: util.actUrl('login'),
        _saveSuccess: function(model, res) {
          if (res.retcode === 0) {
            app._login = true;
            return app.navigate(util.navUrl('server'), {
              trigger: true
            });
          }
        }
      });
    },
    server: function(id) {
      $('#main').empty();
      if ($('#serverNav').length === 0) {
        return new cf.view.collection({
          id: 'serverNav',
          mode: 'panel',
          entity: 'server',
          parent: '#side',
          btns: ['popAdd'],
          events: {
            'click .servertItem': function(e) {
              var server, t;
              t = util.ct(e);
              $('#main').empty();
              this.$('.sub').remove();
              util.setActive(t, 'cur');
              server = t.text();
              app._server = server;
              return new cf.view.collection({
                beforeTag: t,
                entity: 'idc',
                mode: 'panel',
                btns: ['popAdd'],
                className: 'list-group sub',
                modelOpt: {
                  tmpl: 'serverItem',
                  tagName: 'a',
                  className: 'list-group-item idc'
                },
                entitiesOpt: function() {
                  return {
                    entityOpt: {
                      urlRoot: util.restUrl('server', server, this.entity)
                    }
                  };
                },
                modeContext: function() {
                  return {
                    title: 'IDC管理'
                  };
                },
                noData: function() {
                  return '<h4 class="text-center">无数据</h4>';
                },
                events: {
                  'click .idc': function(e) {
                    var idc;
                    t = util.ct(e);
                    util.setActive(t);
                    idc = util.ct(e).text();
                    app._idc = idc;
                    return new table({
                      entity: 'version',
                      btns: null,
                      toFetch: true,
                      events: {
                        'click .rad': function(e, isNew) {
                          var tr;
                          tr = util.ct(e).closest('tr');
                          id = tr.data('id');
                          if (id === 'edit') {
                            alert('不能选择 edit');
                            e.preventDefault();
                            return;
                          }
                          if (!isNew) {
                            if (!confirm('你确定要设置 ' + id + ' 为当前版本吗？')) {
                              e.preventDefault();
                              return;
                            }
                          }
                          tr.addClass('success');
                          tr.siblings().removeClass('success');
                          if (this.collection._res.current !== id) {
                            return $.ajax({
                              type: 'PUT',
                              url: (util.restUrl('server', server, 'idc', idc)) + "?version=" + id
                            });
                          }
                        }
                      },
                      entitiesOpt: function() {
                        return {
                          entityOpt: {
                            urlRoot: util.restUrl('server', server, 'idc', idc, this.entity)
                          }
                        };
                      },
                      modeContext: function() {
                        return {
                          title: '版本管理',
                          style: 'panel panel-success'
                        };
                      },
                      afterAddAll: function() {
                        var d;
                        d = this.collection._res;
                        if (d.current) {
                          return this.$("tr[data-id='" + d.current + "']").find('input[type=radio]').trigger('click', 'new');
                        }
                      },
                      afterShow: function(e, p) {
                        var version;
                        t = util.ct(e);
                        version = this.findData(t).id;
                        return new table({
                          pid: t,
                          parent: p,
                          entity: 'selection',
                          toFetch: true,
                          entitiesOpt: function() {
                            return {
                              entityOpt: {
                                urlRoot: util.restUrl('server', server, 'idc', idc, 'version', version, this.entity)
                              }
                            };
                          },
                          modeContext: function() {
                            return {
                              title: '模块管理',
                              style: 'panel panel-warning'
                            };
                          },
                          afterShow: function(e, p) {
                            var selection;
                            t = util.ct(e);
                            selection = this.findData(t).id;
                            return new table({
                              toFetch: true,
                              pid: t,
                              parent: p,
                              entity: 'kv',
                              entitiesOpt: function() {
                                return {
                                  entityOpt: {
                                    urlRoot: util.restUrl('server', server, 'idc', idc, 'version', version, 'selection', selection, this.entity)
                                  }
                                };
                              },
                              modeContext: function() {
                                return {
                                  title: '键值管理',
                                  style: 'panel panel-danger'
                                };
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                }
              });
            }
          },
          modelOpt: {
            tmpl: 'serverItem',
            tagName: 'a',
            className: 'list-group-item servertItem'
          },
          modeContext: function() {
            return {
              tagClass: 'list-group',
              title: '服务管理',
              style: 'panel panel-default'
            };
          }
        });
      }
    },
    callback: function() {}
  });

}).call(this);

//# sourceMappingURL=main.js.map
