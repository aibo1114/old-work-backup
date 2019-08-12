#propEditor = require '../widget/editor/propEditor'
#sn = require '../widget/editor/snEditor'

meta.codeMap =
    prop: [
        _ep 'code'

        code: 'type'
        id: 'tpSelect'
        type: 'select'
        attrs:
            data:
                text: '文本'
                obj: '自定义'
                alipay: '支付宝'
                luosimao: '螺丝帽'
                douban: '豆瓣'
                wechat: '微信'
                wtStyle: '微信格式'
        trigger: 'change'
        events:
            change: (e)->
                v = util.ct(e).val()
                mv = @model.get('value')
                addable = false
                deleteable = false
                fixed = true
                ise = @$('select')
                ip = @$('input[name="code"]')
                if mv
                    obj = mv
                else
                    obj = (switch v
                        when 'obj'
                            addable = true
                            deleteable = true
                            fixed: false
                            {}
                        when 'alipay'
                            web_gate: 'https://mapi.alipay.com/gateway.do'
                            mob_gate: 'http://wappaygw.alipay.com/service/rest.htm'
                            sign: 'MD5'
                            charset: 'utf-8'
                            seller: ''
                            partner: ''
                            key: ''
                        when 'luosimao'
                            api: 'https://sms-api.luosimao.com/v1/send.json'
                            key: ''
                        when 'douban'
                            api: ''
                            key: ''
                        when 'weibo'
                            api: ''
                            key: ''
                        when 'wtStyle'
                            h3: 'border-left: 4px solid orangered; padding-left: 10px; color: orangered;font-size: 20px;line-height: 22px;margin:20px 0 10px;',
                            h4: 'border-bottom: 1px dashed #df382c; margin: 10px 0;font-weight: bold;font-size: 18px;',
                            ul: 'list-style-type: disc;padding-left: 1.2em;',
                            "div class='well'": 'min-height: 20px; padding: 10px 15px; margin-bottom: 20px; background-color: #f5f5f5; border: 1px solid #e3e3e3; border-radius: 4px;',
                            dd: 'margin: 3px 0 15px 0;color: orangered;'
                            blockquote: 'font-size: 16px; color: #777; text-align: left; margin: 10px 0;'
                        else
                            ''
                    )
                t = util.findAndGen(@ctn, '#pea')
                unless t.children().length
                    t.append @genFormItem
                        label: '值'
                        type: 'textarea'
                    , 'value', mv
                if _.isObject obj
                    ise.attr 'disabled', true
                    ip.attr 'disabled', true
                    new cf.view.propEditor
                        parent: t.find('.col-md-10')
                        cleanAll: true
                        tagName: 'div'
                        name: 'value'
                        addable: addable
                        deleteable: deleteable
                        fixed: fixed
                        form: @
                        val: obj
                        addOpt: null
                ip.val v
    ]
    listOpt:

        checkAll: true

        btns:['topAdd','copyAdd','trans','batchDel']

    formOpt:
        toFetch: false
        btns: ['save']
        callback: ->
            @$('select[name="type"]').trigger 'change'
#    code:
#        type: 'text'
#    value:
#        type: 'text'
#    type:
#        id: 'tpSelect'
#        type: 'select'
#        data: ->
#            [
#                label: '文本'
#                val: 'text'
#            ,
#                label: '自定义'
#                val: 'obj'
#            ,
#                label: '支付宝'
#                val: 'alipay'
#            ,
#                label: '螺丝帽'
#                val: 'luosimao'
#            ,
#                label: '豆瓣'
#                val: 'douban'
#            ,
#                label: '微信'
#                val: 'wechat'
#            ,
#                label: '微信格式'
#                val: 'wtStyle'
#            ]
#        trigger: 'change'
#        events:
#            change: (e)->
#                v = util.ct(e).val()
#                mv = @model.get('value')
#                addable = false
#                deleteable = false
#                fixed = true
#                ise = @$('select')
#                ip = @$('input[name="code"]')
#                if mv
#                    obj = mv
#                else
#                    obj = (switch v
#                        when 'obj'
#                            addable = true
#                            deleteable = true
#                            fixed: false
#                            {}
#                        when 'alipay'
#                            web_gate: 'https://mapi.alipay.com/gateway.do'
#                            mob_gate: 'http://wappaygw.alipay.com/service/rest.htm'
#                            sign: 'MD5'
#                            charset: 'utf-8'
#                            seller: ''
#                            partner: ''
#                            key: ''
#                        when 'luosimao'
#                            api: 'https://sms-api.luosimao.com/v1/send.json'
#                            key: ''
#                        when 'douban'
#                            api: ''
#                            key: ''
#                        when 'weibo'
#                            api: ''
#                            key: ''
#                        when 'wtStyle'
#                            h3: 'border-left: 4px solid orangered; padding-left: 10px; color: orangered;font-size: 20px;line-height: 22px;margin:20px 0 10px;',
#                            h4: 'border-bottom: 1px dashed #df382c; margin: 10px 0;font-weight: bold;font-size: 18px;',
#                            ul: 'list-style-type: disc;padding-left: 1.2em;',
#                            "div class='well'": 'min-height: 20px; padding: 10px 15px; margin-bottom: 20px; background-color: #f5f5f5; border: 1px solid #e3e3e3; border-radius: 4px;',
#                            dd: 'margin: 3px 0 15px 0;color: orangered;'
#                            blockquote: 'font-size: 16px; color: #777; text-align: left; margin: 10px 0;'
#                        else
#                            ''
#                    )
#                t = util.findAndGen(@ctn, '#pea')
#                unless t.children().length
#                    t.append @genFormItem
#                        label: '值'
#                        type: 'textarea'
#                        stype: sn
#                    , 'value', mv
#                if _.isObject obj
#                    ise.attr 'disabled', true
#                    ip.attr 'disabled', true
#                    new propEditor
#                        parent: t.find('.col-md-10')
#                        cleanAll: true
#                        tagName: 'div'
#                        name: 'value'
#                        addable: addable
#                        deleteable: deleteable
#                        fixed: fixed
#                        form: @
#                        val: obj
#                        addOpt: null
#                ip.val v
#
#    _:
#        tbItem:
#            value:
#                type: 'hide'
#            code: {}
#            type:
#                w: 100
#            _btn: ['popEdit', 'del']
#
#        item: ['type', 'code']

