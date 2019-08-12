lg = require '../widget/login'
loginTmpl = require './webLoginTmpl.jade'
module.exports =
    routes:
        '!/login': 'login'
        '!/reg(:/param)': 'reg'

    reg: (p)->
        @ctn.html cf.rtp loginTmpl,
            pic: 'reg.png'

        lg.regForm '#logReg',
            className: 'break'
            style: 'panel-primary'
            saveSuccess: ->
                cf.r 'login'
            callback: ->
                @ctn.append $('#loginPart').removeClass 'hidden'

    login: ->
        @ctn.html cf.rtp loginTmpl,
            pic: 'login.png'
            
        lg.loginForm '#logReg',
            cleanAll: true
            asterisk: false
            className: 'break'
            style: 'panel-primary'
            callback: ->
                @ctn.append $('#loginPart').removeClass 'hidden'

    _app:
        noAuthPage: ['login', 'reg']
        _mod_ctn: '#main'
        account: ->
            lg.changePsdForm 'air'
