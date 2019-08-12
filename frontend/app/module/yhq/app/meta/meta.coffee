require '../../../../lib/terminal/tf/dTime'
#多次用到的数据可以加到common里，
tph = new Date().pattern('yyyy-MM-dd HH')+':00:00'
cf.btnStr = _st.btn('primary', 'sm')
$.extend m.common,
    coupon_type: m._select 'coupon_type',
        label: '优惠券类型'
        attrs:
            data:
                '1': '优惠券',
                '2': '通用券'

    money_type: m._select 'money_type',
        label: '充值类型'
        notify: true
        attrs:
            data:
                '1': '金额',
                '2': '百分比'

    coupon_stime: _ep 'startedDate',
        code: 'coupon_stime'
        label: '优惠券开始时间'
        ph: tph
        attrs:
            noVal: true


    coupon_etime: _ep 'endDate',
        code: 'coupon_etime'
        label: '优惠券结束时间'
        ph: tph
        attrs:
            noVal: true

m.coupon_activity =
    label: '优惠券活动'
    prop: [
        _ep 'id',
            noEdit: true#不显示在列表里
            label: '活动ID'

        _ep 'name',
            label: '活动名称'

        _ep 'coupon_type'

        _ep 'startedDate',
            id: 'sttt'
            code: 'activity_stime'
            label: '活动开始时间'
            ph: tph
            attrs:
                noVal: true
            valid:
                required: true
                earlyThan: "#ettt"

        _ep 'endDate',
            id: 'ettt'
            code: 'activity_etime'
            ph: tph
            label: '活动结束时间'
            attrs:
                noVal: true
            valid:
                required: true
                laterThan: "#sttt"

        _ep 'money_type'

        _ep 'money',
            noEdit: true
            label: '优惠券'
            showText: (v, d)->#展示标签
                v + if d.money_type is '1'
                    '元'
                else
                    '%'
        m._number 'money_bfb',
            noTb: true #  
            code: 'money'
            dep:
                code: 'money_type'
                val: '2'
            label: '优惠券百分比'
            valid:
                required: true
                min: 0
                max: 100
            group:
                suf: '%'
            events:
                change: (e)->
                    t = util.ct(e)
                    if +t.val() > 100
                        alert '输入有误'
                        t.val('')

        m._number 'money_mz',
            noTb: true
            code: 'money'
            dep:
                code: 'money_type'
                val: '1'
            label: '优惠券面值'
            group:
                suf: '元'
            valid:
                required: true
            events:
                change: (e)->
                    t = util.ct(e)
                    tt = @$("[name='min_money']")
                    if tt.val() and +t.val() > +tt.val()
                        alert '最低金额应该大于优惠券面值'
                        t.val('')
                        tt.val('')
                        tt.trigger 'change'

        m._number 'min_money',
            label: '使用最低金额限制'
            group:
                pre: tu.icon 'yen'
                suf: '元'
            valid:
                required: true
            events:
                change:(e)->
                    t = util.ct(e)
                    if !@$("[name='money']").length
                        alert '请先选择充值类型'
                        t.val('')
                    else if @$("[name='money_type']").val() is '1' and +@$("[name='money']").val() > +t.val()
                        alert '最低金额应该大于优惠券面值'
                        t.val('')

        m._number 'num',
            label: '优惠券发放的张数'
            group:
                suf: '张'

        _ep 'coupon_stime'

        _ep 'coupon_etime'

    ]
#    btn:
#        userxxx: ->
#            icon: 'user'
#            cls: 'btn btn-sm btn-default'
#
#    event:
#        userxxx:
#            type: 'click'
#            fun:(e)->
#                alert 'z'
#    filter:
#        num: 'text:s:mt'

    listOpt:
        colNum: 11
        itemBtns: []


m.passportcoupon =
    label: '绑定账号券发放'
    prop: [
        _ep 'coupon_name',
            label: '优惠券'

        _ep 'uid',
            label: '用户id'

        _ep 'activity_id',
            label: '活动id'

        _ep 'money',
            label: '金额'

        _ep 'maxlimit',
            label: '使用限额'

        _ep 'moneytype',
            label: '优惠券类型'

        _ep 'coupon_stime',
            label: '有效期开始时间'

        _ep 'coupon_etime',
            label: '有效期结束时间'

        _ep 'keyid',
            label: '发放key'


    ]
    filter: [
        _ep 'passport',
            ph: '通行证'


        code: 'activity_id',
        type: 'select'
        attrs:
            title: '充值活动'
            entity: 'common'
            url: 'http://api.wan.liebao.cn/coupons/1/bms/coupon_activity'
            keyVal: 'id,name'

        _ep 'coupon_stime',
            label: ''

        _ep 'coupon_etime',
            label: ''

        key: 'sendBtn'
        type: 'btn'
        cls: cf.btnStr
        icon: 'search'
        label: '查询'
    ]
    listOpt:
        filterIt:->
        searchIt:->
        toFetch: false
        colNum: 9
        itemBtns: []
        events:
            'click .toolbar .sendBtn': ->
                c = @collection
                c.setCriteria util.setQ(@$el,'passport','activity_id','coupon_stime','coupon_etime')
                c.resetFetch()

    addFormOpt: ->
        prop:[
            _ep 'passport',
                label: '通行证'
                ph: '验证通过后才能保存'#text的提示内容
                exBtn: [
                    icon: 'check'#引入bootstrap的icon
                    text: '验证'
                ]
                events:#验证事件的函数
                    'click .check': (e)->
                        t = util.ct(e)#获取当前jquery对象
                        url = 'http://api.wan.liebao.cn/coupons/1/bms/api/passportcheck'
                        $.get url, passport: t.parent().prev().val(), (res)=>
                            if res.ret is 1
                                popMsg '验证成功'
                                @$('.save').removeClass 'disabled'
                            else
                                popMsg '验证失败', 'warning'

            m._select 'activity_id',
                label: '充值活动'
                attrs:
                    entity: true
                    url: 'http://api.wan.liebao.cn/coupons/1/bms/coupon_activityuse'
                    keyVal: 'id,name'#select框里显示的value和name
                valid:
                    inEqualTo: '0'#select的验证
                    required: true
                events:
                    change: (e)->
                        t = util.ct(e)
                        @vb ?= @$('.viewBox')#判断是否存在viewBox，存在即不去重新再寻找，这里的@-》this指的是当前的这个view
                        dd = t.data('sdata').find t.val()#jquery的data方法，放入数据
                        if dd
                            app.dm.view @vb, 'coupon_activity',
                                toFetch: false#不通过ajax获取，因为data已经写入
                                data: dd
                                style: 'panel-info'
                                title: '活动信息'
                                foot: false
                                prop: [
                                    _ep 'coupon_type'

                                    _ep 'money_type'

                                    _ep 'coupon_activity:money'

                                    _ep 'coupon_activity:min_money'
                                ]
                        else
                            app.cleanPage @vb

            m._text 'orderid',
                label: '订单ID'
                valid:
                    required: true

            _ep 'coupon_stime'

            _ep 'coupon_etime'
        ]
        callback: ->
            @$('.save').addClass 'disabled'
            @$("[name='activity_id']").parent().mk 'div', class: 'viewBox'#mk是append一个div设置它的class是viewBox