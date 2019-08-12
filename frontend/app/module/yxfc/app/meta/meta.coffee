require '../../../../lib/terminal/tf/dTime'

m.common =
    cpsuser: m._text 'cpsuser',
        label: '账号'
        ph: '账号'

    frm: m._text 'frm',
        label: '注册来源'
        ph: '注册来源'

_listOpt =
    colNum: 6
    toFetch: false
    btns: []
    itemBtns: []
    max: 100000
    searchIt:->
        log ''
    noData: ->
        popMsg '没有数据', 'warning'
        ''
    events:
        'click .toolbar .sh': (e)->
            c = @collection
            toolbar = @$('.toolbar')
            frm = @$('.toolbar').find("[name='frm']").val()
            passport = @$('.toolbar').find("[name='passport']").val()
            st = util.parseLocalDate(toolbar.find("[placeholder='开始时间']").val()).getTime() / 1000
            et = util.parseLocalDate(toolbar.find("[placeholder='结束时间']").val()).getTime() / 1000
            c.criteria =
                max: @max
                q: {frm,passport,st,et}
            c.resetFetch()

m.analysis =
    label: '效果分析'
    prop: [
        m._number 'day',
            label: '添加时间'
        m._text 'frm',
            label: '子推广账户'

        m._text 'register',
            label: '推广人数'

        m._text 'money',
            label: '推广金额'
        m._text 'rate',
            label: '分成比例'
        m._text 'commission',
            label: '分成所得'
    ]
    filter:
        frm: 'text:s:eq'

        daystart:
            title: '开始时间'
            type: 'text'
            xtype: 'dTime'
            attrs:
                minView: 2
                fmt: 'yyyy-mm-dd'
                val: new Date().pattern('yyyy-MM-dd')
        dayend:
            title: '结束时间'
            type: 'text'
            xtype: 'dTime'
            attrs:
                minView: 2
                fmt: 'yyyy-mm-dd'
                val: new Date().addDays(1).pattern('yyyy-MM-dd')
        btn:
            type: 'btn'
            cls: cf.btnStr + ' sh'
            label: '搜索'

    listOpt: _listOpt

m.payresult =
    label: '充值查询'
    prop: [
        _ep 'uid',
            label: '用户id'
        _ep 'passport',
            label: '用户'

        _ep 'money',
            label: '充值金额'

        _ep 'commission',
            label: '分成金额'

        _ep 'frm',
            label: '渠道名'

        m._number 'day',
            label: '日期'
        _ep 'game',
            label: '游戏'
        _ep 'server',
            label: '区服'
        _ep 'money',
            label: '金额'
        _ep 'commission',
            label: '收益'
    ]
    filter:
        st:
            title: '开始时间'
            type: 'text'
            xtype: 'dTime'
            attrs:
                minView: 1

        et:
            title: '结束时间'
            type: 'text'
            xtype: 'dTime'
            attrs:
                minView: 1
                val: new Date().addDays(1).pattern('yyyy-MM-dd HH:mm:ss')
        btn:
            type: 'btn'
            cls: cf.btnStr + ' sh'
            label: '搜索'
    listOpt: _listOpt

m.userbind =
    label: '用户绑定'
    prop: [
        _ep 'name'

        _ep 'gname',
            label: '游戏'

        _ep 'frm'

        m._number 'rate',
            label: '收益百分比'
    ]
    filter:[
        _ep 'cpsuser'

        _ep 'frm'
    ,
        key: 'sendBtn'
        type: 'btn'
        cls: cf.btnStr
        icon: 'search'
        label: '查询'
    ]
    listOpt:
        filterIt:->
        searchIt:->
        colNum: 3
        itemBtns: []
        events:
            'click .toolbar .sendBtn': ->
                c = @collection
                c.setCriteria util.setQ(@$el,'cpsuser','frm')
                c.resetFetch()

    addFormOpt:
        data:
            gname: 'gname'

m.outcomes =
    label: '分成结算'
    prop: [
        _ep 'day',
            label: '日期'
        _ep 'money',
            label: '金额'
        _ep 'earnings',
            label: '收益'
    ]
    listOpt:
        colNum: 3

m.user =
    label: '用户'

    prop: [
        _ep 'name',
            label: '用户名'
    ]

    listOpt:
        filterIt:->
        searchIt:->
        colNum: 3
        itemBtns: []
        events:
            'click .toolbar .sendBtn': ->
                c = @collection
                c.setCriteria util.setQ(@$el,'cpsuser')
                c.resetFetch()
    filter:[
        _ep 'cpsuser'

    ,
        key: 'sendBtn'
        type: 'btn'
        cls: cf.btnStr
        icon: 'search'
        label: '查询'
    ]

m.registerhistrory =
    label: '注册信息'
    prop: [
        _ep 'registertime',
            label: '注册时间'

        _ep 'passport',
            label: '注册账号'

        _ep 'gname',
            label: '游戏'

        _ep 'gserver',
            label: '游戏区服'

        _ep 'frm',
            label: '推广员frm'
    ]
    filter:
        passport: 'text:s:eq'

        frm: 'text:s:eq'

        registerstime:
            title: '开始时间'
            type: 'text'
            xtype: 'dTime'
            attrs:
                minView: 1

        registeretime:
            title: '结束时间'
            type: 'text'
            xtype: 'dTime'
            attrs:
                minView: 1
                val: new Date().addDays(1).pattern('yyyy-MM-dd HH:mm:ss')

        btn:
            type: 'btn'
            cls: cf.btnStr + ' sh'
            label: '搜索'
    listOpt: _listOpt


m.cpsuseranalysis =
    label: '充值结算'
    prop:[
        _ep 'cpsuser'

        _ep 'time',
            label: ' 结算时间'

        _ep 'paysum',
            label: ' 累计充值'

        _ep 'paycommission',
            label: ' CPS总分成'

        _ep 'channelcost',
            label: ' 渠道费'
    ]


    filter:[
        _ep 'cpsuser'
    ,
        code: 'stime'
        title: '开始时间'
        type: 'text'
        xtype: 'dTime'
        attrs:
            minView: 2
            fmt: 'yyyy-mm-dd'
            val: new Date().addDays(1).pattern('yyyy-MM-dd')
    ,
        code: 'etime'
        title: '结束时间'
        type: 'text'
        xtype: 'dTime'
        attrs:
            minView: 2
            fmt: 'yyyy-mm-dd'
            val: new Date().addDays(1).pattern('yyyy-MM-dd')
    ,
        key: 'sendBtn'
        type: 'btn'
        cls: cf.btnStr
        icon: 'search'
        label: '查询'
    ]
    listOpt:
        filterIt:->
        searchIt:->
        colNum: 6
        itemBtns: []
        btns: []
        events:
            'click .toolbar .sendBtn': ->
                c = @collection
                c.setCriteria util.setQ(@$el,'cpsuser','stime','etime')
                c.resetFetch()
