module.exports = cf.st =
    l:
        init: '编辑中'
        locked: '被锁定'
        waiting: '待审核'
        pub: '发布'
        disable: '禁用'
        expired: '超时'
    common_status:
        init:
            v: 0
        waiting:
            v: 1
        pub:
            v: 2
        disable:
            v: 3

    user_status:
        init:
            v: 0
            l: '未激活'
        active:
            v: 1
            l: '可用'
        certified:
            v: 2
            l: '认证'
        locked:
            v: 3
        disable:
            v: 4
            l: '禁用'

    init: (et)->
        _.keys(@["#{et}_status_hash"])[0]

    text: (e, k)->
        @["#{e}_status_hash"][k]

    buildMap: (kk)->
        et = kk.split('_')[0]

        hash = @["#{kk}_hash"] = {}
        map = @["#{kk}_map"] = {}
        for k,v of @[kk]
            if v
                l = v.l || _i["#{kk}_#{k}"] || cf.st.l[k] || k.capitalize()
                hash[v.v] = l
                map[k] = v.v
        return unless m

        m[kk] =
            prop: [
                m._select 'status',
                    attrs:
                        data: ->
                            hash

                m._textarea 'memo',
                    valid:
                        required: true
            ]
        return unless m[et]

        ek = "process#{et.capitalize()}Status"
        exObj =
            btn: {}
            event: {}

        exObj.btn[ek] = ->
            util.iBtn "cog", ek

        exObj.event[ek] =
            type: 'click'
            fun: (e)->
                d = @findData(e)
                app.dm.form 'air', kk,
                    toFetch: false
                    title: '处理订单'
                    urlRoot: util.restUrl('push', et, '_id', d.id, 'proc')
                    before: (d)->
                        $.extend d,
                            username: user.username
                            uid: user._id
                            _root:
                                status: d.status
                        d
                    _saveSuccess: (model) ->
                        model.view.closeDlg()
                e.preventDefault()
                e.stopPropagation()

        $.extend true, m[et], exObj


    ctx: (status, st)->
        for k,v of status
            if v and v.v is st
                return v
        return null

    addTrack: (str, memo)->
        str = str + ',' + memo if memo
        "#{str},#{user.username + ':' + user.id}__#{new Date().getTime()}"

    add: (name, opt)->
        k = "#{name}_status"
        @[k] = opt
        @buildMap k
        if m[name] and m[name].prop and (p = m[name].prop.findBy('code', 'status'))
            p.attrs.data = @["#{name}_status_hash"]

m.common.proc =
    code: 'proc'
    showText: (v, it)->
        if v and v.length
            hash = cf.st["#{it._e}_status_hash"]
            str = ''
            for it in v
                str += "<div class='well well-sm m0'><b>【#{hash[it.status]}】</b>#{it.username} #{it.lastUpdated.dStr()}<br/>“#{it.memo}”</div>"
            str
