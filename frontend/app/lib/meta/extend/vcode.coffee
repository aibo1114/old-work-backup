#module.exports = (name = 'vcode', url, opt)->
#    meta.common[name] =
#        isShow: ->
#            !user.isLogin()
#        type: "text"
#        id: 'verification'
#        readonly: true
#        valid:
#            required: true
#        exBtn: [
#            text: iim('m_get', ii('vcode'))
#            cls: 'getCode'
#        ]
#        events:
#            'click .getCode': (e)->
#                fm = @
#                t = @$('input[name="phone"]')
#                v = t.val().trim()
#                if t.parent().hasClass('has-error') or !v.length
#                    alert '请输入正确的电话号码'
#                    return
#                $.get util.actUrl('smsVerify'),
#                    phone: t.val()
#                    sTmpl: 'sendVcode'
#                , (res)->
#                    if res._vcode
#                        fm.model.set '_vcode', res._vcode
#                        fm.model.set 'beforeSave', 'verifyCode'
#                        fm.$('[name="vcode"]').removeAttr 'readonly'
#                        util.ct(e).text('短息已发送...').addClass('disabled')
#                        app.trigger 'getSmsCode', 'verification'
#                    else
#                        popMsg '获取验证码失败'

m._vcode = (code = 'vcode', opt = {})->
    url = opt.url || util.actUrl('smsVerify')
    $.extend true,
        code: code
        isShow: ->
            !user.isLogin()
        type: "text"
        id: 'verification'
        readonly: true
        valid:
            required: true
        exBtn: [
            text: iim('m_get', ii('vcode'))
            cls: 'getCode'
        ]
        events:
            'click .getCode': (e)->
                fm = @
                t = @$('input[name="phone"]')
                v = t.val().trim()
                if t.parent().hasClass('has-error') or !v.length
                    alert '请输入正确的电话号码'
                    return

                $.get url,
                    phone: t.val()
                    sTmpl: 'sendVcode'
                , (res)->
                    if res._vcode
                        fm.model.set '_vcode', res._vcode
                        fm.$('[name="vcode"]').removeAttr 'readonly'
                        util.ct(e).text('短息已发送...').removeClass('getCode').addClass('disabled')
                        cf.bbEvt.trigger 'newPsd', 'fpForm'
                    else if res._exsit
                        if fm._vcodeExist
                            fm._vcodeExist()
                        else
                            popMsg '本手机已注册,请更换手机号', 'warning'
                    else
                        popMsg '获取验证码失败'

    , opt

m.common.vcode = m._vcode()
