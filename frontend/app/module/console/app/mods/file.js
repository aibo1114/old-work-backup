// Generated by CoffeeScript 1.12.7
(function() {
  var dd, fileCollection;

  fileCollection = require('../../../../lib/widget/fileCollection');

  dd = [
    {
      key: 'img',
      row: 10
    }
  ];

  app.enhance({
    routes: {
      '!/file(/:act)(:/p)': 'file'
    },
    file: function(act, name, p) {
      if (this.initLayout) {
        this.initLayout('file', '2-10', (function(_this) {
          return function() {
            return {
              title: iim('m_mgm', 'file'),
              tmpl: 'dataNavItem',
              data: dd
            };
          };
        })(this));
      }
      switch (act) {
        case 'img':
          return new fileCollection({
            title: ii('file'),
            url: '/r/c/mg/file/list',
            parent: this._mod_ctn,
            toFetch: true,
            itemBtns: ['thumb', 'del'],
            foot: true,
            style: 'panel-primary',
            max: 30
          });
        case 'doc':
          return new fileCollection({
            parent: this._mod_ctn,
            itemBtns: ['_edit', 'del'],
            type: act
          });
        case 'other':
          return log('video');
      }
    }
  });

}).call(this);

//# sourceMappingURL=file.js.map
