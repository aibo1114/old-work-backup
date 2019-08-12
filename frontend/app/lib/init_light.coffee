u = require './util'
window.W = window
W.$ = W.jQuery = $
W.cf ?= {}

$.extend W,
    util: u
    popMsg: u.popMsg
    warnMsg: u.warnMsg
    log: u.log
    _: require 'underscore'

u.i18n = require '../ext/i18n'

$.extend W, u.i18n

cf.agent =
    iphone: /iPhone/i.test(navigator.userAgent)
    android: /android/i.test(navigator.userAgent)
    ipad: /iPad/i.test(navigator.userAgent)

cf.mob = cf.agent.iphone || cf.agent.android || cf.wechat || (document.body.clientWidth < 480)
code = cf.code

cf._ld = $('#loading')

$.extend cf,
    meta: {}
    model: {}
    view: {}
    widget: {}
    i18n: {}
    _tid: new Date().getTime()
    popTime: 1000
    _exr: []
    _es: []

    body: $('body')
    ssp = /\s+/
    ss: 'show'
    rsPre: "/r/"
    actPre: "/a/"
    root: (if cf.mode then "/module/#{code}/" else "/")
    resPrefix: (if cf.mode then "/module/#{code}/" else "/")
    resFolder: "upload/"
    rPath: (if cf.mode then "/res/" else "#{cf.dm}/")
    modPath: (if cf.mode then "http://127.0.0.1:8088/" else "#{cf.dm}/upload/#{cf.code}/lib/")

    loadJS: require './func/loadJS'
    showPic: require './func/showPic'
    modPath: $("script[src*='lib.js']").attr('src').split('?')[0].replace('lib.js','')


    infoc: (action)->
        opt =
            code: cf.code
            pathname: location.pathname
            url: location.href
            method: 'GET'
            agent: navigator.userAgent
            lang: navigator.language

        document.referrer && opt.refer = document.referrer

        if action
            opt.action = action
            opt.type = 'action'
        else
            opt.type = 'pv'
        $.post '/userTrack', opt

    ajaxOk: (e, xhr, settings) ->
        if !cf._jsonp and xhr.responseText and xhr.responseText.charAt(0) is '{'
            result = JSON.parse(xhr.responseText)
            eval(result.action) if result.action
            if cf._mkOkMsg
                cf._mkOkMsg(result)
            else if !cf.noReply
                m = cf._rsMsg
                if !m and result.msg
                    m = if result.msg.startsWith('m_') then iim(result.msg, result._e) else result.msg
                popMsg(m, "success")
            cf._rsMsg = null
            cf.noReply = false

    ajaxErr: (e, xhr, settings) ->
        @ajaxStop?()
        result = $.parseJSON(xhr.responseText)
        if xhr.status < 300
            sign = "success"
        else if (xhr.status >= 300 and xhr.status < 500)
            sign = "warning"
        else
            sign = "danger"
            
        eval(result.action) if result.action
        
        if cf._mkErrMsg
            cf._mkErrMsg(sign, result)
        else
            text = result.msg
            if text and text.indexOf 'm_' > -1
                text = ii(text, 'post')
            popMsg(text, sign) if result.msg and !cf.noReply
            cf.noReply = false

    ajaxStart: ->
        cf._ld.show()
        cf.blockBtn() if cf.blockLine

    ajaxStop: ->
        cf._ld.hide()
        if cf.blockLine
            cf.blockLine.removeClass('disabled')
            cf.blockLine.html cf.blockText
            if cf.blockClass
                cf.blockLine.attr('class', cf.blockClass)
            cf.blockClass = cf.lockText = cf.blockLine = null

    initAjax: ->
        $(document)
        .ajaxStart @ajaxStart
        .ajaxStop @ajaxStop
        .ajaxSuccess @ajaxOk
        .ajaxError @ajaxErr

    blockBtn: ()->
        if cf.blockLine.hasClass('glyphicon')
            cf.blockClass = @blockLine.attr('class')
            cf.blockLine.removeAttr('class')
        cf.blockText = cf.blockLine.text()
        cf.blockLine.addClass('disabled')
        cf.blockLine.html "<span class='ajax-loader'>#{ii('loading')}</span>"

cf.initAjax()
#$("#nav>li>a[href='#{location.pathname}']").parent().addClass 'active'
module.exports = cf
