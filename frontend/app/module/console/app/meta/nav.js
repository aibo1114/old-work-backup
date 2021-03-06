// Generated by CoffeeScript 1.12.7
(function() {
  require('../../../../lib/meta/extend/ref');

  require('../../../../lib/func/showInTd');

  m.nav = {
    prop: [
      {
        code: 'fBtn',
        noLabel: true,
        noEdit: true,
        type: 'btn',
        w: '40px',
        attrs: {
          cls: 'noHeadTitle text-center btn btn-sm',
          icon: 'plus'
        }
      }, _ep('ref', {
        noName: true,
        attrs: {
          clickShow: true,
          setAttrs: null,
          afterPick: function(d) {
            this.form.setVal("input[name='href']", util.pageUrl(d));
            this.form.setVal("input[name='label']", d.title);
            return this.form.setVal("input[name='title']", d.subTitle);
          }
        }
      }), _ep('label'), meta._text('href'), meta._text('tip'), meta._text('act'), meta._text('icon'), meta._text('cls')
    ]
  };

}).call(this);

//# sourceMappingURL=nav.js.map
