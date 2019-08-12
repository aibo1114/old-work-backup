m.media =
    label: '媒介'
    prop: [
        _ep 'title'

        m._text 'author'

        _ep 'description'

        m._text 'recommend',
            label: '推荐指数'

        _ep 'url',
            label: '地址'

        m._pic 'head'
    ]

    listOpt:
        checkAll: true
        btns: ['topAdd', 'copyAdd', 'trans', 'batchDel']