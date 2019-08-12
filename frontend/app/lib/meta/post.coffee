m.post =
    code: 'post'
    def: true
    type: 'entity'
    inherit: true
    prop: [
        m._link 'title'

        _ep 'subTitle'

        _ep 'row'

        m._cat 'post'

        _ep 'tags'

        _ep 'author'

        m._user()

        m._text 'source',
            type: 'url'

        _ep 'startedDate',
            code: 'pubTime'

        _ep 'brief'

        _ep 'content:content'

        m.content.prop.codeBy 'status'
        
        m._pic 'head'

    ]
    listOpt:
        checkAll: true
        btns:['topAdd','copyAdd','trans','batchDel']
