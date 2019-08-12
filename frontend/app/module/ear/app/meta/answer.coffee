m.answer =
    prop: [
        _ep 'status'
    ,
        code: 'issue'
        showText: (v, d)->
            if v
                "#{v.content} 【#{d.questioner?.username}】"
    ,
        code: 'content'
        showText: (v, d)->
            if d.user
                d.user._e = 'consultant'
                v += '【' + tu.link(d.user, 'username') + '】'
            v

    ,
        _ep 'proc'

    ]

    listOpt:
        _attrs: ''

#    tbBtn: ['popEdit', 'del']

    filter:
        issue: 'text:s'

    viewOpt:
        btns: ['close']

cf.st.add 'answer', cf.st.common_status


