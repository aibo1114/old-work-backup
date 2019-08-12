
status = require './_status'

m.common.opsd =
    type: "password"
    valid:
        required: true
       
m.common.rpsd =
    type: "password"
    ph: '重复密码'
    valid:
        equalTo: "#rpsd"
        required: true

m.user =
    code: 'user'
    def: true
    inherit: true
    type: 'entity'

    prop: [
        _ep 'username'

        m._radio 'gender',
            type: 'radio'
            showText: (v)->
                v = false unless v
                iCat('gender')[v]
            attrs:
                data: ->
                    iCat('gender')

        _ep 'password',
            isShow:->
                user.isAdmin()

        _ep 'wid'

        _ep 'phone'


        _ep 'email'

        m._textarea 'introduction'

        _ep 'status'

        m._pic 'portrait'

        _ep 'woid'

    ]
cf.st.add 'user', cf.st.user_status



#    [
#        label: '初始化'
#        val: 0
#    ,
#        label: '未激活'
#        val: 1
#    ,
#        label: '可用'
#        val: 2
#    ,
#        label: '禁用'
#        val: 3
#    ]


#    status:
#        type: "radio"
#        isShow: ->
#            user.isAdmin()
#        val: 0
#        inline: true
#
#


#    wid:
#        type: 'text'

#    roleCode: {}
#    company: {}
#
#    woid:
#        type: 'text'
#
#    hometown:
#        type: 'holder'
#        xtype: area
#        attrs:
#            prop: 'hometown'
#            auto: true
#            noSv: true
#
#    industry:
#        type: "select"
#        data: ->
#            iCat('industry')

#        event:
#            del:
#                type: 'click'
#                fun: (e)->
#                    e.preventDefault()
#                    e.stopPropagation()
#                    return unless confirm(ii('m_sure'))
#                    m = @findData(e)
#                    if m
#                        m.destroy(wait: true)
#                    else
#                          'no model find'

#            verify:
#                type: 'click'
#                fun: (e)->
#                    t = @$('input[name="phone"]')
#                    v = t.val().trim()
#                    if t.parent().hasClass('has-error') or !v.length
#                        alert '请输入正确的电话号码'
#                        return
#
#                    $.get util.actUrl('profile', 'smsVerify'),
#                        phone: t.val()
#                        code: cf.code
#                    , ->
#                        util.ct(e).text('短息已发送...').addClass('disabled')
