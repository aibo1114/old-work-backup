m.order = {}
require './meta/status/order'

cf.view.ipBtn '', 'order', ctn,
    func: ->
        opt =
            q:
                'owner._id': user.id

        $.get util.restUrl('shop'), opt, (res) =>
            cf._sh = res.entities[0]
            if cf._sh
                cf.r 'order/list'
            else
                popMsg "请先录入验配中心信息", 'warning'
                cf.r 'home/shop'
    viewOpt:
        style: 'panel-info'

        prop: [
            _ep 'username'

            _ep 'user:gender'

            m._number 'age',
                label: '年龄'

            _ep 'phone'

            code: 'shop'
            type: 'text'
            showText: (v, d)->
                if v
                    "<a target='_blank' href='/shop/#{v._id}'>#{v.title}</a>"
        ,
            code: 'consultant'
            type: 'text'
            showText: (v, d)->
                if v
                    "<a target='_blank' href='/consultant/#{v._id}'>#{v.username}</a>"
        ,
            code: 'appointmentTime'
            type: 'text'
            label: '预约时间'
            showText: (v)->
                util.prettyDate(v)
        ,
            code: 'symptom'
            type: 'text'
        ,
            code: 'memo'
            type: 'text'
        ,
            code: 'proc'
            type: 'text'

        ]
        btns: ['back']

    listOpt:
        _attrs: ->
            'username,status,appointmentTime,symptom,consultant'
        itemBtns: ['processOrderStatus', 'del']
        criteriaOpt: ->
            unless cf._sh
                throw "rt::order"
            q:
                'shop._id': cf._sh._id
        btns:[]
        modelOpt:
            tagName: 'a'
        itemContext: (d)->
            $.extend d,
                btn: true
                subTitle: "<span class='label label-info'>#{cf.st.text('order', d.status)}</span> #{d.appointmentTime.dStr(16)}"
                title: "#{d.username} <small>#{d.symptom}</small>"
                attrs:
                    href: util.navUrl('order/view', d._id)

#
