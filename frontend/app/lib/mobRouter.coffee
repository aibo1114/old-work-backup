router = require('./userRouter').extend
    _exr: [
        require './func/mobLogin'
    ]
    wtAutoLogin: true
    checkAuth: true

uu = require './model/wechatUser'

require './terminal/mob'
require './mob'

W.ctn = $('#content')

cf._uOpt = $.extend
    afterLogin: ->
        return if cf.__lll is true
        if @hasRole('admin')
            @logout()
            return
        app.btmMenu = new cf.view.btmMenu()
        app.btmMenu.setMenu 'user', user.menu
        cf.__lll = true
    check: ->
        true
, cf._uOpt

cf._rOpt = $.extend
    checkAuth: true
    wtAutoLogin: true
    logoutPath: util.navUrl('login')
, cf._rOpt

module.exports = ->
    cf.view.form::btns = ['save']
    cf._init?()
    W.user = new uu(cf._uData, cf._uOpt)
    new router cf._rOpt
    $('#nav').append '<hr/>'
    app.menu = new cf.view.topMenu
        parent: '#nav'
        tagName: 'div'
        className: 'nav navbar-nav'
        css:
            'padding':'0 10px'
        afterLogin:->
            cf.view.topMenu::afterLogin.call @
            @$('.dropdown-menu').attr 'class', 'nav navbar-nav'

#    nn = $('#nav')
#    nn.append '<hr/>'
#    iM = [
#        key: 'login'
#        icon: 'log-in'
#    ,
#        key: 'reg'
#        icon: 'user'
#    ]
#    nn.append tu.menuItem(it) for it in iM
#


