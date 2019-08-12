$.fn.serializeObject = ->
    o = {}
    $.each @serializeArray(), ->
        if o[@name]?
            o[@name] = [o[@name]]  unless o[@name].push
            o[@name].push @value or ""
        else
            o[@name] = @value or ""
        return
    o

$.fn.cVal = (v)->
    $(this).val(v).trigger("change")

$.mk = (tag, opt, ct)->
    t = $ '<' + tag + '/>'
    opt and t.attr opt
    ct and t.append ct
    t

$.fn.toStr = ->
    $(this).prop('outerHTML')

$.fn.mk = (tag, opt, ct, md = 'append', act = 'click', evt)->
    t = $.mk tag, opt
    if ct
        t.append ct
    $(this)[md] t
    evt and t.on act, evt
    t

$.ajaxJSON = (type, url, data, success, error)->
    $.ajax
        type: type
        url: url
        data: JSON.stringify data
        contentType: "application/json; charset=utf-8"
        dataType: "JSON"
        success: success
        error: error

$.postJSON = (url, data, success, error)->
    $.ajaxJSON "POST", url, data, success, error

$.delJSON = (url, data, success, error)->
    $.ajaxJSON "DELETE", url, data, success, error
