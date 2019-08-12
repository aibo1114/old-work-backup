app.enhance
    routes:
        '!/home': 'home'
    home: ->
        @initLayout 'home', '2-10'
        ob = _.pick user.toJSON(), 'username','lastLogin'
        ob.roles = user.roles

        @dm.view '#side', 'user',
            cleanAll: false
            toFetch: false
            foot: false
            style: 'panel-danger'
            title: '登录信息'
            data: ob
            prop: [
                _ep 'username'
            ,
                code: 'role'
                showText:(v, it)->
                    str = ''
                    if (v = it.roles) and v.length
                        for it in v
                            str += "<span>#{it.label}</span>"
                    str
            ,
                code: 'lastLogin'
                type: 'date'
            ]

        @dm.tag '#side',
            head: true
            style: 'panel-success'
            title: '最新消息'


        if cf._shortcut
            app.dm.collection $(@_mod_ctn), 'common',
                head: true
                toFetch: false
                mode: 'panel'
                title: '常用功能'
                tagClass: 'panel-body'
                data: cf._shortcut()
                modelOpt:
                    className: 'col-xs-2'
                    tmpl: 'shortcutItem'


        $(@_mod_ctn).append('<div class="row"/>')

        ctn = $ '#main .row'



        for k,v of cf._stat
            opt = $.extend(
                cleanAll: false
                style: 'panel-info'
                itemBtns: ['popView', 'del']
                btns: null
                max: 8
                foot: true
            , v)
            @dm.tb(ctn, k, opt)
        cf._addStat?()

