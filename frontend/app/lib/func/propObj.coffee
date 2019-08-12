module.exports =
    _prop: 'refFile'
    _func: 'head'
#    _dv: {}

    _getModel:->
        if @form
            @form.model
        else
            @model

    _resetProp: (o) ->
        @_getModel().attributes[@_prop] = o

    _getProp: (prop = @_prop)->
        @_getModel().attributes[prop] || (@_getModel().attributes[prop] = @_dv || {})

    _getObj: (func = @_func, src = {})->
        obj = @_getProp()
        if func
            obj[func] || obj[func] = src
        else
            obj

    _setObj: (o, func)->
        if func
            @_getProp()[func] = o
        else
            @_resetProp o

    _swap: (n, m)->
        d = @_getObj()
        t = d[n]
        d[n] = d[m]
        d[m] = t


    _delItem: (id)->
        util.del id, @_getObj()

    _addArrayItem: (o, multi = true)->
        obj = @_getObj(null, [])
        if multi
            obj.push(o)
        else
            obj = [o]
        @_setObj obj, @_func

    _delArrayItem: (id, fuzzy = true)->
        if id.indexOf('?') > -1
            id = id.split('?')[0]
        @_getObj().remove(id,fuzzy)
        if id.indexOf('.') > -1
            util.del id.split('.')[0], @_getProp()

    _toStr:->
        util.ro(@_getObj())
#    setWtRes: (str)->
#        fm = @form.model
#        m = fm.get('_wtRes') || ''
#        m += '::' + str
#        fm.set '_wtRes', m
#
#    delWtRes: (str)->
#        fm = @form.model
#        m = fm.get('_wtRes')
#        if m and str
#            m.replace('::' + str, '')
#            fm.set '_wtRes', m