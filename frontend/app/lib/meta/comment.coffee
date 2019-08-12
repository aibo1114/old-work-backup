m.comment =
    prop:[
        _ep 'user:username',
            ph: '用户名'

        _ep 'contact',
            label: '联系方式'
            ph: '电话/邮箱'

        m._textarea 'content',
            label: '留言内容'
            type: 'textarea'
            ph: '您的留言或者是评价'
            valid:
                required: true
    ]

#    username:
#        ph: '用户名'
#        valid:
#            required: true
#    contact:
#
#    content:
#
#    _:
#        item: [
#            'username'
#            'contact'
#            'content'
#        ]
#        tbItem:
#            username: {}
#            content: {}
#            _btn: ['popEdit', 'del']