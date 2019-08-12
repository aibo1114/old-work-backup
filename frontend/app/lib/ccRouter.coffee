router = require('../module/console/app/lib/consoleRouter').extend
    loadMod: ->
        require '../module/console/app/mods/data'
        cf.exLabel()
    checkFail: ->
        cf.r 'login'

uu = require './model/user'

require './terminal/h5'
require './terminal/h5_ft_login'
require './terminal/h5_mgm'

W.ctn = $('#main')

cf._uOpt = $.extend
    logoutUrl: util.actUrl 'logout'
    permission: ['console']
    roles: [
        title: 'admin'
    ]
    check: ->
        true
, cf._uOpt

cf._rOpt = $.extend
    logoutPath: 'login'
    checkAuth: false
, cf._rOpt

module.exports = ->
    cf._scf = true
    cf.view.form::btns = ['back', 'save']
    cf.view.table::noLastTime = true
    cf._init?()
    W.user = new uu(cf._uData, cf._uOpt)
    new router cf._rOpt


