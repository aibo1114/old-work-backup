require './style.less'

sForm = require './app'

inputEditor = require '../../widget/editor/inputEditor'

$.extend m._.fmBtn,
    prev: ->
        cls: _st.btn(null, 'lg')
    next: ->
        cls: _st.btn('primary', 'lg')
    back: ->
        cls: _st.btn(null, 'lg')
    save: ->
        cls: _st.btn('primary', 'lg')
    finish: ->
        cls: _st.btn('primary', 'lg')
    closeDlg: ->
        cls: _st.btn('info', 'lg')

module.exports = form = cf.view.form = sForm.extend
    num: 0
    saveByStep: true
    mode: _st.mode
    head: true
    foot: true
    style: "#{_st.mode}-info"
    cleanAll: true
    cols: 'col-md-2 col-xs-3:col-md-10 col-xs-9'
    noLabel: false
    itemTmpl: 'formItem'
    colon: true
    es: []
    _trigger: []
    _briefSize: 200
    asterisk: true
    simpleHead: false
    colon: true
    btns: ['save']

    init: ->
        @beforeForm?()
        @_snote = {}
        if @className.indexOf('break') > -1
            @cols = null
        @listenTo(@model, 'invalid', @renderError)
        @listenTo(@model, 'valid', @removeError)

        @prop ?= @meta.prop || []

        @exProp?()

        if @prePage
            @showPrePage()

    showPrePage: ->
        @$el.html if @prePage.tmpl
            cf.rtp @prePage.tmpl, @prePage
        else    
            @prePage.content
        util.sTop()
        @auto = false
        @$el.find('.startRender').click =>
            @auto = true
            @render()

    showSufPage: ->
        @$el.html if @sufPage.tmpl
            cf.rtp @sufPage.tmpl, @sufPage
        else
            @sufPage.content
        util.sTop()

    title: ->
        k = if @model.isNew() then 'm_add' else 'm_edit'
        iim(k, ii(@entity))

    setBtns: ->
        btns = _.result(@, 'btns')
        return [] unless btns
        res = []
        for k in btns
            it = null
            if _.isString k
                if @meta.fmBtn and @meta.fmBtn[k]
                    it = @meta.fmBtn[k]()
                if !it and m._.fmBtn[k]
                    it = m._.fmBtn[k]()
                if it
                    it.label ?= iic(k)
                    it.cls += ' ' + k
            else
                it = k
            if it and @isShow(it)
                res.push it
        res

    addItems: (it, index)->
        if index
            @curItems().splice index, 0, it
        else
            @curItems().push it

    removeItems: (it)->
        @curItems().remove(it)


    complex: (attr) ->
        toDel = {}
        for k,v of attr
            if k.indexOf('::') > 1 #info::address, #refFile::$head
                mm = k.split('::')
                toDel[mm[0]] = true
                if attr[mm[0]]
                    if _.isString attr[mm[0]]
                        attr[mm[0]] = JSON.parse(attr[mm[0]])
                else
                    attr[mm[0]] = {}
                attr[mm[0]][mm[1]] = v
                util.del k, attr

    before: (attr)->
    #        @_super('before', attr)
        if @prop.codeBy 'brief' and !attr.brief and attr.content
            attr.brief = util.adjustText($("<div>#{attr.content}</div>").text(), @_briefSize)
        @withAttr and attr._attrs = @_attrs()
        if @rsMsg
            cf._rsMsg = @rsMsg
        @complex attr
        attr

    preRender: ->
        @beforeRender?()
        @data || @data = {}
        if @noLabel
            @$el.addClass 'noLabel'
        @$el.attr('id', @entity + 'Form') unless @id

        @genForm()
        @afterRender() unless @isDlg()

        util.loadPic("##{@entity}Form")

    afterRender: ->
        @renderXEditor()
        for it,i in @_trigger
            @_trigger.splice(i, 1)
            it.elem.trigger(it.trigger)
        @_trigger.clear()
        if @focus
            @ctn.children(':first').children('div').children().focus()
        if cf.mob
            @foot.find('.btnCtn .btn').addClass 'btn-block'
        @

    renderXEditor: (xeditor = @xeditor )->
        for v in @xeditor
            if _.isString v.xtype
                v.xtype = cf.view[v.xtype]

            if v.xtype.fun
                v.xtype.fun(v.opt)
            else
                new v.xtype(v.opt) #.render()

        xeditor = []
#        it() for it in @es
#        @es = []
#        for k in (if @single() then @items else @items[@num].items)
#            if (it = @model.meta[k] || meta.common[k]) and it.trigger
#                if it.trigger.indexOf(' ') > -1
#                    [k,elem] = it.trigger.split(' ')
#                    @$(elem).trigger(k)
#                else
#                    @$("[name='#{k}']").trigger(it.trigger)

    getVal: (it, k) ->
        return null unless it.code
        if @data
            kk = it.code
            kk = kk.replace('::', '.')
            if kk.indexOf('.') > 0
                val = util.seqProp(@data, kk)
            else
                val = @data[kk]
        if !val? and it.val?
            if _.isFunction it.val
                val = it.val.call @, @data
            else
                val = it.val
        it.convert and (val = it.convert(val))
        val

    addSubTitle: (it)->
        @ctn.mk 'div', class: 'form-group subTitle', $.mk('label',it.label)
#        @ctn.append("<div class='form-group subTitle'><label>#{it.label}</label></div>")

    addAsterisk: (it, p)->
        if it.valid and it.valid.required
            p.append '<em class="required asterisk">*</em>'

    itemContext: (it, name)->
        if it.noLabel or @noLabel
            label = ''
        else if it.label?
            label = it.label
        else if name
            label = iie(@entity, name) || ii(name)
        if label? and label.trim() and @colon
            label += (if cf.lang is 'zh' then '：' else ':')
        opt =
            label: label
            form: @

#        if cf.mob and @className.indexOf('break') is -1
#            @cols = 'col-xs-3:col-xs-9'

#        if @className.indexOf('break') is -1 and (label and label.length > 5) and cf.mob
#            it.noCol = true

        if it.noCol
            @cols = 'col-xs-12:col-xs-12'
            
        if @cols
            [opt.labelWidth,opt.inputWidth] = @cols.split(':')

        if !label
            opt.inputWidth = 'col-xs-12'

        if it.pCls
            opt.pCls = it.pCls
        opt

    genFormItem: (it, v = @getVal(it))->
        if it.rid
            $('#'+it.rid).remove()
        k = it.code
        it.val = v
        it.form = @
        item = $ cf.rtp @itemTmpl, @itemContext(it, it.code)

        if it.sRow and cf.mob
            item.children('label').attr 'class', 'control-label'
            item.children('div').removeAttr 'class'

        ip = inputEditor(it, @)
        ic = item.children('div')

        if it.group
            ib = $.mk 'div', class: 'input-group'
            it.group.pre and ib.mk 'span', class: 'input-group-addon', it.group.pre
            ib.append ip
            it.group.suf and ib.mk 'span', class: 'input-group-addon', it.group.suf
            ip = ib

        if it.exBtn
            ib = $.mk 'div', class:"input-group"
            ib.append ip
            ib.append cf.rtp 'inputBtnGroup',
                btns: it.exBtn
                cls: it.cls
            ip = ib

        ic.append ip

        if !it.xtype and (it.type is 'text') and (it.attrs and it.attrs.data or it.entity)
            id = util.randomChar 4
            dl = item.children('div').mk 'datalist', id: id
            item.find('input').attr 'list', id

            if it.attrs.data
                for it in _.result it.attrs, 'data'
                    dl.mk 'option', value: it
            else if it.entity
                $.get util.restUrl(it.entity),
                    _attrs: it._attrs
                    max: 100
                , (res)->
                    item.find('input').data 'sdata', res.entities
                    it.data = _.uniq(_.compact(_.pluck(res.entities, it.listName)))
                    it.entity = null
                    dl.mk('option', value:it) for it in it.data

        if it.type is 'textarea' and it.attrs.max
            ic.attr('max', it.attrs.max).attr('pMax', it.attrs.max).addClass 'maxLen'
            
        if it.events
            for k,v of it.events
                if _.isString v
                    v = @[v]

                if item[0].tagName is 'DIV'
                    ti = item.find('input,select')
                else
                    ti = item
                if k.indexOf(' ') > -1
                    [kk,kkk] = k.split(' ')
                    ti = ti.parent()
                    ic.on(kk, kkk, _.bind(v, it.form))
                else
                    ti.on(k, _.bind(v, it.form))

        (help = it.help || si("#{@entity}_#{it.name}_help")) and ic.mk 'span', class: 'help-block', help
        it.hidden and item.hide()
        item.attr('id', it.rid) if it.rid
        item

    cleanAttr: (res)->
        r = []
        toDel = {}
        for it in res
            if it
                if it.charAt(0) is '^'
                    it = it.substring(1)
                if it.indexOf('::') > 1
                    toDel[it.split('::')[0]] = true
                else
                    r.push it

                if it.indexOf('Pic') > -1
                    r.addUniq 'refFile'

        r = r.concat _.keys(toDel)
        r.join(',')

    _attrs: ()->
        res = (it.code for it in @prop)
        str = @cleanAttr(res)
        if @entity is 'user'
            str = str.replace('password,', '').replace('rpsd,', '')
        str

    enhanceContent: ->
        if cf.mob or @className in ['form-inline', 'break']
            @foot.append '<div class="btnCtn"></div>'
        else
            opt =
                label: ' '
            [opt.labelWidth,opt.inputWidth] = @cols.split(':') if @cols
            @foot.append cf.rtp @itemTmpl, opt

            @foot.find('div div').addClass('btnCtn')

    renderSpeProp: (it,ctn=@ctn)->
#        @prop.push it
        item = @genFormItem it
        if it.rid
            $('#'+it.rid).remove()
            item.attr 'id', it.rid
        ctn.append item

    reRenderProp: (idx)->
        it = @prop[idx]
        @ctn.find(".form-group:eq(#{idx})").replaceWith @genFormItem it
        if it.xtype
            @renderXEditor()
    
    showTip:->
        if @tip
            msg = cf.rtp 'alert',
                msg: @tip
                type: 'info m-a-1'
                closed: true
                icon: _st.sign.info
            @ctn.mk 'div', null, msg, 'prepend'

    genForm: (elems = @prop, ctn = @ctn, clean = true) ->
        ctn.empty() if clean
        @showTip()
#        if @tip
#            msg = cf.rtp 'alert',
#                msg: @tip
#                type: 'info'
#                closed: true
#                icon: _st.sign.info
#            @ctn.mk 'div', null, msg, 'prepend'

        @xeditor = []
        for it in elems
            continue if it.noEdit
            continue if !@isShow(it)
            it = _.clone it

            k = it.code
            v = @getVal it

            if dp = it.dep
                dv = @ctn.mk 'div',
                    dep: dp.code
                    code: it.code
                do(it, dv)=>
                    @listenTo @model, "change:#{dp.code}", (v)->
                        dv.empty()
                        if v is it.dep.val
                            @renderSpeProp(it, dv)
                        else if v is '0'
                            @model.unset it.code, silent: true
                continue

            switch it.type
                when 'hidden'
                    @model.set k, v
                when 'tmpl'
                    @ctn.append cf.rtp it.attrs.tmpl, (if p = it.attrs.prop then v[p] else v)
                when 'pic'
#                    @$el.prepend "<div class='text-center'><img style='margin:0 auto' class='img-responsive' src='#{it.url()}'/></div>"
                    pp =
                        style: 'margin:0 auto'
                        class:'img-responsive'
                        src: it.url()
                    @$el.mk 'div', class:'text-center', $.mk('img',pp), 'prepend'
                when '_tag'
                    str = if it.attrs.tag is 'hr'
                        $.mk 'hr'
                    else
                        $.mk it.attrs.tag, null, it.attrs.title||''
#                        $ "<#{it.attrs.tag}>#{it.attrs.title||''}</#{it.attrs.tag}>"
                        
                    it.attrs.id && str.attr 'id', it.attrs.id
                    it.attrs.cls && str.addClass it.attrs.cls
                    
                    ctn.append str
                else
                    if @model.id and it.noChange
                        it.disabled = true

                    tt = @genFormItem(it, v)

                    ctn.append tt

                    if it.xtype
                        if it.attrs and $.isFunction(it.attrs.data)
                            it.attrs.data = it.attrs.data(@data)
                        if it.id
                            id = it.id
                        else
                            id = it.id = util.randomChar(4)

                        if tt.children('div').length
                            tt.children('div').attr 'id', id
                        else
                            tt.attr 'id', id
                        opt =
                            form: @
                            name: k
                            val: v
                            ph: it.ph

                        if it.bind
                            opt.el = tt.find('#' + id)
                            opt.parent = null
                        else if it.type is 'holder'
                            opt.parent = @$("##{id} .holder")
                        else
                            opt.parent = @$('#' + id)

                        @xeditor.push
                            xtype: it.xtype
                            opt: $.extend {}, it.attrs, opt
    onClose:->
        for k,v of @_snote
            v.summernote('destroy')
        for it in @$('._datetime')
            $(it).datetimepicker('remove')
        for it in @$('[data-cid]')
            #may memory leak...
            $(it).data('_item')?._close()
        @afterForm?()

$.extend cf.dm,
    form: (p, entity, opt)->
        init =
            cleanAll: true
            entity: entity
            toFetch: false
            parent: p
        cf.dm.l 'form', p, cf._packOpt(init, entity, 'form', opt)

    add: (p, entity, opt)->
        init =
            cleanAll: true
            entity: entity
            toFetch: false
            parent: p
        cf.dm.l 'form', p, cf._packOpt(init, entity, 'addForm', opt)

    edit: (p, entity, eid, opt)->
        pdd = {}
        if eid
            pdd[cf.id] = eid
        init =
            cleanAll: true
            entity: entity
            parent: p
            toFetch: true
            data: pdd
        cf.dm.l 'form', p, cf._packOpt(init, entity, 'editForm', opt)

    addOrEdit: (p, entity, query, opt)->
        $.get util.restUrl(entity), query, (res)->
            if res.entities.length > 0
                opt.toFetch = false
                opt.data = res.entities[0]
                app.dm.edit p, entity, opt.data._id, opt
            else
                app.dm.add p, entity, opt

#    renderOneTab: ->
#        curItems = @items[@num]
#
#        if _.isFunction curItems.items
#            curItems.items = curItems.items.call @
#
#        @genForm curItems.items
#
#        @btns = curItems.btns
#        @$('.btnCtn').empty()
#
#        @addBtns()
#
#        if curItems.info
#            @msg curItems.info, 'info'
#        curItems.callback?.call @
#
#        @formTab.find("li:eq(#{@num})").addClass('active').siblings().removeClass 'active'
#
#        if !@formDlgFirstTab
#            @afterRender()

#    single: ->
#        _.isString(@items[0])
#
#    curItems: ->
#        if @single() then @items else @items[@num].items

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


#            @el
#            if k.before
#                switch k.before
#                    when 'hr'
#                        hrt = $ '<hr/>'
#                        if cf.mob
#                            hrt.addClass 'splitTop'
#                        ctn.append hrt
#                    when 'tmp'
#                        ctn.append '<div class="tmp"></div>'
#                    when 'clearfix'
#
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

#                if it.isShow
#                    if @data[it.]
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
#                if it.isShow and !it.isShow.call(@, @data)
#                    continue
#                if @model and _.isEmpty(@data)
#                    @data = @model.attributes
