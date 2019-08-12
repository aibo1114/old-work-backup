setVal = (it, inp)->
    if _.isObject it.val
        v = it.val[it.attrs.keyVal.split(',')[0]]
    else
        v = it.val
    if v
        inp.children("option[value='#{v}']").attr('selected', true)
    else
        inp.children("option").first().attr('selected', true)


$.extend util,
    genOptionItem: (data, kv) ->
        if kv
            [k,v] = kv.split(',')
        else
            k = 'val'
            v = 'label'
        if _.isArray data
            for d in data
                if _.isString d
                    "<option value='#{d}'>#{d}</option>"
                else
                    "<option value='#{d[k]}'>#{d[v]}</option>"
        else
            "<option value='#{k}'>#{v}</option>" for k,v of data

    genCheckItem: (data, it, k, v)->
        name = it.code
        val = if it.val? then it.val.toString().split(',') else []
        res = $('<div/>')

        if !_.isArray data
            data = (for kk,vv of data
                rs = {}
                rs[k] = kk
                rs[v] = vv
                rs)

        if it.attrs.checkAll
            op = {}
            op[k] = '_all'
            op[v] = '全选'
            data.push op


        for d in data
            if _.isString d
                ck = d
                cv = d
            else
                ck = d[v]
                cv = d[k]

            p = $("<label></label>")
            if it.attrs.inline
                p.addClass "#{it.type}-inline"
            i = $("<input type='#{it.type}' name='#{name}' value='#{cv}'/>")
            if cv is '_all'
                i.removeAttr 'name'
            if (cv and val.has(cv.toString())) or d.selected
                i.attr 'checked', true
            p.append i
            if it.attrs.c
                p.addClass 'c-input c-radio'
                p.append '<span class="c-indicator"></span>'
            p.append ck

            res.append p
        res

addItemAfterAjax = (res, it, id)->
    return if res.count is 0
    inp = $('#' + id, if it.form then it.form.$el else 'body')
    d = res.entities || res
    op = it.attrs
    if op.parse
        d = op.parse d
    inp.append util.genOptionItem d, op.keyVal
    it.val? and inp.children("option[value='#{it.val}']").attr('selected', true)
    if it.addBtn
        inp.append "<label><a class='new'>#{iim('add')}</a></label>"
    inp.data 'sdata', d

#exEvt = (it)->
#    np = $("<div class='exEvt'>#{tu.icon('chevron-right', 'i', '', 'gray')}</div>")
#    if it.type is 'exEvt'
#        np.click ->
#            it.evt(it.val, it)
#    np
#
#toPage = (it)->
#    np = $("<div class='toPage'>#{tu.icon('chevron-right', 'i', '', 'gray')}</div>")
#    if it.entity
#        np.attr 'entity', it.entity
#    if it.code
#        np.attr 'prop', it.code
#    np

module.exports = cf._inputEditor = (it, fm)->
    it.type = 'text' unless it.type
    val = it.val
    if it.view
        if it.showText
            val = it.showText(it.val,@data||{},fm?.meta)
        if it.code is 'status'
            val = cf.st.text(it.form.entity, it.val)
        else if it.type in ['select', 'radio']
            if +it.val
                if it.attrs.data
                    val = _.result(it.attrs, 'data')[+it.val]
        else if it.type is 'custom'
            val = it.content(it)

        inp = $("<div class='form-control-static'>#{val}</div>")
        it.cls = it.type
    else

        switch it.type
            when 'text','file','url','password','email','number','range','tel', 'texteara','search','datetime','date'
                inp = $('<input/>')
                inp.attr "type", it.type
                inp.val val
            when 'textarea'
                inp = $('<textarea></textarea>')
                inp.attr 'rows', it.attrs.rows || 6
                if it.attrs.max
                    inp.keyup (e)->
                        t = util.ct(e)
                        n = t.parent()
                        max = n.attr 'pMax'
                        c = t.val().length
                        if c <= max
                            n.attr 'max', max-c
                        else
                            t.val t.val().substr(0,max)
                inp.text val
            when 'select'
                inp = $("<select></select>")
                id = it.id || util.randomChar(5)
                inp.attr 'id', id
                p =
                    title: ii('pleaseSelect')
                    keyVal: 'val,label'
                _.extend p, it.attrs

                if p.data
                    d = _.result(p, 'data')
                    inp.append util.genOptionItem(d, p.keyVal)
                    inp.data 'sdata', d

                else if p.entity
                    p.url ?= util.restUrl(p.entity)
                    opt = $.extend _.result(p, 'criteria'),
                        _attrs: p._attrs || p.keyVal

                    $.get p.url, opt, (res)->
                        return if res.count is 0
                        inp = $('#' + id, if it.form then it.form.$el else 'body')
                        d = res.entities
                        if p.parse
                            d = p.parse d
                        inp.append util.genOptionItem d, p.keyVal
                        if it.addBtn
                            inp.append "<label><a class='new'>#{iim('add')}</a></label>"
                        inp.data 'sdata', d
                        setVal(it, inp)
                        inp.trigger(it.trigger) if it.trigger

                else if it.url and it.jsonp
                    st = '?'
                    if it.url.indexOf('?') > -1
                        st = '&'
                    $.getJSON("#{it.url + st}callback=?").done (res)->
                        addItemAfterAjax res, it, id

                if p.title
                    inp.prepend "<option value='0'>#{p.title}</option>"

                setVal(it, inp)

            when 'checkbox','radio'
                inp = $("<div class='#{it.type}'></div>")
                it.id = id = util.randomChar(5)
                inp.attr 'id', id
                op = (it.attrs ?= {})
                if op.keyVal
                    [k,v] = op.keyVal.split(',')
                else
                    k = 'val'
                    v = 'label'

                if op.data
                    inp.append util.genCheckItem _.result(op, 'data'), it, k, v
                else if op.entity
                    op.url || (op.url = util.restUrl(op.entity))
                    ooc = if op.criteria
                        op.criteria(it)
                    else
                        {}
                    opt = $.extend ooc,
                        _attrs: op.keyVal

                    $.get op.url, opt, (res)->
                        inp.append util.genCheckItem(res.entities, it, k, v)
                        if op.addBtn
                            btn = $("<label class='checkbox-inline'><a class='new'>#{iim('add')}</a></label>").click (e)->
                                cf.dm.l 'form', 'air',
                                    entity: op.entity||'cat'
                                    prop:[
                                        _ep 'code'
                                        _ep 'label'
                                        m._textarea 'description'
                                    ]
                                    data:
                                        type: 'commodity'
                                    _saveSuccess: (model, res)=>
                                        $('#' + id).children().append util.genCheckItem [res.entity], it, k, v
                                        model.view.$el.modal("hide")
                            inp.children('div').append btn

                if op.checkAll
                    inp.on 'click', "input[value='_all']", (t)->
                        t = util.ct(t)
                        p = t.parent().parent().find('input[name]')
                        if t.is(':checked')
                            for ip in p
                                if !$(ip).is(':checked')
                                    $(ip).trigger 'click'
                        else
                            for ip in p
                                if $(ip).is(':checked')
                                    $(ip).trigger 'click'

            when 'view','label'
                inp = $("<p class='form-control-static'>#{val}</p>")
            when 'holder'
                inp = $('<div class="holder"></div>')
            when 'custom'
                inp = it.content(it)

    #form 中也有，不要重复
    #    if it.events
    #        for k,v of it.events
    #            if k.indexOf(' ') > -1
    #                [kk,kkk] = k.split(' ')
    #                inp.on(kk, kkk, _.bind(v, it.form))
    #            else
    #                inp.on(k, _.bind(v, it.form))

    if it.type in ['text', 'url', 'password', 'email', 'number', 'range', 'tel', 'select', 'textarea', 'datetime', 'date']
        ph = it.ph || si("#{it.form?.entity}_#{it.code}_ph")
        ph and inp.attr "placeholder", ph
        inp.attr 'name', it.code if !it.noName
        it.readonly and inp.attr 'readOnly', true
        it.disabled and inp.attr 'disabled', 'disabled'
        inp.addClass it.cls || _st.inputCls

    (it.id and !it.xtype) and inp.attr 'id', it.id
    it.cls and inp.addClass(it.cls)

    if it.trigger and fm
        fm._trigger.push
            elem: inp
            trigger: it.trigger
    inp

