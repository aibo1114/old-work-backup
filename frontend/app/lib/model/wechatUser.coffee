W.wt = require '../func/wechat'
appUser = require './user'

#https://open.weixin.qq.com/connect/oauth2/authorize?appid=undefined
# &redirect_uri=elp.newenglishtime.com%2Fa%2Fundefined%2Fwechat%2FuserInfoByCode
# &response_type=code&scope=snsapi_userinfo
# &state=undefined::wechat::profile#wechat_redirect

if location.search.indexOf('rwt=true') > -1
    location.href = "http://#{cf.community.url}/r/wt/login?#{location.search}"

module.exports = appUser.extend

    logoutByWoid: ()->
        $.post util.actUrl(cf.auth || "auth", "logoutByWoid"), uid: user.id, ->
            user.removeData()
            user.afterLogout?()
            user.clear()

    loginByWoid: (wCode = util.getCookie('wCode'), woid = util.getCookie('woid'),cb)->
#        app.cleanPage()
        log 'login by woid'
        if !wCode or !woid
            popMsg '微信登录已过期, 请重新连接登录','warning'
            return
        $.ajax
            type: 'post'
            url: util.actUrl('auth', 'loginByWoid')
            data:
                woid: woid
                wCode: wCode
                lang: cf.lang
            success: (res)->
                popMsg 'wechat login success'
                user.login res.user
                cb?()
                return
            error: ->
                log 'no loginin ...'
                if util.getCookie 'wtbase'
                    user.id = util.getCookie('woid')
                    user.username = '匿名'
                    user.fake = true
                else
                    user.afterLogout?()

