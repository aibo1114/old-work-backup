m.order =
    prop: [
        _ep 'status'
    ,
        _ep 'username'

        code: 'shop'
        showText: (v)->
            if v
                v._e = 'shop'
                tu.link v
    ,
        code: 'consultant'
        showText: (v)->
            if v
                v._e = 'consultant'
                tu.link v, 'username'

        _ep 'user:gender'

        _ep 'age'

        _ep 'phone'

        _ep 'symptom'
    ,
        code: 'appointmentTime'
        type: 'date'
    ,
        _ep 'memo'

    ,
        _ep 'proc'
    ]
    filter:
        username: 'text:s:mt'
        phone: 'text:s:mt'

    viewOpt:
        btns: ['close']


require './status/order'


#areaChange = ->
#    sb = $('#_shopId').data('sb')
#    sb.unsetVal()
#    sb._ac = @model.get 'areaCode'
#    cb = $('#_consultantId').data('sb')
#    cb.unsetVal()

#m.order =
#    prop:[
#        _ep 'content:status'
#    ]
#
#
#    status:
#        showText: (v)->
#            cf.st.order_status_hash[+v]
#
#    age:
#        type: 'number'
#        label: '年龄'
#
#    symptom:
#        type: 'checkbox'
#        label: '症状选择'
#        inline: true
#        data: [
#            '听力下降'
#            '听不清'
#            '打岔'
#            '耳鸣'
#            '耳闷'
#            '耳痛'
#            '流水'
#            '流脓'
#            '耳痒'
#            '眩晕'
#            '其他'
#        ]
#
#    appointmentTime:
#        type: 'text'
#        label: '预约时间'
#        xtype: 'dTime'
#        showText: (v)->
#            util.prettyDate(v)
#
#    areaCode:
#        type: 'holder'
#        label: '选择地区'
#        xtype: area
##        events:
##            'change select': (e)->
##                code = @model.get 'areaCode'
##                sb = $('#_shopId').data('sb')
##                if code
##                    sb.form.model.unset 'shop'
##                    $('#_shopId').find('input').val ''
##
##                    sb.form.model.unset 'consultant'
##                    $('#_consultantId').find('input').val ''
##
##                    sb.lazy = false
##                    sb.reset(code)
##                else
##                    sb.lazy = true
##                    popMsg '请先选择地区，再搜索', 'warning'
#
#        attrs:
#            prop: 'areaCode'
#            auto: '80'
#            scChange: areaChange
#            svChange: areaChange
#
#    shop:
#        id: '_shopId'
#        type: 'text'
#        xtype: 'selectBox'
#        ph: '请按照地址和名称进行检索'
#        bind: true
#        showText: (v, d)->
#            if d and d.shop
#                d.shop._e = 'shop'
#                tu.link d.shop
#            else
#                '未选择'
#        attrs:
#            clickShow: true
#            setAttrs: 'title,address,phone'
#            panelOpt:
#                entity: 'shop'
#                noStr: '没有匹配对象'
#                criteriaOpt:
#                    _attrs: 'title,consultant,address,refFile,phone'
#            queryOpt: (v)->
#                postcode:
#                    $regex: @_ac
#                $or: [
#                    title:
#                        $regex: ".*#{v}.*"
#                    address:
#                        $regex: ".*#{v}.*"
#                ]
#            label: 'title'
#            lazy: false
#            afterPick: (data)->
#                @form.model.unset 'consultant'
#                $('#_consultantId').find('input').val ''
#                if data.consultant
#                    $('#_consultantId').data('sb').reset(data.consultant)
#                    $('#_consultantId').find('input').attr 'readonly', 'readonly'
#
#    consultant:
#        id: '_consultantId'
#        type: 'text'
#        xtype: 'selectBox'
#        bind: true
#        ph: '请按照名字查找'
#        showText: (v, d)->
#            if d
#                "<a target='_blank' href='/consultant/#{d._id}'>#{d.username}</a>"
#        attrs:
#            setAttrs: 'username'
#            searchItem: 'username'
#            label: 'username'
#            reset: (data)->
#                @clickShow = true
#                @lazy = true
#                if data
#                    @panelOpt.data = data
#                    @setPanel()
#                    @showBox()
#            queryOpt: (v)->
#                username:
#                    $regex: ".*#{v}.*"
#            panelOpt:
#                entity: 'consultant'
#                noStr: '没有匹配对象'
#                criteriaOpt:
#                    _attrs: 'username,shop'
#            afterPick: (d)->
#                unless @form.model.get 'shop'
#                    $('#_shopId').find('input').val(d.shop.title)
#                    @form.model.set 'shop', d.shop
#    _: {}
#
