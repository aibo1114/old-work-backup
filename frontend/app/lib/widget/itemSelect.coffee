cf.view.itemSelect = cf.view.collection.extend
    toFetch: false
    entity: 'cat'
    color: 'primary'
    stSync: true
    type: 'checkbox'
    events:
        'click input': (e)->
            d = @findData(e).toJSON()
            if @multi
                t = util.ct(e)
                t.toggleClass 'active'
            else
                util.setActive(e)
            @afterPick?(d, e)

    criteriaOpt: ->
        q:
            type: @type
            

    modelOpt: ->
        type = @type
        className: "btn btn-#{@color}-outline m-r-1 m-t-1"
        tagName: 'input'
        setContent: ->
            @$el.attr 'code', @data.code
            @$el.attr 'type', type
            @$el.append @data.title