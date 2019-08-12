require './style/main.css'

cf.rsPre = cf.actPre = 'http://online28.wan.liebao.cn/onlineRest/'

$.extend cf,
    loadTmpl: (name) ->
        try
            require "./tmpl/#{name}.jade"
        catch
            require "../../console/tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"

    _init: ->
        Backbone.Model.setPost()
        cf.id = 'id'
        Backbone.Model::idAttribute = cf.id
        cf.community =
            name: '在线棋牌'
            resPath: '/'
        require "./meta/meta"

    _rOpt:
        dfPath: 'data'

    _uOpt:
        menu: [
            icon: 'hdd'
            key: 'data'
        ]

        entities: [
            key: 'channel'
            row: 10
        ,
            key: 'pay'
            row: 20
        ]

        isLogin: ->
            true

require("../../../lib/ccRouter")()

new cf.view.consoleMenu()

unless location.hash
    cf.r 'data'

##Model
#window.user = new u {},
#    logoutUrl: util.actUrl 'logout'
#    onlineCheck: ->
#        cf.noReply = true
#        $.get(app.checkSvrAuth).done((res)->
#            if res.ret is 1
#                user.auth if res.user then res.user else res
#            else
#                location.hash = util.navUrl app.logoutPath
#                app.start()
#        )
#    check: ->
#        true
#    afterLogin:->
#        new cf.view.consoleMenu
#            home:
#                key: 'terms'
#                icon: 'th'
#                label: '处罚条款'

#new router


