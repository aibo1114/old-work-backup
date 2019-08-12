

module.exports  = _exv 'tabForm', 'sForm',

    num: 0

    saveByStep: true
    
    onTab: (e)->
        t = util.ct e
        @num = t.parent().index()
        util.setActive t.parent()
#        @ctn.empty()
        @renderOneTab?()

    renderOneTab: ->
        @formTab ?= @$('.formTab')
        @tabCtn ?= @$('.tabCtn')
        curItems = @items[@num]
        opt = curItems.context?()
        @tabCtn.html cf.rtp curItems.tmpl, opt
        @formTab.find("li:eq(#{@num})").addClass('active').siblings().removeClass 'active'
        curItems.callback?.call @

    isFinalTab: ->
        (+@num + 1) is @items.length

    renderNextTab: ->
        if @num < @items.length
            @num++
            @renderOneTab()

    prev: ->
        if @num > 0
            @num--
            @renderOneTab()

    preRender: ->
        @renderOneTab()
        if @focus
            @$(@focus).focus()
        @

    next: ->
        @ctn.find('.alert-danger').remove()

        unless @validModel()
            return
        cf.blockLine = @$('a.btn-primary')

        if @saveByStep or @isFinalTab()
            ffm = @_save
        else
            ffm = @renderNextTab

        if @items[@num].nextTab
            @items[@num].nextTab.call @, ffm
        else
            ffm.call @

#    renderTab: ->
#        if !@formTab
#            ul = $('<ul class="nav nav-tabs formTab"/>')
#            for v,i in @items
#                if v and v.label
#                    v.label = ii(v.label)
#                ul.append """<li><a>#{v.label}</a></li>"""
#                ul.children().eq(@num).addClass "active"
#            @ctn.addClass('tab-content')
#            @$('.toolbar').append ul
#            @formTab = ul

#
#
#        @beforeRender?()
#        @data || @data = {}
#        if @noLabel
#            @$el.addClass 'noLabel'
#        @$el.attr('id', @entity + 'Form') unless @id
#        @ctn.prepend $('<div class="alert alert-info"/>').html(@tip) if @tip
#
#        if @single()
#            @genForm @items
#            @afterRender() unless @isDlg()
#        else
#            @renderTab()
#            @renderOneTab()
#
#        if @focus
#            @$('input', 'textarea').first().focus()
#
#        util.loadPic("##{@entity}Form")

        
#    afterRender: ->
#        @renderXEditor() # unless @isDlg()
#        for it,i in @_trigger
#            @_trigger.splice(i,1)
#            it.elem.trigger(it.trigger)
#        if @focus
#            @$('input:eq(0)').focus()
#        if cf.mob
#            @foot.find('.btnCtn .btn').addClass 'btn-block'
#        @

#    renderXEditor: ()->
#        for v in @xeditor
#            if _.isString v.xtype
#                v.xtype = cf.view[v.xtype]
#            if v.xtype.fun
#                v.xtype.fun(v.opt)
#            else
#                new v.xtype(v.opt) #.render()
#        @xeditor = []
#        it() for it in @es
#        @es = []

#        for k in (if @single() then @items else @items[@num].items)
#            if (it = @model.meta[k] || meta.common[k]) and it.trigger
#                if it.trigger.indexOf(' ') > -1
#                    [k,elem] = it.trigger.split(' ')
#                    @$(elem).trigger(k)
#                else
#                    @$("[name='#{k}']").trigger(it.trigger)

#    getVal: (it, k) ->
#        if @data
#            kk = if it.key then it.key else k
#            kk = kk.replace('::', '.')
#            if kk.indexOf('.') > 0
#                val = util.seqProp(@data, kk)
#            else
#                val = @data[kk]
#
#        if !val? and it.val?
#            if _.isFunction it.val
#                val = it.val.call @, @data
#            else
#                val = it.val
#
#        it.convert and (val = it.convert(val))
#        val

#    addSubTitle: (it)->
#        @ctn.append("<div class='form-group subTitle'><label>#{it.label}</label></div>")
#
#    addAsterisk: (it, p)->
#        if it.valid and it.valid.required
#            p.append '<em class="required asterisk">*</em>'
#
#    itemContext: (it, name)->
#        if it.noLabel or @noLabel
#            label = ''
#        else if it.label?
#            label = it.label
#        else if name
##            if name is 'startedDate'
##                alert si("#{@entity}_#{name}") || ii(name)
#            label = si("#{@entity}_#{name}") || ii(name)
#        if label? and label.trim() and @colon
#            label += (if cf.lang is 'zh' then '：' else ':')
#
#        opt =
#            label: label
#            form: @
#
#        if cf.mob and @className.indexOf('break') is -1
#            @cols = 'col-xs-3:col-xs-9'
#
#        if @className.indexOf('break') is -1 and label.length > 5 and cf.mob
#            it.noCol = true
#
#        if it.noCol
#            @cols = 'col-xs-12:col-xs-12'
#
#        if @cols
#            [opt.labelWidth,opt.inputWidth] = @cols.split(':')
#
#        if !label
#            opt.inputWidth = 'col-xs-12'
#        opt
#
#    genFormItem: (it, k, v)->
#        it.name = k
#        it.val = v
#        it.form = @
#        item = $ cf.rtp @itemTmpl, @itemContext(it, it.name)
#
#        if it.sRow and cf.mob
#            item.children('label').attr 'class', 'control-label'
#            item.children('div').removeAttr 'class'
#
#        ip = inputEditor(it, @)
#        ic = item.children('div')
#        if it.icon
#            ib = $('<div class="input-group"/>')
#            ib.append "<span class='input-group-addon'>#{util.icon(it.icon)}</span>"
#            ib.append ip
#            ip = ib
#        if it.exBtn
#            ib = $('<div class="input-group"/>')
#            ss = cf.rtp 'inputBtnGroup',
#                btns: it.exBtn
#                cls: it.cls
#            ib.append ip
#            ib.append ss
#            ip = ib
#        ic.append ip
#        if it.type is 'text' and (it.data or it.entity)
#            id = util.randomChar 4
#            dl = $("<datalist id='#{id}'/>")
#            item.children('div').append dl
#            item.find('input').attr 'list', id
#
#            if it.data
#                for it in it.data
#                    dl.append "<option value='#{it}'/>"
#            else if it.entity
#                $.get util.restUrl(it.entity),
#                    _attrs: it._attrs
#                    max: 100
#                , (res)->
#                    item.find('input').data 'sdata', res.entities
#                    it.data = _.uniq(_.compact(_.pluck(res.entities, it.listName)))
#                    it.entity = null
#                    dl.append "<option value='#{it}'/>" for it in it.data
#
#        if it.events
#            for k,v of it.events
#                if _.isString v
#                    v = @[v]
#
#                if item[0].tagName is 'DIV'
#                    ti = item.find('input,select')
#                else
#                    ti = item
#
#                if k.indexOf(' ') > -1
#                    [kk,kkk] = k.split(' ')
#                    ti = ti.parent()
#                    ti.on(kk, kkk, _.bind(v, it.form))
#                else
#                    ti.on(k, _.bind(v, it.form))
#
#        help = it.help || si("#{@entity}_#{it.name}_help")
#        help and ic.append "<span class='help-block'>#{help}</span>"
#        it.hidden and item.hide()
#        item
#
#    cleanAttr: (res)->
#        r = []
#        toDel = {}
#        for it in res
#            if it
#                if it.charAt(0) is '^'
#                    it = it.substring(1)
#                if it.indexOf('::') > 1
#                    toDel[it.split('::')[0]] = true
#                else
#                    r.push it
#
#                if it.indexOf('Pic') > -1
#                    r.addUniq 'refFile'
#
#        r = r.concat _.keys(toDel)
#        r.join(',')
#
#    _attrs: ()->
#        res = []
#        if @single()
#            res = @items
#        else
#            for it in @items
#                res = res.concat it.items
#
#        #        res = for it in res
#        #            log it
#        #            if it and it.charAt(0) in ['^', '-']
#        #                it.substring(1)
#        #            else if it
#        #                it
#        str = @cleanAttr(res)
#        if @entity is 'user'
#            str = str.replace('password,', '').replace('rpsd,', '')
#        str
#
#    enhanceContent: ->
#        if cf.mob or @className in ['form-inline', 'break']
#            @foot.append '<div class="btnCtn"></div>'
#        else
#            opt =
#                label: ' '
#            [opt.labelWidth,opt.inputWidth] = @cols.split(':') if @cols
#            @foot.append cf.rtp @itemTmpl, opt
#
#            @foot.find('div div').addClass('btnCtn')
#
#    genForm: (elems = @items, ctn = @ctn) ->
#        ctn.empty()
#        @xeditor = []
#        for k in elems
#            if k.charAt(0) is "_"
#                h = k.split("_")
#                if h[1] is 'hr'
#                    hrt = $ '<hr/>'
#                    if cf.mob
#                        hrt.addClass 'splitTop'
#                    ctn.append hrt
#                else if h[1] is 't'
#                    ctn.append "<p>#{h[2]}</p>"
#                else if k is '_tmp'
#                    ctn.append '<div class="tmp"></div>'
#                else if h[1] is 'clearfix'
#                    ctn.append '<div class="clearfix"></div>'
#                else
#                    @model.set h[1], h[2]
#                continue
#            else if k.charAt(0) is '^'
#                k = k.substring(1)
#                it = @model.meta[k] or meta.common[k]
#                unless it
#                    log 'no form item: ' + k
#                    continue
#                it = _.clone it
#                it.name = k
#                it.disabled = true
#            else if k.charAt(0) is '-'
#                continue
#            else
#                k = k.split('#')[0]
#                it = meta.elem @meta, k
#                if it
#                    if it.isShow and !it.isShow.call(@, @data)
#                        continue
#                    if it.stype
#                        @addSubTitle(it)
#                        continue
#                    if it.xtype
#                        it.attrs ?= {}
#                    k = it._name if it._name
#                else
#                    if k.endsWith 'Pic'
#                        func = k.split('Pic')[0]
#                        if func is 'portrait'
#                            unless @data._id
#                                continue
#                        it =
#                            xtype: 'refFileCollection'
#                            type: 'holder'
#                            attrs:
#                                multi: true
#                                func: func
#                                ordered: true
#                                pick: true
#                                pickBtn: true
#                                uploader: if (window.wx and cf.mob) then 'wt' else 'html5'
#
#                        if func in ['head', 'portrait']
#                            it.attrs.multi = false
#                        if func in ['upload', 'portrait']
#                            it.attrs.pickBtn = false
#                        if func is 'upload'
#                            it.attrs.pick = false
#                            it.attrs.ordered = false
#                        if func in ['logo', 'banner']
#                            it.attrs.multi = false
#                    else
#                        continue
#
#            if @model and _.isEmpty(@data)
#                @data = @model.attributes
#
#            v = @getVal(it, k)
#
#            if it.type is "hidden"
#                @model.set k, v
#            else if it.type is 'pic'
#                @$el.prepend "<div class='text-center'><img style='margin:0 auto' class='img-responsive' src='#{it.url()}'/></div>"
#            else if it.type is 'placeholder'
#                ctn.append "<div class='#{it.cls}'></div>"
#            else
#                if it.const or @data.id and it.noChange
#                    it.disabled = true
#                tt = @genFormItem(it, k, v)
#                ctn.append tt
#                if it.xtype
#                    if $.isFunction(it.attrs.data)
#                        it.attrs.data = it.attrs.data(@data)
#                    if it.id
#                        id = it.id
#                    else
#                        id = it.id = util.randomChar(4)
#
#                    if tt.children('div').length
#                        tt.children('div').attr 'id', id
#                    else
#                        tt.attr 'id', id
#                    opt =
#                        form: @
#                        name: k
#                        val: v
#                        ph: it.ph
#
#                    if it.bind
#                        opt.el = '#' + id
#                        opt.parent = null
#                    else if it.type is 'holder'
#                        opt.parent = @$("##{id} .holder")
#                    else
#                        opt.parent = @$('#' + id)
#
#                    @xeditor.push
#                        xtype: it.xtype
#                        opt: $.extend {}, it.attrs, opt
#
#                if it.pCls
#                    tt.addClass it.pCls
#        if @_mCol
#            ctn.addClass 'clearfix'
#        @el
#
#$.extend cf.dm,
#    form: (p, entity, opt)->
#        init =
#            cleanAll: true
#            entity: entity
#            parent: p
#            btns: if p is 'air' then ['save'] else ['back', 'save']
#        new form cf._packOpt(init, entity, 'form', opt)



#cf.view.form = form
#module.exports = form


#require '../style/mod/form.less'
#
#sForm = require './sForm'
#model = require './model'
#
#require '../widget/refFileCollection'
#inputEditor = require './../widget/editor/inputEditor'
#
#m._fmBtn =
#    prev: ->
#        cls: _st.btn(null, 'lg', null)
#    next: ->
#        cls: _st.btn('primary', 'lg', null)
#    back: ->
#        cls: _st.btn(null, 'lg', null)
#    save: ->
#        cls: _st.btn('primary', 'lg')
#    finish: ->
#        cls: _st.btn('primary', 'lg', null)
#    closeDlg: ->
#        cls: _st.btn('info', 'lg', null)
#    init: ->
#        @_snote = {}
#        if @className.indexOf('break') > -1
#            @cols = null
#        @listenTo(@model, 'invalid', @renderError)
#        @listenTo(@model, 'valid', @removeError)
#
#        #        @items = if @items
#        #            _.result @, 'items'
#        #        else
#        #            @meta.prop
#
#        if @prePage
#            @showPrePage()
#        if cf.mob
#            @colon = false