tbm = ['up', 'down', 'popEdit', 'formDel']
m.nav =
    prop: [
        code: '_fBtn'
        noLabel: true
        noEdit: true
        type: 'btn'
        w: '40px'
        attrs:
            cls: 'noHeadTitle text-center btn btn-sm'
            icon: 'plus'
    ,
        code: 'ref'
        type: 'hoder'
        xtype: 'ref'
        noName: true
        attrs:
            selectBoxOpt:
                groupBtn: [
                    icon: 'trash'
                ]
                setAttrs: null
                afterPick: (d)->
                    @form.setVal "input[name='href']", util.pageUrl(d)
                    @form.setVal "input[name='label']", d.title
                    @form.setVal "input[name='title']", d.subTitle

        _ep 'label'
        meta._text 'href'
        meta._text 'tip'
        meta._text 'act'
        meta._text 'icon'
        meta._text 'cls'
    ]
    listOpt:
        itemBtns: tbm
    navOpt:
        events:
            'click .noHeadTitle': cf.view.showInTd
        itemBtns: tbm
        toFetch: false
        _dv: []
        entity: 'nav'
        afterShow: (e, p)->
            c = @
            idx = util.ct(e).parents('tr').index()
            new cf.view.jsonTable
                head: true
                title: '子菜单'
                entity: 'nav'
                toFetch: false
                itemBtns: tbm
                parent: p
                _prop: 'children'
                _setObj: (ob)->
                    it = c.form.model.get(c.name)[idx]
                    it.children = ob
                _getProp: ->
                    c.form.model.get(c.name)[idx].children

m.community =
    prop: [
        m._text 'code',
            noChange: true

        meta._text 'pCode'

        _ep 'name'

        m._text 'url'
    ,
        _ep 'exDomain',
            xtype: 'listEditor'
    ,
        meta._text 'resPath'

        meta._text 'record'

        m._number 'bizPhone',
            label: '公司电话'
            
        meta._text 'email'

        meta._text 'mailHost'

        meta._text 'mailPsd'


        _ep 'content:content' ,
            code: 'description'

        m._itemTable 'nav',
            entity: 'nav'
            attrs: m.nav.navOpt

        m._itemTable 'foot',
            entity: 'nav'
            attrs: $.extend title: '底部导航', m.nav.navOpt

        m._text 'weibo',
            label: '微博'

        m._text 'qq'

        m._pic 'logo'
        m._pic 'qrcode'

    ]
    listOpt:
        itemBtns: ['mgm', 'ipEdit', 'genSite', 'genCache', 'del']
    btn:
        mgm: (it) ->
            util.iBtn 'scale', 'mgm', "http://#{it.url + (if cf.mode then ':3000' else '')}/console?_code=#{it.code}"
        genSite: ->
            util.iBtn "plane", "genSite"
        genCache: ->
            util.iBtn "retweet", "genCache"
    event:
        genSite:
            type: 'click'
            fun: (e)->
                d = @findData(e)
                $.post util.actUrl("site/gen", d.id), code: d.get('code')
        genInnerSite:
            type: 'click'
            fun: (e)->
#                $.get(util.actUrl("community", "genInnerSite", util.getTargetId(e)))
        genCache:
            type: 'click'
            fun: (e)->

if true || cf.bdst
    m.community.prop.concatBy [
        m._tag 'legend',null,'百度统计'

        m._text 'bdVerifyStr',
            label: '验证字符串'
            ph: '添加站点时的meta验证字符串'
        m._text 'bdPushUrl',
            label: '推送地址'
            ph: '推送新文章的URL地址(带token)'
        m._text 'bdStCode',
            label: '统计字符串'
            ph: '百度统计代码中长度为32的数字串'
    ]