meta.pubAccount =
    prop: [
        _ep 'title'

        _ep 'code'

        meta._text 'sid',
            ph: '在微信后台的基本配置中查看'
            label: '原始ID'


        meta._text 'appId',
            ph: '在微信后台的基本配置中查看'
            label: '开发ID'

        meta._text 'secret',
            label: '开发秘钥'

        code: 'aes'
        label: '传输加盟串'

        code: 'mid'
        type: "text"
        label: '商户ID'
        ph: '用于微信支付'

        code: 'tradeSecret'
        type: "text"
        label: '商户支付秘钥'
        ph: '用于微信支付'

        m._pic 'qrcode'

    ]
    listOpt:
        itemBtns: ['menu', 'ipEdit', 'del']
    btn:
        menu: (it, e)->
            util.iBtn 'list', null, util.navUrl "wechat/pubAccount/#{it._id}/menu"
    event:
        menu:
            type: 'click'
            fun: (e)->
                cf._wtCode = @findData(e).get('code')
#    aes:
#        label: '传输加盟串'
#
#    code:
#        type: "text"
#        ph: '唯一的编码，用于输入查询，通常为字符组合'
#    appId:
#        type: "text"
#        label: '开发ID'
#    sid:
#        type: "text"
#        label: '原始ID'
#    secret:
#        type: "text"
#        label: '开发秘钥'
#    mid:
#        type: "text"
#        label: '商户ID'
#        ph: '用于微信支付'
#
#    tradeSecret:
#        type: "text"
#        label: '商户支付秘钥'
#        ph: '用于微信支付'
#

#
#    tbItem:
#        title: {}
#        dateCreated:
#            type: 'date'
#            w: 150
#        code:
#            w: 150
#        _opt:
#            type: "btns"
#            w: 200

meta.ticketTable =
    ticket:
        type: 'text'
    _:
        item: ['ticket', 'ref']
        tbItem:
            ticket:
                w: 100
            ref:
                w: 100
