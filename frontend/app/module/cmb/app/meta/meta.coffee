md5 = require '../../../../res/js/md5'
tree = require '../../../../lib/widget/tree/tree'
require '../../../../lib/terminal/tf/dTime'

_epType =
    '0': '员工'
    '1': '临时卡'
    '2': '保安'
    '3': '保洁'

$.extend m.common,
    psd: _ep 'password',
        valid:
            required: true
            minlength: 3
            maxlength: 25
        cvt: (v)->
            md5(v)

    sex: m._select 'sex',
        attrs:
            data:
                0: '男'
                1: '女'
        showText: (v)->
            if v then '女' else '男'

    flag:
        type: 'select'
        data:
            9: '奖励（虚拟）'
            12: '补助（虚拟）'
            13: '现金（真实）'

    description:
        type: 'text'
        label: '备注'
        valid:
            maxlength: 13

m.common.password = $.extend m.common.password,
    noTb: true
    valid:
        required: true
        minlength: 3
    cvt: (v)->
        md5(v)

$.extend m.user,
    loginUrl: util.actUrl 'login'
    loginProp: [
        _ep 'username'
        _ep 'password'
        _ep 'code'
    ]

    prop: [
        _ep 'email'

        m._select 'role',
            title: '请选择角色'
            attrs:
                entity: 'role'
                keyVal: 'id,name'
            showText: (v, d)->
                d.role_name
            events:
                change: (e)->
                    t = util.ct(e)
                    @model.set 'role_id', t.val()
                    @model.set 'role_name', t.find('option:selected').text()
                    @model.unset 'role'

        _ep 'password'

        _ep 'googlefa'

        _ep 'status',
            attrs:
                data:
                    0: '无效'
                    1: '有效'
            showText: (v)->
                ii("user_status_#{v}")
    ]
    listOpt:
        colNum:5

m.employee =
    prop: [
        m._radio 'type',
            val: '0'
            attrs:
                data: _epType
                inline: true

            showText: (v)->
                _epType[v]
            events:
                change: (e)->
                    v = util.ct(e).val()
                    me = @meta.prop
                    if v is '0'
                        me.codeBy('person_no').valid =
                            required: true
                        me.codeBy('email').valid =
                            required: true
                            email: true
                    else
                        me.codeBy('person_no').valid = {}
                        me.codeBy('email').valid = {}
                        @model.validateItem 'email'
                        @model.validateItem 'person_no'

        m._text 'person_no'

        m._text 'email',
            valid: {}

        m._text 'person_name',
            valid:
                required: true

        _ep 'sex'
        m._text 'card_id',
            valid:
                required: true
    ]
    listOpt:
        itemBtns: []
    addFormOpt:
        urlRoot: '/1/api/employee/add'
        _saveSuccess: (model, res)->
            if res.msg
                popMsg res.msg, 'success'
            history.go(-1)

m.batchBonus =
    prop: [
        m._textarea 'ehrs'

        m._select 'flag',
            attrs:
                data:
                    9: '奖励（虚拟）'
                    12: '补助（虚拟）'
                    13: '现金（真实）'
        m._money 'money'

        _ep 'description'
    ]
    listOpt:
        toFetch: false
    addFormOpt:
        urlRoot: '/1/api/employee/batch_bonus'
        _saveSuccess: (model, res)->
            if res.msg
                popMsg res.msg, 'success'
            history.go(-1)

m.role =
    prop: [
        m._text 'name'
    ,
        m._textarea 'desc'
    ,
        code: 'selected_menus'
        xtype: tree
        attrs:
            entity: 'menu'
            head: false
            toFetch: true
            showName: 'name'
            parentKey: 'parent_id'
            fixed: true
            select: true
            expend: true
            callback: ->
                if @val
                    for it in @val
                        @$(".ckb[sid='#{it}']").prop 'checked', true
            ckbChildVal: (t)->
                v = t.attr 'sid'
                @val ?= []
                if t.is ':checked'
                    @val.addUniq v
                else
                    @val.remove v
                @form.model.set @name, @val

            ckbParentVal: (t, all)->
                act = if t.is ':checked'
                    'addUniq'
                else
                    'remove'
                @val ?= []
                for it in all
                    @val[act] $(it).attr 'sid'

                @form.model.set @name, @val
    ]

m.flow =
    url: util.restUrl('employee/flow')
    prop: [
        m._text 'transaction_id'
#        m._text 'money_memo'
        m._text 'money_type',
            showText: (v)->
                ii("money_type_#{v}")
        m._text 'money',
            showText: (v, d)->
                "#{d.money / 100}元"
        m._text 'money_memo'
        m._text 'time'

    ]

m.menu =
    prop: [
        m._text 'name'

        m._text 'href'

        m._select 'type',
            noChange: true
            attrs:
                data:
                    file: '文件'
                    'folder-close': '文件夹'
            events:
                change: (e)->
                    v = util.ct(e).val()
                    @model.unset 'type'
                    if v is 'folder-close'
                        if !@model.get(@p.subName)
                            @model.set @p.subName, []
                    else
                        @model.unset @p.subName

        m._number 'sort'

#        m._select 'parent_id',
#            attrs:
#                entity: 'menu'
#            keyVal: 'id,name'

        m._radio 'show',
            attrs:
                data:
                    1: '显示'
                    0: '隐藏'

    ]

m.cafe =
    label: '咖啡'
    prop: [
        m._text 'cname',
            label: '中文名'


        m._text 'ename',
            label: '英文名'


        m._text 'price',
            label: '价格'

        m._text 'bprice',
            label: '大杯'
            val: 0

        m._text 'thumb',
            label: '图片地址'
    ]

    listOpt:
        itemBtns: ['del']
        max: 100

reType =
    0: '午餐'
    1: '晚餐'

m.restaurant =
    label: '餐厅菜品'
    prop: [
        m._radio 'dtype',
            label: '种类'
            showText: (v)->
                reType[+v]
            attrs:
                data: reType

        m._text 'dishname',
            label: '菜品名称'

        _ep 'servicetime',
            xtype: 'dTime'
            label: '供应时间'
            readonly: true
            showText: (v)->
                v?.dStr()
            attrs:
                minView: 2
                fmt: 'yyyy-mm-dd'
                startDate: new Date()
    ]
    tbBtn: ['popEdit']
    editFormOpt: ->
        prop: [
            _ep 'restaurant:dishname'
        ]
        cols: 'col-xs-3:col-xs-9'
        _saveSuccess: (model)->
            model.trigger 'change'
            model.view.closeDlg()
    listOpt:
        criteriaOpt: ->
            servicetime: new Date().pattern('yyyyMMdd')

_fbtp =
    0: '猎豹大楼'
    1: '猎豹餐厅'
    2: 'CM Cafe'

m.feedback =
    label: '反馈'
    prop: [
        m._text 'uid'

        m._text 'ctime',
            label: '创建时间'
            type: 'date'

        m._radio 'tp',
            label: '分类'
            showText: (v)->
                _fbtp[+v]
            attrs:
                data: _fbtp

        m._textarea 'content',
            showText: (v, b, c, m)->
                if m.mode is 'modal'
                    v
                else
                    util.adjustText(v, 45)
    ]
    listOpt:
        itemBtns: ['popView']
        btns: []
    viewOpt:
        toFetch: false