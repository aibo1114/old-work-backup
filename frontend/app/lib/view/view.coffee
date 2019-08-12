itemView = require './collection/tdView'
rObj = (ctn, ob)->
    tb = ctn.mk 'table', class: _st.tb(1,1,1,0)
    for k, v of ob
        tb.mk 'tr', null, "<th class='col-xs-3'>#{k}</th><td class='col-xs-9'>#{v}</td>"
        if _.isObject v
            ccc = tb.find('tr').last().find('td')
            ccc.empty()
            rObj ccc, v

module.exports = cf.view.view = require('./model').extend
    mode: _st.mode
    head: true
    foot: true
    renderAll: false
    xeditor: []
    title: ii(@entity)
    reRendered: true
    cols: '30%,auto'

    modeContext: ->
        d = cf.view.tag::modeContext.call @
        d.tag = 'table'
        d

    title: ->
        iim('m_view', ii(@entity))

    events:
        'click .inDel': (e)->
            return unless confirm(ii('m_sure'))
            mod = @model
            t = util.ct(e)
            k = t.parent().prev().attr('name')
            d = {}
            d[k] = 1
            new cf.model.entity(_id: mod.id,
                entity: @entity
            ).save '_unset', d,
                success:->
                    t.closest('tr').remove()

        'click .inMod': (e)->
            code = util.ct(e).attr('code')
            cm = @prop.codeBy code
            v = @
            opt = $.extend
                title: iim('m_edit', iie(@entity, code))
                pm: @model
                prop: [
                    cm
                ]
                data:
                    _id: @model.id
                btns: ['save']
                _saveSuccess: (m)->
                    popMsg '修改成功'
                    m.view.closeDlg()
                    v.model.set code, m.get(code)
            , cm.editable
            app.dm.form 'air', @entity, opt

        'click .newProp': (e)->
            mod = @model
            app.dm.form 'air', 'common',
                title: '新建属性'
                prop:[
                    _ep 'code'
                    _ep 'val'
                ]
                _save:->
                    that = @
                    k = @model.get('code')
                    v = @model.get('val')
                    mod.save k, v,
                        patch: true
                        wait: true
                        success: ->
                            that.closeDlg()
                btns: ['save']

        'click .back': (e)->
            history.go(-1)

        'click .process': (e)->
            log 'process'

    enhanceContent: ->
        if @btns
            @foot.append '<div class="btnCtn"></div>'

    setBtns: cf.view.form::setBtns

    newLine:(it)->
        k = it.code
        box = if it.noLabel or it.xtype is 'jsonTable'
            $("<tr><td colspan='2'><span name='#{k}'></span></td></tr>")
        else
            label = it.label || iie(@entity, k)
            $("<tr><th>#{label}</th><td><span name='#{k}'>#{it.val||''}</span></td></tr>")
        bctn = box.find('[name]')

        bc = $("<span class='fCtn'></span>")

        if @editable or it.editable
            bc.append tu.icon 'edit', 'a', null, "inMod", "code='#{it.code}'"
        if @canDel or it.canDel
            bc.append tu.icon 'remove', 'a', null, "inDel"

        if it.btns
            for bb in it.btns
                if @isShow(bb)
                    bc.append tu.genBtn bb

        if bc.children().length
            bctn.parent().addClass('fCtnTd').append bc

        @ctn.append box

        box


    preRender: ->
        @ctn = @$('table')
        if @model
            @data = @model.toJSON()

        cstr = '<thead><tr>'
        for it in @cols.split(',')
            cstr += "<th style='width: #{it}'></th>"
        cstr += '</tr></thead>'
        @ctn.append cstr

        if @_showAll
            @prop = []
            for k,v of @data
                if !k.startsWith '_'
                    od = @meta.prop.codeBy(k) || code: k
                    @prop.push $.extend(od, @_showAll[k])

        for it in @prop || @meta.prop || []
            if !@isShow(it) or !it.code or it.code.startsWith '_'
                continue

            bctn = @newLine(it).find('[name]')

            k = it.code
            it.val = v = @data[k]

            if it.showText
                bctn.html it.showText(v, @data, @meta, @)
            else if it.xtype
                it.attrs ?= {}

                if $.isFunction(it.attrs.data)
                    it.attrs.data = it.attrs.data(@data)

                !if it.id
                    id = it.id
                else
                    id = it.id = util.randomChar(4)

                bctn.attr 'id', id

                opt =
                    name: k
                    val: @data[k]
                    form: @
                    dMode: true
                    itemBtns: []

                if it.bind
                    opt.el = '#' + id
                    opt.parent = null
                else if it.type is 'holder'
                    opt.parent = @$("##{id} .holder")
                else
                    opt.parent = @$('#' + id)

                @xeditor.push
                    xtype: it.xtype
                    opt: $.extend {}, it.attrs, opt
            else if _.isArray v
                cc = bctn.parent().removeAttr('class').empty()
#                for it in v
#                    rObj(cc,it)
                if v[0] and _.isObject v[0]
                    cols = for k in  _.keys v[0]
                        code: k
                        type: 'text'
                    cols.push
                        code: '_btn'
                        type: 'btn'
                    new cf.view.table
                        entity: 'inputData'
                        toFetch: false
                        itemBtns: ['popEdit','formDel']
                        head: false
                        foot: false
                        cols: cols
                        parent: cc
                        data: v
            else if _.isObject v
                rObj(bctn,it)
            else
                bctn.append itemView(@data, it, @entity, it)

        cf.view.form::renderXEditor.call @

    reRender:(m)->
        return unless @ctn
        for k,v of m.changed
            return if k.startsWith('_')
            p = @$("[name='#{k}']")
            if p.length
                pp = @meta.prop.codeBy(k)
                if pp.showText
                    v = pp.showText(v)
                p.html v
            else
                @ctn.append @newLine
                    code: k
                    val: v

m._.fmBtn.close = ->
    key: 'close'
    label: ii('close')
    cls: _st.btn(null, 'lg', null)+' pull-left'
    event: ->
        @closeDlg()

m._.fmBtn.newProp = ->
        label: '新建属性'
        cls: _st.btn(null, 'lg', null)

$.extend cf.dm,
    view: (p, entity, eid, opt)->
        pdd = {}
        if _.isString eid
            pdd[cf.id] = eid
        else
            opt = eid
        init =
            cleanAll: true
            entity: entity
            parent: p
            data: pdd
            btns: ['back']
            tagClass: _st.tb(1,1,1,0,'viewTable') # table 'table table-striped table-bordered table-condensed '
        cf.dm.l 'view', p, cf._packOpt(init, entity, 'view', opt)





#viewData = cf.view.tag.extend
#    tagName: 'table'
#    className: 'table table-striped table-condensed'
#    init: ->
#        @render()
#        $(@parent).addClass 'sub'
#        @ctn = @$el
#
#    renderObjItem: ->
#
#    preRender: ->
#        xeditor = []
#        if _.isArray @val
#            for it, i in @val
#                @ctn.append "<tr><td colspan='2'>#{i + 1}</td></tr>"
#                for k,v of it
#                    tr = $("<tr><th>#{iic(k)}</th></tr>")
#                    td = $('<td></td>')
#                    if _.isObject(v) and !_.isEmpty(v)
#                        xeditor.push
#                            xtype: viewData
#                            opt:
#                                name: k
#                                val: v
#                                parent: td
#                    else
#                        td.text v
#                        tr.append td
#                        @ctn.append tr
#
#        else if !_.isEmpty @val
#            for k,v of @val
#                tr = $("<tr><th>#{iic(k)}</th></tr>")
#                td = $('<td></td>')
#                if _.isObject(v) and !_.isEmpty(v)
#                    xeditor.push
#                        xtype: viewData
#                        opt:
#                            name: k
#                            val: v
#                            parent: td
#                else
#                    td.text v
#                tr.append td
#                @ctn.append tr
#
#        for v in xeditor
#            if _.isString v.xtype
#                v.xtype = cf.view[v.xtype]
#            if v.xtype.fun
#                v.xtype.fun(v.opt)
#            else if v.xtype
#                new v.xtype(v.opt)
#        xeditor = []