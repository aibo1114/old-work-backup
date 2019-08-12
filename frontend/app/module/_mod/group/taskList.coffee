m.thread =
    prop: [
        _ep 'title',
            ph: '20字以内'
            valid:
                maxlength: 20
                minlength: 2

        code: 'content'
        type: 'textarea'
        rows: 10
        ph: '请在这里输入内容,200字以内'
        attrs:
            max: 200
            rows: 8
    ]

module.exports = _exv 'taskList', 'collection',
    parent: ctn
    entity: 'thread'
    mode: 'blank'
    tagClass: 'list-group'
    head: false
    className: 'mobView'
    backBtn: false
    itemBtns: ['lockPub','isTop']
    modelOpt:
        className: 'list-group-item p-x-0 p-y-h m-b-h'
    exEvents:

        'click img': cf._showUserInfo

        'click .col-xs-10,.col-xs-12': (e)->
            mo = @findData(e)
            W.ctn = 'slide'
            cf.r _nav(app.myGroup.id, 'thread',mo.id)
            W.ctn = app.ctn

    itemContext: (d)->
        if d.cat is 'post'
            title = d.title
        else
            title = util.adjustText d.content, 80
        if @self
            if d.cat is 'task'
                title = "【#{d.form.title.substr(0,2)}】" + title
        else
            imgPath = tu.userPic(cf.community, d.user)
            
        subTitle = "<span class='pull-xs-left'>#{$.timeago(Date.parseLocal(d.lastUpdated))}</span><span class='pull-xs-right iTop2'>"
        sIcons = [
            icon: 'eye-open'
            val: d.viewCount || 0
        ,
            icon: 'thumbs-up'
            val: if d.like then d.like.length else 0
        ,
            icon: 'comment'
            val: if d.reply then d.reply.length else 0
        ]

        if user.username is 'alex'
            sIcons = sIcons.concat [
                icon: 'heart-empty'
                val: if d.pick then d.pick.length else 0
            ,
                icon: 'share'
                val: if d.share then d.share.length else 0
            ]

        for it in sIcons
            subTitle += tu.icon(it.icon) + it.val
            
        subTitle += '</span>'
        subNewLine = true
        btn = cf.isMgm()
        {title, subTitle, imgPath, subNewLine, btn}
