entity = require './entity'

cf.model.entities =  Backbone.Collection.extend

    initialize: (data, opt)->
        @criteria =
            offset:0
            max: 10
        @count = 0

        $.extend true, @, opt if opt

        @count = data.length if data

        @entity = 'common' unless @entity

        @meta ?= meta[@entity]||{prop:[]}

        @model = @getEntityType(@entityOpt)

        @listenTo(@, 'sync', @afterAjax) if @afterAjax

        @init?()

    getEntityType: (o = {})->
        opt = $.extend
            entity: @entity
            _col: true
        , o
        if @entityType
            @entityType.extend opt
        else
            entity.extend opt

    url: ->
       if @entityOpt
            @entityOpt.urlRoot
        else
            @meta.url || util.restUrl(@entity)

    parse: (res)->
        @data = res.entities || res
        if @meta.handleListData
            @data = @meta.handleListData(@data)
        if @meta.handleData
            for d,i in @data
                @data[i] = @meta.handleData(d)
        @view.data = @data if @view
        @count = res.count if res.count isnt null
        @data

    setCriteria: (k,v)->
        if _.isObject k
            $.extend (@criteria.q || @criteria.q = {}), k
        else
            @criteria[k] = v

    unsetCriteria: (k)->
        util.del k, @criteria

    resetFetch: (type, pNum, op)->
        @view.ctn.addClass 'loadingData'
        if type
            switch type
                when 'next'
                    @criteria.offset += @criteria.max
                when 'prev'
                    @criteria.offset -= @criteria.max
                when 'one'
                    @criteria.offset = pNum * @criteria.max
                when 'max'
                    @criteria.offset = 0
                    @criteria.max = pNum
        opt =
            data: @criteria
            reset: true

        if cf._jsonp
            opt.dataType = 'jsonp'

        @fetch $.extend opt, op

module.exports = cf.model.entities