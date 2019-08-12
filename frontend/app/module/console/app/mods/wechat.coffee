treeForm = require '../../../../lib/widget/tree/treeForm'
wt = require '../../../../lib/func/wechat'

require '../meta/pubAccount'
require '../meta/agentOp'
require '../meta/syncEntity'
#require '../meta/wechatMenu'
#require '../meta/wtUploaded'

ctn = '#main'

meta.wechatMenu =
    prop: [
        m._select 'mType',
            label: '类型'
            noChange: true
            attrs:
                data:
                    'folder-close': '目录'
                    file: '文件'
            events:
                change: (e)->
                    v = util.ct(e).val()
                    @rmInput 'type'
                    @rmInput 'key'
                    @rmInput 'url'
                    if v is 'file'
                        @renderSpeProp @prop.codeBy('type')
                        $("select[name='type']").trigger 'change'
                        @model.unset @p.subName
                    else
                        if !@model.get(@p.subName)
                            @model.set @p.subName, []


        m._text 'name'

        m._select 'type',
            attrs:
                data: [
                    'click'
                    'view'
                    'scancode_push'
                    'scancode_waitmsg'
                    'pic_sysphoto'
                    'pic_photo_or_album'
                    'pic_weixin'
                    'location_select'
                ]
            events:
                change: (e)->
                    m =
                        click: 'key'
                        view: 'url'
                    for k,v of m
                        @rmInput v
                    it = m[util.ct(e).val()]
                    if it
                        @renderSpeProp @prop.codeBy(it)

        m._text 'key',
            valid:
                required: true

        m._text 'url',
            valid:
                required: true
    ]

initItem = (i = '')->
    id: util.randomChar(4)
    mType: 'file'
    name: '菜单' + i
    type: 'click'
    key: 'key'

handleMenuData = (data)->
    if data.menu and data.menu.button
        data.menu.button
    else
        initItem(it) for it in [1, 2, 3]


layout = ->
    app.initLayout 'wechat', '2-10', ->
        $(ctn).before cf.rtp 'wtInfo'
        title: iim('m_mgm', 'wechat')
        tmpl: 'dataNavItem'
        data: [
            key: 'pubAccount'
            row: 10
        ,
            key: 'agentOp'
            row: 20
        ,
            key: 'syncEntity'
            row: 40
        ]
for it in [
    'pubAccount'
    'agentOp'
    'syncEntity'
]
    cf.view.ipBtn 'wechat', it, ctn,
        layout: layout
        func: 'tb'
        listOpt: m[it].listOpt
        
app.enhance
    routes:
        '!/wechat/pubAccount/:id/menu': 'menu'

    menu: (id)->
        layout()
        $(@_mod_ctn).html util.layout
            side: 'col-sm-3'
            form: 'col-sm-9'

        $.get util.restUrl("pubAccount/#{id}"), (res)->
            if et = res.entity
                new treeForm
                    entity: 'wechatMenu'
                    parent: app._mod_ctn
                    pubData: et
                    modeContext: ->
                        style: 'panel-primary'
                        head: true
                        title: iim('m_menu', 'wechat')
                        foot: true
                    data:
                        sub_button: handleMenuData(et)
                    className: 'col-md-4'
                    btns: []
                    rName: 'menu'
                    showName: 'name'
                    subName: 'sub_button'
                    toFetch: false
                    formOpt:
                        callback: ->
                            @$('select').trigger 'change'
                    exEvents:
                        'click .saveRes': ->
                            @data = @model.toJSON()
                            @pubData.menu =
                                button: @data[@subName]

                            new cf.model.entity(@pubData,
                                entity: 'pubAccount'
                            ).save()

                        'click .sync': ->
                            pub = @pubData
                            return unless confirm(iim('m_sure', iim('m_upload', 'menu')))
                            pd = @data[@subName].slice()
                            pd.recSet @subName, (it)=>
                                util.del 'id', it
                                util.del 'mType', it
                                if it.url and it.url.indexOf('http') is -1
                                    [func,page,state,scope] = it.url.split(':')
                                    ps = ["wCode=#{pub.code}", "appId=#{pub.appId}"]
                                    func && ps.push "func=#{func}"
                                    page && ps.push "page=#{page}"
                                    state && ps.push "state=#{state}"
                                    scope && ps.push "scope=#{scope}"
                                    it.url = "http://#{cf.community.url}/a/wt/login?#{ps.join('&')}"
                            wt.callApi 'createMenu',
                                menu:
                                    button: pd
                                pubCode: @pubData.code
                                code: cf.code

                        'click .back': ->
                            history.go(-1)

                    callback: ->
                        @foot.append tu.btn '保存', 'saveRes', 'primary'
                        @foot.append tu.btn '返回', 'back', null
                        @foot.append tu.btn '同步微信', 'sync', 'primary'
#




#                        "<a disabled class='saveRes btn btn-primary'>保存</a>"
#                        @foot.append "<a disabled class='sync btn btn-primary'>同步微信</a>"
#                        @foot.append "<a onclick='history.go(-1)' class=' btn btn-primary'>返回</a>"





#                        @model.set('menu', button: @data[@subName])
#                        @model.save()
#                @data[@subName].recSet @subName, (it) =>
#                    it.name = it.label
#                    it.type = it.kind
#                    util.del 'label', it
#                    util.del 'kind', it
#                    util.del 'id', it
#                    util.del 'pid', it
#                    util.del 'fixed', it
#                    if it.type is 'view'
#                        util.del 'key', it
#                    else if it.type is 'click'
#                        util.del 'url', it
#                    if it[@subName]
#                        util.del 'key', it
#                        util.del 'url', it
#                        util.del 'type', it
#                        log 'zzz'
#                        @model.set('menu', button: @data[@subName])
#                        @model.save()
#                return unless confirm(iim('m_sure', iim('m_upload', 'menu')))
#
#                pd = @data[@subName].slice()
#                pd.recSet @subName, (it)=>
#                    if it.url and it.url.indexOf('http') is -1
#                        [func,page,state,scope] = it.url.split(':')
#                        ps = ["wCode=#{@_data.code}", "appId=#{@_data.appId}", "func=#{func}"]
#                        page && ps.push "page=#{page}"
#                        state && ps.push "state=#{state}"
#                        scope && ps.push "scope=#{scope}"
#                        it.url = "http://#{cf.community.url}/r/wt/login?#{ps.join('&')}"
#                wt.callApi 'createMenu',
#                    menu:
#                        button: pd
#                    pubCode: @_data.code
#                    code: cf.code


#        if act is 'info'
#            $(@_mod_ctn).html cf.rtp 'wtInfo',
#                c: cf.community
#            if p is 'edit'
#            else if p is 'add'
#            else
#            @dm.tb $(@_mod_ctn), 'pubAccount',
#                style: 'panel-info'
#                btns: ['popAdd']
#                cleanAll: false
#                formEditOpt:
#                    toFetch: true

#        else if act is 'code'
#            @dm.tb @_mod_ctn, 'agentOp',
#                btns: ['popAdd']

#        else if act is 'post'
#        @dm.form @_mod_ctn, 'syncEntity',
#            urlRoot: util.actUrl 'wt/uploadNews'
#            cleanAll: true
#            toFetch: false
#            _saveSuccess: (m, res)->
#                v = m.view
#                v._resId = res.resId
#                unless $('.syncWechat').length
#                    $('.panel-footer .btnCtn').append '<a class="btn btn-warning btn-lg delWt">删除</a><a class="btn btn-danger btn-lg syncWechat">推送文章</a>'
#            before: (attr)->
#                for it,i in attr.sendOpt
#                    if it.master and it.master.length > 0
#                        it.author = _.pluck(it.master, 'username').join(',')
#                    else if it.author
#                        it.author = it.author.username
#                    else
#                        it.author = user.username
#                    it.digest = it.brief
#                    it.title = util.cutText(it.title, 64)
#                    attr.sendOpt[i] = _.pick it, 'entity', '_id', 'tmpl', 'thumb_media_id', 'author', 'title', 'content_source_url', 'digest', 'show_cover_pic'
#                attr
#            exEvents:
#                'click .syncWechat': (e)->
#                    if @_resId
#                        $.get util.actUrl('wt/sendNews'), media_id: @resId, ->
#                            popMsg '发送成功'
#                    else
#                        popMsg '还未同步新闻'

#        else if act is 'wtUploaded'
#            @dm.tb $(@_mod_ctn), 'wtUploaded'

