// Generated by CoffeeScript 1.12.7
(function() {
  meta.wechatMenu = {
    type: {
      type: 'select',
      noChange: true,
      data: {
        file: 'File',
        'folder-close': 'Folder'
      },
      events: {
        change: function(e) {
          var v;
          v = util.ct(e).val();
          if (v === 'folder-close') {
            if (!this.model.get(this.p.subName)) {
              return this.model.set(this.p.subName, []);
            }
          } else {
            return this.model.unset(this.p.subName);
          }
        }
      }
    },
    kind: {
      type: 'select',
      data: ['click', 'view', 'scancode_push', 'scancode_waitmsg', 'pic_sysphoto', 'pic_photo_or_album', 'pic_weixin', 'location_select'],
      events: {
        change: function(e) {
          var i, it, len, ref, v;
          ref = ['key', 'url'];
          for (i = 0, len = ref.length; i < len; i++) {
            it = ref[i];
            this.rmInput(it);
          }
          v = util.ct(e);
          return this.renderSpeProp(this.prop.codeBy(v));
        }
      }
    },
    key: {
      valid: {
        required: true
      }
    },
    url: {
      valid: {
        required: true
      }
    },
    _: {
      item: ['type', 'kind', 'label']
    }
  };

}).call(this);

//# sourceMappingURL=wechatMenu.js.map
