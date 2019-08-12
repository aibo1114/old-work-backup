cf.id = '_id'

router = require './router'

Backbone.Model::idAttribute = cf.id

module.exports = router.extend
    checkAuth: true
    wtAutoLogin: false

    dfPath: 'home'

    _mod_ctn: '#content'

    noAuthPath: ['login', 'reg']
    loginPath: 'login'
    logoutPath: 'login'

    initialize: (opt) ->
        @initMod()
        @init()
        if user
            if @checkAuth
                user.offlineCheck()
            else if @checkSvrAuth
                user.onlineCheck()
            else
                @start()
        else
            @start()

    checkFail: ->
        cf.r 'login'
        
#        for k, v of cf._appEvent
#            @on k, v
#
#    _tabMenu: (ctn, d)->
#        d.key ?= util.atHash(1)
#        if !ctn.find('.' + d.key).length
#            ctn.html cf.rtp (d.tmpl || 'tabMenu'), d
#        item = ctn.find("a[href='#{location.hash}']")
#        unless d.cur
#            item = item.parent()
#        item.siblings().removeClass('active')
#        item.addClass('active')
#        ctn.find('.mainBox')

#    tgBtmMenu: (tg)->
#        $('body')[if tg then 'addClass' else 'removeClass'] 'btmMenu'


