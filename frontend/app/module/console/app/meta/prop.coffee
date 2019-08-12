require '../meta/widget'
require '../../../../lib/widget/ctn/sidePanel/app'
inputEditor = require '../../../../lib/widget/editor/inputEditor'

#cf.view.fixProp = cf.view.tag.extend
#    events:
#        'change input,select,radio,textarea': 'valChange'
#    init: (opt)->
#        $.extend @, opt
#        @data = @val || {}
#        @render()
#    valChange: ->
#    preRender: ()->
#        meta = @editor::meta
#        for k,v of @data
#            fc = $ cf.rtp 'formItem',
#                label: k
#                labelWidth: 'col-xs-4'
#                inputWidth: 'col-xs-8'
#            opt = $.extend {}, meta[k],
#                val: v
#                name: k
#            fc.find('>div').append inputEditor(opt)
#            @ctn.append fc
#fm = cf.view.form
#cf.view.fixMeta = cf.view.fixProp.extend
#    val: {}
#    getVal: fm::getVal
#    itemTmpl: 'formItem'
#    cols: 'col-md-2:col-md-10'
#    genFormItem: fm::genFormItem
#    itemContext: fm::itemContext
#    valChange: (e)->
#        t = util.ct(e)
#        mo = @form.model
#        ob = mo.get(@name) || {}
#        ob[t.attr('name')] = t.val()
#        mo.set(@name, ob)
#        e.stopPropagation()
#        e.preventDefault()
#    preRender: ->
#        fm::genForm.call @, @prop, @ctn
#        fm::renderXEditor.call @

cf.view.fixMeta = cf.view.form.extend
    cols: 'col-md-3:col-md-9'
    tagName: 'div'
    mode: 'blank'
    foot: false
    head: false
    valChange: (e)->
        t = util.ct(e)
        mo = @form.model
        ob = mo.get(@name) || {}
        ob[t.attr('name')] = t.val()
        mo.set(@name, ob)
        e.stopPropagation()
        e.preventDefault()

#    preRender: ->
#        fm::genForm.call @, @prop, @ctn
#        fm::renderXEditor.call @
#
#        for k,v of @defOpt
#            fc = $ cf.rtp 'formItem',
#                label: k
#                labelWidth: 'col-xs-3'
#                inputWidth: 'col-xs-9'
#            vv = @val[k]
#            vv ?= v
#            opt = $.extend {}, @meta[k] || meta.common[k],
#                code: k
#                val: vv
#            ip = inputEditor(opt)
#            ip.children().attr 'sName', k
#            fc.find('>div').append ip
#            @ctn.append fc
#cf.view.validMeta = cf.view.fixMeta.extend
#    preRender: ->
#        for it in @items
#            fc = $ cf.rtp 'formItem',
#                label: it
#                labelWidth: 'col-xs-3'
#                inputWidth: 'col-xs-9'
#            opt = $.extend {}, @meta[it] || meta.common[it],
#                code: it
#                val: @val[it]
#            ip = inputEditor(opt)
#            fc.find('>div').append ip
#            @ctn.append fc

validEditor =
    required: m._radio()
    minlength: m._number()
    maxlength: m._number()
    pattern: m._text()
    min: m._number()
    max: m._number()

propType = [
    type:'text'
    label: '文本'
,
    type:'email'
    label: '邮箱'
,
    type:'tel'
    label: '电话'
,
    type:'password'
    label: '密码'
,
    type:'number'
    label: '数值'
,
    type:'date'
    label: '日期'
,
    type:'date'
    label: '日期'
,
    type:'url'
    label: '网址'
,
    type:'select'
    label: '单选'
,
    type:'checkbox'
    label: '多选'
,
    type:'textarea'
    label: '文本域'
,
    type: 'refFileCollection'
    extend: true
    label: '文件上传'
,
    type: 'listEditor'
    extend: true
    label: '可变列表'
,
    type: 'selectBox'
    extend: true
    label: '复杂单选'
,
    type: 'multiSelect'
    extend: true
    label: '复杂多选'
,
    type: 'inlineObj'
    extend: true
    label: '对象'
,
    type: 'geo'
    extend: true
    label: '地理位置'
]


m.prop =
    setLabel:->
        m.prop.prop[1] = _ep 'label'
    setLang:->
        m.prop.prop[1] = _ep _lang

    prop: [
        _ep 'code'
        _ep 'label'
        _ep _lang
        _ep 'ph'
        _ep 'val'
        ,
            code: 'prop'
            xtype: 'collection'
            showText: (v)->
                v
            attrs:
                data: propType
                toFetch: false
                afterAddAll:->
                    @_ir = true
                    mo = @form.model
                    tp = mo.get('xtype') || mo.get('type')
                    m = @collection.where(type:tp)
                    m.length && m[0].view.$el.trigger 'click'

                events:
                    'click .btn':(e)->
                        if util.ct(e).hasClass 'btn-primary'
                            return
                        if !@_ir
                            @form.model.set 'valid', {}
                            @form.model.unset 'attrs'
                            @form.model.unset 'xtype'
                            @form.model.unset 'type'
                        @_ir = false
                        util.setActive e, 'btn-primary'
                        d = @findData(e).toJSON()
                        if d.extend
                            @form.model.set 'xtype', d.type
                        else
                            @form.model.set 'type', d.type

                        elems = []

                        rs = ['required'].concat switch d.type
                            when 'text'
                                ['minlength', 'maxlength', 'pattern']
                            when 'number'
                                ['min', 'max']
                            else
                                []

                        rs = (for it in rs
                            m = validEditor[it]
                            m.code = it
                            m
                        )
                        valid =
                            rid: 'validIp'
                            code: 'valid'
                            type: 'holder'
                            xtype: 'fixMeta'
                            attrs:
                                data: @form.model.get 'valid'
                                prop: rs

                        elems.push valid

                        if cfg = cf.ccfg[d.type]

                            unless d = @form.model.get 'attrs'
                                if cfg.defOpt
                                    d = _.clone cfg.defOpt
                                else d = {}
                                @form.model.set 'attrs', d
                            elems.push
                                rid: 'attrId'
                                code: 'attrs'
                                type: 'holder'
                                xtype: 'fixMeta'
                                attrs: $.extend data:d, cfg

                        $('#attrId').remove()
                        @form.genForm elems, null, false
                        @form.renderXEditor()
                modelOpt:
                    tagName: 'span'
                    className: 'btn btn-default mt mr'
                    setContent:->
                        @$el.append @data.label
    ]
    
    listOpt:
        btns:['popAdd','import']

    btn:
        import:(it,e)->
            label: ii 'import'
            icon: 'import'
            cls: cf.btnStr
    event:
        import:
            type: 'click'
            fun:(e)->
                cData = @collection
                mo = @form.model
                name = @name
                cf.dm.l 'sidePanel', 'air',
                    title: '属性选择器'
                    data:
                        side: cf.__importedMeta || ['content','user']
                    afterPick:(e)->
                        @main ?= @$('.main')
                        ent = util.ct(e).attr('ent')
                        that = @
                        log m[ent].prop
                        app.dm.tb @main, 'prop',
                            mode: 'blank'
                            tagClass: 'table table-striped'
                            head: false
                            checkAll: true
                            max: 100
                            btn: []
                            itemBtns: []
                            toFetch: false
                            data: m[ent].prop
                            events:
                                'click .importIt':(e)->
                                    if @checkLen
                                        for it in @$('tbody .ckb:checked')
                                            cData.push util.getModel($(it)).toJSON()
                                        mo.set name, cData.toJSON()
                                        that.closeDlg()
                                    else
                                        alert '请选择属性后导入'
                            pagination:->
                                @foot.addClass('text-center').append tu.btn '导入', 'importIt', 'primary mt mb'



#m.prop[_lang] = {}