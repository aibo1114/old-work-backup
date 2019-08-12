cf.regFlow = (_gd)->
    toUrl = "/wt#!/group/#{_gd._id}"
    _tpy = (md)->
        md ?= $('form').data('_item').model.toJSON()
        fee = _gd.price
        success = toUrl
        data =
            fee: fee
            status: 2
            paid: true
        wt.pPay {fee, success, data}, md
    W._exForm = _gd.applyForm
    
    _exForm.data = ->
        group: _.pick(_gd, '_id', 'title')
        user: user.pick()
        status: 1
    _exForm.focus = true
    
    $.get util.restUrl('groupMember'), {q:{'group._id': _gd._id}, max: _gd.totalNumber || 20}, (res)->
        members = res.entities
        if members.length
            $('.member').show()
            tu.avatars members, $('.member').find('.clearfix').empty()
        return if $('.applyEnd').length
        bb = $('.regBtn')
        
        if res.length >= _gd.totalNumber
            bb.append tu.btn('非常抱歉, 报名人数已超上限', 'disabled', 'secondary', 'lg', 1)
            return                         

        apply = $(tu.btn('我要报名', 'applyGroup', 'primary', 'lg', 1)).click ->
            exUrl = "exForm/#{_exForm.code}"
            if !user.isLogin()
                if util.isWechat()
                    location.href = wt.genWtUrl "group/#{_gd._id}"
                else
                    cf.r 'login'
                    user.afterLogin = setBtns
                return
            else if _exForm.mergeUser and !user.get('phone')
                user.mergeUser null, _gd.pWt, ->
                    setBtns()
                    bb.children('.btn').trigger 'click'
            else
                cf.r exUrl

        setBtns = ->
            cf.r()
            if mu = members.findBy('user._id', user.id)
                bb.empty()
                if (_gd.price == 0 || mu.paid) && mu.status == 2
                    bb.append $(tu.btn('进入小组', null, 'success', 'lg', 1)).attr('href', toUrl)
                else if _gd.price > 0 && !mu.paid
                    bb.append $(tu.btn('完成支付', null, 'success', 'lg', 1)).click ->
                        _tpy mu
                else if mu.status is 1
                    bb.append tu.btn('审核中,请等待...', 'disabled', 'secondary', 'lg', 1)
                else if mu.status > 2
                    bb.append tu.btn('抱歉,您已被暂停使用了:(', 'disabled', 'secondary', 'lg', 1)
            else
                unless bb.find('.applyGroup').length
                    bb.append apply

        if user.isLogin()
            setBtns()
        else
            bb.append apply