cf.opt.entity.headRefEntity.push 'activity'

m.pushedItem =
    prop: [
        m._text 'account'

        m._text 'type'

        _ep 'title',
            showText: (v)->
                if _.isArray v
                    v.join('<br/>')
    ]

    btn:
        send: (it, e)->
            util.iBtn "plane", '发送推送'

        test: (it, e)->
            util.iBtn "user", '发送测试推送'

        remove: (it, e)->
            util.iBtn "remove", '删除本项'

    event:
        test:
            type: 'click'
            fun: (e)->
                d = @findData(e).attributes
                app.dm.add 'air', 'syncEntity',
                    title: '微信测试推送'
                    data: ->
                        account: d.account
                        mediaId: d.mediaId
                    prop: [
                        code: 'testUser'
                        xtype: 'multiSelect'
                        type: 'text'
                        label: '测试用户'
                        bind: true
                        attrs:
                            val: []
                            searchItem: 'username'
                            showImg: 'portrait'
                            setAttrs: ->
                                "_id,username,w_#{d.account}"
                            panelOpt:
                                entity: 'user'
                                noStr: 'Search User by username or Email'
                    ]
                    urlRoot: util.actUrl('wt/sendTest')
                    saveSuccess: ->
                        popMsg '测试推送发送成功'

        send:
            type: 'click'
            fun: (e)->
                alert '请前往微信控制台进行推送'
#                return unless confirm(iim('确定要发送吗？'))
#                d = @findData(e).attributes
#                $.post util.actUrl('wt/sendMessNews'),
#                    media_id: d.mediaId
#                    account: d.account
#                ,->
#                    popMsg '远程推送成功'

        remove:
            type: 'click'
            fun: (e)->
                return unless confirm(iim('确定要删除微信远程资源吗？'))
                d = @findData(e).attributes
                r = d.resId
                r.push d.mediaId
                $.post util.actUrl('wt/removeRes'),
                    res: r.join('::')
                    account: d.account
                , (r)->
                    popMsg '成功删除远程同步信息'
m.sendOpt =
    prop: [
        _ep 'title'

        _ep 'brief'

        m._tag 'hr'

        m._text 'entity'

        m._text 'tmpl'

        m._tag 'hr'

        _ep 'content:content'


        m._text 'thumb_media_id',
            label: '封面图片'

        m._text 'content_source_url',
            label: '原文链接'

        m._radio 'show_cover_pic',
            label: '显示封面图'

        m._radio 'showWeekday',
            label: '是否显示周几'
    ]
    listOpt:
        itemBtns: ['inlineEdit', 'formDel']


meta.syncEntity =
    prop: [
        m._itemTable 'pushedItem',
            attrs:
                itemBtns: ['test', 'send', 'remove', 'formDel']
                btns: null
                foot: false

        m._tag 'hr'

        _ep 'title',
            ph: '推送日期,关键字等'

        code: 'ref'
        xtype: 'ref'
        type: 'holder'
        noName: true
        attrs:
            selectBoxOpt:
                setAttrs: 'title,brief,subTitle,author,master,refFile,startedDate,_e'
                afterPick: (d)->
                    opt =
                        show_cover_pic: 1
                        title: d.title + ' ' + (d.subTitle || '')
                        entity: d._e
                        tmpl: d._e

                    opt.thumb_media_id = if d.refFile and d.refFile.head and d.refFile.head[0]
                        d.refFile.head[0].split('?')[0]
                    else
                        'default.jpg'

                    if d._e is 'activity'
                        if d.startedDate
                            dd = util.parseLocalDate(d.startedDate)
                            dd.setHours(dd.getHours() + 8)
                            d.title = "【#{iCat('w')[dd.getDay()]}】#{opt.title}"
                            d.content_source_url = d._id
                    item = $.extend opt, d
                    @form.model.get('sendOpt').push item
                    $('#sendOpt').children().data('_item').collection.add item
                    @unsetVal()

        m._itemTable 'sendOpt',
            id: 'sendOpt'
            attrs:
                itemBtns: ['inlineEdit','formDel']
                btns: ['inlineAdd']
                foot: false

        m._select 'account',
            id: 'pAcc'
            noName: true
            attrs:
                entity: 'pubAccount'
                _attrs: 'code,title,appId'
                keyVal: 'code,title'
            events:
                change: (e)->
                    t = util.ct(e)
                    items = @model.get 'sendOpt'
                    unless items.length
                        alert '请先选择同步列表'
                        t.val '0'
                        return

                    if t isnt '0'
                        t.data 'ret', t.data('sdata').findBy 'code', t.val()
                    else
                        t.data 'ret', null

    ]

    fmBtn:
        sendOpt: ->
            isShow: (d)->
                d._id
            label: '同步到微信'
            cls: _st.btn('success', 'lg')

    editFormOpt:
        btns: ['back', 'save', 'sendOpt']

#        before: (attr)->
#            pa = $('#pAcc').ret
#            for it,i in attr.sendOpt
#
#            attr

        exEvents:
            'click .sendOpt': (e)->
                unless @model.get('sendOpt').length
                    popMsg '请先选择要同步的信息', 'warning'
                    return
                pa = $('#pAcc').data 'ret'
                unless pa
                    popMsg '请先选择账号再发送', 'warning'
                    return

                mod = @model
                opt = mod.toJSON()
                opt.account = pa.code

                for it,i in opt.sendOpt
                    if it._e is 'activity'
                        if it.master and it.master.length > 0
                            it.author = _.pluck(it.master, 'username').join(',')
                        else if it.author
                            it.author = it.author.username
                        else
                            it.author = user.username

                        it.digest = it.brief
                        it.title = util.cutText(it.title, 64)
                        it.content_source_url = "http://#{cf.community.url}/r/wt/login?wCode=#{pa.code}&page=/activity/#{it._id}&appId=#{pa.appId}&func=enroll"

                    opt.sendOpt[i] = _.pick it, 'entity', '_id', 'tmpl', 'thumb_media_id', 'author', 'title', 'content_source_url', 'digest', 'show_cover_pic'

                $.postJSON util.actUrl('wt/uploadNews'), opt, (res)->
                    if res.entity
                        items = mod.get('pushedItem') || []
                        items.push res.entity
                        mod.set 'pushedItem', items
                        mod.save(silent: true)


#                if @_resId
#                    $.get util.actUrl('wt/sendNews'), media_id: @resId, ->
#                        popMsg '发送成功'
#                else
#                    popMsg '还未同步新闻'
#meta.syncEntitys =
#    ref: meta.exCom 'ref',
#        attrs:
#            clickShow: true
#            setAttrs: 'title,subTitle,author,master,refFile,startedDate,_e'
#            afterPick: (d)->
#                opt =
#                    show_cover_pic: 1
#                    title: d.title + ' ' + (d.subTitle || '')
#                    entity: d._e
#                    tmpl: d._e
#
#                opt.thumb_media_id = if d.refFile and d.refFile.head and d.refFile.head[0]
#                    d.refFile.head[0].split('?')[0]
#                else
#                    'default.jpg'
#
#                if d._e is 'activity'
#                    if d.startedDate
#                        dd = util.parseLocalDate(d.startedDate)
#                        dd.setHours(dd.getHours() + 8)
#                        d.title = "【#{iCat('w')[dd.getDay()]}】#{opt.title}"
#
#                        ps = $("select[name=account]")
#                        d.content_source_url = "http://#{cf.community.url}/r/wt/login?wCode=#{ps.val()}&page=/activity/#{d._id}&appId=#{ps.attr('appId')}&func=enroll"
#
#                util.del 'subTitle', d
#                util.del 'title', d
#
#                item = $.extend opt, d
#
#                @form.model.get('sendOpt').push item
#                getItems().add item
#                @unsetVal()


#    _:
#        item: ['account', 'refClass', 'ref', 'testUser', 'sendOpt']
#
#    testUser:
#        id: 'testUser'
#        xtype: 'multiSelect'
#        type: 'text'
#        label: '测试用户'
#        bind: true
#        attrs:
#            val: []
#            searchItem: 'username'
#            showImg: 'portrait'
#            setAttrs: ->
#                v = $("select[name='account']").val()
#                "_id,username,w_#{v}"
#            panelOpt:
#                entity: 'user'
#                noStr: 'Search User by username or Email'
#
#    sendOpt:
#        xtype: 'jsonTable'
#        id: 'sendOpt'
#        attrs:
#            autoSave: true
#            entity: 'sendOpt'
#            toFetch: false
#            foot: false
#            formAddOpt:
#                className: 'form-break'
#            formEditOpt:
#                className: 'form-break'
#            _func: null
#            _prop: 'sendOpt'
#            _dv: []


#    item: [
#        'title'
#        'brief'
#
#        '_hr'
#
#        'entity'
#        'tmpl'
#
#        '_hr'
#
#        'content'
#
#        'thumb_media_id'
#        'content_source_url'
#        'show_cover_pic'
#        'showWeekday'
#    ]
#    show_cover_pic:
#        type: 'radio'
#        label: '显示封面图'
#        val: 1
#
#
#    :
#        label: ''
#
#    :
#        label: '封面图片'
#
#    entity: {}
#    tmpl: {}
#    showWeekday:
#        type: 'radio'
#        val: 1
#        data:
#            1: '是'
#            o: '否'
#    _:
#
#        tbItem:
#            refFile:
#                type: 'img'
#                w: '180'
#                val: (it)->
#                    img = if it.refFile and it.refFile.head
#                        it.refFile.head[0]
#                    else
#                        'images/default.jpg'
#                    util.resPath cf.community, img
#            title: {}
#            entity: {}
#            _opt:
#                type: 'btns'
#                w: 120
#        action: ->
#            ['popEdit', 'formDel']
#        code: 'testUser'
#            id: 'testUser'
#            xtype: 'multiSelect'
#            type: 'text'
#            label: '测试用户'
#            bind: true
#            attrs:
#                val: []
#                searchItem: 'username'
#                showImg: 'portrait'
#                setAttrs: ->
#                    v = $("select[name='account']").val()
#                    "_id,username,w_#{v}"
#                panelOpt:
#                    entity: 'user'
#                    noStr: 'Search User by username or Email'