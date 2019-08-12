require './style.less'

inputEditor = require '../../../widget/editor/inputEditor'

m.editor =
    prop: [
        m._select 'xtype',
            attrs:
                data: ['type', 'value', 'cols', 'attrs', 'noLabel']

        m._select 'type',
            attrs:
                data: ->
                    []
    ]
    
module.exports = _exv 'propEditor', 'tag',
    init: ->
        @obj = @val || @data || {}
#        if @val and _.isString(@val) then JSON.parse(@val) else (@val || {})
    auto: true
    addable: true
    deleteable: true
    tagName: 'form'
    className: 'form-horizontal'
    initVal: 'new value'
    hasDelBtn: true
    tab: false
    editor:
        _key:
            type: 'label'
            cls: '_k'
        _val:
            type: 'text'
            cls: '_v'
            valid:
                min: 1
                max: 10000
#        kEditor:
#            type: 'label'
#        vEditor:
#            type: 'text'
#            cls: '_v'

    events:
        'change ._k': 'keyChange'
        'change ._v': 'valChange'
        'change select': 'sChange'
        'click .add': 'add'
        'click .del': 'del'
        'click .addArrayItem': 'addArrayItemEvent'
        'click .delArrayItem': 'delArrayItem'

    setObj: ->
#        str = JSON.stringify(@obj)
#        $(@iid).text str
        @form.model.set @name, @obj

    del: (e)->
        if confirm(ii('m_sure'))
            t = $(e.currentTarget)
            util.delSeqProp @obj, t.attr('key')
            @setObj()
            t.parent().remove()

    getCtnTag: (p)->
        c = $('<div class="pEditorElem form-group"/>')
        c.data(p) if p
        c

    add: (e)->
        t = util.ct(e)
        k = t.attr('key')
        if @prompt or !k
            ik = @getKeyVal()
            return unless ik
        else
            ik = ''
        s = @getCtnTag op: 'new'

        #        t.parents('.object').children('.subObj').append s
        t.prev().append s
        if k
            k = k + '.' + ik
        else
            k = ik

        s.append(@keyEditor(ik))
        s.append(@valEditor(@initVal, k))

        if @deleteable
            s.append(@delBtn(k))

        if @prompt
            util.setSeqProp(@obj, k, @initVal)
            @setObj()

        s.find('._v').select()

    delBtn: (k)->
        if @hasDelBtn
            key = "#{ k || ''}"
            "<i key='#{key}' style='margin-top: -10px;' class='#{util.iClass('trash')} btn btn-xs btn-danger del'/>"

    addBtn: (k)->
        cls = "btn btn-default add #{util.iClass('plus')}"
        key = "#{k || ''}"
        bstr = "<a key='#{key}' class='#{cls}'></a>"
        if @addOpt #and @addMore
            btns = for it in @addOpt
                "<a type='#{it.type}' class='addItem'>#{it.label}</a>"
            bstr = cf.rtp 'btnGroup',
                label: util.icon('plus')
                btns: btns
                style: 'btn btn-default'
        bstr

    getKeyVal: ()->
        return prompt('Input the key value', "The Key")

    sChange: (e)->
        t = $(e.currentTarget)
        v = t.val()
        t.parent().next().attr('key', v)
        t.attr('disabled', 'true')

    valChange: (e)->
        k = $(e.currentTarget).attr('key')
        v = $(e.currentTarget).val()
        if @editor._val.type is 'number'
            v = +v
        util.setSeqProp(@obj, k.toString(), v)
        @setObj()
        e.stopPropagation()

    keyChange: (e)->
        nv = e.currentTarget.value
        ov = e.currentTarget.oldvalue
        bb = @obj[ov]
        @obj[nv] = bb
        delete @obj[ov]
        @setObj()

    keyEditor: (p)->
        editor = @editor[p] || @editor._key
        editor.val = p
        ki = inputEditor(editor)
        if editor.type isnt 'label'
            ki.attr('onfocus', 'this.oldvalue = this.value;')
        ki.addClass("control-label")
        ki

    valEditor: (p, k)->
        editor = @editor[k] || @editor._val
        editor.val = p
        ki = inputEditor(editor)
        ki.attr('key', k) if k
        ki.addClass('form-control')
        ki

    _addArrayItem: (o, c, k)->
        for a in o
            cc = $('<div class="arrayItem"></div>').appendTo c
            kk = k + '[' + _i + ']'
            cc.append "<label class='control-label'>#{_i}:</label>"
            @addItem(a, cc, kk)
        c.append @addBtn(k) if @addable

    addElem: (o, c, k)->
        for p of o
            if p.startsWith '__'
                @addLabel(o[p], c)
                continue
            if !o.hasOwnProperty(p)
                continue
            sk = ''
            if k.length > 0
                sk = k + '.' + p
            else
                sk = p
            s = @getCtnTag()
            s.append(@keyEditor(p))
            @addItem(o[p], s, sk)
            c.append s
        c.parent().append(@addBtn(k)) if @addable

    addLabel: (v, c)->
        c.append("""<div class="form-group subTitle"><label>#{v}</label></div>""")

    addItem: (v, c, k)->
        c = @getCtnTag() unless c
        if _.isString(v) or _.isNumber(v) or _.isBoolean(v)
            c.append(@valEditor(v, k))
            if @deleteable
                c.append(@delBtn(k))
        else
            cc = $('<div/>').appendTo c
            if _.isArray(v)
                cc.addClass 'subArray'
                c.addClass('array')
                @_addArrayItem(v, cc, k)
            else if _.isObject(v)
                cc.addClass 'subObj'
                c.addClass('object')
                @addElem(v, cc, k)
            if k
                f = $('<div class="fbtn"/>')
                if @deleteable
                    f.append(@delBtn(k))
                c.prepend f
            c.children('label').prepend tu.icon('chevron-down')  #('<i class="glyphicon glyphicon-"></i>')

    enhanceContent: ()->
        if @tab
            @ctn.append cf.rtp 'tab', [
                title: 'Editor'
                code: '_pEditor'
                selected: true
            ,
                title: 'Text'
                code: '_text'
            ]
            @$('#_text').append @iid
            t = @$('#_pEditor')
        else
            if @iid
                @ctn.append @iid.hide()
            t = $('<div id="_pEditor"></div>')
            @ctn.append t

        t.addClass 'pEditorElem'
        @addItem(@obj, t, '')
#        t.append @addBtn() unless @
