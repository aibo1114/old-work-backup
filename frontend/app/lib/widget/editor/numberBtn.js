// Generated by CoffeeScript 1.12.7
(function() {
  cf.view.numberBtn = {
    fun: function(opt) {
      var input, p, s, sideBtn, t;
      s = 'btn ' + (opt.style || 'btn-default btn-sm');
      if (opt.disabled) {
        s += ' disabled';
      }
      p = $(opt.parent);
      input = p.children('input');
      if (input.length === 0) {
        input = $("<input type='text'>");
      }
      input.css({
        width: opt.iw
      });
      input.val(opt.dv || 0);
      t = $('<div class="btn-group numberBtn"/>');
      sideBtn = "<button style='width:" + opt.bw + "' type='button' class='" + s + "'></button>";
      t.append($(sideBtn).html('-'));
      t.append(input.attr('class', s));
      t.append($(sideBtn).html('+'));
      t.on('click', 'input', function(e) {
        return util.esp(e);
      });
      t.on('click', 'button', function(e) {
        var i, val;
        util.esp(e);
        t = util.ct(e);
        i = t.siblings('input');
        val = +i.val();
        if (!_.isNaN(val)) {
          val = val + (t.text().trim() === '+' ? 1 : -1);
        } else {
          val = 1;
        }
        if (val < opt.min) {
          val++;
        }
        if (opt.max && val > opt.max) {
          val--;
        }
        i.val(val);
        i.trigger('change');
        return typeof opt.afterClick === "function" ? opt.afterClick(val, opt) : void 0;
      });
      p.append(t);
      if (opt.val) {
        input.val(opt.val);
        if (opt.trigger) {
          input.trigger('change');
        }
      }
      return typeof opt.callback === "function" ? opt.callback(p) : void 0;
    }
  };

  $.extend(meta.common, {
    numberBtn: {
      type: 'text',
      xtype: cf.view.numberBtn,
      attrs: {
        style: 'btn-info'
      }
    }
  });

  module.exports = cf.view.numberBtn;

}).call(this);

//# sourceMappingURL=numberBtn.js.map