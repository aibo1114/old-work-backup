m.roleMap =
    prop: [
        _ep 'code'
        _ep 'role'

        m._number 'total',
            val: 0

        m._number 'left',
            val: 0

        _ep 'description'
    ]

    _: {}

#    code:
#        type: "text"
#        id: '_code'
#        ph: '请输入英文单词'
#        valid:
#            char: true
#            required: true
#    role:
#        type: "text"
#
#    total:
#        type: "number"
#        val: 100
#        valid:
#            required: true
#
#    _:
#        action: ->
#            ["inEdit", "del"]
#        filter:
#            type: 'text'
#        item: [
#            "code"
#            'role'
#            'description'
#            'total'
#        ]
#
#        tbItem:
#            code:
#                w: 100
#                type: "text"
#            role:
#                type: "text"
#            count:
#                w: 80
#                type: "text"
#            _opt:
#                type: "btns"
#                w: 180