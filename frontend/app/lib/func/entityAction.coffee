require '../meta/comment'

$.extend cf,
    _eAct: (id, en, action, cb)->
        url = util.actUrl('set', en, '_id', id, action)
        opt =
            _rsMsg: '关注成功'
            user:
                _id: user.id
                username: user.username
        $.post url, opt, (res)->
            cb?(res)

    _thumb: (eid, et, type) ->
        username = user.username
        uid = user.id
        if $("img[uid='#{uid}']").length
            popMsg '谢谢亲,您已经赞过了~:)'
        else
            @_viewCount(et, eid, 'up')
            $.post util.restUrl('thumb'),
                entity: et
                eid: eid
                type: type
                username: username
                uid: uid
            , ->
                popMsg('点赞成功~~,谢谢亲!')

    _comment: (id = location.pathname.split('/').pop(), entity, type = 'comment', title = '留言', prop = 'comment', p = 'air')->
        app.dm.form p, 'comment',
            teFetch: false
            title: title
            needLogin: true
            btns: ['save']
            urlRoot: util.actUrl('push', entity, '_id', id, type)
            data: ->
                if user.isLogin()
                    uid: user.id
                    username: user.username
                    contact: user.get 'phone' || user.get 'email'
                else
                    {}

    _commentOne: (eid, et, p)->
        unless user.isLogin()
            cf.r 'login'
            return
        eta = @
        app.dm.form p, 'comment',
            needLogin: true
            toFetch: false
            noLabel: true
            btns: []
            items: ['content']
            data: ->
                d =
                    entity: et
                    eid: eid
                    uid: user.id
                    username: user.username
                d
            afterSave:->
                eta._viewCount(et, eid, 'cCount')
            teFetch: false


    _viewCount: (et, id, prop)->
        $.post util.actUrl("inc/#{et}/#{id}/#{prop}")
