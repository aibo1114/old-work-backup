router = require('./userRouter').extend
    _exr: [
        require './func/webLogin'
    ]


uu = require './model/user'

require './terminal/h5'
require './terminal/h5_ft_login'

W.ctn = $('#main')

cf._uOpt = $.extend
    afterLogin: ->
        if @hasRole('admin')
            @logout()
            return
        new cf.view.sideMenu()
        W.ctn = '#main'
    check: ->
        true
, cf._uOpt

cf._rOpt = $.extend
    checkAuth: true
    logoutPath: util.navUrl('login')
, cf._rOpt

module.exports = ->
    cf._init?()
    W.user = new uu(cf._uData, cf._uOpt)
    new router cf._rOpt
    app.menu = new cf.view.topMenu(cf._topOpt)


