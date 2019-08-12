require '../../../../lib/init'

lg = require '../../../../lib/widget/login'

module.exports = require("../../../../lib/userRouter").extend

    initLayout: require '../../../../lib/func/initLayout'
    logoutPath: util.navUrl('login')
#    mods: ['home', 'site', 'data', 'wechat', 'userRole', 'file']
    tmpl: 'console'
    _mod_ctn: '#main'
    dfPath: 'home'
    routes:
        '': 'index'
        '!/login': 'login'
        '!/loading': 'loading'
        '!/*path': 'dAct'

    layout: ->
        $(@parent).append cf.rtp(@tmpl, @context())

    home: ->
        @initLayout 'home', '3-9'
        $(@_mod_ctn).append('<div class="row"/>')
        cf._addStat?()

    context: ->
        name: ((ii('siteName') || cf.community.name) + ' ' + ii('console'))

    bdPush: ->
        @dm.form 'air', 'common',
            urlRoot: util.actUrl 'site/bdPush'
            title: '百度SEO推送'
            prop: [
                m._checkbox 'entities',
                    label: '同步数据'
                    attrs:
                        data:->
                            res = {}
                            for it in cf.bdst.entities
                                res[it] = ii(it)
                            res
                m._radio 'type',
                    label: '模式'
                    attrs:
                        data:
                            1: '最新的'
                            2: '全部'
            ]

    cleanCache: ->
        $.post util.actUrl('cleanCache')

    account: ->
        lg.changePsdForm 'air'

    login: (p = @ctn)->
        lg.loginForm p,
            cleanAll: true
            asterisk: false
            className: 'break'

    setting: ->
        cf.dm.l 'form', 'air',
            title: ii 'setting'
            prop:[
                m._select 'lang',
                    attrs:
                        data:
                            zh: '中文'
                            en: 'En'
                    events:
                        change:(e)->
                            v = util.ct(e).val()
                            if v is '0'
                                util.deleteCookie 'lang'
                            else
                                util.setCookie 'lang', v
            ,
                m._select 'xeditor',
                    attrs:
                        data:
                            md: 'markdown'
                            smn: 'summernote'
                    events:
                        change:(e)->
                            v = util.ct(e).val()
                            if v is '0'
                                util.deleteCookie '_xe'
                            else
                                util.setCookie '_xe', v
            ]
            _save:->
                @closeDlg()

require '../../../../lib/func/userRouterCheck'
