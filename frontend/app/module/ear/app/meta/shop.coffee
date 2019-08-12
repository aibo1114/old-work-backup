require '../../../../lib/widget/editor/areaCode'

m.shop =
    prop:[
        code: 'org'
        type: 'select'
        attrs:
            entity: 'org'
            keyVal: '_id,title'
        showText:(v)->
            if v
                v.title || ''
            else
                ''
        events:
            'change select': (e)->
                t = util.ct(e)
                v = t.val()
                if v is '0'
                    @model.set 'org', 0
                else
                    @model.set 'org',
                        _id: v
                        title: t.children(':selected').text()
                e.stopPropagation()
                e.preventDefault()
        isShow: ->
            user.hasRole('admin,manager')

        m._link 'title'

        _ep 'row'

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

        code: 'operTime'
        xtype: 'dTime'
        attrs:
            minView: 2
            startView: 4

        m._number 'space'

        _ep 'goodAtBrand',
            code: 'brand'

        m._radio 'park',
            attrs:
                data: ['是', '否']

        m._radio 'dropIn',
            attrs:
                data: ['是', '否']

        _ep 'level'

        _ep 'description'

        m._itemTable 'comment'

        m.content.prop.codeBy 'status'

        m._pic 'slide'

        m._user code: 'owner'

    ]

    selectOpt: '_id,title,postcode,phone,address'

    btn:
        showInTd: (it)->
            util.iBtn "user", 'showInTd'

    listOpt:
        btns: ['exExcel', 'topAdd']
        criteriaOpt: ->
            if !user.isAdmin() and user.orgs and user.orgs.length
                q:
                    'org._id': user.orgs[0]._id
            else
                {}
        afterShow: (e, p)->
            m = @findData(e)
            app.dm.tb p, 'consultant',
                criteriaOpt: ->
                    q:
                        'shop._id': m.id

    filter:
        title: 'text:s:mt'


if cf.mob
    $.extend true, meta.shop.consultant,
        noCol: true
        noLabel: true
#    brand: meta.cf.brandItem()

#    consultant:
#        xtype: table
#        attrs:
#            formAddOpt:
#                cols: 'col-xs-3:col-xs-9'
#                data: ->
#                    mo = @rCollection.view.form.data
#                    shop:
#                        _id: mo._id
#                        title: mo.title
#                afterSave: (mo)->
#                    m = @rCollection.view.form.model
#                    unless m.get('consultant')
#                        m.set('consultant', [])
#                    rs = m.get('consultant')
#                    rs.push
#                        _id: mo.id
#                        username: mo.get 'username'
#            formEditOpt:
#                cols: 'col-xs-3,col-xs-9'
#                toFetch: true
#            afterDel: (id)->
#                rs = @form.model.get('consultant')
#                if rs
#                    rs.delBy(id, '_id')
#            entity: 'consultant'
#            itemBtns: ['popEdit', 'del']
#            btns: ['popAdd']
#            criteriaOpt: ->
#                _id = @form.data._id || null
#                if _id
#                    q:
#                        'shop._id': _id
#                else
#                    q:
#                        title: 'no org'

#    description:
#        type: 'textarea'
#        label: '店面介绍'
#        ph: "您可将店面介绍的word文档发送到lingting_online@126.com，或者登陆#{cf.community.url}进行填写"
#        export:
#            dist: ->
#                [
##                    'org'
#                    'title'
#                    'phone'
#                    'area'
#                    'address'
#                    'operTime'
#                    'space'
#                    'brand'
#                    'park'
#                    dist: ->
#                    [
##                    'org'
#                        'title'
#                        'phone'
#                        'area'
#                        'address'
#                        'operTime'
#                        'space'
#                        'brand'
#                        'park'
#                        'dropIn'
#                        'slidePic'
#                        'description'
#                    ]    'dropIn'
#                    'slidePic'
#                    'description'
#                ]

#                [
#                    label: '基本信息'
#                    info: '在填写过程中有任何问题，请拨打400-0688-153'
#                    items: [
#                        'org'
#                        'title'
#                        'phone'
#                        'area'
#                        'address'
#                        'operTime'
#                        'space'
#                        'brand'
#                        'park'
#                        'dropIn'
#                    ]
#                    btns: ['next']
#
#                ,
#                    label: '验配师'
#                    items: [
#                        'consultant'
#                    ]
#                    btns: ['prev', 'next']
#
#                ,
#                    label: '店面图片'
#                    items: [
#                        'slidePic'
#                        'commonEmail'
#                    ]
#                    btns: ['prev', 'save']
#                ]

#    tbItem:
#        title:
#            type: 'view'
#        row:
#            w: 45
#        owner: {}
#        address: {}
#        _btn: ['showInTd', 'edit', 'del']

#    exTbItem:
#        title: {}
#        row: {}
#        address: {}
#        postcode: {}
#        phone: {}
