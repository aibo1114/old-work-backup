module.exports = (name = '_captcha', url = '/a/captcha')->
    $.extend cf.tp,
        captcha: require './captcha.jade'

    meta.common[name] =
        code: name
        type: "custom"
        label: ii('captcha')
        events:
            'click .changeCaptcha': (e)->
                url = util.ct(e).attr('url') + '?p=' + location.pathname + '&' + new Date().getTime()
                @$('.captchaImg').load(=>
                    @model.set '_cap', util.getCookie('_cap')
                ).attr 'src', url
                @model.set 'beforeSave', 'captcha'
        content: ->
            s = $ cf.rtp 'captcha',
                name: name
                url: url
            @form._trigger.push
                trigger: 'click'
                elem: s.find('.changeCaptcha')
            s
        valid:
            required: true
