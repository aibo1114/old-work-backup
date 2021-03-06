// Generated by CoffeeScript 1.12.7
(function() {
  var loadPic;

  $.extend(util, {
    loadPic: function(ctn) {
      var href, i, id, it, k, len, ref, ref1, ref2, results, t, v;
      if (ctn) {
        ref = $('img[bb-src]', ctn);
        for (i = 0, len = ref.length; i < len; i++) {
          it = ref[i];
          t = $(it);
          href = t.attr('bb-src');
          t.removeAttr('bb-src');
          cf._dImg[href + "::" + (t.attr('id'))] = t;
        }
      }
      ref1 = cf._dImg;
      results = [];
      for (k in ref1) {
        v = ref1[k];
        if (util.isInView(v)) {
          ref2 = k.split('::'), href = ref2[0], id = ref2[1];
          results.push(util.loadImg(v, href, v.attr('def')));
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    loadImg: function(t, href, isDef, callback) {
      var cls, img, key;
      if (isDef == null) {
        isDef = true;
      }
      img = new Image();
      cls = t.attr('class').replace('_imgBox', '_img');
      key = href + "::" + (t.attr('id'));
      return $(img).load(function() {
        var sq;
        $(this).addClass(cls);
        sq = t.hasClass('square');
        if (t.attr('onclick')) {
          $(this).attr('onclick', t.attr('onclick'));
        }
        if (t.attr('style')) {
          $(this).attr('style', t.attr('style'));
        }
        util.del(key, cf._dImg);
        t.replaceWith($(this));
        if (sq) {
          $(this).css({
            height: $(this).width()
          });
        }
        if (callback) {
          return callback();
        }
      }).on('error', function() {
        if (isDef) {
          t.replaceWith("<img class='" + cls + "' src='" + (util.resPath(cf.community, 'images/df.jpg')) + "'>");
        }
        return util.del(key, cf._dImg);
      }).attr("src", href);
    }
  });

  cf._dImg = {};

  cf.bbEvt.on('scroll', function() {
    return util.loadPic();
  });

  loadPic = function() {
    return util.loadPic();
  };

  $('body').on('slid.bs.carousel', loadPic);

  $('body').on('shown.bs.collapse', loadPic);

  util.loadPic('body');

}).call(this);

//# sourceMappingURL=loadNewPic.js.map
