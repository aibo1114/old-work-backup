area = require '../../../lib/widget/editor/areaCode'
require '../../../lib/widget/editor/dTime'

phone =
    code: 'phone'
    type: 'text'
    icon: 'phone'
    label: '手机号'
    ph: '手机号码'
    help: '用于信息查询与找回密码'
    isShow:->
        !user.isLogin()
    valid:
        required: true
        telephone: true

app.enhance
    routes:
        '!/apply/inquiry': 'inquiry'
        '!/apply/order': 'order'

    initLayout: ->
        @ctn.appned "<div class='col-md-push-2 col-md-8 row'/>"

    inquiry: (id)->
        if !$(W.ctn).length
            W.ctn = app.ctn
        wt.setWtJs() if window.wt
        ph = location.pathname
        [em,et,id] = ph.split('/')
        @dm.form W.ctn, 'inquiry',
            tip: '您输入的电话号码，将会最为咨询结果的查询密码'
            title: '我的咨询'
            _vcodeExist:->
                popMsg '您的电话已经注册,请登录后再咨询'
                cf._toLogin = location.hash
                cf.r 'login'
            prop: [
                _ep 'username'

                phone

                _ep 'vcode'
                _ep 'content:content' 
                m._pic 'head'
            ]
            toFetch: false
            data: ->
                if et is 'shop'
                    d =
                        shop: _shop
                else if et is 'consultant'
                    d =
                        consultant:
                            _id: id
                            username: $('#username').text()
                    if (cu = $('#cuid')) and cu.length
                        d.consultant.uid = cu.val()
                    if (sh = $('#shop')) and sh.length
                        d.shop =
                            _id: sh.attr('sid')
                            title: sh.text()
                            address: $('#shop_addr').text()
                            phone: $('#shop_phone').text()
                else
                    d = {}
                if user.isLogin()
                    d.username = user.username
                    d.phone = user.get 'phone'
                    d.uid = user.id
                d
            _saveSuccess: ->
                if user.isLogin()
                    popMsg '您的问题已经成功提交！'
                    cf.r "my/qa"
                else
                    popMsg '您的问题已经成功提交！2个工作日内您将收到答复，您可以通过注册网站,然后查看您的回答.'
                    cf.r 'reg'

    order: ->
        if !$(W.ctn).length
            W.ctn = app.ctn
        ph = location.pathname
        [em,et,id] = ph.split('/')

        if et is 'shop'
            d =
                status: 10
                shop: _shop
        else if et is 'consultant'
            d =
                status: 10
                consultant:
                    _id: id
                    username: $('#username').text()
            if (cu = $('#cuid')) and cu.length
                d.consultant.uid = cu.val()
            if (sh = $('#shop')) and sh.length
                d.shop =
                    _id: sh.attr('sid')
                    title: sh.text()
                    address: $('#shop_addr').text()
                    phone: $('#shop_phone').text()
        else
            d = {}

        if user.isLogin()
            d.username = user.username
            d.phone = user.get 'phone'
            d.uid = user.id

        @dm.form W.ctn, 'order',
            tip: '请输入常用电话号码，方便我们与您的沟通'
            title: '我的预约'
            toFetch: false
            _vcodeExist:->
                popMsg '您的电话已经注册,请登录后再预约'
                cf._toLogin = location.hash
                cf.r 'login'

            prop: [
                _ep 'username'

                _ep 'user:gender'

                m._number 'age',
                    label: '年龄'

                phone

                _ep 'vcode'

                m._tag 'hr'
            ,
                code: 'postcode'
                type: 'holder'
                label: '选择地区'
                xtype: area
                events:
                    'click .searchShop': (e)->
                        code = @model.get 'postcode'
                        sb = $('#_shopId').data('sb')
                        if code
                            sb.form.model.unset 'shop'
                            $('#_shopId').find('input').val ''

                            sb.form.model.unset 'consultant'
                            $('#_consultantId').find('input').val ''

                            sb.reset()
                            sb.lazy = false
                            sb.showBox
                                postcode: code
                        else
                            sb.lazy = true
                            popMsg '请先选择地区，再搜索', 'warning'
                attrs:
                    prop: 'postcode'
                    auto: '80'
                    callback: ->
                        btn = _st.btn('primary')
                        a = "<a class='#{btn} searchShop'>查询验配中心</a>"
                        $('.areaWt').append a
            ,
                code: 'shop'
                id: '_shopId'
                type: 'text'
                xtype: 'selectBox'
                ph: '请按照地址和名称进行检索'
                bind: true
                readonly: true
                showText: (v,d)->
                    if d
                        "<a target='_blank' href='/shop/#{d._id}'>#{d.title}</a>"
                attrs:
                    setAttrs: 'title,address,phone'
                    panelOpt:
                        entity: 'shop'
                        noStr: '没有匹配对象'
                        criteriaOpt:
                            _attrs: 'title,consultant,address,refFile,phone'
                    queryOpt: (v)->
                        $or: [
                            title:
                                $regex: ".*#{v}.*"
                            address:
                                $regex: ".*#{v}.*"
                        ]
                    label: 'title'
                    lazy: false
                    afterPick: (data)->
                        @form.model.unset 'consultant'
                        $('#_consultantId').find('input').val ''
                        if data.consultant
                            $('#_consultantId').data('sb').reset(data.consultant)
                            $('#_consultantId').find('input').attr 'readonly', 'readonly'
            ,
                code: 'consultant'
                id: '_consultantId'
                type: 'text'
                xtype: 'selectBox'
                bind: true
                ph: '请按照名字查找'
                readonly: true
                showText: (v,d)->
                    if d
                        "<a target='_blank' href='/consultant/#{d._id}'>#{d.username}</a>"
                attrs:
                    setAttrs: 'username'
                    searchItem: 'username'
                    label: 'username'
                    reset: (data)->
                        @clickShow = true
                        @lazy = true
                        if data
                            @panelOpt.data = data
                            @setPanel()
                            @showBox()
                    queryOpt: (v)->
                        username:
                            $regex: ".*#{v}.*"
                    panelOpt:
                        entity: 'consultant'
                        noStr: '没有匹配对象'
                        criteriaOpt:
                            _attrs: 'username,shop'
                    afterPick: (d)->
                        unless @form.model.get 'shop'
                            $('#_shopId').find('input').val(d.shop.title)
                            @form.model.set 'shop', d.shop
            ,

                code: 'appointmentTime'
                type: 'text'
                label: '预约时间'
                xtype: 'dTime'
                showText: (v)->
                    util.prettyDate(v)

                m._checkbox 'symptom',
                    label: '症状选择'
                    attrs:
                        inline: true
                        data: [
                            '听力下降'
                            '听不清'
                            '打岔'
                            '耳鸣'
                            '耳闷'
                            '耳痛'
                            '流水'
                            '流脓'
                            '耳痒'
                            '眩晕'
                            '其他'
                        ]

                m._tag 'hr'

                m._textarea 'memo'

            ]

            rMsg: '您的预约已经提交，2个工作日内工作人员将于您联系，或者请致电：400-0688-153'
            data: ->
                d
            beforeRender: ->
                d = @data
                if d.shop or d.consultant
                    @prop.delBy 'postcode', 'code'
                    @prop.delBy 'shop', 'code'
                    @prop.delBy 'consultant', 'code'
                @_msg = ''
                if d.shop
                    @_msg += "验配中心: #{d.shop.title} [#{d.shop.address || ''}]<br/>"
                    if d.consultant
                        @_msg += "预约验配师: #{d.consultant.username}"
                    else
                        @_msg += '预约验配师: 店里为您安排验配师'
                else if d.consultant
                    @_msg += "预约验配师: #{d.consultant.username}"
            callback: ->
                if @_msg
                    @msg @_msg, 'info'
            _saveSuccess: ->
                if user.isLogin()
                    popMsg '您的预约已经成功提交！'
                    cf.r "my/order"
                else
                    popMsg '您的预约已经成功提交！2个工作日内您将收到答复，您可以通过注册网站,然后查看您的回答.'
                    cf.r 'reg'