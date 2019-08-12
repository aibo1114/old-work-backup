m.exForm =
    label: '自定义表单'
    prop: [
        _ep 'code'
        

        _ep 'entity'

        _ep 'title'

        m._checkbox 'isLogin',
            label: '是否登录'

        m._checkbox 'mergeUser',
            label: '合并用户'

        _ep 'className',
            label: '样式'

        _ep 'rsMsg',
            label: '返回信息'

        _ep 'arrayMod',
            label: '队列模式'

        m._textarea 'description'

        m._itemTable 'prop',
            attrs:
                itemBtns: [
                    'up'
                    'down'
                    'inlineEdit'
                    'formDel'
                ]

        m._n2o 'prePage', 'content',
            label: '欢迎页'
            attrs:
                setAttrs:''


        m._n2o 'sufPage', 'content',
            label: '结束页'
            attrs:
                setAttrs:''

        m._pic 'head'

        _ep 'content:status'
    ]

    listOpt:
        checkAll: true
        btns:['topAdd','copyAdd','trans','batchDel']

    filter:
        code: 'text:s:mt'


    
