inputEditor = require '../../widget/editor/inputEditor'

getValue = (e)->
    t = util.ct(e)
    [t.attr('name'), (t.val() || t.attr 'value'), t.attr('stype') || 's', t.attr('op')]

util.setQ = (ctn = $('body'),p...)->
    q = {}
    for it in p
        v = ctn.find("[name=#{it}]").val()
        v and q[it] = v
    q    

$.extend true, cf.view.collection::,
    exEvents:
        'change .searchBox>div>input[name]': (e)->
            if @searchIt
                @searchIt(e)
            else
                [k,v,t,o] = getValue e
                c = @collection
                opt = {}
                if v
                    if o is 'eq'
                        opt[k] = v
                    else if o is 'mt'
                        opt[k] =
                            $regex: ".*#{v}.*"
                else
                    util.del k, c.criteria.q
                c.criteria.offset = 0
                c.setCriteria opt
                c.resetFetch()

        'click .sort': (e)->
            t = util.ct e
            util.setActive t.parent()
            [k,v,t,o] = getValue e
            c = @collection
            c.setCriteria k, v, "order_#{v}"
            c.resetFetch()
            t.closest('.btn-group').removeClass 'open'

        'change .toolbar>select': (e)->
            if @filterIt
                c = @filterIt(e)
            else
                [k,v,t,o] = getValue e
                c = @collection
                if t is 'd'
                    d = new Date()
                    fm = 'yyyy-MM-dd HH:mm:ss'
                    switch v
                        when 'today'
                            d.setHours(18)
                            e = d.pattern fm
                            d.addDays(-1)
                            b = d.pattern fm
                        when 'week'
                            d.sunday()
                            e = d.pattern fm
                            d.monday()
                            d.addDays(-1)
                            d.setHours(18)
                            b = d.pattern fm
                        when 'month'
                            d.lastDayOfMonth()
                            e = d.pattern fm
                            d.firstDayOfMonth()
                            d.addDays(-1)
                            d.setHours(18)
                            b = d.pattern fm
                        else
                    c.setCriteria k, v, "bt_#{t}_#{b}_#{e}"
                else if t is 's'
                    op = {}
                    op[k] = v
                    c.setCriteria op
                if v is '0'
                    util.del k, c.criteria.q
            c and c.resetFetch()

        'click .status>a': (e)->
            t = util.ct e
            util.setActive t.parent()
            [k,v,t,o] = getValue e
            c = @collection
            c.setCriteria k, v, "eq_#{t}_#{v}"
            c.resetFetch()

    getNewInput: (k, opt)->
        name = k.split('__')[0]
        opt.name = name
        opt.title ?= iie(@entity, name)
        if opt.type is 'text'
            opt.ph = opt.title
        tag = $ cf.rtp 'formItem', opt
        tag.children('div').append inputEditor opt
        po = $.extend
            form: @
            name: k
            parent: tag
        , opt.attrs
        tp = cf.view[opt.xtype]
        if tp.fun
            tp.fun po
        else
            new tp po
        tag

    getInput: (type, k, stype, op)->
        name = k.split('__')[0]
        switch type
            when 'text'
                cf.rtp require('./searchBox.jade'),
                    name: k
                    label: iie(@entity, name)
                    attr:
                        stype: stype
                        op: op
            when 'select'
                opt = @meta.prop.codeBy(k) || {}
                opt.name = name
                opt.type = 'select'
                opt.form = @
                cra = @collection.criteria
                if cra and cra.q and cra.q[k]
                    opt.val = @collection.criteria.q[k]
                opt.title = iie(@collection.entity, k)
                if cf.st and k.endsWith 'tatus'
                    opt.data = cf.st["#{@entity}_#{k}_hash"]
                    opt.title = opt.label if opt.label
                else if k is 'status__ex'
                    opt.title = '异常'
                    opt.data = cf.st["#{@entity}_status_exp_hash"]
                inputEditor opt

    setTools: ()->
        return if @noFilter

        @toolbar = @$('.toolbar')

        if ft = @meta.filter
            if _.isArray ft
                for v in ft
                    res = if v.type is 'btn'
                        util.genBtn v
                    else if v.xtype
                        $ @getNewInput(v.code, v)
                    else
                        $(inputEditor v)
                    res.attr('data-type', v.stype || 's')
                    @toolbar.append res
            else
                for k,v of ft
                    if _.isString v
                        [type,stype,op] = v.split(':')
                        res = $ @getInput(type, k, stype, op)
                    else if v.type is 'btn'
                        res = util.genBtn v
                    else if v.xtype
                        op = v.stype
                        res = $ @getNewInput(k, v)
                    res.attr('data-type', op || 's')
                    @toolbar.append res
        if @meta.sort
            log 'zzz'
