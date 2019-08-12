module.exports = cf.view.collection = cf.view.tag.extend
    cleanAll: true
    toFetch: true
    itemView: cf.view.model
    entitiesType: cf.model.entities
    head: true
    pRange: 7
    max: 15
    offset: 0
    toolbar: true

    title: ->
        ii(@entity)

    initialize: (opt)->
        @eventList = []
        @data = opt.val if opt.val
        $.extend @, opt if opt

        if @modelOpt
            @modelOpt = _.result @, 'modelOpt'

        if @collection
            @collection = _.result @, 'collection'
            @entity = @collection.entity
            if @collection.title
                @title = @collection.title
        else
            @setCollection()

        @collection.view = @

        @meta ?= @collection.meta
        @init?()
        if @_filter
            @listenTo @collection, 'reset', =>
                @$("[key='#{@tab}']").trigger 'click'
        else
            @listenTo(@collection, 'reset', @addAll)


        @listenTo(@collection, 'add', @onAdd)
        @listenToOnce(@collection, 'sync', @afterAjaxOnce) if @afterAjaxOnce

        @render()

        if @toFetch
            @collection.resetFetch()
        else if @_filter
            @$("[key='#{@tab}']").trigger 'click'
        else if @collection.length #@data and @data.length
            @addAll()

        @preRender = @addAll

    entitiesOpt: ->
        opt = {}
        opt.url = @url if @url
        opt.entityType = @entityType if @entityType
        opt.criteria = @setCriteria()
        opt.comparator = @comparator if @comparator
        opt.parse = @parse if @parse
        opt

#    comparator: (m)->
#        m.get('row') or m.get('lastUpdated')

    setCollection: ->
        if @inCtx and app[@inCtx]
            @collection = app[@inCtx]
            @toFetch = false
            if @comparator and !@collection.comparator
                @collection.comparator = @comparator

        else
            @data = _.result(@, 'data') || []
            @handleData and @data = @handleData(@data)
            opt = _.result(@, 'entitiesOpt')
            opt.entity = @entity
            if @stSync
                opt.stSync = true
            @collection = new @entitiesType @data, opt
            @inCtx and app[@inCtx] = @collection

#    comparator:->
    setEventList: ->
        if @btns
            @eventList = @eventList.concat @btns
        if @itemBtns and @itemBtns.length
            @eventList = @eventList.concat @itemBtns

    enhanceContent: ->
#        @ctn = if @$('.refresh').length
#            @$('.refresh')
#        else
#            @$el
#and @tmpl isnt 'table' #@mode and
        if @tagClass
            @ctn = @$('.' + @tagClass.replaceAll(' ', '.'))
        @setTools?()

    onAdd: (item)->
        for it,i in @collection.models
            if it.id is item.id
                idx = i
        @addOne(item, idx, pos: idx)
        util.loadPic item.view.$el

    addOne: (item, index, opt = {})->
        @$('.noData').remove()
        opt =
            entity: @entity
            model: item,
            parent: @ctn
            pos: opt.pos
            toFetch: false
            collection: @
            reRendered: true
            eventList: null
            _idx: index
            _len: @collection.length

        @modelOpt ?= {}
        if @itemContext
            d = @itemContext(_.clone(item.attributes), index)
            if d.attrs
                @modelOpt.attributes = d.attrs
                if d.attrs.href
                    @modelOpt.tagName = 'a'
            @modelOpt.tmpl ?= 'mediaItem'
            @modelOpt.className ?= 'list-group-item' #clearfix mediaItem
            @modelOpt.context = d


        if @itemBtns
            opt.btns = @itemBtns

        new @itemView $.extend(true, opt, @modelOpt)

    addAll: ->
        @$('.noData').remove()
        @ctn.hide().removeClass('loadingData').empty()
        @dataFilter?()
        if @collection.length > 0 or (@data and @data.length)
            dss = @collection.models
            if @showCount
                dss = dss.slice 0, @showCount
            for it,i in dss
                @addOne it, i
            @afterAjax?()
        else if @noData
            @ctn.append @noData()
            @ctn.children().addClass('noData')
        @ctn.show()
        @pagination?()
        @afterAddAll?()

    setCriteria: ->
        opt =
            offset: @offset
            max: @max
        if @_attrs
            opt._attrs = @_attrs()

        $.extend opt, _.result(@, 'criteriaOpt')
        opt

    findData: util.getModel

    setBtns: ->
        return [] unless @meta
        ce = m._.btn
        e = @meta.btn || {}
        if @itemBtns and @itemBtns.length > 0
            for b in @itemBtns
                tt = b
                if _.isString(b) and it = (e[b] || ce[b])
                    tt = it(@data || {}, @entity)
                if tt and !tt.href
                    @eventList.push tt
        # handle collection event and btn
        @btns = _.result(@, 'btns') || [] #@meta?.tbAction
        res = []
        for b in @btns
            if _.isString b
                btn = e[b] || ce[b]
                it = btn(@data, @entity) if btn and @data
                if it
                    it.key = b
            else if b
                it = b
                b = it.key

            if it
                if !it.href and b
                    @eventList.push b
                res.push it
        _.compact res


$.extend cf.dm,
    collection: (p, entity, opt)->
        init =
            mode: _st.mode
            style: "#{_st.mode}-default"
            tagClass: 'list-group'
            foot: true
            cleanAll: true
            parent: p
            entity: entity
            modelOpt:
                className: 'list-group-item p-x-0'

        unless opt.modelOpt
            init.itemContext = (d)->
                d

        cf.dm.l 'collection', p, cf._packOpt(init, entity, 'list', opt)

