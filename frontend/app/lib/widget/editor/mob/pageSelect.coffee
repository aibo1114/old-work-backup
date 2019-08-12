module.exports = _exv 'pageSelect', '_tag',
    className: 'list-group'
    cleanAll: true
    auto: true
    events:
        'click a': '_pick'

    _pick:(e)->
        if @pick
            @pick(e)
        else
            m = @form.pView.model
            m.set @name, util.ct(e).attr('code')
            m.saveAttr @name
        cf.slider.slidePage()
        
    setContent: ->
        @ctn.empty()
        if _.isArray @data
            @addItem it for it in @data
        else
            @addItem k, v for k, v of @data

    addItem: (k, v = k)->
        @ctn.mk 'a',
            class: 'list-group-item p-x-1'
            code: k
        , v
