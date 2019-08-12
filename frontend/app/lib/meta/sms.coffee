
meta.sms =
    phones:
        label: '电话号码'
        type: 'textarea'
        rows: 10
    text:
        label: '发送内容'
        type: 'textarea'
    _:
        tbItem:
            text:
                type: 'text'
            lastUpdated:
                type: 'date'
            _opt:
                type: 'btns'
                w: 120
        item: ['phones', 'text']
        action: ->
            ['send', 'inEdit', 'del']

        formOpt:
            before: (d)->
                unless d.text.endsWith '】'
                    d.text += "【#{cf.community.name}】"
                d._proc = 'sendAll'
                d