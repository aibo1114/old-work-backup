m = meta

meta.wtUploaded =
    prop: [
        m._text 'account'
        m._text 'type'
        m._text 'mediaId'
        _ep 'title',
            showText: (v, d)->
                (it for it in d).join('<br/>')
        m._text 'resId',
            showText: (v, d)->
                (it for it in d).join('<br/>')
    ]

    tbBtn: ['test', 'send', 'remove', 'del']


    btn:
        send: (it, e)->
            util.iBtn "plane", 'down'

        test: (it, e)->
            util.iBtn "user", 'down'

        remove: (it, e)->
            util.iBtn "remove", 'down'

    event:
        test:
            type: 'click'
            fun: (e)->
                d = @findData(e).attributes
                meta.syncEntity.sAccount =
                    type: 'select'
                    _name: 'account'
                    data: [d.account]
                app.dm.add null, 'syncEntity',
                    urlRoot: util.actUrl('wt/sendTest')
                    items: ['sAccount', 'testUser', "_mediaId_#{d.mediaId}", "_account_#{d.account}"]
                    mode: 'modal'
        send:
            type: 'click'
            fun: (e)->
                return unless confirm(iim('确定要发送吗？'))
                d = @findData(e).attributes
                $.post util.actUrl('wt/sendMessNews'),
                    media_id: d.mediaId
                    account: d.account

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
