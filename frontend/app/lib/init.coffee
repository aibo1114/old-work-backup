cf = require './init_light'

require '../ext/string'
require './extend/jquery'
require './extend/backbone'

$.extend util, require('./tmpl')

cf.bbEvt = {}
_.extend cf.bbEvt, Backbone.Events

W.onscroll = _.debounce ->
    cf.bbEvt.trigger 'scroll'
, 1000

require './func/loadNewPic'
require './func/goTop'
meta = require './meta/common'

$.extend W,
    _exv: (name, tag, opt)->
        if _.isString tag
            tag = cf.view[tag]
        cf.view[name] = tag.extend opt

    _exm: (name, opt)->
        cf.model[name].extend opt

    _st: require '../ext/style/bs'

    tu: require "../ext/tmpl"
    meta: meta
    m: meta
    _ep: meta.exp

$.extend cf,
    meta: meta
    tp:
        opt:
            f: window.tu
            u: util
            i18: util.i18n
            c: cf.community
            st: _st
    dm:
        l: (cp, place, opt)->
            if place is 'air'
                opt.render = require './view/_modal'
            if _.isString cp
                cp = cf.view[cp]
            place and opt.parent = place
            new cp opt

        ent: (p, opt)->
            new cf.model.entity p, opt

        ents: (p, opt)->
            new cf.model.entities p, opt

    view: {}
    widget: {}
    i18n: {}
    opt:
        image:
            df: {}

    checkLogin: ->
        unless user.isLogin()
            throw 'noLogin::toLogin'

    _handleErr:
        noLogin: ->
            if location.hash
                cf._toLogin = location.hash
            cf.r 'login'

        noFunc: ->

        waitWtJs: ->
            
        rt: (p)->
            cf.r p
        rr: ->
            cf.rr()

    rtp: (tmpl, opt = {}) ->
        if _.isString tmpl
            unless cf.tp[tmpl]
                try
                    cf.tp[tmpl] = cf.loadTmpl(tmpl)
                catch
                    cf.tp[tmpl] = cf.loadLibTmpl(tmpl)

            tmpl = cf.tp[tmpl]

        tmpl $.extend opt, cf.tp.opt
    exLabel: ->
        for k,v of m
            if !k.startsWith('_') and v.label
                _i[k] = v.label
                if v.prop
                    for it in v.prop
                        if it.label
                            _i["#{k}_#{it.code}"] = it.label
    home: ->
        if location.pathname isnt '/'
            path = '/'
        else
            path = '#'
        location.href = path

    r: (path, tg = true, rp = false)->
        if path
            unless path.startsWith '#'
                path = util.navUrl(path)
        app.navigate(path, {trigger: tg, replace: rp})

    rr: (path)->
        path ?= location.hash
        if path
            Backbone.history.loadUrl path

    _packOpt: (init, et, type, opt)->
        if cf._initOpt
            init = $.extend init, cf._initOpt(type)

        ob = if type and m[et]
            _.result m[et], type + 'Opt'
        else {}

        $.extend init, ob, opt

    uSize:
        img:
            max: 1024 * 1024 * 6
            ext: ["jpg", "jpeg", "png", "gif"]
        doc:
            max: 1000 * 1024 * 4
            ext: ["doc", "docx", "ppt", "pptx", "txt", "pdf", "rtf"]
        audio:
            max: 1000 * 1024 * 5
            ext: ["wmv", "mp3", "mid"]
        video:
            max: 1000 * 1024 * 12
            ext: ["swf", "fla", "mp4"]
    pv: ->
        $.post util.restUrl('stat'),
            tid: cf._tid
            uid: user.id
            username: user.username
            startTime: new Date().getTime()
            href: location.href
            referrer: if app.prev() then app.prev.frag else document.referrer