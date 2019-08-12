module.exports = _exv 'model', 'tag',
    toFetch: true
    listenTime: 'listenTo'
    auto: true
    modelType: cf.model.entity
    initialize: (opt) ->
        $.extend @, opt if opt
        @data = _.result(@, 'data') if @data

        if @model
            @entity = @model.entity
            @data = @model.toJSON()
        else
            @setModel()

        @meta ?= @model.meta || {}

#        if @rChange
#            @listenTo 
        if @reRendered
            @listenTo @model, 'change', @reRender
        

        @init?()

        @model.view = @

        @$el.data('_item', @model)

        @listenTo(@model, 'destroy', @remove) if @remove

        if @toFetch
            @$el.addClass 'loadingData'
            @listenToOnce(@model, 'sync', @render)
            @[@listenTime](@model, 'sync', @afterAjax)
            @model.fetch _.result(@, 'fetchOpt')
        else if @auto
            @render()

    afterAjax: ->
        if @setTitle
            @head.find('strong').html @setTitle(@model.toJSON())
        @$el.removeClass 'loadingData'
        util.loadPic(@ctn)

    context: ->
        d = if @model
            @model.toJSON()
        else
            @data || @
        d.ctx = @
        d

    fetchOpt: ->
        opt =
            reset: true
            error: (model)->
                model.view.noData?()
        if @_attrs
            opt._attrs = @_attrs()
        if @jsonp
            opt.dataType = 'jsonp'
        opt

    setModel: ->
        if @inCtx and app[@inCtx]
            @model = app[@inCtx]
            @toFetch = false
        else
            opt =
                entity: @entity
                urlRoot: @urlRoot
                meta: @meta
            if @urlRoot and @urlRoot.indexOf('a/push') > -1
                opt.idAttribute = 'noId'

            if @stSync
                opt.stSync = true

            @model = new @modelType @data, ($.extend opt, @entityOpt)

            @inCtx and app[@inCtx] = @model

    setBtns: -> #for model btns
        rb = []
        if @btns
            @btns = _.result @, 'btns'
            ce = m._.btn
            e = @meta.btn || {}
            for b,i in @btns
                if _.isString b
                    if mo = e[b] || ce[b]
                        it = mo(@model.attributes || @data, @entity)
                        if it
                            it.key = b
                            rb.push it
                else
                    rb.push b
        rb

$.extend cf.dm,
    model: (p, entity, eid, opt)->
        pdd = {}
        if eid
            pdd[cf.id] = eid
        init =
            cleanAll: true
            entity: entity
            parent: p
            data: pdd
            btns: ['back']
        cf.dm.l 'model', p, cf._packOpt(init, entity, 'show', opt)
