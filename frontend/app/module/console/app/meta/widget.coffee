vd = m._radio()

nm = m._number()

ta = m._textarea rows: 3

m.common.toFetch = vd

cf.ccfg =
    dTime:
        defOpt:
            format:  "yyyy-mm-dd hh:ii:ss"

    select:
        defOpt:
            data:[]
            toFetch: false
        prop:[
            m._select 'type',
                label: '类型'
                attrs:
                    data:['select','radio','widget']
                    trigger: 'change'
                events:
                    change:(e)->
                        t = util.ct(e)
                        @form.model.set 'type', t.val()
        ,
            m._select 'dType',
                label: '数据类型'
                attrs:
                    data:['localStr','localObj','remote']
                    trigger: 'change'
                events:
                    change:(e)->
                        v = util.ct(e).val()
                        items = switch v
                            when 'localStr'
                                [
                                    code: 'data'
                                    xtype: 'listEditor'
                                    attrs:
                                        setVal: ->
                                            atr = @form.model.get 'attrs'
                                            atr.data = @data
                                            @form.model.set 'attrs', atr
                                ]
                            when 'localObj'
                                [
                                    code: 'data'
                                    xtype: 'propEditor'
                                    attrs:
                                        data:{}
                                ]
                            else
                                [
                                    m._select 'entity',
                                        attrs:
                                            data:->
                                                ['post','content']

                                    m._text 'keyVal',
                                        attrs:
                                            val: 'id,title'
                                ]
                        @form.genForm items, @$('.reShow')
                        @form.renderXEditor()

        ,
            m._tag 'div', 'reShow'
        ]
#        meta:
#            data:
#                xtype: 'listEditor'
#            entity:
#                type: 'select'
#                data:->
#                    d = {}
#                    for k,v of m
#                        d[k] = ii(k)
#                    d
    listEditor:
        defOpt:
            data: []
            toFetch: false
        meta:
            data:
                xtype: 'listEditor'
    textarea:
        defOpt:
            rows: 5
            max: 200
        prop:[
            m._number 'rows'
            m._number 'max'
        ]

    refFileCollection:
        label: '图片上传与管理'

        defOpt:
            func: 'head'
            pickBtn: true
            multi: true
            ordered: true
        prop:[
            m._text 'func',
                label: '图片变量'
            m._radio 'multi',
                label: '是否多图'
            m._radio 'ordered',
                label: '是否有序'
            m._radio 'pickBtn',
                label: '图库'
        ]
#        meta:
#            multi: vd
#            ordered: vd
#            pickBtn: vd
#            pick: vd
#            ordered: true
#            pick: true
    content:
        defOpt:
            height: 300
            type: 'full'
        meta:
            height: nm
            type:
                type: 'select'
                data:
                    simple: '简单'
                    full: '完整'
    selectBox:
        label: '图片上传与管理'


#        uploader:
#            xtype: 'inlineObj'
#            attrs:
#                entity: 'uploader'