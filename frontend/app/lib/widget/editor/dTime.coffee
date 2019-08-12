editor = (opt)->
    return if opt.dMode
    p = $(opt.parent)
    p.parent().addClass('has-feedback')
    date = p.find('input')
    date.addClass '_datetime'
    fmt = opt.fmt || "yyyy-mm-dd hh:ii:ss"
#    if opt.minView is 2
#        fmt = 'yyyy-mm-dd'
    o =
        showMeridian: true
        autoclose: true
        todayBtn: true
        language: opt.lang || 'zh-CN'
        format:fmt

    opt.val || opt.val = date.val()
    if _.isFunction opt.val
        opt.val = opt.val()

    if opt.val #and opt.val.trim()
        if opt.val.length is 24
            opt.val = Date.parseLocal(opt.val).pattern()
        date.val opt.val #Date.parseLocal(opt.val).pattern()
    else if !opt.noVal
        v = if opt.minView is 2
            new Date().pattern('yyyy-MM-dd')
        else
            new Date().pattern('yyyy-MM-dd HH') + ':00:00'
        date.val v
        
#    if cf.mob
#        date.attr 'readonly', 'true'

    date.datetimepicker $.extend(o, opt)
    date.parent().addClass('rel').append("""<span class="form-control-feedback #{util.iClass('th')}"></span>""")

cf.view.dTime =
    _type: 'dTime'
    fun: (opt)->
        if $.fn.datetimepicker
            editor opt
        else
            util.lcss(cf.rPath + 'js/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css')
            cf.loadJS cf.rPath + 'js/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js', ->
                if _lang is 'zh'
                    opt.lang = 'zh-CN'
                    cf.loadJS cf.rPath + 'js/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js', ->
                        editor opt
                else
                    editor opt
            


$.extend meta.common,
    startedDate:
        id: 'sTime'
        type: "text"
        xtype: 'dTime'
        valid:
            earlyThan: "#eTime"
        showText:(v)->
            v
        attrs:
            minuteStep: 5
            minView: 0
#        value: ->
#            new Date().pattern('yyyy-MM-dd HH:mm:ss')
    endDate:
        id: 'eTime'
        type: "text"
        xtype: 'dTime'
        valid:
            laterThan: "#sTime"
        showText:(v)->
            v
        attrs:
            minuteStep: 5
            minView: 0

    pubTime:
        type: 'text'
        xtype: 'dTime'
        isShow: ->
            W.user and W.user.isAdmin()