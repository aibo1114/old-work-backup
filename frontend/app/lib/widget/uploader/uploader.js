// Generated by CoffeeScript 1.12.7
(function() {
  require("../../../lib/style/mod/upload.less");

  module.exports = cf.view.uploader = {
    fun: function(opt) {
      var cfg, fi, fu, kk, msg, p, ref, upOpt;
      if (util.isIE('8') || util.isIE('7') || util.isIE('6')) {
        popMsg('浏览器版本过低，请升级浏览器，谢谢', 'warning');
        return;
      }
      if (opt.dMode) {
        return;
      }
      p = $(opt.parent);
      fu = $("<div class='uploadBtn'>" + opt.btnTitle + "<input type='file' value='浏览'/></div>");
      fi = fu.children('input');
      cfg = cf.uSize[opt.type];
      if (opt.multi) {
        fi.attr('multiple', true);
      }
      if (cfg.ext) {
        fi.attr('accept', 'image/*');
      }
      p.append(fu);
      if (opt.form) {
        kk = opt.form.model.entity + "_" + opt.name + "_ph";
        msg = si(kk);
        if (msg) {
          p.append("<div>" + msg + "</div>");
        }
        if (opt.upOpt.text) {
          p.append("<div>" + (util.del('text', opt.upOpt)) + "</div>");
        }
      }
      upOpt = opt.upOpt;
      upOpt.code = cf.code;
      if (window.user) {
        upOpt.uid = user.id;
      }
      upOpt.eid = opt.form ? opt.form.model.id : null;
      upOpt.func = opt.func;
      fi.change(function(e) {
        var fd, file, fs, i, j, n, ref, ref1, ref2, results;
        fs = util.ct(e)[0].files;
        results = [];
        for (i = j = 0, ref = fs.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
          file = fs[i];
          if (file.size > cfg.max) {
            results.push(popMsg('文件太大', 'warning'));
          } else {
            fd = new FormData();
            if ((ref1 = opt.func) === 'portrait' || ref1 === 'id') {
              n = opt.upOpt.eid;
            } else if ((ref2 = opt.func) === 'logo' || ref2 === 'banner') {
              n = opt.func;
            } else {
              n = util.randomChar(8);
            }
            fd.append(n, file);
            results.push($.ajax({
              type: 'POST',
              url: util.getUrlParams(util.actUrl("upload"), upOpt),
              data: fd,
              contentType: false,
              processData: false,
              success: function(res) {
                return opt.uploadCallback.call(opt.ctx, res);
              }
            }));
          }
        }
        return results;
      });
      if (opt.syncBtn) {
        p.prepend("<div class=\"syncImg uploadBtn\">" + (iim('sync', opt.type)) + "</div>");
      }
      if (opt.pickBtn && !((ref = opt.func) === 'id' || ref === 'portrait') && user.isAdmin()) {
        return p.prepend($("<div class='pickPics uploadBtn'>" + (iim('m_select', opt.type)) + "</div>").click(function() {
          return cf.dm.l('fileCollection', 'air', {
            type: 'img',
            toFetch: true,
            closeBtn: true,
            preRender: function() {},
            title: '选择图片',
            itemBtns: ['insertToPage'],
            url: '/r/c/mg/file/list',
            events: {
              'click .insertToPage': function(e) {
                var res;
                res = {
                  path: util.ct(e).parent().prev().attr('src'),
                  type: this.type,
                  func: opt.func
                };
                res.id = res.path.split('/').pop();
                if (!opt.multi) {
                  opt.ctx.collection.reset();
                }
                opt.ctx.collection.add(res);
                opt.ctx._addArrayItem(res.id, opt.multi);
                return this.closeDlg();
              }
            }
          });
        }));
      }
    }
  };

}).call(this);

//# sourceMappingURL=uploader.js.map
