require './taskList'
require './userReport'

app.enhance
    routes:
        '!/group/:id/member': 'member'
        '!/group/:id/member/:mid': 'memberInfo'
        '!/group/:id/rank': 'rank'

    rank: (id)->
        m = []
        for it in cf._marks.slice(1)
            m.push
                title: it.title
                key: it.key

        @dm.collection ctn, 'groupMember',
            backBtn: false
            inCtx: 'groupMember'
            tab: 'work'
            title: ii 'rank'
            callback: ->
                util.loadPic(app.ctn)
#            dataFilter:->
#                for it in @collection.models
#                    cs = it.get('stat')?[0]
#                    if cs
#                        it.set 'curStat', cs
#                        it.set 'curScore', cs[@tab] || 0

#            comparator: (m1,m2)->
#                if (s1 = m1.get('stat')[0]) and (s2 = m2.get('stat')[0])
#                    s1[@tab] - s2[@tab]
#                else
#                    1
            comparator: (m)->
                -m.get('curScore')
#                log @
#                if s1 = m.get('stat')[0]
#                    s = s1[@tab]
#                    m.set 'curScore', s || 0
#                    s || 1.4
#                else
#                    1

            events:
                'click img': cf._showUserInfo

                'click label[key]': (e)->
                    @tab = util.ct(e).attr 'key'
                    for it in @collection.models
                        if it.get('stat') and cs = it.get('stat')[0]
                            it.set 'curScore', cs[@tab] || 0
                    @collection.sort(-1)
                    @addAll()

            _filter:->
                s1 = "<div class='text-xs-left'>"+cf.rtp('_userAvatar')+"</div>"
                s1 += '<hr/>'
                s2 = cf.rtp 'crBtn',
                    type: 'radio'
                    style: 'primary-outline btn-sm'
                    btns: m
                s1 + s2

            criteriaOpt: ->
                q:
                    'group._id': id

            modelOpt:
                tmpl: 'rankItem'
                className: 'list-group-item p-y-h p-x-0'
                css:
                    height: '5rem'
    memberInfo: (id, mid)->
        ctn = if app.prev()
            bb = true
            slideUrl = true
            'slide'
        else
            bb = false
            app.ctn

        @dm.model ctn, 'groupMember', mid,
            mode: 'memberInfo'
            backBtn: bb
            slideUrl: slideUrl
            inCtx: if mid is app.memberInfo._id then 'memberInfo' else null
            callback: ->
                @$("[key]:first").trigger 'click'
            events:
                'click [key]': (e)->
                    key = util.ct(e).attr('key')
                    uid = @model.get('user')._id
                    @ctns ?= @$('.ctns')
                    @ctns.children().hide()
                    if @["__#{key}"]
                        @["__#{key}"].show()
                    else
                        @["__#{key}"] = if key is 'eval'
                            cf.dm.l 'userReport', @ctns,
                                cleanAll: false
                                data: @model.toJSON()
                        else if key is 'memberInfo'
                            cf.dm.l '_tag', @ctns,
                                className: 'list-group'
                                cleanAll: false
                                data: @model.toJSON()
                                tmpl: 'userInfo'
                        else
                            cf.dm.l 'taskList', @ctns,
                                cleanAll: false
                                mode: 'blank'
                                head: false
                                criteriaOpt: ->
                                    q:
                                        'group._id': id
                                        'user._id': uid
                                        cat: key
            modeContext: ->
                $.extend {}, @model.toJSON(),
                    backBtn: @backBtn
                    btnType: 'radio'
                    btns: [
                        title: ii('work')
                        key: 'eval'
                    ,
                        title: ii('memo')
                        key: 'memberInfo'
                    ,
                        title: ii('task')
                        key: 'task'
                    ,
                        title: ii('post')
                        key: 'post'
                    ]

    member: (id)->
        ctn = if app.prev()
            slideUrl = true
            bb = true
            'slide'
        else
            bb = false
            app.ctn

        @dm.collection ctn, 'groupMember',
            title: ii 'members'
            inCtx: 'groupMember'
            backBtn: bb
            slideUrl: slideUrl
            itemBtns: ['lockPub']
            max: 200
            events:
                'click img': cf._showUserInfo
            criteriaOpt: ->
                q:
                    'group._id': id
            modelOpt:
                className: 'list-group-item p-x-0 p-y-h'
            itemContext: (d)->
                title = d.username or d.user.username
                if d.stat and er = d.stat[0].earn
                    title += tu.btn "#{er}元", 'pull-xs-right m-t-h', 'success', 'sm'

                if d.status isnt 2 and cf.isMgm()
                    title = "【未审核】" + title
                imgPath: tu.userPic(cf.community, d.user)
                title: title
                subNewLine: true
                subTitle: d.statement || cf._statement
                btn: cf.isMgm()
                attrs:
                    style: 'height: 5rem'

            foot: false
            addAll:->
                @collection = @collection.clone()
                @data = @collection.toJSON()

                leader = @data.delBy 'organizer', 'role', true
                oper = @data.delBy 'oper', 'role'

                if !oper
                    oper = [leader]
                else if ! _.isArray oper
                    oper = [oper]

                addAll = cf.view.collection::addAll
                dd = @data
                octn = @ctn

                if leader
                    @ctn.before cf.rtp 'memberTop'

                    @ctn = @$('.organizer')
                    @collection.reset([leader],silent: true)
                    addAll.call @

                    @ctn = @$('.opers')
                    for it in oper
                        if it.phone
                            it.username += " <small class='pull-xs-right'>#{it.phone}</small>"
                    @collection.reset(oper,silent: true)
                    addAll.call @

                @collection.reset(dd,silent: true)
                @ctn = octn
                addAll.call @

