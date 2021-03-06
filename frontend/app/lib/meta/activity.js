// Generated by CoffeeScript 1.12.7
(function() {
  require('./participant');

  m.feeTable = {
    prop: [_ep('title'), m._number('amount'), m._number('price'), _ep('description')],
    tbBtn: ['popEdit', 'formDel']
  };

  m.activityItemTable = {
    prop: [
      {
        code: 'pick',
        noName: true,
        type: 'select',
        attrs: {
          entity: 'content',
          keyVal: '_id,title',
          _attrs: '_id,title,content',
          title: '请选择'
        },
        events: {
          change: function(e) {
            var d, data, t;
            t = util.ct(e);
            data = t.data('sdata');
            d = data.findBy('_id', t.val());
            return this._snote.content.summernote('code', d.content);
          }
        }
      }, _ep('title'), _ep('content:content')
    ]
  };

  m.activity = {
    code: 'activity',
    entity: true,
    inherit: true,
    prop: [
      _ep('title'), _ep('subTitle'), _ep('cat'), _ep('row'), {
        code: 'master',
        type: 'text',
        xtype: 'multiSelect',
        bind: true,
        attrs: {
          val: [],
          label: 'username',
          searchItem: 'username',
          showImg: 'portrait',
          setAttrs: 'username,title,industry,introduction,refFile',
          panelOpt: {
            entity: 'user',
            noStr: 'Search User by username or Email'
          }
        }
      }, _ep('tags'), m._tag('hr'), _ep('startedDate'), _ep('endDate'), {
        code: 'venue',
        type: 'text',
        xtype: 'selectBox',
        bind: true,
        attrs: {
          clickShow: true,
          searchItem: 'title',
          setAttrs: 'title,refFile,fee,phone,route,address,lng,lat,content,langsTable',
          panelOpt: {
            entity: 'venue',
            noStr: 'Search venue by name'
          }
        }
      }, _ep('expected'), _ep('fee'), _ep('brief'), _ep('content:content'), m._tag('hr'), m._itemTable('itemTable', {
        attrs: {
          entity: 'activityItemTable'
        }
      }), {
        code: 'partner',
        type: 'text',
        xtype: 'selectBox',
        bind: true,
        attrs: {
          clickShow: true,
          searchItem: 'title',
          setAttrs: 'title,slogan,contact,phone,refFile,introduction',
          panelOpt: {
            entity: 'partner',
            noStr: 'Search partner by name'
          }
        }
      }
    ]
  };

}).call(this);

//# sourceMappingURL=activity.js.map
