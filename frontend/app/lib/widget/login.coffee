require '../../lib/meta/user'
require '../../lib/meta/extend/vcode'

$.extend true, m.user,
    loginUrl: util.actUrl 'auth', 'login'

    loginProp: [
        _ep 'username'
        _ep 'password'
    ]

    regProp: [
        _ep 'username'
        _ep 'phone'
        _ep 'vcode'
        _ep 'password'
        _ep 'rpsd'
    ]
$.extend m._.fmBtn,
    login: ->
        cls: _st.btn('primary', 'lg', true, 'save')
    forgetPsd: ->
        cls: "lost fl"
    reg: ->
        cls: _st.btn('primary', 'lg', true, 'save')
    register: ->
        cls: _st.btn('primary', 'lg', true, 'save')

$.extend m._.event,
    lost:
        type: 'click'
        fun: ->
            if @mode is 'modal'
                @$el.modal("hide")
            lg.forgetPsdForm 'air'
    reg:
        type: 'click'
        fun: ->
            if @mode is 'modal'
                @$el.modal("hide")
            lg.regForm 'air'

            
lg =
    feedbackForm: (p, opt)->
        app.dm.form p, 'feedback', opt

    settingForm: (opt)->
        app.dm.form 'air', 'user', $.extend
            title: iic('cfg')
            btns: ['save']
            prop: [
                _ep 'title'
            ]
            callback: @_cCallback
        , opt

    changePsdForm: (p, opt)->
        app.dm.form p, 'user', $.extend
            title: iic('account')
            toFetch: false
            id: 'cPsdFm'
            data: ->
                user.pick '_id', 'username', 'email'
            prop: [
                _ep 'username',
                    readonly: true
                _ep 'opsd',
                    exBtn: [
                        text: iim('m_valid', ii('password'))
                        cls: 'verifyPsd'
                    ]
                    events:
                        'click .verifyPsd': ->
                            $.post util.actUrl('auth/checkPsd'),
                                _id: user.id
                                password: @$('input[name="opsd"]').val().trim()
                            , =>
                                cf.bbEvt.trigger 'newPsd', 'cPsdFm'
                                @$('.save').removeClass 'disabled'
            ]
            btns: ['save']
            callback: ->
                @$('.save').addClass 'disabled'
            info: '为了保护您账户和资料的安全，请定期修改您的密码'
            _saveSuccess: (model) ->
                if model.view.mode is 'modal'
                    model.view.closeDlg()
                else
                    cf.slider.slidePage()
                util.deleteCookie '_vCode'
            before: (p)->
                util.del 'opsd', p
                util.del 'rpsd', p
                p
        , opt

    forgetPsdForm: (ctn = 'air', opt={})->
        p = if opt.setEmail
            [
                _ep 'email'
            ]
        else
            [
                _ep 'phone'
            ,
                m._vcode null,
                    url: util.actUrl('smsFindPsd')

            ]
        app.dm.form ctn, 'user', $.extend
            id: "fpForm"
            title: '忘记密码'
            toFetch: false
            entity: "user"
            noTopAdd: true
            asterisk: false
            prop: p
            btns: ["save"]
            eventList: ['sKey']
            urlRoot: util.actUrl 'auth/resetPsd'
            saveSuccess: (model, resp, options) ->
                model.view.closeDlg()
                popMsg '密码修改成功'
                util.deleteCookie '_vCode'
                if user.isLogin()
                    user.logout()
        , opt

    regForm: (p, opt)->
        app.dm.form p, 'user', $.extend
            id: "regForm"
            toFetch: false
            prop: m.user.regProp
            title: '用户注册'
            btns: ['reg']
        , opt
#        setBtns: ->
#            [
#                label: '同意协议并注册'
#                cls: cf.markBtn
#            ]

    loginForm: (p = 'air', opt)->
        app.dm.form p, 'user', $.extend
            id: "loginForm"
            title: -> ii('login')
            urlRoot: m.user.loginUrl
            style: 'panel-primary'
            toFetch: false
            asterisk: false
            prop: m.user.loginProp
            btns: ["login", "forgetPsd"]
            eventList: ['sKey', 'lost', 'reg']
            callback: @_cCallback
            before: (attr)->
                cf.view.form::before.call @, attr
                n = attr.username
                v = @model.validator
                if !v.email n
                    attr.email = n
                else if !v.telephone n
                    attr.phone = n
                attr
            saveSuccess: (model, resp, options) ->
                model.view.closeDlg()
                user.login resp.user
        , opt


cf.bbEvt.on 'newPsd', (fid)->
    fm = $('#' + fid)
    if fm.length && (mo = fm.data('_item'))
        mo.renderSpeProp _ep 'password',
            label: '新密码'
        mo.renderSpeProp _ep 'rpsd',
            valid:
                equalTo: "##{fid} #rpsd"
                required: true

module.exports = lg