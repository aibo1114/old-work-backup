#item: [
#            'username'
#            'phone'
#            'content'
#            'applyPic'
#            'status'
#        ]

#m.inquiry =
#    prop:[
#        _ep 'username'
#
#        _ep 'phone'
#

#
#        m._pic 'head'
#
#        _ep 'status'
#    ]

m.inquiry =
    prop: [
        _ep 'username'
    ,
        code: 'shop'
        showText: (v)->
            if v
                tu.link (v._e = 'shop' && v)
    ,
        code: 'consultant'
        showText: (v)->
            if v
                tu.link (v._e = 'consultant' && v), 'username'
    ,
        _ep 'phone'
    ,
        code: 'content'
        type: 'textarea'
    ,
        m._pic 'head'
    ]

    filter:
        username: 'text:s:mt'
        phone: 'text:s:mt'

    viewOpt:
        btns: ['close']
        cols: '100px,auto'

