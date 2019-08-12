require '../../../ext/toMd'

expireTime = 30 * 60 * 1000
id = util.atHash(2)

app.prePage = ->
    mod = util.atHash(1)
    return if mod is 'login'
    if  mod is 'group'
        if W.wt
            wt.setWtJs(null,true)
        cf.preCheck?()

$.extend cf,
    loadTmpl: (name) ->
        require "./tmpl/#{name}.jade"

    preCheck: ->
        if !app.memberInfo
            throw "loading::#{id}-#{user.id}"
        user.afterLogin()
        cf.curWeek = parseInt((+new Date().monday() - +new Date(app.myGroup.get('startedDate')).monday()) / Date.week) + 1
        cf.preCheck = null

    onPageSlide: ->
        app.btmMenu.hide()

    onEndSlide: (history, cur)->
        unless history.length
            app.btmMenu.show()

    _showUserInfo: (e)->
        W.ctn = 'slide'
        m = app.groupMember.toJSON().findBy 'user._id', @findData(e).get('user')._id
        cf.r _nav(app.myGroup.id, 'member',m._id)
        W.ctn = app.ctn
    isMgm:->
        app.memberInfo.get('role') in ['organizer','role']

_initOb = (qu)->
    app.memberInfo = cf.dm.ent qu.member,
        entity: 'groupMember'

    app.myGroup = cf.dm.ent qu.group,
        entity: 'group'

    app.groupMember = cf.dm.ents qu.groupMember,
        entity: 'groupMember'

cf._handleErr.loading = (guid)->
    [gid,uid] = guid.split('-')
    if qu = util.readLocal(guid)
        qu = JSON.parse qu
        if (+new Date() - qu.time) < expireTime
            _initOb(qu)
            cf.rr()
            return
        else
            util.cleanLocal guid
    q =
        'group._id': gid
        'user._id': uid

    $.get util.restUrl('groupMember'), q:q, (res)->
        burl = _nav(gid).substr 2
        if res.entities.length
            member = res.entities[0]
            if member.status isnt 2 and  !member.paid
                alert '抱歉,您还未支付,请先支付...'
                location.href = burl
                return
            if member.status is 1
                alert '十分抱歉, 您的审核还未通过...'
                location.href = burl
                return
            if member.status is 3
                alert '十分抱歉, 您小组使用权已被关闭...'
                location.href = burl
                return
        else
            alert '抱歉,请先申请加入...'
            location.href = burl
            return
        _attrs = 'title,subTitle,idea,cat,status,task,ref,refFile,startedDate,week,stat_cur,stats,venue,price,totalNumber'

        $.get util.restUrl("group/#{gid}"),{_attrs}, (res)->
            if res.entity
                group = res.entity
                time = +new Date()
                $.get util.restUrl('groupMember'), {q:{'group._id':group._id},max:group.totalNumber||20}, (res)->
                    groupMember = res.entities
                    cf.___dirt = []
                    for it in cf._groupInfo
                        if dd = member.info.codeBy(it.code)
                            unless member[it.code]
                                cf.___dirt.push it.code
                                member[it.code] = dd.val
                    qu = {group,member,groupMember,time}
                    _initOb qu
                    if cf.___dirt.length
                        app.memberInfo.saveAttr cf.___dirt
                        cf.___dirt  = null
                    util.saveLocal guid, qu
                    cf.rr()
            else
                alert '系统错误,请马上联系工作人员'

$.extend user,
    afterLogin: ->
        popMsg "Hi~ #{user.username}, 让我们一起开始吧...:)"
        app.btmMenu = new cf.view.btmMenu
            auto: true
            data:
                menus: cf._bMenu
            afterClick:->
                app.setFade()
                cf.slider?.reset()
                app.btmMenu.show()
        app.setFade()
        util.loadPic('body')
    afterLogout: ->
        id = app.myGroup.id
        util.cleanLocal "#{id}-#{@id}"
        location.href = _nav(id).substr 2

$.extend cf.view.form::,
    beforeForm: ->
        if app.isFade()
            app.unsetFade()
            @_setFade = true
    afterForm: ->
        @_setFade and app.setFade()

threadList = require './taskList'

app.enhance
    routes:
        '!/group/:id': 'group'
        '!/group/:id/post': 'post'
        '!/group/:id/task': 'task'
                    
    post: (id)->
        app.dm.l threadList, ctn,
            title: iy 'thread'
            mode: 'card'
            head: true
            backBtn: cf._backBtnStr
            self: true
            foot: true
            criteriaOpt: ->
                q:
                    cat: 'post'
                    'group._id': id
                    'user._id': user.id
            btns:[
                icon: 'plus'
                key: 'addOne'
                label: iim 'm_add', 'thread'
                cls: 'btn btn-sm'
            ]
            events:
                'click .addOne': ->
                    rps = @collection
                    app.dm.add 'slide', 'thread',
                        _saveSuccess:(model)->
                            rps.add model, at:0
                            cf.slider.slidePage()
                        data:->
                            cat: 'post'
                            group: app.myGroup.pick '_id', 'title'

    task: (id)->
        app.dm.l threadList, ctn,
            title: iy 'task'
            mode: 'card'
            backBtn: cf._backBtnStr
            head: true
            foot: true
            self: true
            events:->
                'click [key]': (e)->
                    rps = @collection
                    d = app.myGroup.get('task')[util.ct(e).index()].subData
                    $.extend d,
                        focus: true
                        data:->
                            cat: 'task'
                            form: _.pick d, '_id','code', 'title'
                            group: app.myGroup.pick '_id', 'title'
                        _saveSuccess:(model)->
                            rps.add model, at: 0
                            cf.slider.slidePage()
                    app.dm.form 'slide', d.entity, d
            callback:->
                if (len = app.myGroup.get('task').length) > 1
                    @$('.toolbar').append cf.rtp 'btnGroup',
                        style: 'danger'
                        btns: ({title: it.subData.title.dStr(4),key:it.subData.code } for it in app.myGroup.get('task'))
                else if len is 1
                    b = app.myGroup.get('task')[0]
                    @$('.toolbar').mk 'a', {class: "btn btn-primary",key:b.subData.code}, tu.icon('plus') + b.title.dStr(4)

            criteriaOpt: ->
                q:
                    cat: 'task'
                    'group._id': id
                    'user._id': user.id

    group: (id)->
        @dm.model ctn, 'group', id,
            tmpl: 'groupDetail'
            title: tu.adt(app.myGroup.get('title'),22)
            toFetch: false
            inCtx: 'myGroup'
            backBtn: false
            toolbar: true
            btns:[
                icon: 'edit'
                cls: 'btn btn-sm memberInfo'
            ]
            events:
                'click .memberInfo': ->
                    cf.dm.l 'pageEditor', 'slide',
                        entity: 'groupMember'
                        tip: ii 'm_member_tip'
                        title: ii 'groupNameCard'
                        model: app.memberInfo
                        prop: cf._groupInfo

                'click .cat label':(e)->
                    cat = util.ct(e).attr 'key'
                    fo =
                        'group._id': id
                        top:
                            $ne: true
                    if cat isnt 'newest'
                        fo.cat = cat
                    @itemsCtn ?= $('.items')
                    new threadList
                        parent: @itemsCtn
                        foot: true
                        max: 10
                        ctnHeight: '10rem'
                        criteriaOpt: ->
                            q: fo
                        afterAddAll:->
                            if cat is 'newest'
                                $('.mThread').text @collection.count
                                
            _attrs: ->
                'title,idea,introduction,refFile'
            callback: ->
                @$el.removeClass 'loadingData'
                d = @data
                @dCtn = @$('.dCtn')
                app.dm.collection @dCtn, 'groupMember',
                    el:->
                        $.mk 'a',
                            href: util.navUrl 'group',id, 'member'
                            class: 'list-group-item m-b-h p-y-h fellow'
                    inCtx: 'groupMember'
                    showCount: 5
                    mode: null
                    foot: false
                    tagClass: null
                    css:
                        height: '3.5rem'
                    setContent:->
                        @$el.append cf.rtp 'cols',
                            cls: 'row'
                            cols:[
                                cls: 'col-xs-2 p-x-0 text-xs-center'
                                text: ii 'member'
                            ,
                                cls: 'col-xs-9 refresh p-r-0'
                            ,
                                cls: 'col-xs-1 text-faded p-x-0'
                                text: tu.icon('chevron-right')
                            ]
                        @ctn = @$('.refresh')
                    criteriaOpt: ->
                        q:
                            'group._id': d._id
                    modelOpt:
                        className: 'img-circle m-r-h'
                        tagName: 'img'
                        attributes: ->
                            src: tu.resPath(cf.community, 'portrait/' + @model.get('user')._id + '.jpg')
                            title: @model.get 'username'
                            style: 'width: 2.5rem;margin-top:0'
                    afterAddAll: ->
                        $('.mCount').text @collection.length
                        earn = 0
                        weeks = 1
                        m = app.groupMember.length
                        app.groupMember.each (it)->
                            if stat = it.get('stat')
                                weeks = stat.length
                                s = stat[0]
                                if s
                                    earn += s.earn
                        $('.mFee').text((weeks-1)*10*m - earn)

                app.dm.l threadList, @dCtn,
                    cleanAll: false
                    className: 'm-b-1'
                    mode: 'blank'
                    head: false
                    foot: false
                    css:
                        height: '2.5rem'
                    criteriaOpt: ->
                        q:
                            'group._id': id
                            isTop: true
                        max: 5
                    itemContext: (d)->
                        brief: tu.label(ii('top'),'danger') + ' '+ d.title

                @dCtn.mk 'div', class: 'text-xs-center cat m-b-h', cf.rtp('crBtn',
                    type: 'radio'
                    style: 'primary-outline btn-sm'
                    btns: [
                        title: ii 'newest'
                        key: 'newest'
                    ,
                        title: ii 'task'
                        key: 'task'
                    ,
                        title: ii 'post'
                        key: 'post'
                    ]
                )
                @dCtn.mk 'div', class: 'items'
                @dCtn.find("[key='newest']").trigger 'click'
                if cf.isMgm()
                    cf.loadJS "#{cf.modPath}mgm.js", ->
                        cf.groupMgm()

require './thread'
require './member'


#
#    gd = app.myGroup.toJSON()
#    url = util.actUrl('stat','group',gd._id)
#    gm = app.groupMember.toJSON()
#    op =
#        gm: gm.pk '_id', 'user._id'
#        sTime: gd.startedDate
#        week: 1
#        task: gd.task.pk('perWeek','price','subData.code')
#    log op
##                                    $.post url, op, (res)->
##                                        log 'zzzz'
#    t = util.ct(e)
#    t.removeClass 'stat'