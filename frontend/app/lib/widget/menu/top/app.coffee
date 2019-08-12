require './style.sass'

module.exports = _exv 'topMenu', '_tag',
    dep: true
    className: 'nav navbar-nav pull-right'
    parent: '#topBar'
    tagName: 'ul'
    auto: false
    data: {}
    initMenu: [
        key: 'login'
        icon: 'log-in'
    ,
        key: 'reg'
        icon: 'user'
    ]
    events:
        'click li': (e)->
            util.setActive e
            @afterClick?()

    render:->
        @ctn.empty().append cf.rtp(require('./tmpl.jade'), @data)
        @initActive()

    afterLogout: ->
        @setMenu @initMenu

    afterLogin: ()->
        @setMenu [
            label: user.username
            avatar: true
            children: user._func.children
        ]

    init: ->
        if @dep
            @listenTo user, 'login', =>
                @afterLogin()
            @listenTo user, 'logout', =>
                @afterLogout()

            user.trigger(if user.isLogin() then 'login' else 'logout')

    initActive: ->
        @$("[href='#{location.hash}']").parent().addClass 'active'

    setMenu: (data)->
        @data.menus = data
        @render()
