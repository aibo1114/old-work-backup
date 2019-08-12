entity = require './entity'

require './../meta/user'

module.exports = entity.extend
    entity: 'user'

    username: null
    
    _func: 
        label: ii('prop')
        icon: 'th'
        children: [
            href: util.navUrl('home/profile')
            icon: 'user'
            isShow:->
                !cf._scf and cf.index isnt 'console'
            label: ii('profile')
        ,
            func: 'app.account()'
            icon: 'wrench'
            label: ii('account')
        ,
            func: 'app.setting()'
            isShow:->
                user.isAdmin() and cf.index is 'console'
            icon: 'cog'
            label: ii('setting')
        ,
            'hr'
        ,
            func: 'user.logout()'
            icon: 'log-out'
            label: ii('logout')
        ]
    
    setMenu: (home, suf)->
        res = if @menu then @menu.slice(0) else []
        if home
            res.unshift home
        mg = if suf
            suf($.extend true, {}, @_func)
        else
            @_func
        res.concat mg
        
        
    pStr: ->
        "username,email,roles##{cf.cid}__#{cf.lang}"

    update: (ob, cb)->
        @save ob, 
            patch: true
            success: ->
                cb?()
                user.storeAuth()

#    updateAuthTime: ()->
#        if localStorage
#            localStorage.setItem('lc', new Date().getTime())

    storeAuth: (s)->
        s = JSON.stringify(@toJSON()) unless s
        if localStorage
            localStorage.setItem('lc', new Date().getTime())
            localStorage.setItem('lur', s)

    removeData: ->
        for it in ['id','username','roles','orgs','menu','entities','permission']
            util.del it, @
        util.deleteCookie 'woid'
        util.deleteCookie 'wCode'
        @clear()
        if localStorage
            localStorage.removeItem('lc')
            localStorage.removeItem('lur')
            localStorage.removeItem('woid')

    onlineCheck: ->
        log 'check online'
        cf.noReply = true
        $.get(app.checkSvrAuth).done((res)->
            user.auth if res.user then res.user else res
        ).fail(->
            app.start()
            cf.r app.logoutPath
        )

    offlineCheck: ->
        log 'check offline'
        if localStorage
            time = localStorage.getItem('lc')
            res = localStorage.getItem('lur')
            if time and res #and res != 'undefined' and time != 'undefined'
                if (new Date().getTime() - time) < 20 * 60 * 1000
                    @auth $.parseJSON res
                    return

#        if util.isWechat() and app.wtAutoLogin and (app.woid = util.getCookie 'woid')
        if app.wtAutoLogin and (app.woid = util.getCookie 'woid')
            @loginByWoid()
        else
#            @renderNormalMenu()
            app.start()

    entityAuth: (entity, code)->
        if !@mgm or !@mgm.entity or !@mgm.entity[entity]
            return true
        c = @mgm.entity[entity]
        if _.isNumber(c) or (c and c.indexOf(code) > -1) or c is 'x'
            true
        else
            false

    pageAuth: (page = cf.index)->
        if !@permission or !@permission[page]
            return true
        c = !@permission[page]
        if c.indexOf(page) > -1
            true
        else
            false

    check: ->
        @isLogin() and (@permission.length is 0 or @permission.has(cf.index))

    auth: (op)->
        log 'auth...'
        @storeAuth JSON.stringify(op)

        @roles = util.del 'roles', op
        @orgs = util.del 'orgs', op

        @menu = util.del 'menu', op
        @entities = util.del 'entities', op
        @permission = util.del 'permission', op

        @username = op.username

        @set op

        util.setCookie '__ux', "#{@id}:#{@username}"
        @trigger 'login'
        
        if @check()
            @_afterLogin()
            @extraData?()
        else
            @failAuth()

        if @afterAuth
            @afterAuth ->
                app.start()
        else
            #重启backbone
            app.start()

    _afterLogin: ->
        @afterLogin?()
        if cf._toLogin
            cf.r cf._toLogin
            util.del '_toLogin', cf
        else if location.hash is util.navUrl('login')
            location.hash = util.navUrl(app.dfPath)

    failAuth: ->
        popMsg('权限不足','warning')
        @removeData()
        cf.r 'login'

    login: (op) ->
#        if user.reAuth
#            $('#main form .alert-error').remove()
#            $('#main form .form-actions a').show()
#        else
        @auth(op)
        @

    isOwner: (id)->
        @id is id
        
    isLogin: ->
        @id and !@fake

    is3rdLogin: ->
        @agent

    failLogin: ->
        popMsg('m.login_d', 'warning')
        @logout()

    logout: ->
        if @isLogin()
            $.post(@logoutUrl || util.actUrl(cf.auth || "auth", "logout"))
            @trigger 'logout'
        @afterLogout?()
        @removeData()
        if app.logoutPath
            cf.r app.logoutPath

    isPermit: (str)->
        @isAdmin() or (@permission and @permission.include(str))

    isNav: (model, action)->
        return true if @isAdmin()
        for c in @channel
            if c.href is '#!' + location.href.split('#!')[1]
                return true
        for m in @menu
            if m.entity is model
                return true if m.action is action
        for f in @footer
            if f.href is '#!' + location.href.split('#!')[1]
                return true
        return false

    hasRole: (role)->
        if @roles
            for it in @roles
                return true if role.indexOf(it.title) > -1
        false

    isRoot: ->
        @toJSON()._root

    isAdmin: ->
        @isRoot() or @hasRole('admin')

    qrId: ->
        30000 + @id

    mergeUser: (title = '同步用户信息',wCode,cb)->
        app.dm.form 'air','user',
            title: title
            data: ->
                uid: user.id
                wCode: wCode
                woid: util.getCookie 'woid'
            prop:[
                _ep 'user:phone'
                _ep 'user:wid'
            ]
            btns: ['save']
            _save: (t)->
                v = @
                cf.blockLine = t
                $.post util.actUrl('auth/merge'), @model.toJSON(), (res)->
                    user.logout()
                    user.auth res.user
                    v.closeDlg()
                    cb?()

    pick: (str = '')->
        opt = [cf.id, 'username']
        _.pick(@attributes, opt.concat(str.split(',')))