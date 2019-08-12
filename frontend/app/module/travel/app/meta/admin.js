// Generated by CoffeeScript 1.12.7
(function() {
  var _ob;

  require('../../../console/app/meta/common');

  require('../../../console/app/meta/head');

  require('../../../../lib/meta/content');

  require('../../../../lib/meta/post');

  require('../../../../lib/meta/cat');

  require('../../../../lib/meta/link');

  require('./common');

  require('./entity');

  require('./sight');

  require('./show');

  require('./car');

  require('./enquire');

  require('./tour');

  require('./deal');

  cf.opt = {
    entity: {
      categories: ['post', 'brand', 'commodity'],
      headRefEntity: ['sight', 'show', 'food', 'handicraft', 'culture', 'post', 'content'],
      headRefChannel: ['top', 'index']
    },
    image: {
      index: {
        maxWidth: 500,
        text: '宽高比1:2或者1:1，宽度最小210px'
      },
      top: {
        thumb: '_thumb:180',
        text: '宽高比5:2，宽度最小1200px'
      },
      list: {
        maxWidth: 250,
        text: '宽高比1:2，宽度最小210px'
      },
      slide: {
        text: '宽高比8:3，宽度最小800px',
        maxWidth: 890
      }
    }
  };

  _ob = ['popView', 'processOrderStatus', 'del'];

  cf.view.view.prototype.btns = ['close'];

  cf.view.view.prototype._showAll = true;

  cf._stat = {
    suggestion: {
      itemBtns: _ob,
      colNum: 8
    },
    enquire: {
      itemBtns: _ob,
      colNum: 8
    },
    deal: {
      itemBtns: _ob,
      colNum: 8
    }
  };

}).call(this);

//# sourceMappingURL=admin.js.map
