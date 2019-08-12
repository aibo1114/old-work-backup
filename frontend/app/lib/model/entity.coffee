module.exports = cf.model.entity = Backbone.Model.extend
    validator: require './rules/validator'

    initialize: (data, opt)->
        if opt and !@_col
            $.extend @, opt

        @entity ?= 'common'
        @meta ?= m[@entity]

        @afterAjax && @listenTo(@, 'sync', @afterAjax)

        @_errors = []
        @init?()
        @

    addHandler: (type, str)->
        k = "#{type}Save"
        s = @get k
        if s
            if s.indexOf(str) is -1
                s += ',' + str
        else
            s = str
        @set k, s, silent: true

    update: (ob, cb)->
        @save ob,
            patch: true
        
    urlRoot: ->
        if @pEntity
            util.restUrl @pEntity, @entity
        else
            util.restUrl @entity

    saveAttr: (p, ps...)->
        if p
            if _.isArray(p)
                ps = p
            else if ps
                ps.push p
            else
                ps = [p]
            ob = {}
            for it in ps
                ob[it] = @get it
        else
            ob = @changedAttributes
        @save ob, patch: true

    parse: (res)->
        data = if res.entity and !res[cf.id]
            res.entity
        else if res.entities and res.entities.length
            res.entities[0]
        else
            res
        @meta?.handleData?(data)
        @view.data = data if @view
        data

    reset: (data)->
        @_errors.clear()
        if data
            @clear({silent: true})
            @id = data.id if data.id
            @version = data.version if data.version

    validate: (attrs, opt)->
        for k,v of attrs
            if msg = @validateItem k, v
                @unset k
                opt.key = k
                return msg
        null

    validateItem: (k, v)->
        m = if @view and @view.prop
            @view.prop.codeBy k
        else if @meta and @meta.prop
            @meta.prop.codeBy k
        return unless m
        if valid = m.valid
            for it,o of valid
                if @validator[it] and @validator[it](v, o)
#                    msg = ii "valid.#{it}", ii(k)
                    msg = ii "valid.#{it}", o
                    @trigger 'invalid', msg, m
                    @_errors.addUniq k
                    return msg
            @trigger 'valid', m
        @_errors.remove k
        return null