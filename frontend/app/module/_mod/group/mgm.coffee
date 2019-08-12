$.extend true, m._,
    event:
        lockPub:
            type: 'click'
            fun: (e)->
                t = util.ct(e)
                d = @findData(e)
                st = d.get('status')
                code = if st is 2
                    'disable'
                else if st in [1,3]
                    'enable'
                if code
                    opt =
                        ent: d.get('_e')
                        id: d.id

                    if t.attr 'ents'
                        opt.ents = t.attr 'ents'
                    $.postJSON util.actUrl("mgm/pubLock/#{code}"), opt

        isTop:
            type: 'click'
            fun: ->
                d = @findData(e)
                code = if d.get('top') is true
                    'false'
                else
                    'true'
                opt =
                    ent: d.get('_e')
                    id: d.id
                $.postJSON util.actUrl("mgm/setTop/#{code}"), opt

    btn:
        isTop:->
            util.iBtn "user", "topIt ccBtn"

        lockPub: (it, e)->
            res = null
            if cf.isMgm()
                res = if it.status isnt 2
                    util.iBtn "check", "pub ccBtn"
                else
                    util.iBtn "lock", "lock ccBtn"
            res


app.groupStat = (e)->
    $.postJSON util.actUrl('stat', 'group','all'), {}, (res)->
    $(e).addClass('disabled').removeAttr 'onclick'
cf.groupMgm = ->
    if app.prev(1).name is 'group'
        $('.mobView .card-header').mk 'a',
            class: 'backBtn mgm ' + _st.icon('cog')
        , null, null, 'click', ->
            cf.dm.l 'pageEditor', 'slide',
                title: '小组设置'
                entity: 'group'
                model: app.myGroup
                prop: [
                    label: '小组统计'
                    code: 'groupStat'
                    noMod: true
                    prop:
                        onclick: 'app.groupStat(this)'
                ,
    
                    label: '组员统计'
                    code: 'stat'
                    xtype: 'pageSelect'
                    prop:
                        class: 'm-b-1'
                    attrs:
                        data: ->
                            res = ['统计当前']
                            res.push "第#{it}周" for it in [1..8]
                            res
                        pick: (e)->
                            gd = app.myGroup.toJSON()
                            gm = app.groupMember.toJSON()
                            v = util.ct(e).index()
                            tt = if v is 0
                                tt = new Date()
                            else
                                new Date(gd.startedDate).addDays((v - 1) * 7)
                            if tt > new Date()
                                popMsg '不能统计未来的数据', 'warning'
                            else
                                op =
                                    gm: gm.pk '_id', 'user._id'
                                    sTime: tt.monday()
                                    week: v
                                    task: gd.task.pk('perWeek', 'price', 'subData.code')
                                $.postJSON util.actUrl('stat', 'group', gd._id), op, (res)->
                                    log 'zzzz'
                ,
                    label: '停止申请'
                    noMod: true
                    code: 'isApply'
                ,
                    label: '人员管理'
                    noMod: true
                    code: 'isApply'
                ,
                    label: '开放申请'
                    noMod: true
                    code: 'isApply'
                ,
                    m._pic 'qrcode',
                        prop:
                            class: 'pv bb'
                ]