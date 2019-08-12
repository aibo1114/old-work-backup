m = meta
meta.agentOp =
    prop: [
        code: 'code'
        ph: '唯一的编码，用于输入查询，通常为字符组合'
        valid:
            required: true
            minlength: 1

        _ep 'title'

        m._select 'type',
            attrs:
                data: ['text', 'entity', 'page', 'func', 'script']


        m._text 'help'

        m._textarea 'content'

        m._text 'imgUrl'
    ]
