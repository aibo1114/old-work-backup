module.exports = tag = cf.view.tag = Backbone.View.extend
    parent: '#main'
    initialize: (opt) ->
        @eventList = []
        $.extend @, opt if opt
        @init?()
        @render() if @auto

    bindEvents: (evts)->
        for k,v of evts
            [k,s] = k.split(' ')
            @delegate k, s, _.bind(@[v], @)
    hide: ->
        @$el.hide()

    show: ->
        @$el.show()

    modeContext: ->
        title: _.result @, 'title'
        head: @head
        foot: @foot

        tagClass: @tagClass
        style: @style
        imgPath: @imgPath
        tag: @tag

        bareCtn: @bareCtn

        modalSize: @modalSize
        closeBtn: @closeBtn

        backBtn: @backBtn
        toolbar: @toolbar
        topBtn: @topBtn

        ctx: @

    context: ->
        d = if @model
            @model.toJSON()
        else
            _.result(@, 'data') || @
        d.ctx = @
        d

    setTmpl: ->
        if @tmpl
            res = cf.rtp @tmpl, _.result(@, 'context')

        if @mode
            opt = _.result @, 'modeContext'
            opt._content = res if res
            res = cf.rtp @mode, opt

        @$el.append res

    layout: ->
        @css && @$el.css @css
        if @tmpl || @mode
            @setTmpl() #tmpl content
        @setRegions() #set head,ctn,foot, etc...
        @setContent?() #for customize content
        @enhanceContent?() #for event/widget enhance
        @addBtns() #if setBtns

    mount: ->
        p = $(@parent)
        if @beforeTag
            $(@beforeTag).after @$el
        else if @afterTag
            $(@afterTag).before @$el
        else if @parent
            lp = $(@parent).children()
            if @cleanAll and lp.length
                if lp.attr('cache')
                    app.cache.append lp
                else if lp.attr 'data-cid'
                    lp.data('_item')._close()
                else
                    p.empty()
            if @pos? and @pos isnt p.children().length
                p.children().eq(@pos).before @$el
            else
                p.append @$el

        if @cache
            cp = if @_slide
                p
            else
                @$el
            cp.attr('cache', location.hash)
        @afterMount?()

    setRegions: ->
        @ctn = @$el
        switch @mode
            when 'panel'
                @head = @$('.panel-heading').first()
                @ctn = @$('.panel-body,.list-group')
                @foot = @$('.panel-footer')
            when 'modal'
                @head = @$('.modal-header').first()
                @ctn = @$('.modal-body')
                @foot = @$('.modal-footer')
            when 'blank'
                @head = @$('.head')
                @ctn = @$('.refresh')
                @foot = @$('.foot')
            when 'card'
                @head = @$('.card-header')
                @ctn = @$('.card-block,.list-group')
                @foot = @$('.card-footer')

    addEvents: ->
        if @exEvents
            for k,v of @exEvents
                [a,t] = k.split(' ')
                @$el.on a, t, _.bind(v, @)

        @setEventList?()
        if @meta and @eventList and @eventList.length
            @eventList = _.unique @eventList

            eMeta = $.extend {}, m._.event, @meta.event
            events = _.pick eMeta, _.uniq(@eventList)
            for k,v of events
                if _.isFunction v.fun
                    @$el.on v.type, v.tag || ".#{k}", _.bind(v.fun, @)

    setBtns: ->
        _.result @, 'btns'

    addBtns: (d = @data)->
        btns = @setBtns()
        if @topBtns
            tCtn = @$('.toolbar')
            bCtn = @foot.find '.btnCtn'
        else
            bCtn = @$('.btnCtn')

        if btns and btns.length
            for b in btns
                if b and @isShow(b)
                    bCtn.append util.genBtn b, d
                    if b.event
                        @$el.on 'click', ".#{b.key}", _.bind(b.event, @)
        if @topBtns
            for it in @topBtns
                if @isShow(it)
                    tCtn.append util.genBtn it

    reRender: ->
        v = $("[data-cid='#{@cid}']")
        if v.length and v.children().length
            @$el.empty()
            @layout()
            @preRender?()

    render: ->
#        if @rendered
#            @mount()
#            @addBtns()
#            @delegateEvents()
#            @addEvents()
#        else
        @layout()
        @addEvents() #if setEvents
        @preRender?()
        @mount()
        @callback?() #for using
#        @rendered = true
        @$el.data '_item', @
        @$el.attr 'data-cid', @cid
        util.loadPic @ctn
        @

    isDlg: ->
        @mode is 'modal'

    closeDlg: ->
        @isDlg() and @$el.modal("hide")

    onClose: ->
        for it in @$('[data-cid]')
            $(it).data('_item')?._close()

    isShow: (it)->
        !it.isShow or it.isShow(@data || @model.toJSON(), @)

$.extend cf.dm,
    tag: (p, opt)->
        init =
            parent: p
            mode: _st.mode
            init: ->
                @render()

        cf.dm.l 'tag', p, cf._packOpt(init, null, null, opt)

cf.prompt = (title, content, func, p)->
    opt =
        modeContext:
            head: title
            title: title
        enhanceContent: ->
            @ctn.append content
    if func
        opt.events =
            'click a': func
    cf.dm.tag 'air', $.extend opt, p