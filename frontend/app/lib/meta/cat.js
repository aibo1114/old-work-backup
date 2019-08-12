// Generated by CoffeeScript 1.12.7
(function() {
  meta.cat = {
    code: 'cat',
    def: true,
    type: 'entity',
    prop: [
      _ep('code'), _ep('title'), _ep('subTitle'), _ep('row'), m._text('type', {
        valid: {
          char: true
        },
        data: function() {
          var i, it, len, ref, res;
          res = [];
          ref = user.entities;
          for (i = 0, len = ref.length; i < len; i++) {
            it = ref[i];
            if (!it.key.startsWith('_')) {
              res.push(it.key);
            }
          }
          return res;
        }
      }), m.content.prop.codeBy('status'), _ep('pic')
    ]
  };

}).call(this);

//# sourceMappingURL=cat.js.map