require '../../../../lib/meta/extend/ref'
require '../../../../lib/func/showInTd'
m.nav =
    prop: [
        code: 'fBtn'
        noLabel: true
        noEdit: true
        type: 'btn'
        w: '40px'
        attrs:
            cls: 'noHeadTitle text-center btn btn-sm'
            icon: 'plus'
    ,
#        meta._hidden 'pid',
#            val:->
#                util.atHash('4')
#        meta._select 'type',
#            attrs:
#                data:
#                    'file': '链接'
#                    'folder': '栏目'
#        _ep 'refClass',
#            noName: true

        _ep 'ref',
            noName: true
            attrs:
                clickShow: true
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

#    cls:
#        type: 'text'
#    tip:
#        type: 'text'
#    icon:
#        type: 'text'
#    href:
#        type: 'text'
#        data: [
#            '/'
#            '/wechat'
#            '/inquiry'
#        ]
#
#    ref: $.extend true, _.clone(meta.common.ref),
#        attrs:
#            clickShow: true
#            setAttrs: null
#            afterPick: (d)->
#                @form.setVal "input[name='href']", util.pageUrl(d)
#                @form.setVal "input[name='label']", d.title
#                @form.setVal "input[name='title']", d.subTitle


    
    
#    btn:
#        showInTd: (it)->
#            util.iBtn "tasks", 'showInTd none'
#        item: [
#            'refClass'
#            'ref'
#            'label'
#            'tip'
#            'href'
#            'act'
#            'cls'
#            'icon'
#        ]
#        tbItem:
#            bop:
#                noLabel: true
#                w: 55
#                act: 'showInTd noHeadTitle'
#                icon: 'plus'
#                type: 'btn'
#            label: {}
#            href: {}
#            _btn: ['popEdit', 'formDel', 'up', 'down', 'showInTd']