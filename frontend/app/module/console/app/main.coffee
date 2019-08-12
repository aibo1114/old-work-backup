require './style/main.css'

router = require('./lib/consoleRouter')
cf.consoleUser = require('./lib/consoleUser')

$.extend cf,
    loadTmpl: (name) ->
        require "../tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"

require '../../../lib/meta/_status'
require '../../../lib/terminal/h5_mgm'

require './meta/community'
require './meta/common'
require './meta/prop'
require './meta/meta'

#jsSHA = require('../../../res/js/jsSHA/src/sha256')
#m.user.afterValidate = ->
#    W.jsha ?= new jsSHA('SHA-256','TEXT')
#    W.jsha.update @get('password')
#    r = W.jsha.getHash('B64')
#    @set '_en', true
#    @set 'password', r

cf.view.tag::closeBtn = true
cf.view.tag::modalSize = ' modal-lg'
cf.view.form::btns = ['back', 'save']

lp = if util.parseUrl()._code
    util.setCookie '_code', util.parseUrl()._code
    "#{cf.modPath}common.js"
else
    util.deleteCookie '_code'
    "#{cf.modPath}#{cf.code}.js"

cf.loadJS lp, ->
    window.user = new cf.consoleUser cf.userOpt
    new router cf.routerOpt
    cf.exLabel()
    new cf.view.consoleMenu
        initMenu:[]
        preLogin: ->
            @ctn.empty()
        parent: '#ubb'
        className: 'nav navbar-nav col-xs-12'
        home:
            icon: 'home'
            key: 'home'
        funcMenu: (ob)->
            ob.children.unshift
                func: 'app.cleanCache()'
                icon: 'erase'
                label: ii('cleanCache')
            if cf.bdst
                ob.children.unshift
                    func: "app.bdPush()"
                    icon: 'export'
                    label: ii('bdPush')
            ob