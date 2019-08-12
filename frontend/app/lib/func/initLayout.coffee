module.exports = (key, cols, rData)->
    if !$('#side').length || !$("#side .#{key}Side").length
        @ctn.attr('class', "row #{key}").show()
        n = cols.split('-')
        @ctn.html util.layout
            side: "col-md-#{n[0]}"
            main: "col-md-#{n[1]}"

        @_mod_ctn = '#main'

        if rData
            res = rData()
            if _.isObject res
                dd = cn = []
                for it in res.data
                    if it.key and it.key.startsWith('_')
                        ti =
                            key: it.key.substr(1)
                            data: []
                        cn = ti.data
                        dd.push ti
                    else
                        it.href ?= util.navUrl key, it.key
                        cn.push it
                @dm.tag '#side',
                    className: "navbar-collapse collapse row #{key}Side"
                    mode: 'panel'
                    data: dd
                    tmpl: 'dataNavItem'
                    modeContext: ->
                        head: true
                        tagClass: 'list-group'
                        title: res.title
                        style: 'panel-default'

                $("[href*='#{util.atHash(3) || util.atHash(2)}']", '#side').first().addClass app.active
                @ctn.on 'click', 'a', util.setActive
            if cf.mob
                $('.navbar-header .sideMB').remove()
                $('.navbar-header').prepend cf.rtp 'mobBtn',
                    icon: 'th-list'
                    attrs:
                        class: 'pull-right icon sideMB'
                        href: '#side>div'
                        'data-toggle':'collapse'

                $('#side>div').find('a').click ->
                    $('.navbar-header .sideMB').trigger('click')

            else
                s = $('#side')
                m = $('#main')
                s.find('.panel-title').prepend util.icon('chevron-left pull-right btn btn-primary btn-xs closeSide')
                s.on 'click', '.closeSide', =>
                    s.hide()
                    cols = m.attr('class')
                    m.attr 'class', 'col-md-12'
                    t = $(util.icon('chevron-right btn btn-primary btn-xs openSide'))
                    t.click ->
                        m.attr 'class', cols
                        s.show()
                        t.remove()
                    $('#content').append t

        if cf.mob and location.hash.split('/').length < 3
            $('#header button.pull-right').trigger 'click'
            
        app._site = $('#side')