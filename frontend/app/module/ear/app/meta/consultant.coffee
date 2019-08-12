meta.consultant =
    prop: [
        code: 'shop'
        isShow: ->
            user.hasRole('admin')
        type: 'text'
        xtype: 'selectBox'
        bind: true
        showText: (v)->
            if v
                v.title
        attrs:
            setAttrs: 'title,postcode,phone,address'
            editProp:[
                _ep 'title'
                _ep 'phone'
                _ep 'address'
            ]
            panelOpt:
                entity: 'shop'
                noStr: '请按照店名查找'

        m._link 'username'

        m.user.prop.codeBy 'gender'

        _ep 'row'

        _ep 'phone'

        m._text 'qq'

        code: 'exp'
        type: 'text'
        xtype: 'dTime'
        attrs:
            minView: 2
            startView: 4

        m._select 'workTitle',
            attrs:
                data: [
                    '二级验配师(最高)'
                    '三级验配师'
                    '四级验配师'
                    '其他'
                ]

        m._select 'major',
            attrs:
                data: [
                    '听力学'
                    '医学相关'
                    '教育心理相关'
                    '管理经济相关'
                    '其他'
                ]
        _ep 'goodAtBrand'

        m._checkbox 'strength',
            attrs:
                data: [
                    '成人助听器验配'
                    '儿童助听器验配'
                    '声场评估测试'
                    '真耳分析'
                    '听力咨询'
                    '康复指导'
                ]

        _ep 'description'

        m._itemTable 'comment'

        _ep 'content:status'

        m._pic 'head'

    ]
    listOpt:
        btns: ['exExcel', 'topAdd']

    filter:
        username: 'text:s:mt'
#    gender: meta.user.gender
#    exp:
#        type: 'text'
#        xtype: 'dTime'
#        attrs:
#            minView: 2
#            startView: 4
#
#    qq:
#        type: 'text'


#    _:
#
#        item: [
#            'shop'
#            'username'
#            'gender'
#            'row'
#            'phone'
#            'qq'
#            'exp'
#            'workTitle'
#            'major'
#            'goodAtBrand'
#            'strength'
#            'description'
#            'comment'
#            'status'
#            'headPic'
#        ]
#        tbItem:
#            username:
#                type: 'view'
#            shop: {}
#            exp:
#                type: 'date'
#            workTitle: {}
#            _btn: ['edit', 'del']
