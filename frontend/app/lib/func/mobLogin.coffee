cf._lg = lg = require '../widget/login'

module.exports =
    routes:
        '!/login': 'login'
        '!/reg(:/param)': 'reg'

    reg: ->
        lg.regForm app.ctn,
            parent: @ctn
            noTopAdd: true

    login: ->
        lg.loginForm app.ctn,
            asterisk: false
            noTopAdd: true

    _app:
        account: ->
            lg.changePsdForm 'air'
            
        setting: ->
            lg.settingForm
                title: iic('cfg')
                entity: 'user'
                btns: ['save']

#        reLogin: ()->
#            user.reAuth = true
#            lg.loginForm
#                id: 'rLogin'
#                data: ->
#                    username: user.username
#                shown: (event, ui) ->
#                    @$el.find('.save').addClass('btn btn-primary fl')
#                    $(ui).find("form input[name=username]").val(user.username).attr "readonly", "readonly"
#                    $(ui).find("form input[name=psd]").select()