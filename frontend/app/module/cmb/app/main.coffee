require './style/main.less'

router = require('../../console/app/lib/consoleRouter')
u = require('../../console/app/lib/consoleUser')

Backbone.Model.setPost()
cf.id = 'id'
Backbone.Model::idAttribute = cf.id

$.extend cf,
    loadTmpl: (name) ->
        try
            require "./tmpl/#{name}.jade"
        catch
            require "../../console/tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"
        
cf.actPre = cf.rsPre = 'https://cmbank_manager.cmcm.com/1/api/'
cf.index = 'console'
cf.community =
    name: 'CMB后台管理'
    resPath: '/'

require '../../../lib/meta/_status'
require '../../../lib/terminal/h5_mgm'
require "./meta/meta"

cf.view.form::btns=['back','save']
cf.view.table::noLastTime = true

btn = require '../../../lib/widget/btn'
treeEntityForm = require '../../../lib/widget/tree/treeEntityForm'

cf._mkErrMsg = (sign, res)->
    if er = res.Error #) and er
        er = JSON.parse(er) if _.isString(er) and er.length
        popMsg((ii("ret_#{er.ret}") || '') + ' ' + (er.msg || ''), sign)

m._.fmBtn.charge = ->
    cls: _st.btn('primary', 'lg', true)

m._.fmBtn.dismiss = ->
    isShow: (d)->
        d.card_status isnt 5
    cls: _st.btn('danger', 'lg', true)

m._.fmBtn.undismiss = ->
    isShow: (d)->
        d.card_status is 5
    cls: _st.btn('success', 'lg', true)

#cf.ajaxErr = (e, xhr, settings) ->
#    result = $.parseJSON(xhr.responseText)
#
#        if xhr.status < 300
#            sign = "success"
#        else if (xhr.status >= 300 and xhr.status < 500)
#            sign = "warning"
#        else
#            sign = "danger"
#
#        eval(result.action) if result.action
#
#        if cf._mkErrMsg
#            cf._mkErrMsg(sign, result)
#        else
#            text = result.msg
#            if text and text.indexOf 'm_' > -1
#                text = ii(text, 'post')
#            popMsg(text, sign) if result.msg and !cf.noReply
#            cf.noReply = false


bTran = (v)->
    "#{+v / 100} CMB"

window.user = new u {},
    logoutUrl: util.restUrl('logout')
    permission: ['console']
    afterLogin:->
        new cf.view.consoleMenu
            initMenu:[]
            preLogin: ->
                @ctn.empty()
            parent: '#ubb'
            className: 'nav navbar-nav col-xs-12'

    roles: [
        title: 'admin'
    ]

    check: ->
        true

    func: ->
        res = @funcItem()
        res.shift()
        res

reRenderView = ->
    _.delay ->
        $('.searchBox .search').trigger 'click'
    , 400

new router
    checkSvrAuth: util.restUrl('me')
    checkAuth: false
    
    dfPath: 'search'
    logoutPath: 'login'
    
    checkPage: (name)->
        if name in ['account', 'data', 'menu', 'search']
            unless user.isLogin()
                return false
        true
    checkFail: ->
        cf.r 'login'

    loadMod:->
        require '../../console/app/mods/data'
        cf.exLabel()

    routes:
        '': 'index'
        '!/search': 'search'
        '!/login': 'login'
        '!/menu': 'menu'
        '!/*path': 'dAct'

    account: ->
        app.dm.form 'air', 'user',
            title: '密码修改'
            btns: ['save']
            urlRoot: util.actUrl("password")
            prop: [
                _ep 'email',
                    readonly: true
                m.common.psd
            ]
            data:
                email: user.get('email')

    menu: ->
        new treeEntityForm
            entity: 'menu'
            title: '菜单管理'
            head: true
            foot: false
            toFetch: true
            style: 'panel-primary'
            showName: 'name'
            parent: @ctn
            parentKey: 'parent_id'

    search: ->
        @dm.tag @ctn,
            cleanAll: true
            mode: 'panel'
            title: '员工检索'
            _key: 'person_no'
            btn: true
            head: true
            style: 'panel-primary'
            className: 'container'
            tmpl: 'searchEmp'
            events:
                'click ._key': (e)->
                    t = util.ct(e)
                    @_key = t.attr 'key'
                    t.parent().parent().prev().find('.text-center').text t.text()

                'keyup #q': (e)->
                    $('.search').trigger('click') if e.keyCode is 13

                'click .search': ->
                    v = @$('#q').val().trim()
                    unless v
                        popMsg '请输入查询条件', 'warning'
                        return
                    $('#employeeInfo').remove()
                    app.ctn.append cf.rtp 'col2',
                        id: 'employeeInfo'
                        left: 'col-md-4'
                        right: 'col-md-8'

                    app.dm.view app.ctn.find('.leftBox'), 'employee',
                        title: '员工信息'
                        cols: '25%,auto'
                        toolbar: true
#                        reRendered: true
                        urlRoot: util.restUrl "employee/search?#{@_key}=#{v}"
                        tagClass: 'table table-striped table-bordered viewTable'
                        prop: [
                            _ep 'card_no',
                                btns: [
                                    label: '解绑'
                                    isShow: (d)->
                                        d.status and d.card_status isnt 1
                                    cls: 'btn btn-xs btn-danger unbind'
                                ,
                                    label: '挂失'
                                    isShow: (d)->
                                        d.status and d.card_status isnt 1
                                    cls: 'btn btn-xs btn-danger rpLose'
                                ,
                                    label: '解除挂失'
                                    isShow: (d)->
                                        d.status and d.card_status == 1
                                    cls: 'btn btn-xs btn-success unLose'
                                ,
                                    label: '换卡'
                                    isShow: (d, m)->
                                        d.status and d.card_no and d.card_status isnt 100
                                    show: 100
                                    cls: 'btn btn-xs btn-danger change'
                                ]

                            _ep 'employee_id'

                            _ep 'person_no'

                            _ep 'person_name',
                                editable:
                                    urlRoot: util.restUrl('employee/person_name')
                                    before: (attr)->
                                        attr.employee_id = @pm.get 'employee_id'
                                        attr

                            _ep 'mail',
                                editable:
                                    urlRoot: util.restUrl('employee/mail')
                                    before: (attr)->
                                        attr.employee_id = @pm.get 'employee_id'
                                        attr

                            _ep 'sex',
                                showText: (v)->
                                    if +v then '女' else '男'
                                editable:
                                    urlRoot: util.restUrl('employee/sex')
                                    before: (attr)->
                                        attr.employee_id = @pm.get 'employee_id'
                                        attr
                                    
                            _ep 'balance',
                                showText: bTran
                                btns:[
                                    label: '扣款'
                                    isShow: (d)->
                                        d.status
                                    cls: 'btn btn-xs btn-danger deduct'
                                ,
                                    label: '退款'
                                    isShow: (d)->
                                        d.status
                                    cls: 'btn btn-xs btn-danger refund'
                                ,
                                    label: '转账'
                                    isShow: (d)->
                                        d.status
                                    cls: 'btn btn-xs btn-danger transfer'
                                ]

                            _ep 'real_balance',
                                showText: bTran

                            _ep 'virtual_balance',
                                showText: bTran

                            _ep 'card_status',
                                isShow: (v)->
                                    if v.status is 0
                                        false
                                    else
                                        true
                                showText: (v)->
                                    ii("card_status_#{v}")
                        ]
                        exEvents:
                            'click .undismiss': (e)->
                                return unless confirm(ii('m_sure'))
                                $.post util.restUrl('employee/card/unloss'),
                                    employee_id: @model.get 'employee_id'
                                ,->
                                    popMsg '解除离职成功'
                                    reRenderView()

                            'click .dismiss': (e)->
                                return unless confirm(ii('m_sure'))
                                $.post util.restUrl('employee/card/dismiss'), 
                                    employee_id: @model.get 'employee_id'
                                ,->
                                    popMsg '离职成功'
                                    reRenderView()

                            'click .charge': (e)->
                                app.dm.form 'air', 'employee',
                                    title: '奖励'
                                    urlRoot: util.restUrl('employee/bonus')
                                    prop: [
                                        m._select 'flag',
                                            attrs:
                                                data:
                                                    9: '奖励（虚拟）'
                                                    12: '补助（虚拟）'
                                                    13: '现金（真实）'
                                        m._number 'money',
                                            valid:
                                                required:true
                                        m._textarea 'description',
                                            label: '备注'
                                    ]
                                    btns: ['save']
                                    data:
                                        employee_id: @model.get 'employee_id'
                                    _saveSuccess: (m)->
                                        popMsg '充值成功'
                                        m.view.closeDlg()
                                        reRenderView()

                            'click .unbind': (e)->
                                return unless confirm(ii('m_sure'))
                                $.post util.restUrl('employee/unbind_card'),
                                    employee_id: @model.get 'employee_id'
                                , (res)->
                                    popMsg '已解绑'
                                    reRenderView()

                            'click .rpLose': (e)->
                                return unless confirm(ii('m_sure'))
                                $.post util.restUrl('employee/card/loss'),
                                    employee_id: @model.get 'employee_id'
                                , (res)->
                                    popMsg '已挂失'
                                    reRenderView()

                            'click .unLose': (e)->
                                return unless confirm(ii('m_sure'))
                                $.post util.restUrl('employee/card/unloss'),
                                    employee_id: @model.get 'employee_id'
                                , (res)->
                                    popMsg '已解除挂失'
                                    reRenderView()

                            'click .transfer': (e)->
                                eid = @model.get 'employee_id'
                                app.dm.form 'air', 'employee',
                                    urlRoot: util.restUrl('employee/virement')
                                    prop: [
                                        m._text 'increase_id',
                                            label: '转入员工ID'
                                            valid:
                                                required: true
                                    ]
                                    cols: 'col-xs-3:col-xs-9'
                                    title: '转账'
                                    btns: ['save']
                                    before: (attr)->
                                        attr.reduce_id = eid
                                        attr
                                    _saveSuccess: (m)->
                                        popMsg '转账成功'
                                        m.view.closeDlg()
                                        reRenderView()

                            'click .deduct': (e)->
                                eid = @model.get 'employee_id'
                                app.dm.form 'air', 'employee',
                                    urlRoot: util.restUrl('employee/deduct')
                                    prop: [
                                        m._money 'money',
                                            label: '金额'
                                            
                                        _ep 'description'
                                    ]
                                    title: '扣款'
                                    btns: ['save']
                                    before: (attr)->
                                        attr.employee_id = eid
                                        attr.money = new Number(attr.money).toFixed(2)
                                        attr
                                    _saveSuccess: (m)->
                                        popMsg '扣款成功'
                                        m.view.closeDlg()
                                        reRenderView()

                            'click .refund': (e)->
                                eid = @model.get 'employee_id'
                                app.dm.form 'air', 'employee',
                                    urlRoot: util.restUrl('employee/refund')
                                    prop: [
                                        m._money 'money',
                                            label: '金额'

                                        m._radio 'is_virtual',
                                            label: '虚拟'
                                            valid:
                                                required: true
                                            attrs:
                                                data:
                                                    1: '是'
                                                    0: '否'

                                        _ep 'description'

                                    ]
                                    title: '退款'
                                    btns: ['save']
                                    before: (attr)->
                                        attr.employee_id = eid
                                        attr.money = new Number(attr.money).toFixed(2)
                                        attr
                                    _saveSuccess: (m)->
                                        popMsg '退款成功'
                                        m.view.closeDlg()
                                        reRenderView()

                            'click .change': (e)->
                                eid = @model.get 'employee_id'
                                app.dm.form 'air', 'employee',
                                    urlRoot: util.restUrl('employee/replace_card')
                                    prop: [
                                        m._text 'card_id',
                                            valid:
                                                required: true
                                    ]
                                    title: '换卡'
                                    btns: ['save']
                                    before: (attr)->
                                        attr.employee_id = eid
                                        attr
                                    _saveSuccess: (m)->
                                        popMsg '已换卡成功'
                                        m.view.closeDlg()
                                        reRenderView()

                            'click .binding': (e)->
                                eid = @model.get 'employee_id'
                                pn = @model.get 'person_no'
                                app.dm.form 'air', 'employee',
                                    urlRoot: util.restUrl('employee/card')
                                    prop: [
                                        m._text 'card_id',
                                            valid:
                                                required: true
                                    ]
                                    title: '绑定卡号'
                                    btns: ['save']
                                    before: (attr)->
                                        attr.employee_id = eid
                                        attr
                                    _saveSuccess: (m)->
                                        popMsg '绑定成功'
                                        m.view.closeDlg()
                                        $('a[key="person_no"]').trigger('click')
                                        $('#q').val pn
                                        reRenderView()

                            'click .search': (e)->
                                eid = @model.get 'employee_id'
                                app.dm.tb app.ctn.find('.rightBox'), 'flow',
                                    btns: []
                                    itemBtns: []
                                    colNum: 6
                                    toolbar: false
                                    setCriteria: ->
                                        employee_id: eid
                        btns: ['charge', 'dismiss','undismiss']
                        topBtns: [
                            label: '查询流水'
                            icon: 'search'
                            isShow:(d)->
                                d.status isnt 0
                            cls: 'btn btn-sm btn-primary search'
                        ,
                            title: '绑定卡号'
                            icon: 'retweet'
                            isShow:(d)->
                                d.status isnt 1
                            cls: 'btn btn-sm btn-primary binding'
                        ]
                        style: 'panel-default'
                        cleanAll: false
                        noData: ->
                            popMsg '没有数据', 'warning'
                        callback: ->
                            if @model.get('card_status') > 1
                                popMsg "您的工卡状态为异常"
