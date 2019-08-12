require './style/mob.css'
require '../../../lib/mob'

cf.loadTmpl = (name) ->
    require "./tmpl/#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################
router = require("../../../lib/userRouter")

cf.view.form::style='panel-primary'
require './meta/common'
require '../../../lib/widget/slide/app'

io = require 'socket.io'
W.st = io()
cf.onMap = {}
window.se = (path, opt)->
    log 'emit: ' + path
    log opt
    log 'end...'
    st.emit path, JSON.stringify opt

window.so = (path, cb)->
    if cf.onMap[path]
        return
    cf.onMap[path] = true
    st.on path, (d)->
        log 'listen: ' + path
        r = JSON.parse d
        if r.ret is '1'
            log r
            log 'end...'
            cb(r.data)
        else if r.ret is '50018'
            popMsg '游戏进行中,不能进入', 'warning'
        else
            log path+': 返回参数错误'
            log r
            log 'end...'
            popMsg '返回参数错误', 'danger'


W.ctn = $('#content')

so 'AccountInfo', (d)->
    user.data = d
    user.id = d.uid
    se 'RoomMyRoom'

so 'RoomLeavel',(d)->
    if d
        se 'RoomGetInfo', rid: d.rid

so 'RoomMyRoom',(d)->
    if d.entities
        user.room = d.entities[0]
    app.start()
    user.afterLogin()

socketUser = cf.model.entity.extend
    entity: 'user'
    entityAuth:->
        true
    auth: ->
        se 'AccountInfo'
    onlineCheck: ->
        @auth()
    check: ->
        true
    afterLogin: ->
        tmpl = cf.rtp 'menuItem',
            menus:[
                label: '首页'
                code: 'home'
                icon: tu.iconxx 'home'
                url: util.navUrl 'index'
#            ,
#                label: '好友'
#                icon: 'toolIcon_07.png'
            ,
                label: '房间'
                code: 'room'
                icon: tu.iconxx 'room'
                url: util.navUrl 'room'
#            ,
#                label: '我的'
#                code: 'user'
#                icon: 'toolIcon_09.png'
#                url: util.navUrl 'member/my'

            ]
        app.btmMenu = $(tmpl)
        app.btmMenu.on 'click','a',(e)->
            util.setActive(e)
        $('body').append app.btmMenu
        $('#content').css
            'padding-bottom': '90px'

window.user = new socketUser()

cf.playerList = (id) ->
    se 'RoomGetPlayerList',
        rid: id
        offset: '0'
        max: '10'

cf.leaveRoom = ->
    if user.roomInfo
        se 'RoomLeavel',
            rid: user.roomInfo.rid
            uid: user.id
        user.roomInfo = null
        app.room.clear silent: true

cf.addMyRoom = (ctn)->
    url = util.navUrl('room',user.room.rid)
    btn = $("<a href='#{url}' class='enterRoom'><i class='icon-enterRoom'></i></a>")
    ctn.append btn

cf.addRoomBtn = (ctn, icon='plus')->
    btn = $(tu.icon(icon, 'a', '', 'btn pull-right openAir'))
    btn.click ->
        data = {}
        title = if user.room
            data =
                name: user.room.rname
                mperson: user.room.mperson
                rintro: user.room.rintro
            '编辑房间信息'
        else
            '新建房间'

        app.dm.form 'air', 'room',
            toFetch: false
            title: title
            head: true
            closeBtn: true
            tagClass: 'modal-body'
            data: data
            prop: [
                m._text 'name',
                    label: '房间名称'

                m._text 'mperson',
                    label: '房间人数'
                    val: 6
            ,
                code: 'gid'
                xtype: 'collection'
                label: '请选择游戏'
                noCol: true
                attrs:
                    toFetch: false
                    mode: null
                    collection: app.hotGames
                    
                    events:
                        'click .pick':(e)->
                            @form.model.set 'gid', @findData(e).get('gid')
                    modelOpt:
                        tagName: 'a'
                        className: 'pick col-xs-3 text-center'
                        tmpl: 'gameItem'
            ,
                m._textarea 'rintro',
                    noLabel: true
                    val: '房间介绍~'
                    ph: '房间介绍'
            ]
            btns: [
                label: '立即创建'
                cls: 'btn btn-primary save'
            ]
            _save: (e)->
                v = @model.attributes
                if v.name
                    op =
                        uid: user.id
                        rname: v.name
                        gid: v.gid
                        mperson: v.mperson
                        rimg: user.data.avatar
                        rintro: v.rintro
                    action = if user.room
                        op.rid = user.roomInfo.rid
                        'RoomGameUpdate'
                    else
                        'RoomCreate'
                    se action, op
                    @closeDlg()
                else
                    popMsg '请输入方面名称', 'warning'
        cf._pickGame = 'create'
        se 'GameGetList',
            max: '10'
            offest: '0'
            tid: '1'

    ctn.append btn

cf.roomBtn = ->
    if user.room
        cf.addMyRoom $('.mobView>.panel>.panel-heading')
    else
        cf.addRoomBtn $('.panel-heading')

so 'GameGetList',(d)->
    if cf._pickGame is 'create'
        app.hotGames.reset d.entities
    else
        app.dm.collection 'air', 'game',
            toFetch: false
            title: '游 戏'
            count: d.count
            data: d.entities
            
            tagClass: 'modal-body clearfix'
            events:
                'click .pick':(e)->
                    d = @findData(e)
                    se 'RoomGameUpdate',
                        uid: user.id
                        gid: d.get 'gid'
                        rid: user.roomInfo.rid
                    @closeDlg()
            modelOpt:
                tagName: 'a'
                className: 'pick col-xs-3 text-center'
                tmpl: 'gameItem'

new router
    _exr: [
        require '../../../lib/func/mobLogin'
    ]
    dfPath: 'index'
    checkSvrAuth: true
    checkAuth: false
    wtAutoLogin: true


app.hotGames ?= new cf.model.entities()

st.on 'disconnect', ->
    alert '您的网络连接已经断开'
    popMsg '您的网络连接已经断开，请重新进入','warning'
    location.reload()

setInterval ->
    if cf.inCenter()
        se 'RoomGetList',
            offset: '0'
            max: '10'
, 5000

cf.inCenter = ->
    util.atHash(1) is 'room' and !util.atHash(2)
#
#cf.zzz = ->
#    log d = [
#        nick: 'afxx'
#        appr: 11
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ,
#        nick: 'bbbb'
#        appr: 12
#        avatar: ''
#    ]
#    app.dm.tb 'air', 'rank',
#        title: '本局排名'
#        noLastTime: true
#        itemBtns: []
#        toFetch: false
#        data: d
#        foot: true
#        cols: [
#            code: 'rank'
#            label: '排名'
#            w: '40px'
#            showText: ->
#                idx = arguments[3]._idx + 1
#                tu.iconx(idx,idx)
#        ,
#            code: 'avatar'
#            label: '头像'
#            showText: (d)->
#                "<img class='img-responsive' src='#{d}'/>"
#        ,
#            _ep 'nick',
#                label: '昵称'
#
#            _ep 'appr',
#                label: '分数'
#        ]
#        afterAddAll: ->
#            btn = $(tu.btn('返回游戏', null, 'primary', null, true))
#            btn.attr 'data-dismiss', 'modal'
#            @foot.show().append btn
#
#cf.zzz()

#tmpl = cf.rtp 'menuItem',
#    menus:[
#        label: '首页'
#        code: 'home'
#        icon: tu.iconxx 'home'
#        url: util.navUrl 'index'
##            ,
##                label: '好友'
##                icon: 'toolIcon_07.png'
#    ,
#        label: '房间'
#        code: 'room'
#        icon: tu.iconxx 'room'
#        url: util.navUrl 'room'
##            ,
##                label: '我的'
##                code: 'user'
##                icon: 'toolIcon_09.png'
##                url: util.navUrl 'member/my'
#
#    ]
#app.btmMenu = $(tmpl)
#app.btmMenu.on 'click','a',(e)->
#    util.setActive(e)
#$('body').append app.btmMenu
#$('#content').css
#    'padding-bottom': '90px'

#    rooms: ->
#        hotRooms = new entities()
#        @dm.portal @ctn,
#            title: '游戏竞技中心'
#            cleanAll: true
#            tagClass: 'main'
#            head: true
#            events:
#                'click .openAir': (e)->
#                    app.dm.form 'air', 'room',
#                        
#                        toFetch: false
#                        head: false
#                        prop: [
#                            m._text 'name',
#                                label: '房间名称'
#
#                            m._text 'mperson',
#                                label: '房间人数'
#                                val: 6
#
#                            m._textarea 'rintro',
#                                label: '房间描述'
#                                val: '快到碗里来~'
#                        ]
#                        btns: [
#                            label: '立即创建'
#                            cls: 'btn btn-primary save'
#                        ]
#                        _save:(e)->
#                            v = @model.attributes
#                            if v.name
#                                st.emit 'createRoom',
#                                    uid: user.id
#                                    rname: v.name
#                                    gid: '1'
#                                    mperson: v.mperson
#                                    rimg: user.data.avatar
#                                    rintro: v.rintro
#                                @closeDlg()
#                            else
#                                popMsg '请输入方面名称', 'warning'
#
#            plugins: ->
#                [
#                    type: 'collection'
#                    attrs:
#                        parent: '.main'
#                        title: '热门房间'
#                        cleanAll: false
#                        toFetch: false
#                        className: 'mobView panel-pvp room'
#                        collection: hotRooms
#                        modelOpt:
#                            tmpl: 'roomItem'
#                            className: 'item row'
#                            tagName: 'a'
##                ,
##                    type: 'collection'
##                    attrs:
##                        parent: '.main'
##                        title: '热门活动'
##                        toFetch: false
##                        cleanAll: false
##                        className: 'mobView panel-pvp activity'
##                        collection: actRooms
##                        modelOpt:
##                            tmpl: 'roomItem'
##                            className: 'item row'
##                            tagName: 'a'
#
#                ]
#            callback: ->
#                @head.append tu.icon('user', 'a', '', 'btn pull-left', util.navUrl('userInfo'))
#                @head.append tu.icon('plus', 'a', '', 'btn pull-right openAir')
#
#        st.emit 'hotRooms',
#            offset: '0'
#            max: '10'
#
#        st.on 'hotRooms', (d)->
#            hotRooms.add JSON.parse(d).entities
#
#    room: (id)->
#        chatList = new entities
#        roomPlayerList = new entities
#        room = new cf.model.entity
#        @dm.portal @ctn,
#            title: '24小时房间'
#            cleanAll: true
#            tagClass: 'main topView'
#            tmpl: 'topView'
#            events:
#                'click .startGame': (e)->
#                    log 'start game'
#                    st.emit 'startGame', msg: 'logout'
#
#                    loadGame 'http://www.baidu.com'
#
#                'click .goBack': (e)->
#                    st.emit 'logoutChat', msg: 'logout'
#
#                'click .sendMsg': (e)->
#                    t = @$('#msg')
#                    if m = t.val()
#                        st.emit 'chatting', msg: m
#                        t.val ''
#            plugins: ->
#                [
#                    type: 'model'
#                    attrs:
#                        mode: null
#                        parent: '.topView-body'
#                        className: 'mod-roomInfo'
#                        cleanAll: false
#                        tmpl: 'room'
#                        reRendered: true
#                        toFetch: false
#                        model: room
#                ,
#                    type: 'collection'
#                    attrs:
#                        mode: null
#                        parent: '.topView-ft'
#                        className: 'l-roomers row-pvp'
#                        tagName: 'ul'
#                        toFetch: false
#                        cleanAll: false
#                        collection: roomPlayerList
#                        modelOpt:
#                            tmpl: 'mateItem'
#                            className: 'li-roomers col-xs-3'
#                            tagName: 'li'
#                ,
#                    type: 'collection'
#                    attrs:
#                        mode: null
#                        parent: '.btnSend'
#                        tagName: 'ul'
#                        className: 'l-check'
#                        cleanAll: false
#                        toFetch: false
#                        collection: chatList
#                        modelOpt:
#                            tmpl: 'checkItem'
#                            className: 'li-check row'
#                            tagName: 'li'
#                ]
#
#        #        callback: ->
#        #            @head.append tu.icon('user', 'a', '', 'btn pull-left', util.navUrl('userInfo'))
#        #            @head.append tu.icon('plus', 'a', '', 'btn pull-right openAir')
##
##        st.emit 'enterRoom',
##            uid: user.id
#
#
#        st.emit 'room',
#            rid: id
#
#        st.on 'room', (d)->
#            d = JSON.parse d
#            room.set d
#            st.emit 'roomPlayerList',
#                rid: d.rid
#                offset: '0'
#                max: '10'
#
#            st.emit 'enterRoom',
#                rid: d.rid
#                rname: d.rname
#
#        st.on 'enterRoom', (d)->
#            chatList.add chatMsg("欢迎#{user.data.nick}进入房间")
#
#        st.on 'roomPlayerList', (d)->
#            roomPlayerList.add d.entities
#
#        st.on 'chatting', (d)->
#            log 'chatUpdate.....'
#            chatList.add chatMsg(d.msg)


#        @dm.tag '.main',
#            mode: 'blank'
#            className:''
#            cleanAll:false
#            head:false

#        @dm.model '.topView-body', 'room', null,
#            mode: 'blank'
#            className: ''
#            tagClass: 'mod-roomInfo row-pvp'
#            toFetch: false
#            cleanAll: false
#            head: false
#            tmpl: 'room'
#            data:
#                name: '我的名字'
#                poster: 'images/poster_03.png'
#                id: '99999'
#                type: '竞技'
#                ready: true
#
#
#
#        @dm.tag '.main',
#            mode: 'blank'
#            className: ''
#            tagClass: 'mod-exchange'
#            cleanAll: false
#            head: false
#            tmpl: 'btnCheck'
#


#        @dm.tag 'body',
#            mode:'blank'
#            className:'mod-send'
#            tagClass:'row'
#            cleanAll:false
#            head:false
#            tmpl:'btnSend'

#            data:
#                homeowner:
#                    poster:''
#                roomer:[
#                    poster:''
#                    ready:false
#                ,
#                    poster:''
#                    ready:false
#                ,
#                    poster:''
#                    ready:true
#                ,
#                    poster:''
#                    ready:true
#                ]


#            data:[
#                poster:'images/poster_03.png'
#                name:'小杰'
#                time:'15:36:42'
#                text:'大家好 我是小杰我是小杰'
#            ,
#                poster:'images/poster_03.png'
#                name:'小杰'
#                time:'15:36:42'
#                text:'大家好 我是小杰我是小杰'
#            ,
#                poster:'images/poster_03.png'
#                name:'小杰'
#                time:'15:36:42'
#                text:'大家好 我是小杰我是小杰'
#            ]
