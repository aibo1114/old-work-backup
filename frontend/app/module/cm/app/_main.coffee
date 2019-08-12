#require './style/main.css'
#
#router = require('../../console/app/lib/consoleRouter')
#u = require('../../console/app/lib/consoleUser')
#lg = require '../../../lib/widget/login'
#
#cf.id = 'id'
#Backbone.Model::idAttribute = cf.id
#md5 = require '../../../res/js/md5'
#
#$.extend cf,
#    loadTmpl: (name) ->
#        try
#            require "./tmpl/#{name}.jade"
#        catch
#            require "../../console/tmpl/#{name}.jade"
#    loadLibTmpl: (name) ->
#        require "../../../lib/tmpl/#{name}.jade"

#    _mkErrMsg:(sign, res)->
#        popMsg res.Error, sign
#
#cf.actPre = cf.rsPre = 'http://trygame.kisops.com/trygame/'

cf.community =
    name: '试玩'
    resPath: '/'

require '../../../lib/meta/_status'
require '../../../lib/terminal/h5_mgm'
require "./meta/meta"

cf.view.form::btns=['back','save']
cf.view.table::noLastTime = true

window.user = new u {},
    logoutUrl: util.actUrl 'logout'
    check: ->
        true
    afterLogin:->
        new cf.view.consoleMenu()
    logout: ->
        if @isLogin()
            $.get(@logoutUrl || util.actUrl(cf.auth || "auth", "logout"))
            @trigger 'logout'
        @afterLogout?()
        @removeData()
    isLogin: ->
        true


new router
    checkSvrAuth: util.restUrl('check')
    checkAuth: false

    dfPath: 'data'
    logoutPath: 'login'

    loadMod:->
        require '../../console/app/mods/data'
        cf.exLabel()

    checkPage: (name)->
        true

    routes:
        '': 'index'
        '!/login': 'login'
        '!/*path': 'dAct'

    login: ->
        lg.loginForm @ctn,
            className: 'break'
            urlRoot: util.restUrl('login')
            prop:[
                _ep 'user:username',
                    code: 'account'
                _ep 'user:password',
                    cvt:(v)->
                        md5(v)
            ]
            saveSuccess: (model, resp) ->
                if resp.ret is 1
                    user.login resp.user
            setBtns: ->
                [
                    label: '登录'
                    cls: 'btn btn-primary btn-block btn-lg save'
                ]