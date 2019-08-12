module.exports = $.extend require('../ext/tmpl'),
    tmpl: (name, opt, lib)->
        try
            cf.rtp name, opt, lib
        catch
            log 'No tmpl: '+name

    viewItem: (entity, k, v)->
        opt = meta[entity][k] || meta.common[k]
        if opt.showText
            opt.showText(v)
        else if opt.type is 'text' or !opt.type
            v
        else if opt.type in ['select', 'radio']
            if opt.data and +v
                _.result(opt, 'data')[+v]
            else
                v
        else if opt.type is 'status'
            cf.st.text(entity + '_status', v)
        else
            v

    lt: (obj, sc, ets, fun, val='', tag = 'span')->
        id = util.randomChar(4)
        st = "<#{tag} id='#{id}'>#{val}</#{tag}>"
        obj.listenTo sc, ets, (r, v)->
            $("##{id}").html(if fun then fun.apply(obj, arguments) else v)
        st

    flt: (lc, code, val, fun)->
        if !fun and lc.showText
            fun = (m, v)->
                lc.showText(v)
        @lt(lc.ctx, lc.ctx.model, "change:#{code}", fun, val)

    status: (e, t)->
        cf.st.text e, t

    circle: (text,size,color='danger',cls)->
        ctn = $.mk 'div',
            class: "btn btn-#{color}"
            style: "
                border-radius: #{size/2}rem;
                width: #{size}rem;
                height: #{size}rem;
                padding-top: 0.9rem;
                text-align: center;
                display: inline-block;
                    "
        , $.mk 'div', style: "font-size: #{size/2}rem"
        ctn.toStr()
        
            
