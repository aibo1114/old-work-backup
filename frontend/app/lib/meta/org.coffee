showInTd = require "../func/showInTd"

meta.org =
    prop: [
        m._select 'pid',
            label: '父机构'
            attrs:
                entity: 'org'
                keyVal: 'id,title'

        m._select 'type',
            attrs:
                data:
                    1: '内部'
                    2: '外部'

        _ep 'title'

        _ep 'description'
    ]

    btn:
        showInTd: ->
            util.iBtn "user", 'showInTd'

#
#    type:
#        type: 'select'
#        data:
#            1: '内部'
#            2: '外部'

#    pid:
#        type: "select"
#        label: iin('parent')
#        title: '请选择'

#        item: ['title', 'type', "description", 'pid', 'cid']
#
#        filter:
#            type: 'select:i:e'
#
#        tbItem:
#            title:
#                type: "text"
#            description:
#                w: 300
#                type: "text"
#            type:
#                w: 80
#                type: "map"
#            _opt:
#                type: "btns"
#                w: 180


meta.orgRelation =
    prop:[
        _ep 'uid'

        _ep 'row'

        _ep 'description'

        m._select 'role',
            attrs:
                data:
                    master: '站长'
                    worker: '师傅'
                    operator: '资料员'
                    partner: '物业经理'

    ]
    btn:
        user: (it, e)->
            util.tBtn 'edit', util.navUrl(e, 'edit', it.rid, it.id), 'edit'

#    uid: meta._uid
#
#    _:
#        tbItem:
#            username:
#                w: 120
#                type: "text"
#            role:
#                w: 100
#            row:
#                w: 100
#                type: "text"
#            description:
#                type: "text"
#            _btn: ['popEdit', 'del']
#
#
#        item: ['uid', 'row', "description", 'role', "oid", 'cid', 'user:id__username']
#
