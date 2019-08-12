#$.extend true, meta,
#    shop:
#        _: {}
#    consultant:
#        _: {}
#    inquiry:
#        _:
#            item: [
#                'username'
#                'phone'
#                'vcode'
#                'content'
#                'applyPic'
#            ]
#            rMsg: '您的问题已经成功提交！2个工作日内您将收到答复，或者请咨询：400-0688-153'
#
#    order:
#        _:
#            item: [
#                'username'
#                'gender'
#                'age'
#                'phone'
#                'appointmentTime'
#                'vcode'
#                'memo'
#            ]
#

initLayout = ->
    app.ctn.html "<div class='col-md-push-2 col-md-8 row'/>"

app.enhance
    routes:
        '!/apply/order': 'order'
    order: ->
        initLayout()
        @dm.form @ctn.find('.col-md-8'), 'order',
            tip: '请输入常用电话号码，方便我们与您的沟通'
            title: '我的预约'
            prop: [
                _ep 'username'

                _ep 'user:gender'

                _ep 'user:age'

                _ep 'phone'
            ,
                code: 'appointmentTime'
                type: 'text'
                label: '预约时间'
                xtype: 'dTime'
                showText: (v)->
                    util.prettyDate(v)
            ,
                _ep 'vcode'

                _ep 'memo'
            ]
            rMsg: '您的预约已经提交，2个工作日内工作人员将于您联系，或者请致电：400-0688-153'
            btns: ['back', 'save']
            toFetch: false
            _saveSuccess: ->
                app.navigate '#', {trigger: true}

