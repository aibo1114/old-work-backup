require './listEditor.less'

cf.view.listEditor = cf.view.collection.extend
    toFetch: false
    itemTmpl: require './listInput.jade'
    newData: ->
        ''
    ctnCls: '_so'
    events:
        'click .del': (e)->
            t = util.ct(e)
            t.closest('.' + @ctnCls).remove()
            index = @getIndex t
            @data.splice index, 1
            @setVal()
            @afterDel?()

        'click .add': 'add'

        'change input,select': (e)->
            t = util.ct(e)

            if @validInput and !@validInput(t)
                return

            if _.isString @newData()
                @data[@getIndex(t)] = t.val()
            else
                @data[@getIndex(t)][t.attr('name')] = t.val()
            @setVal()
            e.stopPropagation()

    init: ->
        if @val
            @data = @val
        unless @data.length
            @data = @dv
        if !@data or !@data.length
            @addAll()

    addLimit:->
        false

    add: (e)->
        return if @addLimit()
        n = @newData()
        @data.push n
        @addOne n
        util.ct(e).prev().find('input').focus()

    getIndex: (t)->
        t.closest('.' + @ctnCls).index()

    addOne: (d)->
        if _.isObject d
            nd = _.clone(d)
        else
            nd = val: d
        item = $ cf.rtp(@itemTmpl, nd)
        item.addClass @ctnCls
        @addBtn.before item
        @afterAddOne?(item, d)

    addAll: ->
        @data || @data = []
        @addBtn = $ tu.icon('plus add btn btn-primary')
        @$el.append @addBtn
        @addOne it for it in @data

    setVal: (v)->
        @form.model.set @name, @data

