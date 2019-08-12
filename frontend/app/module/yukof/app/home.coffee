#require './meta/common'
#require './meta/order'
require '../../../lib/meta/partner'

#$.extend true, meta.order._,
#    tbItem:
#        status:
#            type: 'status'
#        consultant:
#            val: (d)->
#                d.username
#        'appointmentTime':
#            type: 'date'
#        username: {}
#        symptom: {}
#        _opt:
#            type: 'btns'
#            w: 130
#
#    btn:
#        back: ->
#            cls: _st.btn(null, 'lg', null, 'back')
#            label: iic('back')
#        process: ->
#            cls: _st.btn('primary', 'lg', null, 'process')
#            label: '处理'
#    action: ->
#        ['view', 'processTb', 'del']

app.enhance
    routes:
        '!/home': 'home'
        '!/home/partner': 'partner'
        '!/home/shop': 'shop'
        '!/home/profile': 'profile'

        '!/home/order': 'order'
        '!/home/order/view/:id': 'orderView'


    checkPage: (name)->
        if name in ['order','shop','consultant']
            if !user.hasRole('manager')
                popMsg '请先录入个人信息与邀请码'
                cf.r 'home/profile'
                return false
        true

    home: ->
        log 'home'

    orderView: (id)->
        @dm.view ctn, 'order', id,
            btns: ['back']

    order: ()->
        opt =
            q:
                'owner._id': user.id
        $.get util.restUrl('shop'), opt, (res) =>
            sh = res.entities[0]
            if sh
                @dm.collection ctn, 'order',
                    _attrs: ->
                        'username,status,appointmentTime,symptom,consultant'
                    itemBtns: ['processOrderStatus', 'del']
                    criteriaOpt: ->
                        q:
                            'shop._id': sh._id
                    itemContext: (d)->
                        $.extend d,
                            btn: true
                            tag: 'a'
                            subTitle: "<span class='label label-info'>#{cf.st.text('order',
                                d.status)}</span> #{d.appointmentTime.dStr(16)}"
                            title: "#{d.username} <small>#{d.symptom}</small>"
                            content: null
                            attrs:
                                href: util.navUrl('home/order/view', d._id)
            else
                popMsg "请先录入验配中心信息", 'warning'
                cf.r 'home/shop'


    partner: ->
        ctn = @ctn
        et = 'partner'
        opt =
            q:
                'zz':1
#                'owner._id': user.id
        $.get util.restUrl(et), opt, (res) =>
            es = res.entities
            if es.length > 1
                @dm.collection ctn, et,
                    data: res.entities
                    toFetch: false
            else
                if es.length is 1
                    @dm.edit ctn, et, es[0]._id,
                        data: es[0]
                else
                    @dm.add ctn, et,
                        data:
                            owner: user.pick()

    shop: (e)->
        prop = [
            _ep 'title'
        ]
        opt =
            q:
                'owner._id': user.id
        $.get util.restUrl('shop'), opt, (res) =>
            es = res.entities
            if es.length > 1
                @dm.collection ctn, 'shop',
                    data: res.entities
                    toFetch: false
            else
                if es.length is 1
                    @dm.edit ctn, 'shop', es[0]._id,
                        prop:prop
                        data: es[0]
                        cols: 'col-xs-3:col-xs-9'
                else
                    @dm.add ctn, 'shop',
                        prop:prop
                        data:
                            owner: user.pick()
                        cols: 'col-xs-3:col-xs-9'

    profile: ->
        wt.setWtJs() if window.wt
        data = user.attributes
        if user.roles
            @dm.edit ctn, 'user', user.id,
                cleanAll: true
                title: '用户信息'
                toFetch: false
                cols: 'col-xs-3:col-xs-9'
                btns: ['save']
                prop:[
                    _ep 'username'
                    _ep 'user:gender'
                    _ep 'phone'
                    _.text 'wid'
                    _ep 'email'
                    _ep 'title'
                    _ep 'address'
                    _ep 'introduction'
                    _.pic 'portrait'

                ]
                data: data
                _saveSuccess: (model, res)->
                    user.set res.entity
                    user.storeAuth()
                    cf.r(app.dfPath)

        else
            @dm.add ctn, 'user',
                data: data
                title: '新建用户'
                prop:[
                    _ep 'username'

                    _ep 'phone'

                    _.text 'wid'

                    _.text 'roleCode'

                    m._hidden 'afterSave',
                        val: 'assignRoleByCode'
                ]
                _saveSuccess: (model, res)->
                    popMsg '注册成功'
                    user.logout()
                    user.loginByWoid()


