// Generated by CoffeeScript 1.12.7
(function() {
  var bTran, btn, reRenderView, router, treeEntityForm, u;

  require('./style/main.less');

  router = require('../../console/app/lib/consoleRouter');

  u = require('../../console/app/lib/consoleUser');

  Backbone.Model.setPost();

  cf.id = 'id';

  Backbone.Model.prototype.idAttribute = cf.id;

  $.extend(cf, {
    loadTmpl: function(name) {
      try {
        return require("./tmpl/" + name + ".jade");
      } catch (error) {
        return require("../../console/tmpl/" + name + ".jade");
      }
    },
    loadLibTmpl: function(name) {
      return require("../../../lib/tmpl/" + name + ".jade");
    }
  });

  cf.actPre = cf.rsPre = 'https://cmbank_manager.cmcm.com/1/api/';

  cf.index = 'console';

  cf.community = {
    name: 'CMB后台管理',
    resPath: '/'
  };

  require('../../../lib/meta/_status');

  require('../../../lib/terminal/h5_mgm');

  require("./meta/meta");

  cf.view.form.prototype.btns = ['back', 'save'];

  cf.view.table.prototype.noLastTime = true;

  btn = require('../../../lib/widget/btn');

  treeEntityForm = require('../../../lib/widget/tree/treeEntityForm');

  cf._mkErrMsg = function(sign, res) {
    var er;
    if (er = res.Error) {
      if (_.isString(er) && er.length) {
        er = JSON.parse(er);
      }
      return popMsg((ii("ret_" + er.ret) || '') + ' ' + (er.msg || ''), sign);
    }
  };

  m._.fmBtn.charge = function() {
    return {
      cls: _st.btn('primary', 'lg', true)
    };
  };

  m._.fmBtn.dismiss = function() {
    return {
      isShow: function(d) {
        return d.card_status !== 5;
      },
      cls: _st.btn('danger', 'lg', true)
    };
  };

  m._.fmBtn.undismiss = function() {
    return {
      isShow: function(d) {
        return d.card_status === 5;
      },
      cls: _st.btn('success', 'lg', true)
    };
  };

  bTran = function(v) {
    return (+v / 100) + " CMB";
  };

  window.user = new u({}, {
    logoutUrl: util.restUrl('logout'),
    permission: ['console'],
    afterLogin: function() {
      return new cf.view.consoleMenu({
        initMenu: [],
        preLogin: function() {
          return this.ctn.empty();
        },
        parent: '#ubb',
        className: 'nav navbar-nav col-xs-12'
      });
    },
    roles: [
      {
        title: 'admin'
      }
    ],
    check: function() {
      return true;
    },
    func: function() {
      var res;
      res = this.funcItem();
      res.shift();
      return res;
    }
  });

  reRenderView = function() {
    return _.delay(function() {
      return $('.searchBox .search').trigger('click');
    }, 400);
  };

  new router({
    checkSvrAuth: util.restUrl('me'),
    checkAuth: false,
    dfPath: 'search',
    logoutPath: 'login',
    checkPage: function(name) {
      if (name === 'account' || name === 'data' || name === 'menu' || name === 'search') {
        if (!user.isLogin()) {
          return false;
        }
      }
      return true;
    },
    checkFail: function() {
      return cf.r('login');
    },
    loadMod: function() {
      require('../../console/app/mods/data');
      return cf.exLabel();
    },
    routes: {
      '': 'index',
      '!/search': 'search',
      '!/login': 'login',
      '!/menu': 'menu',
      '!/*path': 'dAct'
    },
    account: function() {
      return app.dm.form('air', 'user', {
        title: '密码修改',
        btns: ['save'],
        urlRoot: util.actUrl("password"),
        prop: [
          _ep('email', {
            readonly: true
          }), m.common.psd
        ],
        data: {
          email: user.get('email')
        }
      });
    },
    menu: function() {
      return new treeEntityForm({
        entity: 'menu',
        title: '菜单管理',
        head: true,
        foot: false,
        toFetch: true,
        style: 'panel-primary',
        showName: 'name',
        parent: this.ctn,
        parentKey: 'parent_id'
      });
    },
    search: function() {
      return this.dm.tag(this.ctn, {
        cleanAll: true,
        mode: 'panel',
        title: '员工检索',
        _key: 'person_no',
        btn: true,
        head: true,
        style: 'panel-primary',
        className: 'container',
        tmpl: 'searchEmp',
        events: {
          'click ._key': function(e) {
            var t;
            t = util.ct(e);
            this._key = t.attr('key');
            return t.parent().parent().prev().find('.text-center').text(t.text());
          },
          'keyup #q': function(e) {
            if (e.keyCode === 13) {
              return $('.search').trigger('click');
            }
          },
          'click .search': function() {
            var v;
            v = this.$('#q').val().trim();
            if (!v) {
              popMsg('请输入查询条件', 'warning');
              return;
            }
            $('#employeeInfo').remove();
            app.ctn.append(cf.rtp('col2', {
              id: 'employeeInfo',
              left: 'col-md-4',
              right: 'col-md-8'
            }));
            return app.dm.view(app.ctn.find('.leftBox'), 'employee', {
              title: '员工信息',
              cols: '25%,auto',
              toolbar: true,
              urlRoot: util.restUrl("employee/search?" + this._key + "=" + v),
              tagClass: 'table table-striped table-bordered viewTable',
              prop: [
                _ep('card_no', {
                  btns: [
                    {
                      label: '解绑',
                      isShow: function(d) {
                        return d.status && d.card_status !== 1;
                      },
                      cls: 'btn btn-xs btn-danger unbind'
                    }, {
                      label: '挂失',
                      isShow: function(d) {
                        return d.status && d.card_status !== 1;
                      },
                      cls: 'btn btn-xs btn-danger rpLose'
                    }, {
                      label: '解除挂失',
                      isShow: function(d) {
                        return d.status && d.card_status === 1;
                      },
                      cls: 'btn btn-xs btn-success unLose'
                    }, {
                      label: '换卡',
                      isShow: function(d, m) {
                        return d.status && d.card_no && d.card_status !== 100;
                      },
                      show: 100,
                      cls: 'btn btn-xs btn-danger change'
                    }
                  ]
                }), _ep('employee_id'), _ep('person_no'), _ep('person_name', {
                  editable: {
                    urlRoot: util.restUrl('employee/person_name'),
                    before: function(attr) {
                      attr.employee_id = this.pm.get('employee_id');
                      return attr;
                    }
                  }
                }), _ep('mail', {
                  editable: {
                    urlRoot: util.restUrl('employee/mail'),
                    before: function(attr) {
                      attr.employee_id = this.pm.get('employee_id');
                      return attr;
                    }
                  }
                }), _ep('sex', {
                  showText: function(v) {
                    if (+v) {
                      return '女';
                    } else {
                      return '男';
                    }
                  },
                  editable: {
                    urlRoot: util.restUrl('employee/sex'),
                    before: function(attr) {
                      attr.employee_id = this.pm.get('employee_id');
                      return attr;
                    }
                  }
                }), _ep('balance', {
                  showText: bTran,
                  btns: [
                    {
                      label: '扣款',
                      isShow: function(d) {
                        return d.status;
                      },
                      cls: 'btn btn-xs btn-danger deduct'
                    }, {
                      label: '退款',
                      isShow: function(d) {
                        return d.status;
                      },
                      cls: 'btn btn-xs btn-danger refund'
                    }, {
                      label: '转账',
                      isShow: function(d) {
                        return d.status;
                      },
                      cls: 'btn btn-xs btn-danger transfer'
                    }
                  ]
                }), _ep('real_balance', {
                  showText: bTran
                }), _ep('virtual_balance', {
                  showText: bTran
                }), _ep('card_status', {
                  isShow: function(v) {
                    if (v.status === 0) {
                      return false;
                    } else {
                      return true;
                    }
                  },
                  showText: function(v) {
                    return ii("card_status_" + v);
                  }
                })
              ],
              exEvents: {
                'click .undismiss': function(e) {
                  if (!confirm(ii('m_sure'))) {
                    return;
                  }
                  return $.post(util.restUrl('employee/card/unloss'), {
                    employee_id: this.model.get('employee_id')
                  }, function() {
                    popMsg('解除离职成功');
                    return reRenderView();
                  });
                },
                'click .dismiss': function(e) {
                  if (!confirm(ii('m_sure'))) {
                    return;
                  }
                  return $.post(util.restUrl('employee/card/dismiss'), {
                    employee_id: this.model.get('employee_id')
                  }, function() {
                    popMsg('离职成功');
                    return reRenderView();
                  });
                },
                'click .charge': function(e) {
                  return app.dm.form('air', 'employee', {
                    title: '奖励',
                    urlRoot: util.restUrl('employee/bonus'),
                    prop: [
                      m._select('flag', {
                        attrs: {
                          data: {
                            9: '奖励（虚拟）',
                            12: '补助（虚拟）',
                            13: '现金（真实）'
                          }
                        }
                      }), m._number('money', {
                        valid: {
                          required: true
                        }
                      }), m._textarea('description', {
                        label: '备注'
                      })
                    ],
                    btns: ['save'],
                    data: {
                      employee_id: this.model.get('employee_id')
                    },
                    _saveSuccess: function(m) {
                      popMsg('充值成功');
                      m.view.closeDlg();
                      return reRenderView();
                    }
                  });
                },
                'click .unbind': function(e) {
                  if (!confirm(ii('m_sure'))) {
                    return;
                  }
                  return $.post(util.restUrl('employee/unbind_card'), {
                    employee_id: this.model.get('employee_id')
                  }, function(res) {
                    popMsg('已解绑');
                    return reRenderView();
                  });
                },
                'click .rpLose': function(e) {
                  if (!confirm(ii('m_sure'))) {
                    return;
                  }
                  return $.post(util.restUrl('employee/card/loss'), {
                    employee_id: this.model.get('employee_id')
                  }, function(res) {
                    popMsg('已挂失');
                    return reRenderView();
                  });
                },
                'click .unLose': function(e) {
                  if (!confirm(ii('m_sure'))) {
                    return;
                  }
                  return $.post(util.restUrl('employee/card/unloss'), {
                    employee_id: this.model.get('employee_id')
                  }, function(res) {
                    popMsg('已解除挂失');
                    return reRenderView();
                  });
                },
                'click .transfer': function(e) {
                  var eid;
                  eid = this.model.get('employee_id');
                  return app.dm.form('air', 'employee', {
                    urlRoot: util.restUrl('employee/virement'),
                    prop: [
                      m._text('increase_id', {
                        label: '转入员工ID',
                        valid: {
                          required: true
                        }
                      })
                    ],
                    cols: 'col-xs-3:col-xs-9',
                    title: '转账',
                    btns: ['save'],
                    before: function(attr) {
                      attr.reduce_id = eid;
                      return attr;
                    },
                    _saveSuccess: function(m) {
                      popMsg('转账成功');
                      m.view.closeDlg();
                      return reRenderView();
                    }
                  });
                },
                'click .deduct': function(e) {
                  var eid;
                  eid = this.model.get('employee_id');
                  return app.dm.form('air', 'employee', {
                    urlRoot: util.restUrl('employee/deduct'),
                    prop: [
                      m._money('money', {
                        label: '金额'
                      }), _ep('description')
                    ],
                    title: '扣款',
                    btns: ['save'],
                    before: function(attr) {
                      attr.employee_id = eid;
                      attr.money = new Number(attr.money).toFixed(2);
                      return attr;
                    },
                    _saveSuccess: function(m) {
                      popMsg('扣款成功');
                      m.view.closeDlg();
                      return reRenderView();
                    }
                  });
                },
                'click .refund': function(e) {
                  var eid;
                  eid = this.model.get('employee_id');
                  return app.dm.form('air', 'employee', {
                    urlRoot: util.restUrl('employee/refund'),
                    prop: [
                      m._money('money', {
                        label: '金额'
                      }), m._radio('is_virtual', {
                        label: '虚拟',
                        valid: {
                          required: true
                        },
                        attrs: {
                          data: {
                            1: '是',
                            0: '否'
                          }
                        }
                      }), _ep('description')
                    ],
                    title: '退款',
                    btns: ['save'],
                    before: function(attr) {
                      attr.employee_id = eid;
                      attr.money = new Number(attr.money).toFixed(2);
                      return attr;
                    },
                    _saveSuccess: function(m) {
                      popMsg('退款成功');
                      m.view.closeDlg();
                      return reRenderView();
                    }
                  });
                },
                'click .change': function(e) {
                  var eid;
                  eid = this.model.get('employee_id');
                  return app.dm.form('air', 'employee', {
                    urlRoot: util.restUrl('employee/replace_card'),
                    prop: [
                      m._text('card_id', {
                        valid: {
                          required: true
                        }
                      })
                    ],
                    title: '换卡',
                    btns: ['save'],
                    before: function(attr) {
                      attr.employee_id = eid;
                      return attr;
                    },
                    _saveSuccess: function(m) {
                      popMsg('已换卡成功');
                      m.view.closeDlg();
                      return reRenderView();
                    }
                  });
                },
                'click .binding': function(e) {
                  var eid, pn;
                  eid = this.model.get('employee_id');
                  pn = this.model.get('person_no');
                  return app.dm.form('air', 'employee', {
                    urlRoot: util.restUrl('employee/card'),
                    prop: [
                      m._text('card_id', {
                        valid: {
                          required: true
                        }
                      })
                    ],
                    title: '绑定卡号',
                    btns: ['save'],
                    before: function(attr) {
                      attr.employee_id = eid;
                      return attr;
                    },
                    _saveSuccess: function(m) {
                      popMsg('绑定成功');
                      m.view.closeDlg();
                      $('a[key="person_no"]').trigger('click');
                      $('#q').val(pn);
                      return reRenderView();
                    }
                  });
                },
                'click .search': function(e) {
                  var eid;
                  eid = this.model.get('employee_id');
                  return app.dm.tb(app.ctn.find('.rightBox'), 'flow', {
                    btns: [],
                    itemBtns: [],
                    colNum: 6,
                    toolbar: false,
                    setCriteria: function() {
                      return {
                        employee_id: eid
                      };
                    }
                  });
                }
              },
              btns: ['charge', 'dismiss', 'undismiss'],
              topBtns: [
                {
                  label: '查询流水',
                  icon: 'search',
                  isShow: function(d) {
                    return d.status !== 0;
                  },
                  cls: 'btn btn-sm btn-primary search'
                }, {
                  title: '绑定卡号',
                  icon: 'retweet',
                  isShow: function(d) {
                    return d.status !== 1;
                  },
                  cls: 'btn btn-sm btn-primary binding'
                }
              ],
              style: 'panel-default',
              cleanAll: false,
              noData: function() {
                return popMsg('没有数据', 'warning');
              },
              callback: function() {
                if (this.model.get('card_status') > 1) {
                  return popMsg("您的工卡状态为异常");
                }
              }
            });
          }
        }
      });
    }
  });

}).call(this);

//# sourceMappingURL=main.js.map
