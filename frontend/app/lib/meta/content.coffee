status = require './_status'

meta.href =
    prop: [
        _ep 'title'
        
        m._text 'href'

        _ep 'cls'

    ]
meta.btn =
    prop: [
        _ep 'label'
        _ep 'icon'
        _ep 'act'
        _ep 'cls'
    ]

meta.content =
    code: 'content'
    entity: true
    inherit: true
    prop: [
        m._link 'title'
        _ep 'subTitle'
        _ep 'row',
            sort: 1

        _ep 'brief'
        
        m._content()

        _ep 'memo'

        m._itemTable 'href'

        m._itemTable 'btn'

        m._select 'cat',
            attrs:
                data:
                    page: '独立页面'
                    sub: '内嵌页面'
                    block: '模块内容'
            trigger: 'change'
            
        m._select 'tmpl',
            dep: 
                code: 'cat'
                val:'sub'
            attrs:
                data: [
                    'contentTmpl'
                ]

        _ep 'status'

        m._pic 'head'

    ]

    sort:
        row:
            type: 2
        dateCreated:
            type: 2
            
    filter:
        title: 'text:s:mt'

    listOpt:
        checkAll: true
        btns:['topAdd','copyAdd','trans','batchDel']

status.add 'content', status.common_status