// Generated by CoffeeScript 1.12.7
(function() {
  require('./pagination.less');

  $.extend(true, cf.view.collection.prototype, {
    exEvents: {
      'click .pagination>li': function(e) {
        var b, t;
        b = util.ct(e);
        t = b.text();
        this.max = this.collection.criteria.max;
        switch (t) {
          case '>':
            this.collection.resetFetch('next');
            this.offset = this.offset + this.max;
            break;
          case '<':
            this.collection.resetFetch('prev');
            this.offset = this.offset - this.max;
            break;
          default:
            t = +t - 1;
            this.collection.resetFetch('one', t);
            this.offset = t * this.max;
        }
        return this._pagePath && this.setPagePath();
      },
      'change .totalNum>select': function(e) {
        var v;
        v = util.ct(e).val();
        this.max = this.collection.criteria.max = +v;
        this.offset = this.collection.criteria.offset = 0;
        this.collection.resetFetch();
        return this._pagePath && this.setPagePath();
      }
    },
    setPagePath: function() {
      var hash, lp;
      hash = location.hash.split('/');
      lp = this.max + "_" + this.offset;
      if (/^\d+_\d+$/.test(hash.last())) {
        hash[hash.length - 1] = lp;
      } else {
        hash.push(lp);
      }
      if (this.offset === 0) {
        hash.pop();
      }
      return cf.r(util.navUrl(hash.join('/')), false);
    },
    genPagination: function(offset, max, count, range) {
      var b, bb, cur, e, ee, end, half, i, n, ref, ref1, res;
      if (count === 0) {
        return [];
      }
      cur = offset / max + 1;
      end = Math.ceil(count / max);
      half = Math.floor(range / 2);
      if (cur - half <= 1) {
        b = 1;
      } else {
        b = cur - half;
        bb = true;
      }
      if (b + range - 1 < end) {
        e = b + range - 1;
        ee = true;
      } else {
        e = end;
        if (b > e - range + 1 && e - range + 1 > 0) {
          b = e - range + 1;
        }
      }
      if (bb) {
        res = [
          {
            num: '1'
          }
        ];
        if (bb) {
          res.push({
            num: '<'
          });
        }
      } else {
        res = [];
      }
      for (n = i = ref = b, ref1 = e; ref <= ref1 ? i <= ref1 : i >= ref1; n = ref <= ref1 ? ++i : --i) {
        res.push({
          num: n
        });
      }
      if (ee) {
        res.push({
          num: '>'
        });
        res.push({
          num: end
        });
      }
      return res;
    },
    pagination: function() {
      var count, max, offset;
      if (!this.foot) {
        return;
      }
      max = this.collection.criteria.max;
      count = this.collection.count;
      offset = this.collection.criteria.offset;
      this.foot.html(cf.rtp(require('./pagination.jade'), {
        res: this.genPagination(offset, max, count, this.pRange),
        max: max,
        cls: 'pagination-sm',
        count: count,
        ctx: this
      }));
      this.foot.find("li:contains('" + (offset / max + 1) + "')").first().addClass('active');
      return this.foot.find('select').val(max);
    }
  });

}).call(this);

//# sourceMappingURL=pagination.js.map
