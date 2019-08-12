#meta.package =
#    price:
#        type: 'text'
#    _:
#        item: [
#            'title'
#            'price'
#            'description'
#        ]
#
#        tbItem:
#            title: {}
#            price: {}
#            description: {}
#            _opt:
#                type: 'btns'
#                w: 120
#
#        action: ['popEdit','formDel']
#
#meta.ex 'content', 'service',
#    package:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'package'
#            toFetch: false
#            _func: null
#            _prop: 'package'
#            _dv: []
#    _:
#        item: [
#            'title'
#            'subTitle'
#            'row'
#            'cat'
#            'pubTime'
#            'brief'
#            'content'
#            'package'
#            'status'
#            'headPic'
#        ]

m.package =
    prop:[
        _ep 'title'
        _ep 'price'
        _ep 'description'
    ]
m.service =
    prop:[
        _ep 'title'
        _ep 'subTitle'
        _ep 'row'
        _ep 'cat'
        _ep 'pubTime'
        _ep 'brief'
        _ep 'content:content' 

        m._itemTable 'itemTable',
            attrs:
                entity: 'package'

        m.content.prop.codeBy 'status'

        m._pic 'head'

    ]
