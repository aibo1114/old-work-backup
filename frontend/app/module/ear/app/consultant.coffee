require './meta/consultant'
require './meta/brand'

#if cf.mob
#    ctn = "#content"

cs = [
    _ep 'username'

    _ep 'user:gender'

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

    m._pic 'head'
]
#
#app.enhance
#    routes:
#        '!/consultant': 'consultant'
#        '!/consultant/addInfo': 'addInfo'
#        '!/consultant/edit/:id': 'consultantEdit'
#        '!/consultant/add': 'consultantAdd'
#    addInfo: (id)->
#        @dm.addOrEdit ctn, 'consultant', q:
#            uid: user.id,
#            prop: cs
#            data: ->
#                uid: user.id
#                phone: user.get 'phone'
#    consultantEdit: (id)->
#        wt.setWtJs() if W.wt
#        @dm.edit ctn, 'consultant', id,
#            prop: cs
#            noTopAdd: true
#
#    consultantAdd: (e)->
#        wt.setWtJs() if W.wt
#        opt =
#            q:
#                'owner._id': user.id
#
#        $.get util.restUrl('shop'), opt, (res) =>
#            sh = res.entities[0]
#            if sh
#                @dm.add ctn, 'consultant',
#                    toFetch: false
#                    noTopAdd: true
#                    prop: cs
#                    before: (d)->
#                        d.shop = _.pick sh, meta.shop._.selectOpt.split(',')
#                        d
#            else
#                popMsg "请先录入验配中心信息", 'warning'
#                cf.r 'home/shop'


cf.view.ipBtn '', 'consultant', ctn,
    check: (f)->
        if f in ['edit', 'add']
            wt.setWtJs() if W.wt

        if f in ['add', 'list']
            unless cf._sh
                throw 'rt::consultant'
    func: ->
        opt =
            q:
                'owner._id': user.id
        $.get util.restUrl('shop'), opt, (res) =>
            cf._sh = res.entities[0]
            if cf._sh
                cf.r 'consultant/list'
            else
                popMsg "请先录入验配中心信息", 'warning'
                cf.r 'home/shop'

    listOpt:
        _attrs: ->
            'username,shop,strength,refFile'
        modelOpt:
            tagName: 'a'

        itemContext: (d)->
            $.extend d,
                imgCls: 'img-circle square'
                subTitle: d.shop.title
                title: d.username
                brief: d.strength
                btn: true

        criteriaOpt: ->
            q:
                'shop._id': cf._sh._id

    editFormOpt:
        prop: cs

    addFormOpt:
        prop: cs
        before: (d)->
            d.shop = _.pick cf._sh, meta.shop.selectOpt.split(',')
            d

app.enhance
    routes:
        '!/consultant/addInfo': 'addInfo'

    addInfo: ->
        @dm.addOrEdit ctn, 'consultant', {
            q:
                phone: user.get('phone')|| 'noPhone'
        },
            prop: cs
            data: ->
                uid: user.id
                phone: user.get 'phone'
