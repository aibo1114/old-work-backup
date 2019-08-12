require './init'

module.exports = cf.router= Backbone.Router.extend
    parent: 'body'
    startSilent: false
    active: 'active'
    regions: {}
    dm: cf.dm
    blockBox: null
    blockLine: null
    blockMsg: "Please wait..."
    _history: []
    _enhanceList: {}

#################################################################
    routes:
        '': 'index'
        '!/*path': 'dAct'

    dAct: (path)->
        log 'dAct:'
        if @_enhanceList[path]
            popMsg '您输入的网址目前没有功能', 'warning'
            throw 'noFunc'

        items = path.split('/')

        if !@mods or items[0] in @mods
            cf.__loading = true
            @_enhanceList[path] = true
            lp = cf.modPath + items[0]
            cf.loadJS "#{lp}.js", ->
                cf.__loading = false
                cf.rr()
            , ->
                cf.__loading = false
                popMsg '您输入的网址不正确', 'warning'
                throw 'noFunc'
        else
            popMsg '您输入的网址不正确', 'warning'
            throw 'noFunc'

    index: ->
        log 'index'

    constructor: (opt)->
        $.extend @, opt if opt
        $.extend @, util.parseUrl()
        @_bindRoutes()
        window.app = @
        @initialize(arguments)

    initMod: ->
        if @_exr
            for it in @_exr
                if it.routes
                    for k, v of it.routes
                        @[v] = it[v]
                        @route k, v, it[v]
                if it._app
                    $.extend @, it._app

        @loadMod?()

        @layout?()

        @on 'route', (name, args)=>
            if @_noTrack
                util.del '_noTrack', @
                return

    enhance: (obj)->
        for k,v of obj.routes
            @route k, v, obj[v]
            obj.callback?()

    initialize: ->
        @initMod()
        @init()
        @start()

    isFirst:->
        @_history.length is 0
        
    prev: (step = 2)->
        len = @_history.length
        if len >= step
            @_history[len - step]
        else
            null

    init: ->
        log 'init...'
        @cache = $('#_cache')
        @ctn = $('#content')
        @sta = $('#static')

    context: ->
        cf.community || {}

#    checkPage: ->
#        true

    before: ->
        log 'before router'
        rt = util.atHash(1)
        if @prev()
            lp = @prev().frag.split('/')[1]

        if location.hash.length
            @ctn.removeClass(lp).addClass(rt)
            @ctn.show()
            @sta.hide()
        else
            @ctn.hide()
#            @cleanPage()
            @sta.show()

    execute: (cb, args, name)->
        @pv?()
        
        if $('body').offset().top > 50
            util.sTop()

        if name isnt 'dAct'
            lst = @_history.last()
            if !lst or lst.name isnt name
                @_history.push
                    name: name
                    args: args
                    frag: Backbone.history.fragment

        if @cleanSlides()
            return

        #cb and
        if !@checkPage or @checkPage(name)
            @before()

            if @ctn.children().attr 'cache'
                app.cache.append @ctn.children()

            lp = @cache.find("[cache='#{location.hash}']")

            if lp.length
                if lp.hasClass 'page'
                    cf.slider.slidePage lp
                else
                    @cleanPage()
                    app.ctn.html lp
                    cf._sh = []
            else
                try
                    @prePage?()
#                    cb.apply @, args
                catch e
                    @handleErr(e)
                    return
                cb.apply @, args
            @after?()
        else
            @checkFail?()


    handleErr: (e)->
        log "cust catch: #{e}"
        if e
            [code,p,m] = e.split('::')
            if code
                cf._handleErr[code](p)
            if m
                s = if code is 'loading'
                    'success'
                else
                    'warning'
                popMsg m, s, 1000

    started: ->
        Backbone.History.started

    setCtn:(ctn)->
        W.ctn = ctn

    inSlides:->
        @ctn.find("[hash]").length

    cleanSlides:->
        p = @ctn.find("[hash='#{location.hash}']")
        if p.length
            if p.prevAll().length
                cf.slider.slideLastPage(p.first().attr('id'))
                return true
            else if p.index() is 0
                cf.slider.slidePage()
                return true
        else if @ctn.find('[hash]').length > 1
            if W.ctn isnt 'slide'
                cf.slider.slidePage()
                return true
#        cf.slider?.reset()
        return false

    start: (callback)->
        log 'app start:' + @startSilent
        return if @started()
        @render?()
        if @startSilent
            silent = true
        Backbone.history.start {silent}
        cf.community.userTrack && cf.infoc location.hash
        cf.afterStart?()

    cleanPage:(ctn = app.ctn)->
        for it in $(ctn).children()
            $(it).data('_item')?._close()
        for it in $('[data-cid]',ctn)
            $(it).data('_item')?._close()
        ctn.empty()

    setFade:->
        cf.body.addClass 'bg-faded'

    unsetFade: ->
        cf.body.removeClass 'bg-faded'

    isFade: ->
        cf.body.hasClass 'bg-faded'

