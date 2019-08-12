// Generated by CoffeeScript 1.12.7
(function() {
  var author;

  author = require('../../../../lib/meta/extend/uid')();

  require('../../../../lib/meta/post');

  meta.post._ = {
    userOpt: {
      key: 'author',
      val: '_id,username,title,industry,description'
    },
    item: ["title", 'subTitle', 'author', 'source', 'pubTime', "cat", "tags", 'row', "brief", "content", 'uploadPic', 'headPic', 'status', 'group'],
    tbItem: {
      title: {
        type: "view"
      },
      author: {
        w: 150,
        converter: function(d) {
          var ref;
          if (d) {
            return (ref = d.author) != null ? ref.username : void 0;
          }
        }
      },
      row: {
        w: 60,
        type: "text"
      },
      cat: {
        w: 100,
        type: "text"
      },
      dateCreated: {
        w: 155,
        type: "date"
      },
      _btn: ['edit', 'del']
    }
  };

}).call(this);

//# sourceMappingURL=post.js.map
