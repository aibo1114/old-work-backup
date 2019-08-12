cf.addComment = (ctn, d)->
    d.reply ?= []
    app.dm.collection ctn, 'common',
        mode: 'blank'
        head: false
        toFetch: false
        className: 'row'
        data: d.reply.reverse()
        tagClass: 'list-group tt clear'
        events:
            'click .addComment': ->
                if (user.fake or !user.isLogin()) and confirm('请登录后留言?')
                    util.deleteCookie 'woid'
                    util.deleteCookie 'wtBase'
                    location.href = wt.genWtUrl(location.pathname.substr(1)+location.search,null,null,'snsapi_userinfo')
                    return
                else
                    rps = @collection
                    cf.dm.l 'form', 'air',
                        title: '我的留言'
                        closeBtn: 'pull-xs-left'
                        urlRoot: util.actUrl('push', 'thread', '_id', d._id, 'reply')
                        data:
                            id: util.randomChar(4)
                            username: user.username
                        toolbar: true
                        foot: false
                        topBtns:[
                            label: '保存'
                            cls: 'btn btn-sm btn-info save'
                            icon: 'save'
                        ]
                        prop: [
                            _ep 'username',
                                noLabel: true
                                ph: '昵称'
                                valid:
                                    required: true

                            m._textarea 'content',
                                noLabel: true
                                ph: '我想说的话...'
                                attrs:
                                    max: 150
                                    rows: 8
                                valid:
                                    maxlength: 150
                                    minlength: 5
                                    required: true
                        ]

                        _saveSuccess: (model, res)->
                            rps.add res.entity.reply.pop(), at: 0
                            model.view.closeDlg()

        entitiesOpt:
            entityOpt:
                idAttribute: 'id'
                
        modelOpt:
            className: 'p-x-0 p-y-1 clearfix bb'
            
        itemContext: (d)->
            brief: d.content
            subTitle: $.timeago(d.lastUpdated)
            imgPath: tu.userPic(null, d.user)
            title: "<strong>#{d.user.username}</strong>"

        callback:->
            @$el.prepend tu.btn("写留言 #{tu.icon('comment')}",'addComment pull-xs-right m-b-h m-r-1 clear', 'info', 'sm')