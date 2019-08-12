#load = (name)->
#    require '../../../lib/' + name + '.js'
require '../style/main.css'
require('../../../lib/init_light')
require('../../../lib/init')

cf.tp = $.extend require('../../../lib/tmpl'),
    serverItem: require '../tmpl/serverItem.jade'

require "./meta"
Backbone.Model.setPost()
Backbone.Model::idAttribute = 'key'

router = require "../../../lib/userRouter"
user = require '../../../lib/model/user'
table = require "../../../lib/view/table"
form = require "../../../lib/view/form"


$.extend table::,
    toFetch: false
    btns: ['popAdd']

inlineTable = require "../../../lib/view/inlineTable"

_i['c.title'] = '名称'


cf.rsPre = '/k-zk-webmanager/'
cf.actPre = '/k-zk-webmanager/'


$.extend user::, require '../../../lib/func/userMenu'

user = user.extend
    check: ->
        log 'user check......'
        @isAdmin() || @hasRole('manager')

    afterLogin: ->
        if @isRoot()
            @mgm.entity.community = 75
        @renderMenu()
        app.navigate location.hash || util.navUrl('home'), trigger: true

    afterLogout: ->
        @id = null
        @mgm = null
        @roles = null
        $('#topbar').empty()
        app.navigate '', trigger: true
        app.login()

window.user = u = new user {},
    menu:
        server: 1
        user: 2
#    menuTmpl: cf.tp.menuTmpl


new router
    routes:
        '': 'index'
        '!/login': 'login'
        '!/server(/:id)': 'server'
    checkAuth: false
    tmpl: cf.tp.console
    context: ->
        name: '配置管理系统'

    ajaxOk: (e, xhr)->
        if xhr.responseText.charAt(0) is '{'
            r = $.parseJSON(xhr.responseText)
            if r.retcode isnt 0
                popMsg(r.msg, 'warning')

    index: ->
        new form
            title: '输入ip地址'
            mode: 'panel'
            parent: '#main'
            entity: 'common'
            items: ['zkservers']
            btns: ['save']
            toFetch: false
            urlRoot: util.actUrl 'login'
            _saveSuccess: (model, res)->
                if res.retcode is 0
                    app._login = true
                    app.navigate util.navUrl('server'), trigger: true



    server: (id)->
#        unless app._login
#            app.navigate util.navUrl(''), trigger: true
        $('#main').empty()
        if $('#serverNav').length is 0
            new cf.view.collection
                id: 'serverNav'
                mode: 'panel'
                entity: 'server'
                parent: '#side'
                btns: ['popAdd']
                events:
                    'click .servertItem': (e)->
                        t = util.ct(e)
                        $('#main').empty()
                        @$('.sub').remove()
                        util.setActive t, 'cur'
                        server = t.text()
                        app._server = server
                        new cf.view.collection
                            beforeTag: t
                            entity: 'idc'
                            mode: 'panel'
                            btns: ['popAdd']
                            className: 'list-group sub'
                            modelOpt:
                                tmpl: 'serverItem'
                                tagName: 'a'
                                className: 'list-group-item idc'
                            entitiesOpt: ->
                                entityOpt:
                                    urlRoot: util.restUrl 'server', server, @entity
                            modeContext: ->
                                title: 'IDC管理'
                            noData: ->
                                '<h4 class="text-center">无数据</h4>'
                            events:
                                'click .idc': (e)->
                                    t = util.ct(e)
                                    util.setActive t
                                    idc = util.ct(e).text()
                                    app._idc = idc
                                    new table
                                        entity: 'version'
                                        btns: null
                                        toFetch: true
                                        events:
                                            'click .rad': (e, isNew)->
                                                tr = util.ct(e).closest('tr')
                                                id = tr.data 'id'
                                                if id is 'edit'
                                                    alert '不能选择 edit'
                                                    e.preventDefault()
                                                    return

                                                unless isNew
                                                    unless confirm('你确定要设置 ' + id + ' 为当前版本吗？')
                                                        e.preventDefault()
                                                        return

                                                tr.addClass 'success'
                                                tr.siblings().removeClass 'success'
                                                if @collection._res.current isnt id
                                                    $.ajax
                                                        type: 'PUT'
                                                        url: "#{util.restUrl 'server', server, 'idc', idc}?version=#{id}"

                                        entitiesOpt: ->
                                            entityOpt:
                                                urlRoot: util.restUrl 'server', server, 'idc', idc, @entity
                                        modeContext: ->
                                            title: '版本管理'
                                            style: 'panel panel-success'
                                        afterAddAll: ->
                                            d = @collection._res
                                            if d.current
                                                @$("tr[data-id='#{d.current}']").find('input[type=radio]').trigger 'click', 'new'
                                        afterShow: (e, p)->
                                            t = util.ct e
                                            version = @findData(t).id
                                            new table
                                                pid: t
                                                parent: p
                                                entity: 'selection'
                                                toFetch: true
                                                entitiesOpt: ->
                                                    entityOpt:
                                                        urlRoot: util.restUrl 'server', server, 'idc', idc, 'version', version, @entity
                                                modeContext: ->
                                                    title: '模块管理'
                                                    style: 'panel panel-warning'
                                                afterShow: (e, p)->
                                                    t = util.ct e
                                                    selection = @findData(t).id
                                                    new table
                                                        toFetch: true
                                                        pid: t
                                                        parent: p
                                                        entity: 'kv'
                                                        entitiesOpt: ->
                                                            entityOpt:
                                                                urlRoot: util.restUrl 'server', server, 'idc', idc, 'version', version, 'selection', selection, @entity
                                                        modeContext: ->
                                                            title: '键值管理'
                                                            style: 'panel panel-danger'
                modelOpt:
                    tmpl: 'serverItem'
                    tagName: 'a'
                    className: 'list-group-item servertItem'
                modeContext: ->
                    tagClass: 'list-group'
                    title: '服务管理'
                    style: 'panel panel-default'

    callback: ->
#u.renderMenu()


