m.sight =
    prop: [
        _ep 'title'
        _ep 'subTitle'
        _ep 'pinYin'
        _ep 'row'
        _ep 'cat'
        _ep 'content:content' 
        _ep 'geo'

        m._itemTable 'itemTable',
            attrs:
                data: [
                    title: 'Opening Hours'
                ,
                    title: 'Price'
                ,
                    title: 'Address'
                ,
                    title: 'Distance'
                ,
                    title: 'Getting There'
                ,
                    title: 'English Map'
                ,
                    title: 'Travel Tips'
                ,
                    title: 'Official Website'
                ,
                    title: 'Watch Video'
                ,
                    title: 'Last Updated'
                ]

        m._itemTable 'sub',
            attrs:
                entity: 'subSight'

        m._itemTable 'extra',
            attrs:
                entity: 'extra'

        m._itemTable 'recommend',
            attrs:
                entity: 'recItem'

        m._pic 'slide'

        m._pic 'list'
    ]
    filter:
        title: 'text:s:mt'




#    sub:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'subSight'
#            _func: null
#            _prop: 'sub'
#            _dv: []
#            callback: ->
#
#    extra:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'extra'
#            _func: null
#            _prop: 'extra'
#            _dv: []
#
#    _: lsOpt


#
#item: [
#    'title'
#    'subTitle'
#    'pinYin'
#    'row'
#    'cat'
#    'content'
#    'geo'
#
#    'itemTable'
#
#    'sub'
#    'extra'
#    'recommend'
#    'slidePic'
#    'listPic'
#]


#    content:
#        type: 'textarea'
#        rows: 6
#
#    _:
#        item: [
#            'title'
#            'fee'
#            'row'
#            'content'
#            'headPic'
#        ]
#        tbItem:
#            row:
#                w: 50
#            title: {}
#            _opt:
#                type: 'btns'
#                w: 120

#