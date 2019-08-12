$.extend module.exports,
    topBar: '#topbar'

    buildMenu:->
        menu = if @menu
            @menu
        else if @mgm and @mgm.menu
            @mgm.menu
        else
            []
        res = []
        if _.isArray menu
            for it in menu
                res.push
                    l: ii(it.key)
                    k: it.act
                    i: it.icon
                    href: it.href
        else
            for k, v of menu
                if _.isObject v
                    res.push
                        l: ii k
                        k: v.act
                        i: v.icon
                        r: v.row
                        href: v.href
                else
                    res.push
                        l: ii k
                        r: v
                        k: if v.toString().indexOf(':')>-1 then v.split(':')[1] else k
            res.sortBy('r', true)
        res

    renderMenu:->
        $('#topbar').remove()
        if user.isLogin()
            menu = @buildMenu()

            funcs = @funcs()

            opt = $.extend
                menus: menu
                navStyle: 'navbar-right'
                ulStyle: 'nav navbar-nav'
                funcs: funcs
            ,cf.tp.opt

            header = $('#header')
            header.append @menuTmpl opt
            header.on 'click', 'li', util.setActive
            $("[href*='#{util.atHash(1)}']", header).parent().addClass(_st.active)

        if cf.mob
            tp = $('#topbar')
            tp.addClass 'collapse'
            opt.ulStyle = 'nav'

            tp.find('.dropdown-menu').attr('class','nav navbar-nav').prev().hide()

            if $('.navbar-header button').length is 0
#                $('.navbar-header').append cf.rtp 'mobBtn',
#                    icon: 'arrow-left'
#                    attrs:
#                        class:'pull-left'
#                        onclick: 'history.go(-1)'

                $('.navbar-header').append cf.rtp 'mobBtn',
                    icon: 'th'
                    attrs:
                        class:'pull-right'
                        'data-toggle':'collapse'
                        href: "#topbar"

            tp.find('a').click (e)->
                $('.navbar-header .pull-right').trigger 'click'






