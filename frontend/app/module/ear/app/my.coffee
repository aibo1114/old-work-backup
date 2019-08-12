require './meta/inquiry'
require './meta/answer'
require './meta/order'

m.inquiry.listOpt =
    _attrs: ->
        'username,content,dateCreated'
    criteriaOpt: ->
        q:
            phone: user.get 'phone'
    itemContext: (d)->
        $.extend d,
            title: "#{d.username} 【#{d.dateCreated.dStr()}】"
            brief: " #{d.content}"

m.answer.listOpt =
    _attrs: ->
        'user,content,dateCreated'
    criteriaOpt: ->
        q:
            'questioner.phone': user.get 'phone'
    itemContext: (d)->
        $.extend d,
            title: "#{d.user.username}"
            subTitle: "回答时间:【#{d.dateCreated.dStr()}】 "
            brief: d.content

m.order.listOpt =
    btns: [
        label: '我要预约'
        href: util.navUrl('apply', 'order')
        cls: 'btn btn-small btn-primary'
    ]
    _attrs: ->
        'phone,status,symptom,dateCreated,consultant,shop,appointmentTime'
    criteriaOpt: ->
        q:
            phone: user.get 'phone'
    itemContext: (d)->
        $.extend d,
            title: "【#{cf.st.text('order', d.status || 10)}】#{if d.shop then d.shop.title else ''} #{if d.consultant then d.consultant.username else ''}"
            subTitle: "预约时间:【#{d.appointmentTime.dStr()}】"
            brief: "症状: #{d.symptom}"

app.enhance
    routes:
        '!/my/qa(/:type)': 'question'
        '!/my/order': 'order'

    order: ->
        @dm.collection ctn, 'order',
            title: '我的预约'
            noFilter: true
            topBtn: true

    question: (type = 'inquiry')->
        util.tabPage ctn, [
            href: tu.navUrl('my/qa', 'inquiry')
            title: '我的咨询'
            tabClass: 'inquiry'
        ,
            href: tu.navUrl('my/qa', 'answer')
            tabClass: 'answer'
            title: '我的答案'
        ], type, ->
            $('.nav-tabs').append tu.genBtn
                label: '我要咨询'
                href: util.navUrl('apply', 'inquiry')
                cls: 'btn btn-small btn-primary pull-right myInz'

        @dm.collection '.tab-content', type,
            head: false

        

