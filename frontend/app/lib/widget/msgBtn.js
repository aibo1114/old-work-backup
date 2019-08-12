// Generated by CoffeeScript 1.12.7
(function() {
  module.exports = cf.view.tag.extend({
    parent: 'body',
    className: 'msgBtn',
    init: function() {
      this.render();
      return this.listenTo(this.collection, 'update', this.renderNum);
    },
    renderNum: function() {
      var len;
      this.$('.label').remove();
      if (len = this.collection.length) {
        return this.ctn.append(tu.label(len, 'danger'));
      }
    },
    setContent: function() {
      this.$el.append(tu.icon('inbox'));
      return this.renderNum();
    },
    events: {
      'click i': function(e) {
        return app.dm.collection('air', 'msg', {
          fullScreen: true,
          toFetch: false,
          closeBtn: true,
          collection: app.myMsgList,
          title: '我的消息',
          tagClass: 'list-group',
          noData: function() {
            return "<p class='jumbotron text-xs-center'>您现在没有消息:)</p>";
          },
          _filter: function() {
            return cf.rtp('filterBtnGroup', {
              btns: [
                {
                  title: '未读',
                  selected: true,
                  key: 'new'
                }, {
                  title: '已读',
                  key: 'like'
                }
              ]
            });
          },
          events: {
            'click a': function(e) {
              var m;
              m = this.findData(e);
              m.set('status', 2);
              m.saveAttr('status');
              this.collection.remove(m);
              return this.closeDlg();
            }
          },
          itemContext: function(d) {
            return $.extend(d, {
              title: d.msg,
              subTitle: d.dateCreated.dStr(),
              imgPath: util.resPath(cf.community, d.user._id),
              attrs: {
                href: util.navUrl(d.link)
              }
            });
          }
        });
      }
    }
  });

}).call(this);

//# sourceMappingURL=msgBtn.js.map
