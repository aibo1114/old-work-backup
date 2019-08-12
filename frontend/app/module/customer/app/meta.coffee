dTime = require '../../../lib/widget/editor/dTime'
area = require '../../../lib/widget/editor/areaCode'

listEditor = require '../../../lib/widget/editor/listEditor'

require('../../../lib/meta/extend/captcha')('vcode', "http://zhaohui.liebao.cn/captcha/v1/v3.2?_token=#{_token}")


_.extend String::,
    trim: ->
        @replace /^\s+|\s+$/g, ""
    startsWith: (pattern) ->
        @lastIndexOf(pattern, 0) is 0

window.isIE = (ver) ->
    b = document.createElement('b')
    b.innerHTML = '<!--[if IE ' + ver + ']><i></i><![endif]-->'
    b.getElementsByTagName('i').length == 1

window._setHeight = (h)->
    ifr = $('#_setHeight')
    ifr.attr 'src', (ifr.attr('src').split('=')[0] + '=' + h)

cf.addMemoLink = ->
    li = $('#lostIn')
    a = $('<a style="color:red">点击查看示例</a>').click ->
        if li.val().trim().length is 0
            li.val '示例：皇家守卫、银澜天翔、黄金宝箱+10*4、暗影修罗、生命宝石*689、星曜之石*2、高级坐骑丹*4、黄金宝箱+11*3、强化套装石(护手)*592、强化套装石(护腿)*195、强化套装石(鞋子)*322、强化套装石(头盔)*227、强化套装石(衣服)*13玄冥之盔、圣心之盾、玄冥护手、玄冥之靴、毒戒指、神·大天使之杖、毒戒指、冰项链、玄冥护腿、玄冥之铠。'

    li.click ->
        if $(@).val().indexOf('示例') is 0
            li.val('')

    li.parent().prev().append('<br/>').append(a)

$.extend meta.common,
    tel:
        type: "tel"
        valid:
            telephone: true
    code:
        type: 'custom'
        label: "短信验证码"
        id: 'verification'
        valid:
            required: true
        content: ->
            $ "<div><input name='code' class='form-control'><button type='button' class='verify btn btn-default'>免费获取验证码</button></div>"

lost = [
    'ltime'
    'ftime'
    'lose'
    'desc'
]


_i['valid.required'] = '必须填写'

$.extend meta,
    question:
        name:
            valid:
                required: true

        account:
            label: '游戏账号'
            valid:
                required: true
        type:
            type: 'select'
            label: '请选择问题'
            val: 2
            data:
                2: '装备物品被盗'
                1: '账号被盗'
                3: '二级密码找回'
            trigger: 'change'
            events:
                change: (e)->
                    v = util.ct(e).val()
                    if v in ['1','3']
                        cf._itemBk = @metaOpt.item.splice(3, 1)
                        cf._noId = true
                    else
                        cf._noId = false
                        if cf._itemBk
                            @metaOpt.item.splice(3, 0, cf._itemBk[0])

        order:
            valid:
                required: true

        gid:
            type: 'select'
            url: "http://zhaohui.liebao.cn/f/gamelist?_token=#{_token}"
            st: 'jsonp'
            jsonp: true
        bind: {}

        regtime: meta.exCom 'startedDate',
            attrs:
                noVal: true
            valid:
                required: true

        people:
            type: 'radio'
            inline: true
            data:
                1: '1人'
                2: '2人'
                3: '3人'
                '多人': '多人'
            valid:
                required: true

        region:
            valid:
                required: true
        regaddr:
            type: 'holder'
            xtype: area
            attrs:
                prop: 'regaddr_code'
                text: 'regaddr'
                auto: true
                noSv: true

        local1:
            type: 'holder'
            xtype: area
            id: 'localss1'
            attrs:
                prop: 'local1'
                text: 'localText1'
                auto: true
                noSv: true

        local2:
            type: 'holder'
            xtype: area
            attrs:
                prop: 'local2'
                text: 'localText2'
                auto: true
                noSv: true

        gameRole:
            type: 'text'
            valid:
                required: true

        regcard:
            type: 'text'
            valid:
                required: true
                pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

        playcard:
            type: 'text'
            valid:
                required: true
                pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

        accStr1:
            type: 'label'
            val: '<a class="showId">点击这里上传</a><small style="margin-left:20px">如果已绑定身份证，申请找回是必须上传身份证照片，<span style="color:red;font-weight: bold">否则不予处理</span>。</small>'
            isShow:->
                !cf._noId
            events:
                'click .showId': (e)->
                    cf._fsp = p = util.ct(e).parent().parent()
                    tp = $('.showIdBox')
                    if tp.is(':visible')
                        cf._srHeight -= 409
                    else
                        cf._srHeight += 409
                    _setHeight(cf._srHeight)
                    if tp.length
                        tp.toggle()
                        return
                    else
                        p.html cf.rtp 'showId'

                    p.on 'click', '.delPic', (e)->
                        name = util.ct(e).attr('picName')
                        if cf._fsName
                            $.getJSON "http://zhaohui.liebao.cn/upd/v3.2?_token=#{_token}&type=card&name=#{cf._fsName}", (res)->
                                if res.ret is 1
                                    p.find('.imgBox').empty()
                                    cf._fsName = null
                                    cf._fs = null
                                else
                                    popMsg res.msg, 'warning'
                                p.find('[type="file"]').val ''
                        else
                            p.find('.imgBox').empty()
                            p.find('.upload').addClass 'disabled'
                            p.find('[type="file"]').val ''
                    if isIE('8')
                        _imgcb = ->
                            _setHeight(367 + 180 * 2 + 360)
                            _if = $('#_iframe')
                            doc = _if[0].contentDocument
                            innerHTML = doc.body.innerHTML
                            if innerHTML.slice(0, 5).toLowerCase() == '<pre>' && innerHTML.slice(-6).toLowerCase() == '</pre>'
                                innerHTML = doc.body.firstChild.firstChild.nodeValue
                            res = eval("(" + innerHTML + ")")
                            if +res.ret is 1
                                cf._fsName = res.name
                                path = 'http://zhaohui.liebao.cn/pic/' + res.name
                                $('.imgBox').append "<img src='#{path}'/>#{tu.icon('remove btn btn-default delPic')}"
                                popMsg '上传文件成功'
                            else
                                popMsg res.msg, 'warning'
                            return

                        $('.uploadImg').change ->
                            _if = $('#_iframe')
                            cb = ->
                                _imgcb()
                                _if.unbind 'load', cb
                            _if.bind 'load', cb
                            $('#_form').submit()
                            return
                        return

                    cf._showFs ?= ->
                        p = cf._fsp
                        return unless cf._fs
                        rd = new FileReader()
                        _setHeight(367 + 180 * 2 + 360)
                        rd.onload = (e)->
                            p.find('.imgBox').html "<img src='#{e.target.result}'/>#{tu.icon('remove btn btn-default delPic')}"
                        rd.readAsDataURL cf._fs
                    cf._showFs()
                    p.find('[type="file"]').change (e)->
                        cf._fs = util.ct(e)[0].files[0]
                        if cf._fs.size > 3 * 1024 * 1000
                            popMsg '文件太大', 'warning'
                        else
                            cf._showFs()
                            p.find('.upload').removeClass 'disabled'
                    that = @
                    p.find('.upload').click (e)->
                        t = util.ct(e)
                        t.addClass 'disabled'
                        fd = new FormData()
                        fd.append('img', cf._fs)
                        fd.append('type', 'card')
                        that = that
                        $.ajax
                            type: 'POST'
                            url: "http://zhaohui.liebao.cn/upd/v3.2?_token=#{_token}"
                            data: fd
                            contentType: false
                            processData: false
                            success: (res)->
                                res = JSON.parse(res)
                                if +res.ret is 1
                                    popMsg '上传文件成功'
                                else
                                    popMsg res.msg, 'warning'
                                cf._fsName = res.name

        accStr2:
            type: 'label'
#            value: '<a class="showRecord">必须点击这里</a><small style="margin-left:20px">如果账号有充值历史，但您未提供信息，<span style="color:red;font-weight: bold">将不会处理</span>。</small>'
            val: '<a class="btn btn-default yes" style="color: red;margin-right: 30px">是</a><a class="btn btn-default no" style="color: red">否</a>'
            events:
                'click .closeBox': (e)->
                    util.ct(e).closest('.panel').remove()
                    cf._srHeight -= 312
                    _setHeight(cf._srHeight)
                'click .yes': (e)->
                    p = util.ct(e).parent().parent()
                    p.find('.panel').remove()
                    p.append cf.rtp 'yesBox'
                'click .no': (e)->
                    p = util.ct(e).parent().parent()
                    p.find('.panel').remove()
                    p.append cf.rtp 'noBox'
                'click .showRecord': (e)->
                    p = util.ct(e).parent().parent()
                    tb = $('.showRecordBox')
#                    cf._srHeight ?= 367 + 180 * 2 + 360 + 220
                    if tb.is(':visible')
                        cf._srHeight -= 312
                    else
                        cf._srHeight += 312
                    _setHeight(cf._srHeight)
                    if tb.length
                        tb.toggle()
                        return
                    else
                        p.append cf.rtp 'showRecord'
                        new listEditor
                            form: @
                            name: 'payList'
                            itemTmpl: 'payRecord'
                            parent: p.find('.refresh')
                            newData: -> {}
                            addLimit: (e)->
                                if @data.length is 30
                                    popMsg('只能添加30项', 'warning')
                                    return true
                                false
                            data: @model.get('payList') || [{},{},{},{},{}]
                            afterDel:->
                                cf._srHeight -= 45
                                _setHeight(cf._srHeight)
                            afterAddOne: (ctn, d)->
                                dTime.fun
                                    parent: ctn.find('.date')
                                if d.payType
                                    ctn.find('select').val d.payType
                                cf._srHeight += 45
                                _setHeight(cf._srHeight)

        ltime: meta.exCom 'startedDate',
            valid:
                required: true
            attrs:
                noVal: true

        ftime: meta.exCom 'startedDate',
            valid:
                required: true
            attrs:
                noVal: true

        lose:
            id: 'lostIn'
            type: 'textarea'
            valid:
                required: true
        desc:
            type: 'textarea'
            valid:
                required: true
        _:
            item: [
                items: [
                    'type'
                    'account'
                    'vcode'
                ]
                btns: ['next']
                callback: ->
                    @$('.refresh .col-md-8').attr 'class', 'col-md-4 rels'
                    @$('.next').css float: 'left'
                    _setHeight(384)

                nextTab: (callback)->
                    that = @
                    if that.__tab1Pass
                        callback.call @
                        return
                    $.getJSON "http://zhaohui.liebao.cn/f/checkpp?_token=#{_token}&vcode=#{@model.get('vcode')}&pp=#{@model.get('account')}&callback=?", (item)->
                        if item.ret isnt true
                            popMsg item.msg || '账号错误或者不存在', 'warning'
                            $('.changeCaptcha').trigger 'click'
                        else
                            that.meta.type.disabled = true
                            that.meta.account.disabled = true
                            that.removeItems('vcode')
                            that.__tab1Pass = true
                            callback.call that
            ,
                items: [
                    'name'
                    'tel'
                    '_clearfix'
                    'gid'
                    'gameRole'
                    '_clearfix'
                    'region'
                    'bind'
                    '_clearfix'
                    'regtime'
                    '_clearfix'
                    'regaddr'
                    'people'
                    'local1'
                    'local2'
                ]

                btns: ['prev', 'next']

                callback: ->
                    @$('.form-group:eq(7)').prevAll('.form-group').addClass 'col-md-6'
                    next = @$('.form-group:eq(6)').nextAll('.form-group')

                    next.children('label').attr 'class', 'control-label col-md-2'
                    next.find('.col-md-8').attr 'class', 'col-md-10'

                    @$('.foot label').attr 'class', 'control-label col-md-2'
                    @$('.foot .btnCtn').attr 'class', 'col-md-9 btnCtn'
                    _setHeight(710)

                nextTab: (cb)->
                    v = @model.get 'regaddr'
                    if !v or !v.length
                        @msg '账号注册地点必须选择'
                    else
                        v = @model.get 'local1'
                        if !v or !v.length
                            @msg '常用登陆地点1必须选择'
                        else
                            cb.call @
            ,
                items: [
                    'regcard'
                    'playcard'
                    'accStr1'
                    'accStr2'
                ]

                callback: ->
                    @$('.col-md-8:eq(0)').attr 'class', 'col-md-4 rels'
                    @$('.col-md-8:eq(0)').attr 'class', 'col-md-4 rels'
                    if isIE(8)
                        @$('.col-md-8:eq(0)').attr 'class', 'col-md-10'
                        @$('.col-md-8:eq(0)').attr 'class', 'col-md-10'

                    if cf._fs
                        @$('.showId').trigger 'click'

                    if @model.get('payList')
                        @$('.showRecord').trigger 'click'

                    cf._srHeight = 420
                    _setHeight(cf._srHeight)
                    $('.showId').trigger 'click'

                nextTab:(cb)->
                    for it in $("input[name='payNum']")
                        if !/^\d{6,18}$/.test($(it).val())
                            popMsg('订单号格式错误，应该是7到18位数字','warning')
                            return

                    for it in $("select[name='payType']")
                        if !$(it).val() or $(it).val() is '0'
                            popMsg('请选择支付方式','warning')
                            return

                    for it in $("input[name='payPrice']")
                        if !$(it).val() or +$(it).val() is 0
                            popMsg('请输入正确的充值金额','warning')
                            return

                    if cf._noId is false and !cf._fsName
                        popMsg('请上传身份证照片','warning')
                        return
                    cb.call @

                btns: ['prev', 'next']
            ,
                items: lost

                btns: ['prev', 'next']
                callback: ->
                    @$('.col-md-8:eq(0)').attr 'class', 'col-md-4'
                    @$('.col-md-8:eq(0)').attr 'class', 'col-md-4'
                    cf.addMemoLink()
                    _setHeight(605)
            ]
            export:
                search: ->
                    [
                        'tel'
                        'order'
                        'vcode'
                    ]
                lost: ->
                    lost.unshift('accStr1')
                    lost
