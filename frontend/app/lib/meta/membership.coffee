meta.membership =
    prop: [
        code: 'uid'
        type: 'text'
        xtype: 'selectBox'
        bind: true
        attrs:
            label: 'username'
            showImg: 'portrait'
            hiddenValue: true
            searchItem: 'username'
            setAttrs: 'username'
            setToEntity: true
            panelOpt:
                entity: 'user'
                noStr: 'Search User by username or Email'
    ,
        _ep 'row'

        m._radio 'isAccept'

        _ep 'description'

    ]

#    uid:
#        type: 'text'
#        xtype: 'selectBox'
#        bind: true
#        attrs:
#            label: 'username'
#            showImg: 'portrait'
#            hiddenValue: true
#            searchItem: 'username'
#            setAttrs: 'username'
#            setToEntity: true
#            panelOpt:
#                entity: 'user'
#                noStr: 'Search User by username or Email'
#    _:
#        tbItem:
#            username:
#                w: 120
#                type: "text"
#            role:
#                w: 120
#                type: "text"
#            row:
#                w: 100
#                type: "text"
#            isAccept:
#                w: 100
#            description:
#                type: "text"
#            _btn: ['popEdit', 'del']
#
#        item: ['uid', 'row', "description", "rid", 'isAccept']

