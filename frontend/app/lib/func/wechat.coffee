url = '/a/wt/'

showQr = (res)->
    if res.url
        $('#qrBox').html "<img src='#{res.url}'/>"
    else
        $('.genQr').show()

appId = $('body').data('wid')
pubCode = $('body').data('wcode')

cf.afterWxReady = ->
    log 'wx ready'
    cf.__wsr = true
    unless wt._ne
        alert 1
        cf.rr()

cf.afterWxError = ->
    warnMsg '微信注册异常'
    cf.afterWxReady()


jsInit = (res)->
    res.debug = false
    that = @
    wx.config res

    wx.ready ->
        cf.afterWxReady()

    wx.error ->
        that.rToken()
        that.getToken()
        cf.afterWxError()


_opt =
    default:
        msg: '操作'

    createMenu:
        msg: '创建菜单'
        sCallback: ->
        eCallback: ->

    createLimitQRCode:
        msg: '创建二维码'
        sCallback: showQr

    showQRCodeURL:
        msg: '二维码'
        sCallback: showQr

    jsSign:
        sCallback: (res) ->
            jsInit(res)

rsp = (name)->
    op = _opt[name] || _opt.default
    msg = op.msg
    (res)->
        if res.errcode
            if msg
                popMsg "#{msg}失败", 'danger'
            op.eCallback?(res)
        else
            if msg
                popMsg "#{msg}成功", 'success'
            op.sCallback?(res)

module.exports =
    _spWtStr: 'azbzc'

    callApi: (name, data)->
        $.postJSON url + name, data, rsp name

#    userBaseUrl: (scope, state)->
#        appId = $('body').data('wid')
#        dm = cf.community.url
#        if dm.indexOf('http') is -1
#            dm = 'http://' + dm
#        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{appId}&redirect_uri=#{encodeURIComponent("#{dm}/a/wt/userInfoByCode")}&response_type=code&scope=#{scope}&state=#{state}#wechat_redirect"
#
#    userInfoUrl: (simple, p, text)->
#        code = $('body').data 'wcode'
#        if simple
#            href = @userBaseUrl('snsapi_base', code + '::' + p)
#        else
#            href = @userBaseUrl('snsapi_userinfo', code + '::' + p)
#        #            href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@appId}&redirect_uri=#{encodeURIComponent(cf.community.url + "/a/#{cf.cid}/wechat/userInfoByCode")}&response_type=code&scope=snsapi_userinfo&state=#{@code + '::' + p}#wechat_redirect"
#        if text
#            "<a href='#{href}'>#{text}</a>"
#        else
#            href

    renderQRImg: (rs)->
        if rs.entity and rs.entity.ticket
            $('#qrBox').html "<img class='img-responsive' src='https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=#{rs.entity.ticket}'/>"
        else
            $('#qrBox').html '<p class="bg-danger">请先生成二维码</p>'


    tokenStr: (act, ps, url = @url)->
        p = ['access_token=' + @token]
        if ps
            p = p.concat ps
        "#{@url}#{act}?#{p.join('&')}"


    setWtJs: (res = 'onMenuShareTimeline,onMenuShareAppMessage,startRecord,stopRecord,onVoiceRecordEnd,playVoice,stopVoice,onVoicePlayEnd,uploadVoice,chooseImage,uploadImage,previewImage,openLocation,getLocation',ne) ->
        ne and @_ne = ne
        if util.isWechat() and !cf.__wsr
            cf.loadJS 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js', =>
                @callApi 'jsSign',
                    pubCode: pubCode
                    url: location.href.split('#')[0]
                    res: res
            unless ne
                throw 'waitWtJs'

    rToken: ->
        util.cleanLocal('we_expire')
        util.cleanLocal('we_token')
        util.cleanLocal('wejs_expire')
        util.cleanLocal('wejs_token')
        log('token refreshed')

    genWtUrl: (page, func, state, scope)->
        res = [
            "wCode=#{pubCode}"
            "appId=#{appId}"
        ]
        page && res.push "page=#{encodeURIComponent(page)}"
        func && res.push "func=#{encodeURIComponent(func)}"
        state && res.push "state=#{state}"
        scope && res.push "scope=#{scope}"
        "http://#{cf.community.url}/a/wt/login?#{res.join('&')}"

    pPay: (opt, md)->
        pStr = "#{md._e}-#{md._id}"
        util.saveLocal '_pay', $.extend(
            wCode: util.getCookie('wCode')
            woid: util.getCookie('woid')
            error: location.href
            detail: pStr
            body: pStr
        , opt)
        location.href = '/wtp'
#
#        util.saveLocal '_pay',
#            wCode: wc
#            fee: fee
#            success: url
#            error: location.href
#            detail: _.pick(md, '_e','_id').join('-')
#            body: body || ''
#            op:
#                ent: md._e
#                _id: md._id
#                data:
#                    fee: fee
#                    status: 2
#                    paid: true
#        location.href = '/wtp'
#    pPay: (wc, fee, url, md, body)->
#        util.saveLocal '_pay',
#            wCode: wc
#            fee: fee
#            success: url
#            error: location.href
#            detail: _.pick(md, '_e','_id').join('-')
#            body: body || ''
#            op:
#                ent: md._e
#                _id: md._id
#                data:
#                    fee: fee
#                    status: 2
#                    paid: true
#        location.href = '/wtp'

    pay: (mo)->
        id = 'pif'
        $("iframe##{id}").remove()
        opt =
            wCode: 'PETSNS'
            woid: user.get('woid')
            body: 'pay' #$('.enrrollInfo').text()
            fee: mo.fee

        url = "http://#{cf.community.url}#{if cf.mode then ':3000' else ''}/wtp"
        util.getUrlParams(url, opt)
#        $('body').append util.getIFrame(id, util.getUrlParams(url, opt)).hide()


#    pFrame:()->
#        log 'pay frame'
#        opt = util.parseUrl()
#        log opt
#        return unless opt.wCode
#        $.post util.actUrl('wt/wxPay'), opt, (ro)->
#            log ro
#            WeixinJSBridge.invoke "getBrandWCPayRequest", ro, (res)->
#                if res.err_msg == "get_brand_wcpay_request:ok"
#                    alert('p s')
##                    mo.save(paid: true)
##                    pt =
##                        ref: mo.activity
##                        total: mo.fee
##                        status: 'unpaid'
##                        user: user.pick '_id', 'username', 'phone'
##                        woid: user.woid
##                        res: res
##                    attr =
##                        entity: 'deal'
##                    new new cf.model.entity(pt, attr).save()
#                else
#                    console.log res

    getToken: ->
        left = util.readLocal('we_expire')
        if left and (+left - new Date().getTime() / 1000) > 0
            @token = util.readLocal('we_token')
            if W.wx
                @getJsToken()
        else
            opt =
                url: @url + 'token?grant_type=client_credential'
                code: @code
                appId: @appId
            $.get util.actUrl('wechat', 'getToken'), opt, (res)=>
                [@token,now] = res.split('___')
                util.saveLocal 'we_token', @token
                util.saveLocal 'we_expire', (+now + 7196)
                if W.wx
                    @getJsToken()

    getAudio: (mid, cb)->
        opt =
            url: @tokenStr('get', ["media_id=#{mid}"], 'http://file.api.weixin.qq.com/cgi-bin/media')
        @request opt, (res)->
            cb?(res)


    getUserInfo: ()->
        opt =
            url: @tokenStr 'user/info', ["openid=#{'OPENID'}", "lang=zh_CN"]
            type: 'get'
        @request opt, (res)->
            log res

    uploadRes: (type, url, success)->
#            url = 'https://ss0.bdstatic.com/5a21bjqh_Q23odCf/static/superplus/img/logo_white_ee663702.png'
#            fd = new FormData()
#            fr = new FileReader()
#            fr.readAsArrayBuffer(url)
#            fd.append("media", fr)
#            xhr = new XMLHttpRequest()
#            xhr.open("POST", @tokenStr('media/upload', "type=#{type}"))
#            xhr.send(fd)
#            xhr
        $.ajax
            type: 'POST'
            url: @tokenStr('media/upload', "type=#{type}")
            data: fd
            contentType: false
            processData: false
            success: success

    uploadNews: (p, cb)->
        opt =
            url: @tokenStr('media/uploadnews')
            resUrl: @tokenStr('media/upload', "type=image", 'https://file.api.weixin.qq.com/cgi-bin/')
            type: 'post'

        if p.preUrl
            p.preUrl = @tokenStr('message/mass/preview')
            p.username = user.username unless p.username
        if p.sendUrl
            p.sendUrl = @tokenStr('message/mass/sendall')


        @request $.extend(opt, p), (res) =>
            cb?()
            popMsg '微信图文信息同步成功'
        , 'uploadNews'
#                return unless confirm('群发信息吗？')
#                nop =
#                    url: @tokenStr('message/mass/sendall')
#                    type: 'post'
#                    opt:
#                        filter:
#                            is_to_all: true
#                        mpnews:
#                            media_id: res.media_id
#                        msgtype: 'mpnews'
#                @request nop, (res) ->

    showQRImg: (key)->
        $.get util.restUrl('ticketTable') + '/' + key, @renderQRImg

    request: (opt, res, act = 'remote')->
        opt.opt = JSON.stringify(opt.opt) if _.isObject(opt.opt)
        $.post util.actUrl('wechat', act), opt, res

    recordShare: (url,type)->
        $.postJSON util.actUrl("push/#{url}"),
            uid: user.id
            username: user.username || 'visitor'
            type: type
        , (res)=>
            popMsg '感谢您的分享'

    timelineShare: (opt)->
        wx.onMenuShareTimeline opt

    msgShare: (opt)->
        wx.onMenuShareAppMessage opt

    setShare: (title,link,img,desc,rUrl)->
        opt =
            title: title
            link: link
            imgUrl: img
            success: ->
                if rUrl
                    wt.recordShare rUrl, 'timeline'
#        log opt
        so = $.extend {}, opt,
            desc: desc
            success: ->
                if rUrl
                    wt.recordShare rUrl, 'msg'
        wt.timelineShare opt
        wt.msgShare so
