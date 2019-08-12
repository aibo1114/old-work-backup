// Generated by CoffeeScript 1.12.7
(function() {
  require('../../../../lib/meta/guestBook');

  m.common.user = m._user({
    attrs: {
      key: '_id',
      label: 'username',
      showImg: 'portrait',
      setAttrs: '_id,username,title,email,industry,introduction',
      panelOpt: {
        noStr: 'Search User by username or Email'
      }
    }
  });

  cf.opt = {
    entity: {
      cat: ['post', 'content'],
      headRefEntity: ['post', 'content'],
      headRefChannel: ['index']
    },
    image: {
      portrait: {
        maxWidth: 200,
        text: '>= 200px'
      },
      upload: {
        maxWidth: 550,
        thumb: '_thumb:200',
        text: '>= 550px'
      },
      head: {
        maxWidth: 550,
        thumb: '_thumb:200',
        text: '>= 550px'
      },
      slide: {
        maxWidth: 700,
        thumb: '_thumb:200',
        text: '8:3，>=700px'
      }
    },
    addCat: function(e) {
      return cf.opt.entity.cat.push(e);
    },
    addRef: function(e) {
      return cf.opt.entity.headRefEntity.push(e);
    },
    addChannel: function(e) {
      return cf.opt.entity.headRefChannel.push(e);
    },
    addImg: function(opt) {
      return $.extend(cf.opt.image, opt);
    }
  };

  cf._stat = {
    guestBook: {
      className: 'col-md-12'
    }
  };

  require('./head');

  require('../../../../lib/meta/content');

  require('../../../../lib/meta/post');

  require('../../../../lib/meta/cat');

  require('../../../../lib/meta/link');

  require('../../../../lib/meta/partner');

  util.lcss(cf.modPath + cf.code + '.css');

}).call(this);

//# sourceMappingURL=common.js.map