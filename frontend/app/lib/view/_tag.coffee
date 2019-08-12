module.exports = _exv '_tag', Backbone.View,
    parent: '#main'
    auto: true
    data: {}
    cleanAll: false

    initialize: (opt) ->
        $.extend @, opt if opt
        @ctn = @$el
        @css && @ctn.css @css
        
        @init?()
        !@_one and @layout()
        @render() if @auto
        @mount()
        
        @afterMount?()

        util.loadPic @ctn
        @$el.data '_item', @
        @$el.attr 'data-cid', @cid

    isShow: ->
        @$el.is(':visible')

    hide: ->
        @$el.hide()

    show: ->
        @$el.show()

    context: ->
        d = _.result(@, 'data')
        d.ctx = @
        d

    setContext: (ob)->
        $.extend true, @context, ob
        @layout(true)

    setData: (ob)->
        $.extend true, @data, ob
        @render()

    empty: ->
        @ctn.empty()
        
    layout: (clean)->
        clean and @$el.empty()
        if @tmpl
            @context = _.result(@, 'context')
            @ctn.html cf.rtp(@tmpl, @context)
        @setContent?()

    mount: (clean)->
        if @cleanAll or clean
            $(@parent).empty()
        @css && @$el.css @css
        $(@parent).append @ctn

    render: ->
        @_one and @layout()
        @