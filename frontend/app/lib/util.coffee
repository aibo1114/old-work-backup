module.exports =
    esp:(e)->
        if e
            e.stopPropagation()
            e.preventDefault()

    setCookie: (name, value, days = 30) ->
        exp = new Date
        exp.setTime exp.getTime() + days * 24 * 60 * 60 * 1000
        document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
        return

    getCookie: (name) ->
        arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
        if arr != null
            unescape arr[2]
        else
            null

    deleteCookie: (name) ->
        exp = new Date
        exp.setTime exp.getTime() - 1
        document.cookie = name + '=; expires=' + exp.toGMTString()

    viewCount:(ent)->
        s = @gcm(ent,'v')
        if v = @getCookie(s)
            @setCookie s, +v+1
        else
            @setCookie s, 1
            $.post util.actUrl("inc/#{ent._e}/#{ent._id}/viewCount")

    gcm: (ent, name)->
        [ent._e,ent._id,name].join(':')

    ro: (ob)->
        str = ''
        if _.isArray ob
            ob.join(',')
        else if _.isObject ob
            for k,v of ob
                if @hasOwnProperty(k)
                    str += "#{k}:#{v} \n"
            str
        else
            ob

    slice: Array::slice

    isChinese: (text)->
        if text
            txt = text.replaceAll('’', "").replaceAll('–', '')
        if escape(txt).indexOf('%u') < 0
            false
        else
            true

    findAndGen: (ctn, key)->
        t = ctn.find(key)
        unless t.length
            t = $("<div/>")
            if key.charAt(0) is '#'
                t.attr 'id', key.substring(1)
            else
                t.addClass key.substring(1)
            ctn.append t
        t

    ct: (e)->
        $(e.currentTarget)

    saveLocal: (k, v)->
        return unless localStorage
        if _.isObject v
            v = JSON.stringify v
        localStorage[k] = v

    cleanLocal: (key)->
        return unless localStorage
        for k,v of localStorage
            if k.indexOf(key) > -1
                localStorage.removeItem k

    readLocal: (id, dir)->
        return unless localStorage
        if dir
            for k,v of localStorage
                if dir > 0
                    if k.startsWith id
                        return v
                else
                    if k.endsWith id
                        return v
        else
            localStorage[id]

    del: (x, ctx = window)->
        it = ctx[x]
        try
            delete ctx[x]
        catch e
            ctx[x] = undefined
        it

    pureText: (text) ->
        text.replace(/<[^>].*?>/g, "")

    cutText: (text, length = 30) ->
        if text.length < length
            return text
        else
            text.substr(0, length - 3) + '...'

    adjustText: (text, length = 30) ->
        return '' unless text
        text = text.replace(/<[^>].*?>/g, "")
        i = 0
        j = 0
        res = ''
        len = text.length
        while length > i and len > j
            c = text.substr(j++, 1)
            if /^[\u4e00-\u9fa5]+$/.test(c) then i += 2 else i++
            res += c
        if len > j
            res += '...'
        res

    fileExt: (name) ->
        it = name.split(".")
        it[it.length - 1]

    attr: (opt)->
        s = ' '
        for k,v of opt when v
            s += k + '="' + v + '" '
        s

    lcss: (path) ->
        unless $("link[href='#{path}']").length
            $('head').append """<link rel="stylesheet" type="text/css" href="#{path}" media="all">"""

    lr: (url, callback, failCallback, p) ->
        xr = (if W.XMLHttpRequest then new XMLHttpRequest() else new ActiveXObject("MsXml2.XmlHttp"))
        xr.onreadystatechange = ->
            if xr.readyState is 4
                if xr.status is 200 or xr.status is 304
                    if callback then callback xr.responseText, p else eval xr.responseText
                else
                    failCallback and failCallback()
        xr.open "GET", url, true
        xr.send null

    parseLocalDate: (time) ->
        if time.length is 24 and time.endsWith('Z')
            new Date(time)
        else
            time = time.substring(0, 19) if time.length > 19
            new Date((time or "").replace(/-/g, "/").replace(/[TZ]/g, " "))

    parseUrl: (url = location.search)->
        res = {}
        unless url.indexOf("?") is -1
            str = url.substr(1).split("&")
            for it in str
                p = it.split("=")
                res[p[0]] = decodeURIComponent(p[1])
        res

    seqProp: (obj, pStr, dv) ->
        v = obj
        for chain in pStr.trim().split(".")
            v = v[chain]
            break unless v?
        v || dv

    setSeqProp: (obj, pStr, v) ->
        for chain in pStr.trim().split(".")
            if chain.indexOf('[') > -1
                k = chain
                chain = k.split('[')[0]
                index = parseInt k.split('[')[1].split(']')[0]
                if _i is (_len - 1)
                    d = if chain then obj[chain] else obj
                    if v
                        d[index] = v
                    else
                        return d[index]
                else
                    obj = if chain then obj[chain][index] else obj[index]
            else if _.isObject(obj[chain])
                obj = obj[chain]
            else
                if v
                    obj[chain] = v
                else
                    return obj[chain]

    delSeqProp: (obj, pStr) ->
        it = pStr.trim().split(".")
        lk = it.pop()
        if it.length > 0
            for chain in it
                obj = obj[chain]
        if lk.indexOf('[') > 0
            chain = lk.split('[')[0]
            index = parseInt lk.split('[')[1].split(']')[0]
            obj[chain].splice(index, 1)
        else
            delete obj[lk]

    randomChar: (len, x = '0123456789qwertyuioplkjhgfdsazxcvbnm') ->
        ret = x.charAt(Math.ceil(Math.random() * 10000000) % x.length)
        for n in [1..len]
            ret += x.charAt(Math.ceil(Math.random() * 10000000) % x.length)
        ret

    log: (msg)->
        window.console && console.log msg #if cf.mode

    setMask:->
        $('body').append "<div class='modal-backdrop fade in'></div>"
        

    popMsg: (text, type = 'success', timeout = cf.popTime, closed) ->
        return unless text
        if _.isArray text
            text = text.join('<br/>')
        alert = $ cf.rtp 'alert',
            msg: text
            type: type
            closed: closed
            icon: _st.sign[type]
        alert.addClass 'popMsg'
        if cf.popMask
            util.setMask()
        $('body').append alert.alert()
        alert.fadeIn(500)
        c = (t)->
            t.fadeOut(->
                $(@).remove())
        _.delay(c, timeout, alert) if timeout > 0
    warnMsg: (text)->
        @popMsg(text,'warning')
    clone: (obj, deep) ->
        return obj  unless typeof obj is "object"
        if $.isArray(obj) then obj.slice() else $.extend(deep, {}, obj)

    getLanguage: ->
        (if navigator.language then navigator.language else navigator.browserLanguage).split('-')[0]

    absPoint: (obj)->
        oRect = obj.getBoundingClientRect()
        left: oRect.left, top: oRect.top

    initCustObjEvent: (obj, actions, prefix)->
        _.extend obj, Backbone.Events

        obj.set = (k, v, p)->
            @[k] = v if v isnt null
            @trigger(prefix + ':' + k, p)

        for e of actions
            if(e.substr(0, 1) is '_')
                obj[e] = actions[e]
            else
                obj.on(prefix + ':' + e, actions[e])

    tabPage: (ctn, d, type, cb)->
        c = $(ctn)
        nav = c.find('.nav-tabs')
        if !nav.length
            c.html cf.rtp 'tab', d
            @initTab(c.find('.nav-tabs'), type)
            cb?()

    initTab: (str, act, el = 'li')->
        $("[href*='#{act}']", str).parent().addClass app.active
        str.on 'click', el, util.setActive

    initActive: (b, str, c = 'active') ->
        b.find(str).addClass(c).siblings().removeClass c

    setActive: (t, cls = 'active')->
        d = if t instanceof jQuery then t else util.ct(t)
        d.addClass(cls).siblings().removeClass cls

    langText: (text) ->
        m = $("<div>" + text + "</div>").find("." + _lang)
        (if m.length > 0 then m.html() else text)

    setSubItem: (data, prop = 'id') ->
        for it in data
            if it.pid
                p = data.findBy(prop, it.pid)
                if p
                    p.children = [] if not p.children
                    p.children.push(it)
                    data.splice _i--, 1
                    _len--

    findByType: (items, type)->
        it for it in items when it instanceof type

    resPath: (c, path) ->
        c.resPath + '/upload/' + c.code + '/' + path

    rPath: ->
        str = [cf.rPath]
        str.push it for it in arguments when _.isString it
        str.join('/')

    rootsPath: ()->
        s = ''
        for it in arguments
            s += '/' + it
        cf.resPrefix + s.substring(1)

    html5Check: ->
        if W.Worker is "undefined" then false else true

    serializeObj: (form)->
        o = {}
        for it in $(form).serializeArray()
            if o[it.name]
                unless o[it.name].push
                    o[it.name] = [o[it.name]]
                o[it.name].push it.value
            else o[it.name] = it.value if it.value.length > 0
        o

    sTop: (pos = 'body', offset = 0, time = 0) ->
        if pos isnt 'body'
            pz = $(pos).offset().top - offset
        else
            pz = offset
        if pz >= 0
            $(pos).animate(scrollTop: pz, time)

    isInView: (t)->
        de = document.documentElement
        top = $('body').scrollTop()
        bottom = top + de.clientHeight
        left = $('body').scrollLeft()
        right = left + de.clientWidth
        x = t[0].getBoundingClientRect().left + left
        y = t[0].getBoundingClientRect().top + top
        return true if left <= x <= right and top <= y <= bottom
        return false

    packParams: (arr, fm, opt)->
        o = {}
        for it in arr
            if it.name.indexOf('::') > 0
                a = it.name.split('::')
                o[a[0]] = {} unless o[a[0]]
                if o[a[0]][a[1]]
                    o[a[0]][a[1]] += '<br/>' + it.value
                else
                    o[a[0]][a[1]] = it.value
                arr.splice _i--, 1
                _len--
        for it of o
            arr.push
                name: it
                value: JSON.stringify o[it]

    langPath: ->
        if cf.community.getDefLang is cf.lang then '/' else ('/' + cf.lang + '/')

    rId: (str) ->
        return str.substr(1)  if str.charAt(0) is "#"
        str

    getTargetId: (event) ->
        return null  unless event
        return event  if typeof event is "string" or typeof event is "number"
        t = $(event.currentTarget).attr("id")
        (if t then t.substr(t.indexOf('-') + 1) else null)

    getIframeElem: (id, str) ->
        $(id).contents().find str

    initCenter: (fun) ->
        fun()
        $(window).resize ->
            fun()

    restUrl: () ->
        cf.rsPre + (it for it in arguments).join('/')

    actUrl: (entity, action, param) ->
        (cf.actPre || cf.rsPre) + (it for it in arguments).join('/')

    pageUrl: (it)->
        "/#{it._e}/#{it[cf.id]}"

    uri: (e, it, lang = util.langPath(), full = true)->
        if full
            "#{cf.community.url}#{lang}page/#{e}-#{it.id}.html"
        else
            "#{lang}page-#{it.id}.html"

    navUrl: (p)->
        return '#' unless p
        if arguments[0].charAt(0) is '#'
            k = arguments[0]
        else
            k = "#!"
            for it in arguments
                if _.isString(it) or _.isNumber(it)
                    k += '/' + it
        k

    setLoading: (e)->
        e.css "background", "url(#{cf.rPath}/img/loading-bk.gif) no-repeat 50% 50%"

    stopLoading: (e)->
        e.css "background", ""

    BForm: (opt, ctn = '#content')->
        fm = $('<form/>').attr('action', opt.action).attr('target', opt.target).attr('method', 'post')
        for it of opt.data
            fm.append $.mk('input',{type: 'hidden'}, opt.data[it])
        $(ctn).append(fm)
        fm

    getIFrame: (id, src,css = {}) ->
        $("<iframe></iframe>")
        .addClass("ifr-map")
        .attr("id", id)
        .attr("src", src)
        .attr("frameborder", 0)
        .css(css)

    getUrlParams: (url, params) ->
        url + '?' + ("#{encodeURIComponent(k)}=#{encodeURIComponent(v)}" for k,v of params).join('&')

#    encodeUrl: (url, p)->
#        rs = for k,v of p
#            "#{k}=#{encodeURIComponent(v)}"
#        url + '?' + rs.join('&')

    now: ->
        new Date().getTime()

    crumb: (items, single = false, ctn = $('#crumb'))->
        if single
            la = ctn.find('li:last-child')
            la.html "<a href='#'>#{la.text()}</a>"
        else
            d = [
                icon: 'home'
                label: '首页'
                href: '/index.html'
            ]
            ctn.html $('<ul class="breadcrumb"/>').append(cf.rtp 'lia', d)

        ctn.children('ul').append cf.rtp 'lia', items

    layout: (cols, row)->
        str = if row then "<div class='row'>" else ''
        str += "<div id='#{k}' class='#{v}'></div>" for k,v of cols
        str += if row then "</div>" else ''
        str
        
    weekDay: (date)->
        iCat('w')[util.parseLocalDate(date).getDay()]

#    resetSelect: ->
#        nua = navigator.userAgent
#        isAndroid = (nua.indexOf("Mozilla/5.0") > -1 and nua.indexOf("Android ") > -1 and nua.indexOf("AppleWebKit") > -1 and nua.indexOf("Chrome") is -1)
#        $("select.form-control").removeClass("form-control").css "width", "100%"  if isAndroid

    initScroll: (ctx, num) ->
        for s in $('.scrollBox', ctx || 'body')
            s = $(s)
            if !num or s.children().length > num
                s.wrapInner('<div class="viewport" style="height: ' + s.height() + 'px"><div class="overview"></div></div>')
                s.prepend('<div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>')
                #                s.addClass('scrollBox')
                s.tinyscrollbar()
                if s.children('.scrollbar').height() > 0
                    s.mouseleave(-> $(@).find('.track').fadeOut(400)).mouseenter(-> $(@).find('.track').fadeIn(200))

    isWechat: ->
        ua = navigator.userAgent.toLowerCase()
        res = ua.match(/MicroMessenger/i)
        if res and res[0] is "micromessenger"
            return true
        else
            return false

    atHash: (num = 1, splitter = '/')->
        location.hash.split(splitter)[num]

    screenWith: (n = 1, offset = 0)->
        de = document.documentElement
        (de.clientWidth - offset) / n

    isIE: (ver) ->
        b = document.createElement('b')
        b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
        b.getElementsByTagName('i').length == 1

    initPC: (it)->
        $(it).find('.panel-collapse').addClass 'collapse'
        $(it).find('a[data-toggle]').first().trigger('click')

    cleanCachePage: (path) ->
        if !_.isString(path)
            path = location.pathname
        $.get (path + '?_c=1&_r=1')

    setPageHeight: (p, min, offset=0)->
        k = if min
            'min-height'
        else
            'height'
        p.css k, "#{$(window).height()-offset}px"

    addHover: (t, opt)->
        o = $.extend
            placement: 'auto'
            content: '<p>sdfsdfsdfdsf</p>'
            html: true
            trigger: 'focus'
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        , opt || {}
        t.popover o

    batchAdd: (et, d, cb)->
        $.postJSON util.actUrl("batch/add/#{et}"),
            data: d
        , cb
        
    prevNext: (list, id, url)->
        m = list.findWhere '_id': id
        idx = list.indexOf m
        res =
            prev: null
            next: null
        if idx isnt 0
            res.prev = util.navUrl(url, list.at(idx - 1).id)
        if idx isnt list.length - 1
            res.next = util.navUrl(url, list.at(idx + 1).id)
        res

    pad: (width, string, padding)->
        if width <= string.length then string else @pad(width, padding + string, padding)
