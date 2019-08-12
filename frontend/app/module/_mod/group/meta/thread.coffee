m.reply =
    prop:[
        m._textarea 'content'
        m._user()
    ]

m.thread =
    label: '帖子'
    prop: [
        _ep 'title'
        _ep 'content:content' 
        _ep 'cat'

        m._user()

        m._n2o 'group',null,
            showText:(v)->
                util.adjustText(v.title,25)

        m._pic 'head'

        m._checkbox 'isTop',
            label: '是否置顶'

        m._itemTable 'reply'
    ]
    listOpt:
        colNum: 4
        checkAll: true
        btns:['topAdd','copyAdd','trans','batchDel']
    filter:
        title: 'text:s:mt'




#        head: false
#        _attrs: ->
#            'title,user,createdDate'
#        modelOpt:
#            tagName: 'a'
#            attributes: ->
#                href: tu.navUrl('data/view/thread', @model.id)
#            tmpl: 'threadItem'
#meta.ex 'content', 'thread',
#    content:
#        type: 'textarea'
#    _:
#        item: [
#            'title'
#            'content'
#            'slidePic'
#        ]
#