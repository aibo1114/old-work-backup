app.enhance
    routes:
        '!/home': 'home'
        '!/home/shop': 'shop'
        '!/home/school': 'school'
        '!/home/profile': 'profile'

    home: ->
        unless $('#main').length
            user.afterLogin()

    school: ->
        if !user.hasRole('principal')
            cf.r 'home/profile'
            return
        qu =
            q:
                'owner._id': user.id,
        app.dm.addOrEdit ctn, 'school', qu,
            prop:[
                _ep 'title'

                _ep 'area'

                code: 'address'
                ph: '请输入完整地址'
                events:
                    click: (e)->
                        t = util.ct(e)
                        v = t.val()
                        unless v
                            t.val @$('.areaWt').attr('area')

                _ep 'phone'
                _ep 'description'
                m._pic 'slide'
            ]
            saveSuccess: ->
                log '保存成功'

    shop: (e)->
        if !user.hasRole('manager')
            cf.r 'home/profile'
            return
        opt =
            q:
                'owner._id': user.id

        prop = [
            _ep 'title'

            m._number 'phone'

            _ep 'area'

            code: 'address'
            ph: '请输入完整地址'
            events:
                click: (e)->
                    t = util.ct(e)
                    v = t.val()
                    unless v
                        t.val @$('.areaWt').attr('area')
        ,
            code: 'operTime'
            xtype: 'dTime'
            attrs:
                minView: 2
                startView: 4
        ,
            m._number 'space'

            _ep 'goodAtBrand'

            m._radio 'park',
                attrs:
                    data: ['是', '否']

            m._radio 'dropIn',
                attrs:
                    data: ['是', '否']

            m._pic 'slide'

            _ep 'description'
        ]
        $.get util.restUrl('shop'), opt, (res) =>
            es = res.entities
            if es.length > 1
                @dm.collection ctn, 'shop',
                    data: res.entities
                    toFetch: false
            else
                if es.length is 1
                    @dm.edit ctn, 'shop', es[0]._id,
                        prop: prop
                        noTopAdd: true
                        data: es[0]

                        cols: 'col-xs-3:col-xs-9'
                else
                    @dm.add ctn, 'shop',
                        noTopAdd: true
                        prop: prop
                        data:
                            owner: user.pick()
                        cols: 'col-xs-3:col-xs-9'

    profile: ->
        wt.setWtJs() if window.wt
        unless $('#main').length
            user.afterLogin()
        data = user.attributes
        prop = [
            _ep 'username'

            m.user.prop.codeBy 'gender'

            _ep 'phone'

            _ep 'email'

            _ep 'wid'

            _ep 'roleCode'

            m._hidden 'afterSave',
                val: 'assignRoleByCode'
        ]

        if user.roles and user.roles.length
            prop.push m._pic 'portrait'
            @dm.edit ctn, 'user', user.id,
                cleanAll: true
                title: '用户信息'
                toFetch: false
                cols: 'col-xs-3:col-xs-9'
                btns: ['save']
                prop: prop
                data: data
                _saveSuccess: (model, res)->
                    user.set res.entity
                    user.storeAuth()
                    cf.r(app.dfPath)
        else
            @dm.add ctn, 'user',
                data: data
                title: '新建用户'
                prop: prop
                _saveSuccess: (model, res)->
                    popMsg '注册成功'
                    user.logout()
                    user.loginByWoid()


