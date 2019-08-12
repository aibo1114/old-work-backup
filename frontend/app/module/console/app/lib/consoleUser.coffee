module.exports = require('../../../../lib/model/user').extend
    setMeta: (cb)->
        $.get util.restUrl('meta'), (res)->
            for it in res.entities
                it._ = {}
                for k,i in it.prop
                    if k.type
                        if k.type.indexOf('_') > -1
                            [k.type,k.xtype] = k.type.split('_')
                            if k.type is 'x'
                                k.type = 'holder'
                    else
                        k.type = 'text'
                meta[it.code] = it
            cb()

    afterAuth: (cb)->
        if cf.fetchMeta
            @setMeta(cb)
        else
            cb()

    check: ->
        if @isLogin() and @hasRole('admin')
            return true
        false
        

#
#    renderLoginMenu: ->
#        $(@menuId).remove()
#        $('#header').append cf.rtp 'menu',
#            menus: @menu || []
#            navStyle: 'navbar-right'
#            ulStyle: 'nav navbar-nav col-xs-12'
#            func: @func()
#            id: @menuId.substr(1)
#
#        um = $(@menuId)
#        $("[href='#{location.hash}']", um).parent().addClass(_st.active)
#        um.find('li').click util.setActive
#
#        if cf.mob
#            tp = $('#ubb')
#            tp.attr 'class', 'collapse'
#
#            tp.find('.dropdown-menu').attr('class','nav navbar-nav').prev().hide()
#
#            if !$('.navbar-header button').length
#                $('.navbar-header').append cf.rtp 'mobBtn',
#                    icon: 'th'
#                    attrs:
#                        class:'pull-right icon mainMB'
#                        'data-toggle':'collapse'
#                        href: "#ubb"
#
#            tp.find('a').click (e)->
#                $('.navbar-header .mainMB').trigger 'click'
#
#    renderNormalMenu: ->
#        $(@menuId).remove()

