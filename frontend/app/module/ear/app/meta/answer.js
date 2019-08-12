// Generated by CoffeeScript 1.12.7
(function() {
  m.answer = {
    prop: [
      _ep('status'), {
        code: 'issue',
        showText: function(v, d) {
          var ref;
          if (v) {
            return v.content + " 【" + ((ref = d.questioner) != null ? ref.username : void 0) + "】";
          }
        }
      }, {
        code: 'content',
        showText: function(v, d) {
          if (d.user) {
            d.user._e = 'consultant';
            v += '【' + tu.link(d.user, 'username') + '】';
          }
          return v;
        }
      }, _ep('proc')
    ],
    listOpt: {
      _attrs: ''
    },
    filter: {
      issue: 'text:s'
    },
    viewOpt: {
      btns: ['close']
    }
  };

  cf.st.add('answer', cf.st.common_status);

}).call(this);

//# sourceMappingURL=answer.js.map
