module.exports = _exv 'sideMenu', '_tag',
    tmpl: require './tmpl.jade'
    parent: '#content'
    cleanAll: true
    data: {}
    render: ->
        @$("[href='#{location.hash}']").parent().addClass 'active'

    init: ->
        @listenTo user, 'logout', =>
            @_close()
            
    events:
        'click li': (e)->
            util.setActive e
            @afterClick?()

#    callback:->
#        @$(".nav-item:eq(#{@idx})").first().trigger 'click'

#    preRender:->
#        $(@mainMenu).append cf.rtp 'menu',
#            menus: @menu || cf._defLoginMenu || []
#            navStyle: ''
#            func: @func()

#        cf.tp.layout = require ''
#
#module.exports = require('./exUser').extend
#    mainMenu: '#side .uMenu'
#    afterUserLogin: ->
#        unless app.ctn.find('#main').length
#            app.ctn.html cf.rtp 'layout', {}, true
#
#        $(@mainMenu).append cf.rtp 'menu',
#            menus: @menu || cf._defLoginMenu || []
#            navStyle: ''
#            ulStyle: 'nav nav-pills nav-stacked'
#            func: @func()
#            id: @menuId.substr(1)
#
#        um = $("#userMenu")
#
#        $("[href='#{location.hash}']", um).parent().addClass(_st.active)
#        um.find('li').click util.setActive
#        @afterWebUserLogin?()
