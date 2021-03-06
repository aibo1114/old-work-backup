// Generated by CoffeeScript 1.12.7
(function() {
  var area, isZZ;

  isZZ = function(v) {
    var ref;
    return v && ((ref = v.substr(0, 2)) === '11' || ref === '12' || ref === '31' || ref === '50');
  };

  area = {
    fun: function(opt) {
      return cf.loadJS(cf.rPath + 'js/area_postcode.js', function() {
        var al, c, i, it, len, op, p, pc, ref, sc, ss, sv;
        p = $(opt.parent).addClass('areaWt');
        if (!cf._areaList) {
          cf._areaList = {};
        }
        al = cf._areaList;
        if (!al.data) {
          al.data = _areaData.split(',');
        }
        ss = '<select class="form-control"><option>##</option></select>';
        pc = opt.form.model.get(opt.prop) || '000000';
        if (!al.sList) {
          al.sList = [];
          ref = al.data;
          for (i = 0, len = ref.length; i < len; i++) {
            it = ref[i];
            if (it.substring(2, 6) === '0000') {
              op = it.split('|');
              al.sList.push({
                label: op[1],
                val: op[0]
              });
            }
          }
        }
        if (opt.c) {
          c = opt.c;
        } else {
          c = $(ss.replace('##', '省份'));
          c.addClass('c');
          p.append(c);
        }
        c.append(util.genOptionItem(al.sList));
        if (opt.sc) {
          sc = opt.sc;
        } else {
          sc = $(ss.replace('##', '城市'));
          sc.addClass('sc');
          p.append(sc);
        }
        if (opt.sv) {
          sv = opt.v;
        } else if (!opt.noSv) {
          sv = $(ss.replace('##', '地区'));
          sv.addClass('sv');
          p.append(sv);
        }
        if (opt.auto) {
          c.css('width', opt.auto);
          sc.css('width', opt.auto);
          if (!opt.noSv) {
            sv.css('width', opt.auto);
          }
        }
        c.change(function() {
          var j, k, len1, len2, ref1, ref2, v;
          v = $(this).val();
          if (v === '') {
            $(this).addClass('ph');
          } else {
            $(this).removeClass('ph');
          }
          if (!al[v]) {
            al[v] = [];
          }
          if (isZZ(v)) {
            ref1 = al.data;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              it = ref1[j];
              if (v && it.substr(0, 2) === v.substr(0, 2) && it.substring(4, 6) !== '00') {
                al[v].push({
                  label: it.substr(7),
                  val: it.substr(0, 6)
                });
              }
            }
            sv && sv.hide();
          } else {
            sv && sv.show();
            ref2 = al.data;
            for (k = 0, len2 = ref2.length; k < len2; k++) {
              it = ref2[k];
              if (v && it.substring(0, 2) === v.substring(0, 2) && it.substring(2, 6) !== '0000' && it.substring(4, 6) === '00') {
                al[v].push({
                  label: it.substr(7),
                  val: it.substr(0, 6)
                });
              }
            }
          }
          al.addr = $('option:selected', c).text();
          p.attr('area', al.addr);
          p.attr('postcode', v);
          if (opt.prop) {
            opt.form.model.set(opt.prop, v);
          }
          if (opt.text) {
            opt.form.model.set(opt.text, al.addr);
          }
          if (opt.ref) {
            $(opt.ref).val(al.addr);
          }
          sc.html(util.genOptionItem(al[v]));
          return sc.trigger('change');
        });
        sc.change(function() {
          var j, len1, ref1, ref2, v;
          v = $(this).val() || '';
          if (v === '') {
            $(this).addClass('ph');
          } else {
            $(this).removeClass('ph');
          }
          if (!al[v]) {
            al[v] = [];
            ref1 = al.data;
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              it = ref1[j];
              if (it.substring(0, 4) === v.substring(0, 4) && it.substring(4, 6) !== '00') {
                op = it.split('|');
                al[v].push({
                  label: op[1],
                  val: op[0]
                });
              }
            }
          }
          al.addr = $('option:selected', c).text() + $('option:selected', sc).text();
          if (opt.prop) {
            opt.form.model.set(opt.prop, v);
          }
          if (opt.text) {
            opt.form.model.set(opt.text, al.addr);
          }
          if (opt.ref) {
            $(opt.ref).val(al.addr);
          }
          p.attr('area', al.addr);
          p.attr('postcode', v);
          if (!opt.noSv && !isZZ(v)) {
            sv.html(util.genOptionItem(al[v]));
            return sv.trigger('change');
          } else {
            return (ref2 = opt.scChange) != null ? ref2.call(opt.form) : void 0;
          }
        });
        sv && sv.change(function() {
          var ref1, v;
          v = $(this).val();
          al.addr = $('option:selected', c).text() + $('option:selected', sc).text() + $('option:selected', sv).text();
          if (opt.prop) {
            opt.form.model.set(opt.prop, v);
          }
          if (opt.text) {
            opt.form.model.set(opt.text, al.addr);
          }
          if (opt.ref) {
            $(opt.ref).val(al.addr);
          }
          p.attr('area', al.addr);
          p.attr('postcode', v);
          return (ref1 = opt.svChange) != null ? ref1.call(opt.form) : void 0;
        });
        c.val((pc.substring(0, 2)) + "0000");
        c.trigger('change');
        if (opt.noSv) {
          sc.val(pc);
          sc.trigger('change');
        } else {
          if (isZZ(pc)) {
            sc.val(pc);
            if (sv) {
              sv.hide();
            }
          } else {
            sc.val((pc.substring(0, 4)) + "00");
            sc.trigger('change');
            sv && sv.val(pc);
          }
        }
        return typeof opt.callback === "function" ? opt.callback() : void 0;
      });
    }
  };

  $.extend(meta.common, {
    area: {
      type: 'holder',
      xtype: area,
      auto: true,
      attrs: {
        auto: true,
        ref: '#postcode',
        prop: 'postcode'
      }
    },
    address: {
      type: 'textarea',
      valid: {
        required: true,
        minlength: 5,
        maxlength: 120
      }
    }
  });

  module.exports = area;

}).call(this);

//# sourceMappingURL=areaCode.js.map
