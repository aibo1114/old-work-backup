// Generated by CoffeeScript 1.12.7
(function() {
  require('../../../../lib/widget/itemSelect');

  _exv('moodTag', 'itemSelect', {
    title: '态度标签',
    tips: '只能选择最多3个标签',
    max: 3,
    fullScreen: true,
    closeBtn: 'pull-xs-left',
    topBtns: [
      {
        label: '保存',
        cls: 'btn btn-sm btn-info save',
        icon: 'save'
      }
    ],
    addAll: function() {
      var d, i, it, len, ref;
      this.rsBox = this.$('.modal-body').mk('h3', {
        "class": 'text-xs-center m-a-1 p-a-1 bg-faded text-faded',
        style: 'height: 62px'
      }, this.tips, 'prepend');
      d = [];
      ref = this.data;
      for (i = 0, len = ref.length; i < len; i++) {
        it = ref[i];
        d.push({
          title: it.title,
          cls: 'btn-primary-outline m-r-1 m-t-1',
          key: it.code
        });
      }
      this.ctn.append(cf.rtp('crBtn', {
        btns: d,
        cls: ' '
      }));
      if (this.val.length) {
        return this.renderBox();
      }
    },
    events: {
      'click h3 .btn': function(e) {
        var t;
        t = util.ct(e);
        this.val.delBy(t.attr('key'), 'code');
        t.remove();
        if (!this.val.length) {
          return this.rsBox.html(this.tips);
        }
      },
      'click label': function(e) {
        var d, k, t;
        util.esp(e);
        t = util.ct(e);
        k = t.attr('key');
        d = this.data.findBy('code', k);
        if (this.val.findBy('code', k)) {
          return this.rsBox.find("[key='" + k + "']").trigger('click');
        } else if (this.val.length < this.max) {
          this.val.push(d);
          return this.renderBox();
        } else {
          return alert('只能选择3个');
        }
      },
      'click .save': function(e) {
        var ob;
        ob = {};
        ob[user.id] = this.val;
        return $.postJSON(this.entUrl, ob, (function(_this) {
          return function(res) {
            return _this.closeDlg();
          };
        })(this));
      }
    },
    renderBox: function() {
      var i, it, len, ref, results;
      this.rsBox.empty();
      ref = this.val;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        it = ref[i];
        results.push(this.rsBox.mk('a', {
          key: it.code,
          "class": 'btn btn-primary m-r-1'
        }, it.title));
      }
      return results;
    }
  });

}).call(this);

//# sourceMappingURL=moodTag.js.map
