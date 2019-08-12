m.headItem =
    label: '头版列表'
    prop: [
        code: 'ref'
        type: 'holder'
        xtype: 'ref'
        noName: true
        attrs:
            selectBoxOpt:
                groupBtn: [
                    icon: 'remove'
                ]
                setAttrs: null
                afterPick: (d)->
                    @form.setVal "input[name='href']", util.pageUrl(d)
                    @form.setVal "input[name='title']", d.title
                    @form.setVal "input[name='subTitle']", d.subTitle

        _ep 'title'

        _ep 'subTitle'

        m._textarea 'brief'

        m._text 'href'

        m._text 'cls'

        m._pic 'head',
            attrs:
                multi: true
    ]

m.head =
    def: true
    type: 'entity'
    prop: [
        m._select 'channel',
            label: '频道'
            attrs:
                data: ->
                    cf.opt.entity.headRefChannel

        m._itemTable 'headItem',
            attrs:
                itemBtn: ['up', 'down', 'popEdit', 'formDel']
    ]