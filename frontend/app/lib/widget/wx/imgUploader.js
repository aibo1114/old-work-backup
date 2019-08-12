// Generated by CoffeeScript 1.12.7
(function() {
  var input;

  input = require('./input');

  module.exports = input.extend({
    className: 'wxImg',
    title: '选择图片',
    btnClass: 'choose',
    icon: 'camera',
    type: 'img',
    urls: [],
    events: {
      'click .btn': function(e) {
        var r;
        r = this;
        return wx.chooseImage({
          count: this.multi ? 9 : 1,
          success: function(res) {
            var i, it, len, ref, results;
            if (res.localIds.length) {
              ref = res.localIds;
              results = [];
              for (i = 0, len = ref.length; i < len; i++) {
                it = ref[i];
                results.push(wx.uploadImage({
                  localId: it,
                  isShowProgressTips: 1,
                  success: function(us) {
                    var img;
                    img = it;
                    r.form.model.addHandler('after', 'wtFetcher');
                    if (r.collection) {
                      r.collection.call(r.ctx, {
                        type: r.type,
                        path: img,
                        wt: us.serverId
                      });
                    } else {
                      r.addImg(img);
                    }
                    return r._addArrayItem("_wt::" + r.type + "::" + us.serverId + "::" + ($('body').data('wcode')), r.multi);
                  }
                }));
              }
              return results;
            } else {
              return popMsg('上传失败', 'warning');
            }
          }
        });
      },
      'click .view': function(e) {
        var im, t, urls;
        t = util.ct(e);
        urls = (function() {
          var i, len, ref, results;
          ref = t.parent().children();
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            im = ref[i];
            results.push($(im).attr('src'));
          }
          return results;
        })();
        return wx.previewImage({
          current: t.attr('src'),
          urls: urls
        });
      },
      'press .view': function(e) {
        var t;
        if (!confirm('确定要删除图片吗？')) {
          return;
        }
        t = util.ct(e);
        this._delArrayItem(t.attr('src') + '.jpg');
        return t.remove();
      }
    },
    addImg: function(path) {
      return this.ctn.append("<div class='media'><img class='img-thumbnail' src='" + path + "'/></div>");
    }
  });

}).call(this);

//# sourceMappingURL=imgUploader.js.map