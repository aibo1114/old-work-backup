form = require "../../lib/view/form"
list = require "../../lib/view/list"

userOpt = meta.user

module.exports =
    routes:
        '!/club': 'club'
        '!/club/one(/:p)': 'one'
#        '!/myProfile(/:mode)': 'myProfile'
#        '!/profile(/:mode)': 'profile'


    clubItems: ->
        if user.hasRole('organizer,club')
            _userBizInfo()
        else
            if user.get('introduction')
                ['username', 'gender', 'email', 'industry', 'title', 'introduction']
            else if true #user info enough
                ['username', 'gender', 'introduction', 'more_info']


    club: ->
        items = @clubItems()
        w = screen.width / (if cf.mob then 4 else 15)
        max = 20
        new list
            toFetch: true
            entity: 'user'
            mode: 'blank'
            _pagination: true
            context:
                title: ' '
                foot: true
            criteriaOpt:
                refFile: 'isNotNull'
                max: max
                _attrs: 'username,refFile'
            parent: @ctn
            events: ->
                $.extend list::events,
                    'click .viewInfo': (e)->
                        @_vFrom = new form
                            mode: 'modal'
                            items: items
                            btns: ['closeDlg']
                            viewMode: true
                            context: ->
                                foot: true
                                bodyStyle: 'panel-body'
                                head: false
                            entity: 'user'
                            model: @findData(e)
            afterAddAll: ->
                if user.hasRole('organizer,club')
                    $.extend meta.user._,
                        filter:
                            username: 'text:s'
                            title: 'text:s'
                            industry: 'select:l'
                    @$('.head').addClass('clearfix').append '<div class="toolbar"></div>'
                    @setTools(true)
            addOne: (item)->
                d = item.attributes
                res = util.resPath("portrait-#{d.id}.jpg")
                @ctn.append "<img class='viewInfo' id='p-#{d.id}' style='width:#{w}px;height:#{w}px' src='#{res}'/>"
            callback: ->
                cls = _st.btn('primary', 'lg', true)
                if user.hasRole('club,organizer')
                    text = "<a class='#{cls} more'>更多...</a>"
                else
                    @$('.head').before cf.tmpl.alert
                        type: 'success'
                        title: 'Club简介'
                        icon: 'gift'
                        msg: '<p>与靠谱的小伙伴们在一起：分享、体验、成长。</p>'

                    href = util.navUrl('profile')
                    text = "<a class='#{cls} disabled' href='#{href}'>申请加入P.E.T. Club</a>"
                    @$('.foot').append cf.tmpl.alert
                        type: 'danger'
                        title: '申请条件'
                        icon: 'info-sign'
                        msg: '<p>拥有积极价值观，做过一次以上主持人</p>'

                @$('.foot').append text

    one: (id)->
        new form
            items: @clubItems()
            btns: []
            parent: @ctn
            viewMode: true
            context: ->
                foot: true
                bodyStyle: 'panel-body'
                head: false
            entity: 'user'
            data:
                id: id
#    profile:->
#        new tag
#            tmpl:
#

    profile: (mode)->
        data = user.attributes
        m = meta.user._
        m.editFormOpt =
            cleanAll:true
            parent:@ctn
            title: '用户信息'
            toFetch: false
            btns: ['save']
            data: data
            _saveSuccess: ()->
                $('#content').html cf.tp.vDone
                    title: '信息跟新完成'
                    content: '谢谢您的支持，我们承诺会把活动做的更好。'
                    link:
                        title: '后英语时代主页'
                        url: 'http://postenglishtime.com'
                util.sTop()

        m.editFormOpt.spItem = if data.phone
                'fullInfo'
            else
                'simple'
        app._data.fun 'edit', 'user', user.id