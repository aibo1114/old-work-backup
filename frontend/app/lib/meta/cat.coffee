meta.cat =
    code: 'cat'
    def: true
    type: 'entity'
    prop: [
        _ep 'code'
        _ep 'title'
        _ep 'subTitle'
        _ep 'row'

        m._text 'type',
            valid:
                char: true
            data:->
                res = []
                for it in user.entities
                    unless it.key.startsWith '_'
                        res.push it.key
                res
                
        m.content.prop.codeBy 'status'

#        _ep 'content:content'
        _ep 'pic'
    ]


#meta.cat =
#    subTitle:
#        type: 'text'
#    code:
#        type: "text"
#        id: '_code'
#        ph: '请输入英文单词'
#        valid:
#            char: true
#            required: true
#    pid:
#        label: '父分类'
#        type: "select"
#        entity: 'category'
#        keyVal: 'code,label'
#        title: ' '
#        events:
#            change: (e)->
#                $('#_code').val("#{util.ct(e).val()}_#{$('#_code').val()}")
#    type:
#        type: "text"
#        const: true
#    _: {}