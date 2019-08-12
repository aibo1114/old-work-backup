require '../meta/user'
require '../../../../lib/meta/role'
require '../../../../lib/meta/org'
require '../../../../lib/meta/roleMap'
require '../../../../lib/meta/membership'

_role =
    code: 'role'
    noName: true
    xtype: 'selectBox'
    bind: true
    attrs:
        groupBtn: null
        clickShow: true
        setAttrs: 'title,label'
        setVal: ->
            @form.model.set 'roleLabel', @data.label
            @form.model.set 'rid', @data._id
            @form.model.set 'role', @data.title
            @target.val @data.label
        checkPick: (d)->
            if d.title in @form.rCollection.pluck 'role'
                popMsg '角色重复', 'warning'
                false
            else
                true
        panelOpt:
            entity: 'role'

_user =
    code: 'user'
    noName: true
    xtype: 'selectBox'
    bind: true
    attrs:
        groupBtn: null
        setAttrs: 'username'
        searchItem: 'username'
        setVal: ->
            @form.model.set 'username', @data.username
            @form.model.set 'uid', @data._id
            @target.val @data.username
        panelOpt:
            entity: 'user'

m.roleMap.listOpt =
    style: 'panel-info'
    btns: ['ipAdd']
    itemBtns: ['ipEdit', 'del']

m.role.listOpt =
    style: 'panel-info'
    itemBtns: [
        'users'
        'ipEdit'
        'del'
    ]
    comparator: 'type'
    afterShow: (e, p)->
        role = @findData(e)
        rid = role.id
        app.dm.tb p, 'membership',
            btns: ['popAdd']
            itemBtns: ['popEdit', 'del']
            style: 'panel-success'
            cols: [
                m._text 'username'

                _ep 'description'

                m._btn()

            ]
            formOpt:
                prop: [
                    _user
                ,
                    _ep 'description'
                ]
            formAddOpt:
                data: ->
                    rid: rid
                    role: role.get('title')
                    roleLabel: role.get('label')
            criteriaOpt: ->
                q:
                    rid: rid

m.org.listOpt =
    style: 'panel-info'
    itemBtns: ['showInTd', "ipEdit", "del"]
    afterShow: (e, p)->
        org = @findData(e)
        oid = m.id
        app.dm.tb p, 'orgRelation',
            style: 'panel-success'
            btns: ['popAdd']
            itemBtns: ['popEdit', 'del']
            cols: [
                _ep 'username'
                _ep 'row'
                _ep 'description'
                m._btn()

            ]
            criteriaOpt: ->
                q:
                    oid: oid
            formAddOpt:
                data: ->
                    oid: oid
                    org: org.get('title')

m.user.listOpt =
    style: 'panel-info'
    itemBtns: ['roles', 'msg', 'ipEdit', 'del']
    afterShow: (e, p)->
        user = @findData(e)
        uid = user.id
        app.dm.tb p, 'membership',
            title: '角色'
            btns: ['popAdd']
            itemBtns: ['popEdit', 'del']
            style: 'panel-success'
            cols: [
                m._text 'role'
                m._text 'roleLabel',
                    label: '角色名称'
                _ep 'description'
            ]
            formOpt:
                prop: [
                    _role
                ,
                    _ep 'description'
                ]
            formAddOpt:
                data: ->
                    uid: uid
                    username: user.get 'username'
            criteriaOpt: ->
                q:
                    uid: uid

layout = ->
    app.initLayout 'userRole', '2-10', ->
        title: iim('m_mgm', 'user')
        tmpl: 'dataNavItem'
        data: [
            key: 'user'
            row: 10
        ,
            key: 'role'
            row: 20
        ,
            key: 'org'
            row: 30
        ,
            key: 'roleMap'
            row: 50
        ]

for it in [
    'user'
    'role'
    'org'
    'roleMap'
]
    cf.view.ipBtn 'userRole', it, '#main',
        layout: layout
        func: 'tb'
        listOpt: m[it].listOpt
