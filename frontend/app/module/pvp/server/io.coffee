io = require('socket.io').listen(server)
#rg = require './grpc/rg_server'
rg = require './grpc/rg_client'
ip = require('ip');

apiMap =
    AccountInfo: 0x00010001
    AccountUserCookieRequest: 0x00010002

    GameGetInfo: 0x00030001
    GameGetList: 0x00030002
    GameOnline: 0x00030003
    GameOffline: 0x00030004
    GameRoundCreate: 0x00030005
    GameRoundData: 0x00030006
    GameRoundProgress: 0x00030007
    GameRoundStart: 0x00030008
    GameRoundStop: 0x00030009

    RoomGameReady: 0x00040001
    RoomGameCancelReady: 0x00040002
    RoomGameStart: 0x00040003
    RoomGameOver: 0x00040004
    RoomGameUpdate: 0x00040005
    RoomKickOut: 0x00040006
    RoomCreate: 0x00040007
    RoomUpdate: 0x00040008
    RoomEnter: 0x00040009
    RoomLeavel: 0x00040010
    RoomGet: 0x00040011
    RoomOnline: 0x00040012
    RoomOffline: 0x00040013
    RoomGetList: 0x00040014
    RoomGetPlayerList: 0x00040015
    RoomMsg: 0x00040016
    RoomMyRoom: 0x00040017

    StatusOnLine: 0x00050001
    StatusOffLine: 0x00050002
    StatusIsLine: 0x00050003
    StatusGetCID: 0x00050004

io.sockets.on 'connection', (st) ->
    log 'start'

    st.on 'event', (d) ->

    st.on 'login', (d)->
        log d
        st.cid = ip.address()
        rg.exec apiMap.AccountUserCookieRequest, sid:d.sid, (e,res)->
            log arguments
            if res.ret is 1
                log 'after login'
                log res
                rdata = JSON.parse(res.data)
                log rdata.uid
                rg.exec apiMap.StatusOnLine,
                    uid: rdata.uid
                    cid: st.cid
                , (e, res)->
                    if res.ret isnt 1
                        log arguments
                        log '用户状态链接失败'
                st.uid = rdata.uid
                st.emit 'login', rdata
            else
                st.emit 'loginError'


#        rg.exec apiMap.AccountInfo, uid: d.uid, (e, res)->
#            log arguments
#            st.uid = d.uid
#            st.emit 'login', res.data

#    st.on 'logoutChat', ->
#        log 'logout chat'
#        st.leave st.rid
#        rg.exec apiMap.RoomLeavel, d, (e, res)->


#    st.on 'loginChat', (d) ->
#        log 'chat login'
#        st.join d.roomId
#        st.roomId = d.roomId
#        rg.exec apiMap.RoomEnter, d, (e, res)->
#
#        st.emit 'loginChat', msg: "欢迎#{st.name}进入#{d.roomName}房间"
    #        st.broadcast.to(d.roomId).emit('chatUpdate', "欢迎#{st.username}进入#{d.roomName}房间");

    st.on 'myRoom', (d)->
#        RoomMyRoom

    st.on 'chatting', (d)->
        log 'chatting...'
        log d
        sendChatMsg st, d.msg

    st.on 'hotRooms', (d)->
        log 'hot rooms'
        rg.exec apiMap.RoomGetList, d, (e, res)->
            log arguments
            st.emit 'hotRooms', res.data

    st.on 'getRoomInfo', (d)->
        rg.exec apiMap.RoomGet, d, (e, res)->
            log 'getRoomInfo'
            log res.data
            st.emit 'getRoomInfo', res.data

    st.on 'enterRoom', (d)->
        st.join d.rid
        st.rid = d.rid
        st.nick = d.nick
        rg.exec apiMap.RoomEnter, {uid:d.uid,rid:d.rid}, (e, res)->
            log 'has entered Room'
            log arguments
            st.emit 'enterRoom', {}
            sendChatMsg st, "欢迎 <strong>#{d.nick}</strong> 进入房间"

    st.on 'createRoom', (d)->
        log 'createRoom'
        log d
        rg.exec apiMap.RoomCreate, d, (e,res)->
            log arguments
            st.emit 'createRoom', res.data

    st.on 'roomPlayerList', (d)->
        sendUserList st, d

    st.on 'setReady', (d)->
        type = util.del 'type', d
        action = if type is 'ready'
            'RoomGameReady'
        else
            'RoomGameCancelReady'
        rg.exec apiMap[action], d, (e, res)->
            sendUserList(st)

    st.on 'startGame', ->
            d = {}
#        rg.exec apiMap.RoomGameStart, d, (e, res)->
#            log 'RoomGameStart'
#            log arguments
            io.sockets.in(st.rid).emit 'startGame', d

    st.on 'selectGame', (d)->
        rg.exec apiMap.GameGetList, d, (e, res)->
            st.emit 'selectGame', res.data

    st.on 'pickGame', (d)->
        log d
        rg.exec apiMap.RoomGameUpdate, d, (e,res)->
            log arguments
            st.emit 'pickGame', res.data

    st.on 'kickUser',(d)->
        rg.exec apiMap.RoomKickOut, d, (e,res)->
#            sendUserList(st)
            sendChatMsg(st,"用户 #{} 已经被移除房间")
            io.sockets.in(st.rid).emit 'kickUser', uid: d.uid

    st.on 'gmStart',(d)->
        log 'gmStart'
        rg.exec apiMap.GameRoundStart, d, (e,res)->
            log 'end gmStart'

    st.on 'gmEnd',(d)->
        rg.exec apiMap.GameRoundStop, d, (e,res)->
            log 'gmEnd'

    st.on 'gmProc',(d)->
        log d
        rg.exec apiMap.GameRoundProgress, d, (e,res)->
            log 'gmProc'

    st.on 'disconnect', ->
        log 'disconnect'
        log st.uid
        log st.cid

        rg.exec apiMap.StatusOffLine,
            uid: st.uid
        , (e, res)->
            log 'return disconnect'
            log arguments
            if res.ret isnt 1
                popMsg '用户注销失败', 'warning'
            else
                st.leave st.rid
                rg.exec apiMap.RoomLeavel, {rid:st.rid,uid: st.uid}, (e, res)->
                    log 'leave room'
                sendUserList(st)
                sendChatMsg "<strong>#{st.nick}</strong> 离开了房间"
                rg.exec apiMap.RoomGet, rid:st.rid, (e, res)->
                    log 'getRoomInfo'
                    log res.data
                    st.emit 'getRoomInfo', res.data
        log 'end'

    st.on 'hotRoom', ->
        st.emit 'hotRoom'

    st.on 'topSlide', ->
        st.emit 'topSlide'

    st.on '*', ->
        log '******'
        log arguments

sendChatMsg =(st,msg)->
    io.sockets.in(st.rid).emit 'chatting', msg: msg

sendUserList =(st,d)->
    d ?=
        rid: st.rid
        offset: '0'
        max: '10'
    rg.exec apiMap.RoomGetPlayerList, d, (e, res)->
        log 'RoomGetPlayerList'
        io.sockets.in(st.rid).emit 'roomPlayerList', res.data
#

#    st.on 'game:read', (d, c)->
#        log 'gam...'
#        d.tid = 1
#        rg.exec apiMap.GameGetList, d, (e, res)->
#            c null, res.data
    #            rg.action 'LineOn', op, (e, res)->
    #                c null, entities: [
    #                    _e: 'post'
    #                    title: 'zzz'
    #                    username: 'zz'
    #                ,
    #                    _e: 'post'
    #                    title: 'zbbbb'
    #                    username: 'zz'
    #                ,
    #                    _e: 'post'
    #                    title: 'zzzb'
    #                    username: 'zz'
    #                ]
    #                rg.find d._e, d.p, d.q, (rt, cb)->
    #                    log cb
    #                    st.emit 'r:read:rt',
    #                        entities: [
    #                            title: 'zzz'
    #                        ,
    #                            title: 'zbbbb'
    #                        ]
    #                        max: 20
#
#    st.on 'r:read', (d)->
#        log 'reawd'
#    st.on 'r:delete', (d)->
#        st.emit 'news', hell: 'o'
