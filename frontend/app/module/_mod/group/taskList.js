// Generated by CoffeeScript 1.12.7
(function() {
  m.thread = {
    prop: [
      _ep('title', {
        ph: '20字以内',
        valid: {
          maxlength: 20,
          minlength: 2
        }
      }), {
        code: 'content',
        type: 'textarea',
        rows: 10,
        ph: '请在这里输入内容,200字以内',
        attrs: {
          max: 200,
          rows: 8
        }
      }
    ]
  };

  module.exports = _exv('taskList', 'collection', {
    parent: ctn,
    entity: 'thread',
    mode: 'blank',
    tagClass: 'list-group',
    head: false,
    className: 'mobView',
    backBtn: false,
    itemBtns: ['lockPub', 'isTop'],
    modelOpt: {
      className: 'list-group-item p-x-0 p-y-h m-b-h'
    },
    exEvents: {
      'click img': cf._showUserInfo,
      'click .col-xs-10,.col-xs-12': function(e) {
        var mo;
        mo = this.findData(e);
        W.ctn = 'slide';
        cf.r(_nav(app.myGroup.id, 'thread', mo.id));
        return W.ctn = app.ctn;
      }
    },
    itemContext: function(d) {
      var btn, i, imgPath, it, len, sIcons, subNewLine, subTitle, title;
      if (d.cat === 'post') {
        title = d.title;
      } else {
        title = util.adjustText(d.content, 80);
      }
      if (this.self) {
        if (d.cat === 'task') {
          title = ("【" + (d.form.title.substr(0, 2)) + "】") + title;
        }
      } else {
        imgPath = tu.userPic(cf.community, d.user);
      }
      subTitle = "<span class='pull-xs-left'>" + ($.timeago(Date.parseLocal(d.lastUpdated))) + "</span><span class='pull-xs-right iTop2'>";
      sIcons = [
        {
          icon: 'eye-open',
          val: d.viewCount || 0
        }, {
          icon: 'thumbs-up',
          val: d.like ? d.like.length : 0
        }, {
          icon: 'comment',
          val: d.reply ? d.reply.length : 0
        }
      ];
      if (user.username === 'alex') {
        sIcons = sIcons.concat([
          {
            icon: 'heart-empty',
            val: d.pick ? d.pick.length : 0
          }, {
            icon: 'share',
            val: d.share ? d.share.length : 0
          }
        ]);
      }
      for (i = 0, len = sIcons.length; i < len; i++) {
        it = sIcons[i];
        subTitle += tu.icon(it.icon) + it.val;
      }
      subTitle += '</span>';
      subNewLine = true;
      btn = cf.isMgm();
      return {
        title: title,
        subTitle: subTitle,
        imgPath: imgPath,
        subNewLine: subNewLine,
        btn: btn
      };
    }
  });

}).call(this);

//# sourceMappingURL=taskList.js.map
