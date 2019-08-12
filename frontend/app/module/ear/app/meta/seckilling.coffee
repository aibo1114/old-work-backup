m.seckilling =
    prop:[
        _ep 'title'

        _ep 'row'

        m._text 'origin'

        _ep 'pubTime'

        m._text 'price'

        m._text 'discount'

        m._text 'surplus'

        m._text 'place'

        _ep 'url'

        _ep 'description'

        m.content.prop.codeBy 'status'

        m._pic 'head'

    ]
#
#meta.ex 'content', 'seckilling',
#    surplus: {}
#    discount: {}
#    _:
#        item: [
#            'title'
#            'row'
#            'origin'
#            'pubTime'
#            'price'
#            'discount'
#            'surplus'
#            'place'
#            'url'
#            'description'
#            'status'
#            'headPic'
#        ]