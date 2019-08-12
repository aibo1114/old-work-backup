module.exports = meta =
    p:
        hidden: {}

        number: {}

        text: {}

        textarea:
            attrs:
                rows: 5
        radio:
            val: 1
            attrs:
                inline: true
                data: ->
                    true: '是'
                    false: '否'

    _select:(code, opt)->
        $.extend true,
            code: code
            type: 'select'
            showText: (v, d, m)->
                if (md = m.prop.codeBy(code)) and md.attrs and md.attrs.data
                    md.attrs.data[v]
                else
                    v
            attrs:{}
        ,opt

    _money:(code, opt)->
        $.extend true,
            code: code
            type: 'number'
            group:
                suf: '元'
            valid:
                required: true
                min: 0.01
            events:
                keyup:(e)->
                    t = util.ct(e)
                    v = t.val()+ ''
                    [y,p] = v.split('.')
                    if p and p.length > 2
                        t.val "#{y}.#{p.substr(0,2)}"
        , opt

    _number:(code, opt)->
        $.extend true,
            code: code
            type: 'number'
        ,opt


    _content:(code = 'content', opt)->
        ty = if util.getCookie('_xe') is 'md'
            'markdown'
        else
            'content'
        $.extend true,
            code: code
            type: 'textarea'
            xtype: ty
            attrs:
                rows: 10
        , opt


    _btn:(w)->
        op =
            code: '_btn'
            type: 'btn'
        if w
            op.w = w
        op

    _iObj: (code, entity, opt)->
        $.extend true,
            code: code
            type: 'text'
            xtype: 'inlineObj'
            attrs:
                entity: entity
        , opt
        
    _n2o: (code, entity = code, opt)->
        $.extend true,
            code: code
            type: 'text'
            xtype: 'selectBox'
            bind: true
            attrs:
                clickShow: true
                searchItem: 'title'
                setAttrs:'_id,title'
                panelOpt:
                    entity: entity
        , opt
        
    _user: (opt = {})->
        cd = 'user'
        opt.attrs ?= {}
        $.extend true,
            code: cd
#            noName: true
            type: 'text'
            xtype: 'selectBox'
            bind: true
            showText:(v)->
                v?.username
            attrs:
                clickShow: true
                searchItem: 'username'
                setAttrs: '_id,username'
                panelOpt:
                    entity: cd
        , opt
        
    _link: (code, opt)->
        $.extend true,
            code: code
            type: "text"
            valid:
                required: true
                minlength: 2
                maxlength: 100
            showText: (v, it)->
                hf = "/#{it._e}/#{it._id}"
                if cf.index is 'console'
                    hf += '?_c=1'
                "<a target='_blank' href='#{hf}'>#{v}</a>"
        , opt

    _cat: (type, opt)->
        $.extend true,
            code: 'cat'
            type: 'select'
#            noName: true
            attrs:
                entity: 'cat'
                keyVal: 'code,title'
                criteriaOpt: ->
                    q:
                        $or: [
                            type:
                                $in: [type, '']
                        ,
                            type:
                                $exists: false
                        ]
                    max: 50
        , opt

#            events:
#                change: (e)->
#                    t = util.ct(e)
#                    if (v = t.val()) is '0'
#                        @model.unset 'cat'
#                    else
#                        @model.set 'cat',
#                            code: v
#                            title: t.children(':selected').text()
#
#            showText: (v)->
#                v.title if v

#    _radio: (code, opt)->
#        oo =
#            code: code
#            type: 'radio'
#        $.extend true, oo, opt

    _checkbox: (code, opt)->
        oo =
            code: code
            type: 'checkbox'
            attrs:
                inline: true
                data:->
                    true: '是'
            events:
                'change': (e)->
                    t = util.ct(e)
                    d = @data
                    if d and d.true
                        if t.is(':checked')
                            @model.set code, true
                        else
                            @model.set code,false
        $.extend true, oo, opt

    _pic: (name, opt)->
        oo =
            code: "#{name}Pic"
            type: 'holder'
            xtype: 'refFileCollection'
            noName: true
            attrs:
                multi: false
                func: name
                pickBtn: true
            showText: (v, it)->
                if name is 'portrait'
                    tu.userPic cf.community, it._id
                else
                    tu.imgItem it, cf.community, name

        if name is 'slide'
            $.extend oo.attrs,
                multi: true
                pick: true

        $.extend true, oo, opt

    _tag: (tag, cls, text)->
        type: '_tag'
        attrs:
            tag: tag
            cls: cls
            title: text

    _view: (code, sp, op)->
        opt = 
            code: code
            type: 'view'
        if sp
            opt.showText = (v)->
                v?[sp]
        $.extend opt, op
            
    _itemTable: (name, opt = {})->
        opt.attrs ?= {}
        opt.attrs.itemBtns ?= ['up','down','popEdit','formDel']
        opt.attrs.btns ?= ['popAdd']
        attrs =
            entity: name
            toFetch: false
            _func: null
            _prop: name
        if m[name]
            $.extend attrs, m[name].listOpt
        $.extend true,
            code: name
            label: ' '
            xtype: 'jsonTable'
            attrs: attrs
        , opt

    exp: (name, opt)->
        v = if name.indexOf(':') > -1
            [et,name] = name.split(':')
            if meta[et]
                meta[et].prop.codeBy name
            else
                log 'no meta: ' + et
                {}
        else
            meta.common[name]

        $.extend true, code: name, v, opt

    common:
        title:
            type: "text"
            valid:
                required: true
                minlength: 3
                maxlength: 100

        subTitle:
            type: "text"

        code:
            type: "text"
            valid:
                required: true
                char: true
                minlength: 3

        label:
            type: 'text'

        isAccept:
            type: 'checkbox'
            data: [
                label: 'Enable'
                select: true
                val: true
            ]

        password:
            type: "password"
            id: "rpsd"
            valid:
                required: true
                minlength: 3
        name:
            type: "text"
            valid:
                required: true
                minlength: 2
                maxlength: 100

        phone:
            type: "tel"
            valid:
#                telephone: true
                number: true
                maxlength: 15
                minlength: 7

        wid:
            type: "text"

        address:
            type: "text"
            attrs: {}
            valid:
                required: true
                minlength: 5
                maxlength: 100

        fee: {}

        href:
            type: "text"
            valid:
                url: true

        user:
            type: 'holder'
            xtype: 'selectBox'
            attrs:
                key: '_id'
                label: 'username'
                showImg: 'portrait'
                searchItem: 'username'
                setAttrs: '_id,username'
                panelOpt:
                    entity: 'user'
                    noStr: 'Search User by username or Email'

        username:
            type: "text"
            valid:
                required: true
                minlength: 2
                maxlength: 20

        email:
            type: "email"
            valid:
                required: true
                email: true
        row:
            type: "number"
            ph: ii('row_ph')
            val: 1
            valid:
                number: true
                min: -10000
                max: 10000000

        link:
            type: "text"
            valid:
                url: true

        url:
            type: "text"
            valid:
                url: true

        introduction:
            type: "textarea"
            attrs:
                rows: 4
            valid:
                required: true

        price:
            type: 'number'
            valid:
                min: 0

        memo:
            type: "textarea"
            attrs:
                rows: 4

        description:
            type: "textarea"
            attrs:
                rows: 4

        status:
            type: "radio"
            attrs:
                inline: true
            isShow: ->
                user.isAdmin()
            showText: (v=0, it)->
                m = cf.st["#{it._e}_status_hash"] || cf.st["content_status_hash"]
                if m
                    m[+v]
                else
                    v

        brief:
            type: 'textarea'
            ph: '自动截取正文的前200个字'
            attrs:
                rows: 3
                size: 200

        tags:
            type: "text"


        roleCode:
            type: 'text'
    _:
        btn: {}
        fmBtn:{}
        event: {}

Array::codeBy = (val)->
    @findBy 'code', val

for k,v of meta.p
    do(k)->
        meta["_#{k}"] = (name, opt)->
            $.extend true, {code: name, type: k}, meta.p[k], opt


#itemTb: (et, opt)->
#$.extend true,
#    type: 'holder'
#    code: et
#    xtype: 'jsonTable'
#    cls: 'p0'
#    attrs:
#        entity: et
#        toFetch: false
#        _func: null
#        _prop: et
#, opt
#        pic:
#            type: 'holder'
#            xtype: 'refFileCollection'
#            noName: true
#            attrs:
#                multi: false
#                func: 'head'
#                pickBtn: true
#        cat:
#            type: 'select'
#            noName: true
#            attrs:
#                entity: 'cat'
#                keyVal: 'code,title'
#                addBtn: true
#                criteria:
#                    q:
#                        type: 'post'
#            events:
#                change: (e)->
#                    t = util.ct(e)
#                    @model.set 'cat',
#                        code: t.val()
#                        title: t.children(':selected').text()
#        channel:
#            type: 'select'
#            data: ->
#                cf.opt.entity.headRefChannel


#        _: {}
#    itemTable:
#        content:
#            type: 'textarea'
#        _:
#            item: [
#                'title'
#                'content'
#            ]
#            tbItem:
#                title: {}
#                content: {}
#                _btn: ['up', 'down', 'popEdit', 'formDel']
#
#    _:
#        _btn: ["edit", "del"] #, "lockPub"
#        btn: {}
#        event: {}

#remind:
#    type: "checkbox"
#    noLabel: true
#    attrs:
#        data: ['邮件提醒']
#        dateCreated:
#            type: "date"
#
#        lastUpdated:
#            type: "date"
#            ["edit", "del"]
#        event:
#        userId:
#            type: 'hidden'
#            _name: 'uid'
#            isShow: ->
#                !user.isAdmin()
#            value: (d)->
#                if !d.uid
#                    user.id
#        lang:
#            type: 'hidden'
#            value: ->
#                cf.lang || 'zh'
#        type:
#            type: "hidden"
#        cCode:
#            type: "hidden"
#            _name: 'code'
#            value: ->
#                cf.code
#
#        token:
#            type: "hidden"
#            value: ->
#                app.wt.token

#    _:
#        action: ->
#            ["genPage", "edit", "del", "lock", "pub"]
#        fmBtn:
#            prev: ->
#                cls: _st.btn(null, 'lg', null)
#            next: ->
#                cls: _st.btn('primary', 'lg', null)
#            back: ->
#                cls: _st.btn(null, 'lg', null)
#            save: ->
#                cls: _st.btn('primary', 'lg', null)
#            finish: ->
#                cls: _st.btn('primary', 'lg', null)
#            closeDlg: ->
#                cls: _st.btn('info', 'lg', null)

#        event:
#            sKey:
#                type: 'keyup'
#                tag: ':input'
#                fun: (e)->
#                    @save() if e.keyCode is 13
#            lock:
#                type: 'click'
#                fun: (e)->
#                    $.ajax
#                        type: 'get'
#                        url: util.actUrl(@entity, 'lock', util.getTargetId(e))
#                        data:
#                            entity: @entity
#                            page: 'forb.html'
#                            lang: cf.lang
#                            msg: '内容正在审核中，请耐心等待'
#                        dataType: "json"
#                        success: =>
#                            $(e.target).attr('class', 'pub icon-ok')
#                    e.stopPropagation()
#
#            pub:
#                type: 'click'
#                fun: (e)->
#                    $.ajax
#                        type: 'get'
#                        url: util.actUrl(@entity, 'pub', util.getTargetId(e))
#                        data:
#                            entity: @entity
#                            lang: cf.lang
#                        dataType: "json"
#                        success: (result) =>
#                            $(e.target).attr('class', 'lock icon-lock')
#                    e.stopPropagation()
#
#            shareIt:
#                type: 'click'
#                fun: (e)->
#                    t = $(e.currentTarget)
#                    tt = t.parent().siblings().eq(0)
#                    send = ->
#                        snc.sina.sendWidget
#                            default_text: tt.text() + ':' + tt.children().attr('href')
#                            default_image: util.resPath(t.attr('head'))
#                            button_text: '发布到微博'
#                    if WB2.checkLogin()
#                        send()
#                    else
#                        WB2.login ->
#                            send()
#
#            genPage:
#                type: 'click'
#                fun: (e)->
#                    id = util.getTargetId(e)
#                    $.ajax
#                        type: 'post'
#                        data:
#                            pages: "#{@entity}-#{id}"
#                        url: util.actUrl('home', 'genTmplPage', id)
#                        dataType: "json"
#                    e.stopPropagation()
#
#            del:
#                type: 'click'
#                fun: (e)->
##                    return unless user.entityAuth(@entity,'del')
#                    e.stopPropagation()
#                    return unless confirm(ii('m.sure'))
#                    m = @findData(e)
#                    if m
#                        m.destroy(wait: true)
#                    else
#                        log 'no model find'
#                    m = @collection.get util.getTargetId(e)
#                    log 'del:'
#                    m = @findData(e)
#                    log m
#                    if m
#                        if m.view.local
#                            @collection.remove m
#                            m.view.remove()
#                            m.view.afterRemove?()
##                            if @form
##                                @form.setJSON @entity, @collection
#                        else
#                            m.destroy(wait: true)
##                    else
##                        m = util.ct(e).closest('[data-cid]').data('_item')
#                            @collection.remove m
#                            m.remove()


#        btn:
#            lock: (it, e)->
#                if user.isAdmin() and it.status > 1 and it.status isnt 3
#                    util.iBtn "lock", "lock"
#
#            pub: (it, e)->
#                if user.isAdmin() and it.status > 1 and it.status isnt 2
#                    util.iBtn "check", "pub"
#
#            genPage: (it, e)->
#                if it and it.status is 2
#                    util.iBtn "refresh", 'genPage'
#
#            shareIt: (it, e)->
#                util.iBtn "share", 'share'
#
#            del: (it, e)->
#                util.iBtn 'trash', 'del'
#
#            formDel: (it, e)->
#                util.iBtn 'trash', 'formDel'
#
#            listDel: (it, e)->
#                util.iBtn 'trash', 'listDel'
#
#
#            popEdit: (it, e)->
#                util.iBtn 'edit', 'popEdit'
#
#            inlineEdit: (it, e)->
#                util.iBtn 'edit', 'inlineEdit'
#
#
#            inlineAdd: ->
#                util.tBtn 'add', null, 'plus', 'popAdd btn btn-primary btn-sm'
#
#            popAdd: ->
#                util.tBtn 'add', null, 'plus', 'popAdd btn btn-primary btn-sm'
#
#            topAdd: (it, e)->
#                opt = util.tBtn 'add', null, 'plus', 'btn btn-primary btn-sm'
#                opt.href = util.navUrl('data/add', e)
#                opt
#
#            exExcel: (it, e)->
#                require [cf.rPath + "js/excellentexport.js"]
#                opt = util.tBtn 'export', null, 'floppy-save', 'btn btn-primary btn-sm'
#                opt.attr =
#                    onclick: "return ExcellentExport.excel(this, '#{e}Tb', '#{e} excel file')"
#                    download: "#{e}_#{new Date().getTime()}.xls"
#                opt
#
#            exCsv: (it, e)->
#                require [cf.rPath + "js/excellentexport.min.js"]
#                opt = util.tBtn 'export', null, 'floppy-save', 'btn btn-primary btn-sm'
#                opt.attr =
#                    onclick: "return ExcellentExport.csv(this, '#{e}Tb')"
#                    download: "#{e}_#{new Date().getTime()}.csv"
#                opt
#
#            edit: (it, e)->
#                util.iBtn 'edit', null, util.navUrl 'data/edit', e, it[cf.id]
#
#            view: (it, e)->
#                util.iBtn 'list-alt', null, util.navUrl 'data/view', e, it[cf.id]

#        tbItem:
#            title:
#                w: 200
#                type: "view"
#            dateCreated:
#                type: "date"
#            _opt:
#                w: 180
#                type: "btns"


#        cid:
#            type: "hidden"
#            value: ->
#                cf.cid
#
#        pid:
#            type: "hidden"
#            value: ->
#                0

#        sWeibo:
#            type: "checkbox"
#            noLabel: true
#            val: false
#            callback: ->
#                snc.sina.login()
#            attrs:
#                data:
#                    label: '同步到新浪微博'
#                    val: true
#
#        sQQ:
#            type: "checkbox"
#            noLabel: true
#            attrs:
#                data: ['同步到腾讯微博']