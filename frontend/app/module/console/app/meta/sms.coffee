meta.sms =
    prop: [
        code: 'phones'
        label: '电话号码'
        type: 'textarea'
        rows: 10
    ,
        code: 'text'
        label: '发送内容'
        type: 'textarea'
    ]

    formOpt:
        before: (d)->
            unless d.text.endsWith '】'
                d.text += "【#{cf.community.name}】"
            d._proc = 'sendAll'
            d