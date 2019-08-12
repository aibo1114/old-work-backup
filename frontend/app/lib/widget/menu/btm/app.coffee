require './style.sass'

module.exports = _exv 'btmMenu', '_tag',
    tmpl: require './tmpl.jade'
    dep: true
    parent: 'body'
    data: {}
    _one: true
    init: ->
        if @dep
            @listenTo user, 'login', (p = 'login', menu = user.menu)=>
                @setMenu p, menu
            @listenTo user, 'logout', =>
                @_close()

    setMenu: (code, data)->
        nc = @$el.children().attr 'code'
        if nc isnt code
            @data.menus = data
            @$el.children().attr 'code', code
            @render()
            @show()

    render:->
        cf.view._tag::render.call @
        @$("[href='#{location.hash}']").addClass 'active'

    events:
        'click .nav-item': (e)->
            t = util.ct(e)
            t.siblings().children().removeClass 'active'
            t.children().addClass 'active'
            @afterClick?()

    hide: (hasBtm = false)->
        @$el.hide()
        unless hasBtm
            cf.body.removeClass 'hasBtmMenu'

    show: ->
        @$el.show()
        cf.body.addClass 'hasBtmMenu'

