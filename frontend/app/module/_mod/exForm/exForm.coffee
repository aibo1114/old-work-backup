doExForm = (ob, code, act, p)->
    if ob.isLogin and !user.isLogin()
        cf._toLogin = location.hash
        cf.r 'login'
        return

    unless $(ctn).length
        ctn = app.ctn
    ob = _.clone ob

    switch act
        when 'list'
            if true or user.hasRole('admin')
                opt =
                    criteriaOpt: ->
                        q:
                            'user._id': user.id
                    btns: [
                        label: '新建'
                        cls: _st.btn('primary','sm')
                        href: util.navUrl('exForm', code)
                    ]
                    itemContext: (d)->
                        title: d.title
                        attrs:
                            href: util.navUrl('exForm', code, 'view', d._id)

                app.dm.collection ctn, ob.entity, opt

        when 'tb'
            if true or user.hasRole('admin')
                app.dm.tb ctn, ob.entity,
                    cols: ob.prop
                    itemBtns: ['popView']
                    btns: []

        when 'view'
            if true or user.hasRole('admin')
                app.dm.view ctn, ob.entity, p,
                    tagClass: _st.tb(0, 1, 1, 0, 'viewTable')
                    editable: true
                    prop: ob.prop

        else
            $.extend ob,
#                goPage: util.navUrl 'exForm', code, 'list'
                callback: ->
                    if ob.refFile and ob.refFile.head
                        ctn.prepend tu.imgItem(ob, cf.community)
                before:(d)->
                    if @arrayMod
                        d[@arrayMod] = (for it in @prop
                            title: it.label
                            val: util.del(it.code, d)
                            code: it.code
                        )
                    d
            cf._rsMsg = ob.rsMsg
            app.dm.form ctn, ob.entity, ob

app.enhance
    routes:
        '!/exForm/:code(/:act)(/:p)': 'form'
    form: (code, act, p)->
        if W._exForm and _exForm.code is code
            doExForm(_exForm, code, act, p)
        else
            $.get util.restUrl('exForm', 'code', code), (res)->
                if res and (ob = res.entity)
                    doExForm(ob, code, act, p)
                else
                    popMsg '没有功能', 'warning'
