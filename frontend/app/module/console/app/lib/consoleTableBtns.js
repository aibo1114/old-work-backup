// Generated by CoffeeScript 1.12.7
(function() {
  var metaOpt;

  cf.btnStr = _st.btn('primary', 'sm');

  metaOpt = meta._;

  $.extend(metaOpt.btn, {
    del: function(it, e) {
      return util.iBtn('trash', 'del');
    },
    up: function(it, e) {
      return util.iBtn("chevron-up", 'up');
    },
    down: function(it, e) {
      return util.iBtn("chevron-down", 'down');
    },
    edit: function(it, e) {
      return util.iBtn('edit', null, util.navUrl('data/edit', e, it[cf.id]));
    },
    view: function(it, e) {
      return util.iBtn('list-alt', null, util.navUrl('data/view', e, it[cf.id]));
    },
    lockPub: function(it, e) {
      if (user.isAdmin()) {
        if (it.status !== 2) {
          return util.iBtn("check", "pub");
        } else {
          return util.iBtn("lock", "lock");
        }
      }
    },
    batchDel: function(it, e) {
      return {
        label: '批量',
        icon: 'trash',
        cls: cf.btnStr + ' showL2',
        hide: true
      };
    },
    copyAdd: function(it, e) {
      return {
        label: '复制',
        icon: 'paste',
        cls: cf.btnStr + ' showO1',
        hide: true
      };
    },
    topAdd: function(it, e) {
      return {
        label: ii('add'),
        href: util.navUrl('data/add', e),
        icon: 'plus',
        cls: cf.btnStr
      };
    },
    trans: function(it) {
      return {
        icon: 'import',
        label: '迁移',
        cls: cf.btnStr + ' showL1',
        hide: true
      };
    },
    refresh: function(it, e) {
      return {
        icon: 'refresh',
        cls: cf.btnStr
      };
    }
  });

  $.extend(metaOpt.event, {
    trans: {
      type: 'click',
      fun: function() {
        var that;
        that = this;
        return app.dm.form('air', 'common', {
          title: '远程配置',
          prop: [
            m._text('url', {
              ph: '数据备份地址',
              valid: {
                required: true
              }
            }), _ep('username', {
              val: user.username,
              valid: {
                required: true
              }
            }), _ep('password', {
              valid: {
                required: true
              }
            })
          ],
          _save: function() {
            var data, i, it, len, mo, qs;
            if (!this.checkAttrs(mo = this.model.toJSON())) {
              warnMsg('请输入正确的内容');
              return;
            }
            data = (function() {
              var i, len, ref, results;
              ref = that.getChecked();
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                it = ref[i];
                results.push(util.getModel($(it)).toJSON());
              }
              return results;
            })();
            qs = ["u=" + mo.username, "p=" + mo.password].join('&');
            for (i = 0, len = data.length; i < len; i++) {
              it = data[i];
              util.del('_id', it);
            }
            return $.postJSON(mo.url + "/a/batch/add/" + that.entity + "?" + qs, {
              data: data
            }, function() {
              return that.closeDlg();
            });
          }
        });
      }
    },
    batchDel: {
      type: 'click',
      fun: function() {
        var i, it, len, ref, results;
        ref = this.$('tr.active');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          it = ref[i];
          results.push($(it).data('_item').model.destroy());
        }
        return results;
      }
    },
    copyAdd: {
      type: 'click',
      fun: function(e) {
        var ent;
        ent = this.entity;
        return $.get(util.restUrl(this.entity, this.$('tr.active').data('_item').model.id), function(res) {
          res.entity._id = null;
          app.dm.add(app._mod_ctn, ent, {
            data: res.entity
          });
          return cf.r('data/add' + ent, false);
        });
      }
    },
    refresh: {
      type: 'click',
      fun: function(e) {
        return this.collection.resetFetch();
      }
    },
    lockPub: {
      type: 'keyup',
      tag: ':input',
      fun: function(e) {
        if (e.keyCode === 13) {
          return this.save();
        }
      }
    },
    sKey: {
      type: 'keyup',
      tag: ':input',
      fun: function(e) {
        if (e.keyCode === 13) {
          return this.save();
        }
      }
    },
    del: {
      type: 'click',
      fun: function(e) {
        var m;
        util.esp(e);
        if (!confirm(ii('m_sure'))) {
          return;
        }
        m = this.findData(e);
        if (m) {
          m.destroy({
            wait: true
          });
        } else {
          log('no model find');
        }
        return typeof this.afterDel === "function" ? this.afterDel(m.id) : void 0;
      }
    }
  });

}).call(this);

//# sourceMappingURL=consoleTableBtns.js.map
