#jsonTable = require '../view/jsonTable'
#document = require '../view/document'
#selectBox = require '../widget/selectBox'
#propEditor = require '../widget/editor/propEditor'
#listEditor = require '../widget/editor/listEditor'

# = require "../func/showInTd"



#$.extend meta.common,
#    icon:
#        type: 'text'
#    key: {}
#
#m.resEntity =
#    key:
#        type: 'select'
#        data: ->
#            res = {}
#            for k,v of cf.meta
#                if !_.isFunction(v) and k.charAt(0) isnt '_'
#                    res[k] = "#{iic k} #{k}"
#            res
#
#    _:
#        tbItem:
#            key: {}
#            row: {}
#            _btn: ['popEdit', 'formDel']
#        item: [
#            'key'
#            'row'
#            'icon'
#        ]

m.menu =
    prop: [
        _ep 'key'
        m._text 'label',
            valid:
                required: true
        _ep 'icon'
        _ep 'row'
        m._text 'act'
        m._text 'href'
    ]
    listOpt:
        itemBtns:['showInTd', 'popEdit', 'formDel']
        style: 'panel-success'


m.role =
    prop: [
        m._text 'title'
        m._text 'label',
            valid:
                required: true

        m._textarea 'description'

        m._itemTable 'menu',
            attrs:
                noLastTime: true
                afterShow: (e, p)->
                    me = @findData(e)
                    mo = @form.model
                    tb = @collection
                    new cf.view.jsonTable
                        parent: p
                        entity: 'menu'
                        style: 'panel-success'
                        data: me.get('children')|| []
                        formEditOpt:
                            _save: ->
                                c = @rCollection
                                c.add @model
                                me.set 'children', c.toJSON()
                                mo.set 'menu', tb.toJSON()
                                @closeDlg()
                        formAddOpt:
                            _save: ->
                                @model.set 'id', util.randomChar(4)
                                c = @rCollection
                                c.add @model
                                me.set 'children', c.toJSON()
                                mo.set 'menu', tb.toJSON()
                                @closeDlg()
    ]

    btn:
        del: (it, e)->
            unless ['admin', 'user', 'guest'].has(it.title)
                util.iBtn "trash", 'del'

        users: (it)->
            if it.title isnt 'guest'
                util.iBtn "user"

    event:
        users:
            type: 'click'
            fun: cf.view.showInTd

#    label: m.exCom 'label',
#
#    description:
#        type: 'textarea'
#    menu:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'menu'
#            toFetch: false
#            _func: null
#            _prop: 'menu'
#            _dv: []
#    entities:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'resEntity'
#            _prop: 'entities'
#            _dv: []
#    permission:
#        xtype: 'listEditor'
#    _:
#        tbItem:
#            title:
#                w: 100
#            label:
#                w: 100
#            type:
#                w: 100
#                val: (d)->
#                    if d.type
#                        '自定义'
#                    else
#                        '系统'
#            description: {}
#            _btn: ["inEdit", 'users', "del"]
#
#        item: [
#            label: "base_info"
#            items: ['title', 'label', 'description', 'lang']
#        ,
#            label: "res"
#            items: ['menu', 'entities', 'permission']
#
#        ]
#
#m.res =
#    label:
#        type: 'text'
#        valid:
#            required: true
#    type:
#        type: 'select'
#        data:
#            file: 'File'
#            'folder-close': 'Folder'
#    title:
#        type: 'text'
#        label: '提示信息'
#    target:
#        type: 'select'
#        label: '打开方式'
#        data:
#            _self: '本地窗口'
#            _blank: '新建窗口'
#    className:
#        type: 'text'
#    href:
#        type: 'text'
#        xtype: 'selectBox'
#        bind: true
#        attrs:
#            setPanel: ->
#                @collection = new cf.widget.selectItem
#                    toFetch: false
#                    parent: @panel
#                    enhanceContent: ->
#                        data = {}
#                        for it in [' ', 'file'].concat(cf.opt.entity.cat)
#                            data[it] = iin it
#                        @head.append util.genInput
#                            type: 'select'
#                            data: data
#            setVal: ->
#                if @data
#                    if @data.class
#                        v = util.uri(@data.class.toLowerCase(), @data)
#                    else
#                        v = '/' + @data.title
#                @target.val v
#    _:
#        item: ['type', 'label', 'title', 'target', 'href']