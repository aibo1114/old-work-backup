cf.btnStr = _st.btn('primary', 'sm')

metaOpt = meta._

$.extend metaOpt.btn,
    del: (it, e)->
        util.iBtn 'trash', 'del'

    up: (it, e)->
        util.iBtn "chevron-up", 'up'

    down: (it, e)->
        util.iBtn "chevron-down", 'down'

    edit: (it, e)->
        util.iBtn 'edit', null, util.navUrl 'data/edit', e, it[cf.id]

    view: (it, e)->
        util.iBtn 'list-alt', null, util.navUrl 'data/view', e, it[cf.id]

    lockPub: (it, e)->
        if user.isAdmin()
            if it.status isnt 2
                util.iBtn "check", "pub"
            else
                util.iBtn "lock", "lock"

    batchDel: (it, e)->
        label: '批量'
        icon: 'trash'
        cls: cf.btnStr + ' showL2'
        hide: true

    copyAdd: (it, e)->
        label: '复制'
        icon: 'paste'
        cls: cf.btnStr + ' showO1'
        hide: true

    topAdd: (it, e)->
        label: ii 'add'
        href: util.navUrl('data/add', e)
        icon: 'plus'
        cls: cf.btnStr

    trans: (it)->
        icon: 'import'
        label: '迁移'
        cls: cf.btnStr + ' showL1'
        hide: true

    refresh: (it, e)->
        icon: 'refresh'
        cls: cf.btnStr

$.extend metaOpt.event,
    trans:
        type: 'click'
        fun: ->
            that = @
            app.dm.form 'air', 'common',
                title: '远程配置'
                prop: [
                    m._text 'url',
                        ph: '数据备份地址'
                        valid:
                            required: true
                    _ep 'username',
                        val: user.username
                        valid:
                            required: true
                    _ep 'password',
                        valid:
                            required: true
                ]
                _save: ->
                    unless @checkAttrs(mo = @model.toJSON())
                        warnMsg '请输入正确的内容'
                        return
                    data = (util.getModel($(it)).toJSON() for it in that.getChecked())
                    qs = ["u=#{mo.username}","p=#{mo.password}"].join('&')
                    for it in data
                        util.del '_id', it
                    $.postJSON "#{mo.url}/a/batch/add/#{that.entity}?#{qs}", {data}, ->
                        that.closeDlg()

    batchDel:
        type: 'click'
        fun: ->
            for it in @$('tr.active')
                $(it).data('_item').model.destroy()
    copyAdd:
        type: 'click'
        fun: (e)->
            ent = @entity
            $.get util.restUrl(@entity, @$('tr.active').data('_item').model.id), (res)->
                res.entity._id = null
                app.dm.add app._mod_ctn, ent,
                    data: res.entity
                cf.r 'data/add' + ent, false
    refresh:
        type: 'click'
        fun: (e)->
            @collection.resetFetch()

    lockPub:
        type: 'keyup'
        tag: ':input'
        fun: (e)->
            @save() if e.keyCode is 13
    sKey:
        type: 'keyup'
        tag: ':input'
        fun: (e)->
            @save() if e.keyCode is 13
    del:
        type: 'click'
        fun: (e)->
#                    return unless user.entityAuth(@entity,'del')
            util.esp e
            return unless confirm(ii('m_sure'))
            m = @findData(e)
            if m
                m.destroy(wait: true)
            else
                log 'no model find'
            @afterDel?(m.id)