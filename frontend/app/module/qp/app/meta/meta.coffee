#require '../../../../lib/plugin/excellentExport'
#require '../../../../res/js/excellentexport/excellentexport.min'
#cf.exportTb = (evt, tb)->
#    tbv = $('#' + tb).closest('[data-cid]').data '_item'
#    cl = tbv.collection
#    if cl.criteria.q and cl.criteria.q.supplier_id and cl.criteria.q.ad_id
#        _max = cl.criteria.max
#        cl.resetFetch 'max', cl.count
#        tbv.afterAddAll = ->
#            if @collection.length is 0
#                popMsg '无数据', 'warning'
#                return
#            tag = $ "<a class='btn btn-danger btn-lg center-block' download='#{new Date().getTime()}.xls'>数据下载</a>"
#            ExcellentExport.excel(tag[0], tbv.$('table')[0], '#{e} excel file')
#            prompt('数据下载', tag)
#
#            tbv.afterAddAll = null
#            cl.criteria.max = _max
#            util.saveLocal location.hash, cl.criteria
#    else
#        popMsg '请先选择查询条件', 'warning'
#        return
require '../../../../lib/terminal/tf/dTime'

ptt = (v)->
    "#{v}%"

_start =
    title: '开始时间'
    type: 'text'
    xtype: 'dTime'
    attrs:
        minView: 2
        fmt: 'yyyy-mm-dd'
        val: new Date().pattern('yyyy-MM-dd')

_end =
    title: '结束时间'
    type: 'text'
    xtype: 'dTime'
    attrs:
        minView: 2
        fmt: 'yyyy-mm-dd'
        val: new Date().addDays(1).pattern('yyyy-MM-dd')

_qFun = (e)->
    c = @collection
    toolbar = @$('.toolbar')
    start = toolbar.find("[placeholder='开始时间']").val()
    end = toolbar.find("[placeholder='结束时间']").val()
    c.criteria =
        max: 15
        q: {start, end}
    c.resetFetch()

m.pay =
    label: '充值列表'
    prop: [
        _ep 'game',
            label: '游戏'

        _ep 'uid',
            label: '用户ID'

        _ep 'username',
            label: '用户名'

        _ep 'pay_time',
            label: '充值时间'

        _ep 'pay_money',
            label: '充值金额'

        _ep 'channel',
            label: '充值渠道'

    ]
    listOpt:
        btns: []
        itemBtns: []
        colNum: 6
        events:
            'click .toolbar .sh': _qFun
    filter:
        start: _start
        end: _end
        btn:
            type: 'btn'
            cls: cf.btnStr + ' sh'
            label: '搜索'

m.channel =
    label: '渠道总报'
    prop: [
        _ep 'day',
            label: '日期'

        _ep 'fcode',
            label: '渠道'

        _ep 'dau',
            label: 'DAU'

        _ep 'uv',
            label: 'UV'

        _ep 'pv',
            label: 'PV'

        _ep 'login_count',
            label: '登陆用户数'


        _ep 'nregister_count',
            label: '新注册用户数'

        _ep 'register_rate',
            label: '注册转化率'
            showText: ptt

        _ep 'register_retained',
            label: '次日留存率'
            showText: ptt

        _ep 'pay_count',
            label: '充值人数'

        _ep 'pay_money',
            label: '充值金额'

        _ep 'pay_rate',
            label: '付费率'
            showText: ptt

        _ep 'register_pay_count',
            label: '新注册用户充值人数'

        _ep 'register_pay_money',
            label: '新注册用户充值金额'

        _ep 'register_pay_rate',
            label: '新增付费率'
            showText: ptt

        _ep 'arpu',
            label: 'ARPU'

        _ep 'arppu',
            label: 'ARPPU'

    ]
    listOpt:
        colNum: 17
        btns: []
        itemBtns: []
        events:
            'click .toolbar .sh': _qFun

            'click .week': (e)->
                $.get util.restUrl('channelWeek'), (res)=>
                    @collection.reset res.entities
            'click .month': (e)->
                $.get util.restUrl('channelMonth'), (res)=>
                    @collection.reset res.entities
            'change ._datetime':(e)->
                dd = @$('._datetime')
                start = dd.eq(0).val()
                end = dd.eq(1).val()
                url = util.getUrlParams util.restUrl('exportChannelData'), {"q[start]":start,"q[end]":end}
                tt = @$('.exData')
                tt.attr 'href', url

#            'click .export': (e)->
#                $.get util.restUrl('exportChannelData'), (res)->
#                    cf.dm.l 'table', null,
#                        entity: 'channel'
#                        data: res.entities
#                        colNum: 17
#                        itemBtns: []
#                        btns: []
#                        afterAddAll:->
#                            tag = $ "<a class='btn btn-danger btn-lg center-block' download='#{new Date().getTime()}.xls'>数据下载</a>"
#                            ExcellentExport.excel(tag[0], @$('table')[0], '#{e} excel file')
#                            cf.prompt('数据下载', tag)

    filter:
        start: _start

        end: _end

        btn:
            type: 'btn'
            cls: cf.btnStr + ' sh'
            label: '搜索'

        export:
            type: 'btn'
            label: '导出数据'
            href: util.restUrl('exportChannelData')
            cls: cf.btnStr + ' exData'

        week:
            type: 'btn'
            label: '一周数据'
            cls: cf.btnStr + ' week'

        month:
            type: 'btn'
            label: '一个月数据'
            cls: cf.btnStr + ' month'
