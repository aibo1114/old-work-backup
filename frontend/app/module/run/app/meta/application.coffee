m.application =
    prop:[
        _ep 'username'

        _ep 'phone'

        _ep 'email'

        m._radio 'subscribe',
            attrs:
                data:
                    true: '是'
                    false: '否'
    ]