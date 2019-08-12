require '../../../../lib/widget/editor/rating/app'

m.comment =
    prop:[
        _ep 'username'

        code: 'contact'
        label: '联系方式'
        ph: '电话/邮箱'
    ,
        code: 'content'
        label: '留言内容'
        type: 'textarea'
        ph: '您的留言或者是评价'
        attrs:{}
        valid:
            required: true
    ,
        code: 'level'
        xtype: 'rating'
        label: '专业水平'
        attrs:
            max: 5
            rateable: true
            tip:
                low: '不好'
                middle: '一般'
                high: '非常棒'
    ,
        code: 'rating'
        xtype: 'rating'
        label: '服务质量'
        attrs:
            max: 5
            rateable: true
            tip:
                low: '不好'
                middle: '一般'
                high: '非常棒'
    ,
        m.content.prop.codeBy 'status'
    ]
    tbBtn: ['popEdit','formDel']
#
#$.extend meta.comment,
#
#
#$.extend meta.comment._,
#    item: [
#        'username'
#        'contact'
#        'content'
#        'rating'
#        'level'
#        'status'
#    ]
#    tbItem:
#        username: {}
#        content: {}
#        rating: {}
#        status:
#            type: 'status'
#        lastUpdated:
#            type: 'date'
#        _btn: ['popEdit', 'formDel']
#
