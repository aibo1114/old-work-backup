require '../style/main.css'
require '../../../lib/init'

require '../../../lib/util/loadNewPic'

router = require '../../../lib/router'

require '../../../res/js/smalot-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css'

$.extend window,
    _lang: 'zh'
    _i: require '../i18n/zh'

cf.loadTmpl= (name) ->
    require "../tmpl/#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"

window._token =  $('#token').val();

cf._jsonp = true
cf.rPath = '/res/'

form = require '../../../lib/view/form'

require './meta'

require '../../../res/js/area_postcode.js'
cf.jsCache.push '/res/js/area_postcode.js'


Backbone.Model.setPost()

#document.domain="liebao.cn"
if isIE(8)
    $style = $('<style type="text/css">:before,:after{content:none !important}</style>')
    $('head').append $style
    setTimeout (->
        $style.remove()
    ), 0

new router
    routes:
        '': 'index'
        'index': 'index'
        '!/search': 'search'
        '!/result': 'result'
        '!/lostAdditional': 'lostAdditional'

    index: ->
        $.getJSON("http://zhaohui.liebao.cn/f/news?_token=#{_token}&callback=?").done (res) =>
            @ctn.html cf.rtp 'index'
            rf = @ctn.find('.refresh')
            for it in res.data
                rf.append cf.rtp 'listItem',
                    title: it.name
                    alt: it.alt
                    href: it.url
                    date: it.time
            _setHeight(470)

    search: ->
        @ctn.html cf.rtp 'search',
            back: location.href.split('#')[0]
        new form
            mode: 'blank'
            title: null
            entity: 'question'
            saveByStep: false
            cols: 'col-md-4:col-md-8'
            urlRoot: "http://zhaohui.liebao.cn/f/submit?_token=#{_token}"
            before:(res)->
                if res.payList
                    res.payList = ("日期：#{it.payDate} 订单号：#{it.payNum} 支付方式：#{it.payType} 金额：#{it.payPrice}" for it in res.payList)

                res.local = "地点1：#{res.localText1} 地点2：#{res.localText2}"
                res

            saveSuccess:(model, res, options)->
                if res.ret is 1
                    $('.form').html cf.rtp 'done',
                        num: res.data
                else
                    popMsg res.msg, 'warning'
            parent: '.form'
            toFetch: false


    lostAdditional:->
        cf._noId = false
        cf._fsName = null

        new form
            mode: 'blank'
            title: null
            entity: 'question'
            spItem:'lost'
            cols: 'col-md-4:col-md-8'
            urlRoot: "http://zhaohui.liebao.cn/f/submit1?_token=#{_token}"
            callback:->
                @$('.col-md-8:eq(1)').attr 'class','col-md-4'
                @$('.col-md-8:eq(1)').attr 'class','col-md-4'
                cf.addMemoLink()
                $('.showId').trigger 'click'
                _setHeight(665)
            validForm:->
                if !cf._fsName
                    popMsg('请上传身份证照片','warning')
                    return false
                true
            saveSuccess:(model, res, options)->
                if res.ret is 1
                    $('#content').html cf.rtp 'done',
                        num: res.data
                else
                    popMsg res.msg, 'warning'
            parent: '#content'
            toFetch: false
            btns: ['back','save']


    result: ->
        new form
            mode: 'blank'
            title: '查询工单'
            entity: 'question'
            spItem: 'search'
            parent: '#content'
            cols: 'col-md-4:col-md-5'
            toFetch: false
            setBtns:->
                [
                    label: '返回'
                    href: location.href.split('#')[0]
                    cls: 'btn btn-default btn-lg'
                ,
                    label: '查询'
                    cls: 'btn btn-primary btn-lg save'
                ]

            btns: ['back','save']

            callback:->
                @$('.help-block').remove()
                _setHeight(335)

            _save:->
                $.getJSON "http://zhaohui.liebao.cn/f/getorder?_token=#{_token}&tel=#{@model.get('tel')}&order=#{@model.get('order')}&vcode=#{@model.get('vcode')}&callback=?",(res)=>
                    if res.ret is 1
                        _setHeight(1000)
#                        if window.parent and window.parent.fSetIframeHeight
#                            window.parent.fSetIframeHeight(1000)

                        @$el.next('table').remove()
                        @$el.after cf.rtp('resultItem', res.data)
                    else
                        popMsg res.msg, 'warning'







