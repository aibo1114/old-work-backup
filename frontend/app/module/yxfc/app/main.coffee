require './style/main.css'

marked = require '../../../res/js/marked/lib/marked'
md5 = require '../../../res/js/md5'

cf.rsPre = cf.actPre = 'http://gmarketing.kisops.com/gmarketing/1/api/'

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
            name: '游戏分成数据'
            resPath: '/'
        require "./meta/meta"
        m.user.loginUrl = util.actUrl 'login'
        cf.view.table::noLastTime = true
        m.user.prop = [
            _ep 'username',
                code: 'name'
        ,
            code: 'pass'
            type: 'password'
            label: '密码'
            valid:
                required: true
            cvt: (v)->
                md5(v)
        ]

    _rOpt:
        checkSvrAuth: util.restUrl('logincheck')

        dfPath: 'terms'

        routes:
            '': 'index'
            '!/loading': 'loading'
            '!/login': 'login'
            '!/terms': 'terms'
            '!/*path': 'dAct'

        terms: ->
            $.get 'term.md',(res)=>
                if res
                    cf.loadJS cf.rPath+'js/'
                @ctn.empty().mk 'div',
                    class:'article container well'
                , marked(res)

    _uOpt:
        onlineCheck: ->
            cf.noReply = true
            $.get(app.checkSvrAuth).done((res)->
                if res.ret is 1
                    user.auth if res.user then res.user else res
                else
                    location.hash = util.navUrl app.logoutPath
                    app.start()
            )

        afterLogin:->
            new cf.view.consoleMenu
                home:
                    key: 'terms'
                    icon: 'th'
                    label: '处罚条款'

require("../../../lib/ccRouter")()


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


