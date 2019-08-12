chatMsg = (d)->
    d.time = new Date().pattern()
    d

loadGame = (url, cb)->
    fr = util.getIFrame('gmFrame', url, '100%', '100%')
    $('body').append fr
    app.btmMenu.hide()
    fr[0].onload = cb

entities = cf.model.entities
entity = cf.model.entity

app.roomList ?= new entities
app.room ?= new entity
app.chatList ?= new entities
app.roomPlayerList ?= new entities

app.enhance
    routes:
        '!/room': 'rooms'
        '!/room/:id': 'room'

    rooms: ->
        cf.leaveRoom()
        app.btmMenu.show()
        @dm.portal @ctn,
            title: '房间列表'
            cleanAll: true
            tagClass: 'main'
            head: true
            events:
                'click .cqa': ->
                    app.dm.tag 'air',
                        title: '常见问题'
                        closeBtn: true
                        tmpl: 'cqa'
                        tagClass: 'modal-body'
                        modalCls: 'infoCls'


                'click .agreement': ->
                    app.dm.tag 'air',
                        title: '猎豹H5竞技平台服务协议'
                        tmpl: 'agreement'
                        modalCls: 'infoCls'
                        tagClass: 'modal-body'

                        foot: true
                        callback: ->
                            btn = $ tu.btn('确认', 'closeDlg', 'primary')
                            btn.attr 'data-dismiss', 'modal'
                            $('.modal-footer').append btn

            plugins: ->
                [
                    tmpl: 'roomTopBtn'
                    parent: '.main'
                    cleanAll: true
                ,
                    type: 'collection'
                    attrs:
                        parent: '.main'
                        cleanAll: false
                        toFetch: false
                        className: 'mobView panel-pvp room'
                        collection: app.roomList
                        modelOpt:
                            tmpl: 'roomItem'
                            className: 'item row'
                            tagName: 'a'
#                ,
#                    type: 'collection'
#                    attrs:
#                        parent: '.main'
#                        title: '热门活动'
#                        toFetch: false
#                        cleanAll: false
#                        className: 'mobView panel-pvp activity'
#                        collection: actRooms
#                        modelOpt:
#                            tmpl: 'roomItem'
#                            className: 'item row'
#                            tagName: 'a'

                ]
            callback: cf.roomBtn

        se 'RoomGetList',
            offset: '0'
            max: '10'

    room: (id)->
        app.btmMenu.hide()
        se 'RoomEnter',
            rid: id
            uid: user.id

        @dm.portal @ctn,
            cleanAll: true
            title: '房间'
            tagClass: 'main'
            tmpl: 'topView'
            events:
                'click .readyToStared .ready': (e)->
                    se 'RoomGameReady',
                        uid: user.id
                        rid: id
                        type: 'ready'
                    t = util.ct(e).parent()
                    t.removeClass 'readyToStared'
                    t.addClass 'unreadyToStared'

                'click .unreadyToStared .unready': (e)->
                    se 'RoomGameCancelReady',
                        uid: user.id
                        rid: id
                        type: 'unready'
                    t = util.ct(e).parent()
                    t.removeClass 'unreadyToStared'
                    t.addClass 'readyToStared'

                'click .setting': (e)->
                    cf._pickGame = 'change'
                    se 'GameGetList',
                        max: '10'
                        offest: '0'
                        tid: '1'

                'click .leaveRoom': (e)->
                    cf.leaveRoom()

                'click .startGame': (e)->
                    se 'RoomGameStart',
                        rid: id
                        uid: user.id

                'click .sendMsg': (e)->
                    t = @$('#msg')
                    if m = t.val()
                        se 'RoomMsg',
                            uid: user.id
                            rid: id
                            mtype: '1'
                            msg: m
                        t.val ''
            plugins: ->
                [
                    type: 'model'
                    attrs:
                        mode: null
                        parent: '.topView-body'
                        className: 'mod-roomInfo'
                        cleanAll: false
                        tmpl: 'room'
                        reRendered: true
                        toFetch: false
                        model: app.room
                        events:
                            'click .kickOut': (e)->
                                if user.roomInfo.host
                                    d = @model
                                    se 'RoomKickOut',
                                        uid: d.get('user').uid
                                        rid: id
                                        cid: user.id
                ,
                    type: 'collection'
                    attrs:
                        mode: null
                        parent: '.topView-ft'
                        className: 'l-roomers row-pvp'
                        tagName: 'ul'
                        toFetch: false
                        cleanAll: false
                        collection: app.roomPlayerList
                        modelOpt:
                            tmpl: 'mateItem'
                            className: 'li-roomers col-xs-3'
                            tagName: 'li'
                        events:
                            'click .li-roomers': (e)->
                                util.setActive(e)
                                if user.roomInfo and user.roomInfo.host
                                    d = @findData(e).toJSON()
                                    dd =
                                        status: d.status
                                        user: _.pick d, 'nick','avatar', 'uid'
                                    if d.uid is user.id
                                        dd.host = true
                                        dd.picked = false
                                    else
                                        dd.picked = true
                                    app.room.set dd

                ,
                    type: 'collection'
                    attrs:
                        mode: null
                        parent: '.btnSend'
                        tagName: 'ul'
                        className: 'l-check'
                        cleanAll: false
                        toFetch: false
                        collection: app.chatList
                        modelOpt:
                            tmpl: 'checkItem'
                            className: 'li-check row'
                            tagName: 'li'
                ]


so 'RoomGetList', (d)->
    app.roomList.reset d.entities

so 'RoomEnter', (d)->
    id = util.atHash(2)
    app.chatList.reset()
    se 'RoomGetInfo', rid: id

so 'RoomGetPlayerList', (d)->
    if util.atHash(2)
        ents = d.entities
        app.roomPlayerList.reset ents
        btn = $('.startGame')
        btn.addClass 'disabled'
        if ents and ents.length > 1
            for it in ents
                if it.status is '0'
                    return
            btn.removeClass 'disabled'
#--------------

so 'RoomGameReady', ->
    cf.playerList(user.roomInfo.rid)
so 'RoomGameCancelReady', ->
    cf.playerList(user.roomInfo.rid)

#--------------
so 'RoomKickOut', (d)->
    return unless d
    if d.uid is user.id
        popMsg '您已经被房主移除房间', 'warning'
        cf.r 'room'
    else
        rp = app.roomPlayerList
        rp.findWhere('uid': d.uid)?.destroy()
        if user.id is d.fuid
            rp.view.$el.children().first().trigger('click')
            popMsg '移除成功'

so 'RoomMsg', (d)->
    if d
        app.chatList.add chatMsg d

so 'RoomGetInfo', (d)->
    if util.atHash(1) is 'room' and util.atHash(2)
        $('.panel-title strong').text d.rname
        if user.id is d.hostuid
            d.host = true
            unless $('.setting').length
                $('.panel-heading').append tu.icon('cog', 'a', '', 'btn pull-right setting')
        d.user = user.data
        user.roomInfo = d
        app.room.set d
        cf.playerList(d.rid)

countDown = (sec)->
    if sec is 0
        if cf._cd
            cf._cd.remove()
            cf._cd = null
        return
    if cf._cd
        cf._cd.text(sec)
        cf._cd.addClass 'secMon'
    else
        cd = $('<div class="countDown"></div>')
        $('body').append cd
        cf._cd = cd
        cf._cd.text(sec)
        cf._cd.addClass 'secMon'

so 'RoomGameStart', (d)->
    countDown(3)
    r = user.roomInfo
    sc = 0
    cf._si = setInterval ->
        sc++
        switch sc
            when 1
                countDown(2)
            when 2
                countDown(1)
            when 3
                countDown(0)
                [pr,dm] = r.game.url.split('://')
                dm = dm.split('/')[0]
                clearInterval(cf._si)
                loadGame r.game.url, ->
                    opt =
                        uid: user.id
                        rid: r.rid
                    window.frames[0].postMessage opt, "#{pr}://#{dm}"
                    se 'GameRoundStart',
                        uid: user.id

    , 1000


so 'RoomGameOver', (d)->
    se 'RoomGetInfo', rid: user.roomInfo.rid
    app.dm.tb 'air', 'common',
        title: '本局排名'
        noLastTime: true
        itemBtns: []
        toFetch: false
        data: d.entities
        foot: true
        cols: [
            code: 'rank'
            label: '排名'
            w: '40px'
            showText: ->
                idx = arguments[3]._idx + 1
                tu.iconx(idx, idx)
        ,
            code: 'avatar'
            label: '头像'
            showText: (d)->
                "<img class='img-responsive' src='#{d}'/>"
        ,
            _ep 'nick',
                label: '昵称'

            _ep 'appr',
                label: '分数'
        ]
        afterAddAll: ->
            btn = $(tu.btn('返回游戏', null, 'primary', null, true))
            btn.attr 'data-dismiss', 'modal'
            @foot.show().append btn

so 'GameRoundTimeout', (d)->
    opt =
        timeout: true
    window.frames[0].postMessage opt, "#{pr}://#{dm}"

so 'RoomCreate', (d)->
    popMsg '房间创建成功'
    cf.r 'room/' + d.rid

window.addEventListener 'message', (e)->
    res = e.data.opt
    if e.data.type in ['GameRoundStop', 'GameRoundProgress']
        res =
            uid: user.id
            appr: e.data.opt

    se e.data.type, res

    if e.data.type is 'GameRoundStop'
        clearInterval(cf._si)
        cf._si = null
        $('#gmFrame').remove()
, false


#so 'GameGetList', (d)->
#        unless $('.setting').length
#            $('.panel-heading').append tu.icon('cog', 'a', '', 'btn pull-right setting')
