require '../../../lib/func/showInTd'

m.answer =
    prop:[]
    btn:
        isShow: (it)->
            log it.isShow
            icon = if it.isShow
                "eye-open"
            else
                "eye-close"
            util.iBtn icon

    event:
        isShow:
            type: 'click'
            fun: (e)->
                m = @findData(e)
                m.set 'isShow', !m.get('isShow')
                m.saveAttr 'isShow'

    addFormOpt:
        data: ->
            qr = if @qs.user
                @qs.user
            else
                _.pick @qs, 'username', 'phone'
            d =
                questioner: qr
                issue: _.pick @qs, '_id', 'content', 'dateCreated'
            if user.shopId
                d.shopId = user.shopId
            d

    listOpt:
        _attrs: ->
            'username,content,dateCreated,questioner,phone,isShow'
        itemBtns: ['isShow', 'del']
        criteriaOpt: ->
            q:
                'user._id': user.id
        itemContext: (d)->
            $.extend d,
                btn: true
                title: "#{d.questioner.username} 【#{d.dateCreated.dStr()}】"
                brief: d.content

m.inquiry =
    btn:
        showInTd: ->
            util.iBtn "comment"
    listOpt:
        _attrs: ->
            'username,content,dateCreated'
        itemBtns: ['showInTd']
        afterShow: (e, p)->
            t = util.ct(e)
            d = @findData(e)
            q =
                q:
                    'issue._id': d.id
                    'user._id': user.id
            app.dm.addOrEdit p, 'answer', q,
                qs: d.toJSON()
                btns: ['save']
                prop: [
                    m._textarea 'content',
                        noLabel: true
                        valid:
                            maxlength: 300
                ]
                before: (d)->
                    d.isNew = true
                    d
                _saveSuccess:(m)->
                    t.trigger 'click'

        criteriaOpt: ->
            oq = [
                uid: user.id
            ,
                uid:
                    $exists: false
            ]

            if user.hasRole('manager')
                oq.push
                    'shop._id': user.sid
            q:
                $or: oq
                status:
                    $ne: 1

        itemContext: (d)->
            $.extend d,
                btn: true
                tag: 'a'
                title: "#{d.username} 【#{d.dateCreated.dStr()}】"
                brief: d.content

app.enhance
    routes:
        '!/qa(/:type)': 'qa'

    qa: (type = 'inquiry')->
        util.tabPage ctn, [
            href: tu.navUrl('qa', 'inquiry')
            title: '最新咨询'
            tabClass: 'inquiry'
        ,
            href: tu.navUrl('qa', 'answer')
            title: '已回答的问题'
            tabClass: 'answer'
        ], type

        @dm.collection $(ctn).find('.tab-content'), type,
            head: false
