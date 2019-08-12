require '../../../console/app/meta/common'

require './common'
require './comment'
require './brand'
require './product'
require './consultant'
require './shop'
require './school'
require './seckilling'
require './card'

require './order'
require './inquiry'
require './answer'

cf.bdst =
    entities: ['post', 'content', 'shop', 'product', 'school', 'consultant', 'card', 'seckilling']

cf._stat =
    inquiry:
        className: 'col-md-6'
        colNum: 4

    order:
        className: 'col-md-6'
        itemBtns: ['popView', 'processOrderStatus', 'del']
        colNum: 4

    answer:
        className: 'col-md-6'
        itemBtns: ['popView', 'processAnswerStatus', 'del']
        colNum: 3

    guestBook:
        className: 'col-md-6'
        colNum: 3

#m.community.prop.push 
#cp = m.community.prop
#cp.push m._text 'weibo'
#cp.push m._text 'qq'


#cf._addStat = ->
#    app.dm.tb '#main .row', 'order',
#        style: 'panel-info'
#        className: 'col-md-12'
#        cleanAll: false
#        toFetch: true
#        max: 8
#        btns: null
#
#    app.dm.tb '#main .row', 'inquiry',
#        style: 'panel-info'
#        className: 'col-md-12'
#        cleanAll: false
#        toFetch: true
#        max: 8
#        btns: null
#
#    app.dm.tb '#main .row', 'answer',
#        style: 'panel-info'
#        className: 'col-md-12'
#        cleanAll: false
#        toFetch: true
#        max: 8
#        btns: null


#$.extend meta.common,
#    comment: meta.itemTb 'comment'
#    phone:
#        type: "tel"
#        valid:
#            required: true
#            number: true
#
#
#$.extend true, meta.inquiry,
#    shop:
#        showText: (v, d)->
#            if d.shop
#                d.shop._e = 'shop'
#                tu.link d.shop
#    consultant:
#        showText: (v, d)->
#            if d.consultant
#                d.consultant._e = 'consultant'
#                tu.link d.consultant, 'username'
#    _:
#        item: [
#            'username'
#            'phone'
#            'content'
#            'applyPic'
#            'status'
#        ]
#        tbItem:
#            username:{}
#            content:{}
#            lastUpdated:
#                type: 'date'
#            phone: {}
#            shop: {}
#            consultant: {}
#            _btn: ['popEdit', 'del']
#
#$.extend true, meta.answer,
#    shop:
#        showText: (v, d)->
#            if d.shop
#                d.shop._e = 'shop'
#                tu.link d.shop
#    user:
#        showText: (v, d)->
#            if d.user
#                d.user._e = 'consultant'
#                tu.link d.user, 'username'
#    content:
#        showText: (v, d)->
#            res = d.content
#            if d.user
#                d.user._e = 'consultant'
#                res += '【' + tu.link(d.user, 'username') + '】'
#            res
#    issue:
#        showText: (v, d)->
#            if d.issue
#                "#{d.issue.content} 【#{d.questioner?.username}】"
#    _:
#        listOpt:
#            _attrs: ->
#                ''
#        item: [
#            'status'
#        ]
#        tbItem:
#            issue: {}
#            content: {}
#            lastUpdated:
#                type: 'date'
#            _btn: ['popEdit', 'del']
#
#$.extend true, meta.order,
#    status:
#        type: 'radio'
#        inline: true
#        data: cf.st.order_status_hash
#    _:
#        item: [
#            'username'
#            'gender'
#            'age'
#            'phone'
#            'symptom'
#            'shop'
#            'consultant'
#            'appointmentTime'
#            'memo'
#            'status'
#        ]
#        tbItem:
#            status: {}
#            username:{}
#            phone: {}
#            appointmentTime:
#                type: 'date'
#            symptom: {}
#            shop: {}
#            consultant: {}
#            _btn: ['popView', 'popEdit', 'del']
#
#

#
#$.extend true, meta,
#    brand: meta.cf.brandItem()
#    shop:
#        operTime:
#            xtype: 'dTime'
#            attrs:
#                minView: 2
#                startView: 4

