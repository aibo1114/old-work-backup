$.extend cf.router::,
    checkPage: (p)->
        if !p
            return false
        else if p in @noAuthPath
            return true
        if user.isLogin()
            if user.authPage
                for it in user.authPage
                    if p.indexOf(it) > -1
                        return true
                return false
            else
                return true
        else
            return false

    checkFail: ->
        cf._toLogin = location.hash || app.loginPath
        cf.r 'login'