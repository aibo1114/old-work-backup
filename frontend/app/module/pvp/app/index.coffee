#st.on 'hotRoom', ->
#    app.hotRooms.reset [
#        rname:'asdf'
#    ]

#st.on 'hotGame', ->
#    app.hotGames.reset [
#        rname:'asdf'
#    ]

#st.on 'topSlide', ->
#    app.topSlide = [
#        link: 'http://baidu.com'
#        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1561725530,1477683711&fm=58'
#    ,
#        link: 'http://baidu.com'
#        img: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1561725530,1477683711&fm=58'
#    ]
#
#    new cf.view.slide
#        parent: '.slide'
#        tmpl: 'headSlide'
#        data:
#            data:app.topSlide


app.hotRooms ?= new cf.model.entities()

so 'RoomGetHotList',(d)->
    app.hotRooms.reset d.entities

app.enhance
    routes:
        '!/index': 'index'

    index: ->
        app.btmMenu.show()
        se 'RoomGetHotList',
            offset: '0'
            max: '5'

        @dm.portal @ctn,
            cleanAll: true
            tagClass: ' '
            head: true
            title: '游戏竞技中心'
            tmpl: 'layout'
            callback: cf.roomBtn
            plugins:->
                [
#                    type: 'slide'
#                    attrs:
#                        tmpl: 'headSlide'
#                        parent: '.slide'
#                        data:
#                            data:[
#                                img: 'images/slide.jpg'
#                            ]
#                ,
                    type: 'collection'
                    attrs:
                        mode: 'panel'
                        head: true
                        title: '热门房间'
                        el: '.hotRoom'
                        style: 'panel-pvp room'
                        tagClass: 'panel-body row'
                        className: 'roomItem'
                        cleanAll: false
                        toFetch: false
                        collection: app.hotRooms
                        modelOpt:
                            tmpl: 'roomItem'
                            className: 'item row'
                            tagName: 'a'
#                ,
#                    type: 'collection'
#                    attrs:
#                        parent: '.game'
#                        className: 'gameList'
#                        cleanAll: false
#                        toFetch: false
#                        collection: app.hotGames
#                        modelOpt:
#                            tmpl: 'roomItem'
#                            className: 'item row'
#                            tagName: 'a'
                ]





#                @head.append tu.icon('user', 'a', '', 'btn pull-left', util.navUrl('userInfo'))
#
#        for it in cfg.mod
#            continue if !it.tmpl and !it.url
#            if it.url
#                do(it)->
#                    $.ajax
#                        method: 'get'
#                        url: it.url
#                        dataType: 'jsonp'
#                        xhrFields:
#                            withCredentials: true
#                        success: (res)->
#                            if it.title
#                                ctn = $(".#{it.cls} .panel-body")
#                            else
#                                ctn = $(".#{it.cls}")
#                            es = res.entities
#                            if es.length is 0
#                                $(".#{it.cls}").remove()
#                            else
#                                if it.view is 'slide'
#                                    if it.handleData
#                                        d = it.handleData(es)
#                                    else
#                                        d = es
#                                    opt = $.extend
#                                        parent: ctn
#                                        tmpl: it.tmpl
#                                        data:
#                                            data: d
#                                        slideOpt: it.slideOpt
#                                    , it.viewOpt
#                                    new cf.view.slide(opt).render()
#
#                                else if it.tmpl
#                                    for tt,i in es
#                                        tt.i = i
#                                        ctn.append cf.rtp it.tmpl, tt
#                            util.loadPic(".#{it.cls}")
#
#            else if it.data
#                ctn = $(".#{it.cls} .panel-body")
#                for e in it.data
#                    ctn.append cf.rtp it.tmpl, e
#                util.loadPic(".#{it.cls}")
#
#
#        @dm.collection @ctn.find('section'), 'game',
#            toFetch: false
#            title: '更多游戏'
#            tagClass: 'panel-body rank no'
#            style: 'panel'
#            cleanAll: false
#            className: 'moreGameList'
#            cache: false
#            max: 10
#            modelOpt:
#                tmpl: 'slat'
#            jsonp: true
#
#
#        $('.mobView').on 'click', '.rank small, .favor small', ->
#            util.sTop('.moreGameList')
#
#        _.delay ->
#            $('.mobView').removeClass('hidden')
#        , 600