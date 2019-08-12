m.msg =
    handleListData: (d = [])->
        res = []
        for dd in d
            res.push dd
            if dd.reply
                for it in dd.reply
                    res.push it
        res

module.exports = cf.view.chatPanel = cf.view.collection.extend
    className: 'chatPanel mobView'
    mode: require './chatPanel.jade'
    head: true
    foot: false
    tagClass: 'card-block'
    msgEntity: 'msg'
    btmHeight: 8 * 14
    modelOpt:
        tmpl: require './chatItem.jade'
        className: 'm-b-h'
    events:
        'click .send': 'send'

        'keyup :input': (e)->
            @send() if e.keyCode is 13
    send: ->
        @ipt ?= @$('.input')
        v = @ipt.val()
        unless v
            alert '请先录入信息'
            return

        d = if @sendData
            @sendData(v)
        else
            user: user.pick()
            content: @ipt.val()
        opt =
            collection: @collection
            entity: @msgEntity
            _dd: d

        if @collection.length
            opt.urlRoot = util.actUrl('push', @msgEntity, '_id', @collection.at(0).id, 'reply')

        em = new cf.model.entity d, opt
        cf.noReply = true
        em.save null,
            success: (mo)->
                mo.collection.add mo._dd
        @goBtm()
        @ipt.val ''

    goBtm:->
        @mb ?= @$('.'+@tagClass)
        @mb.animate scrollTop: @mb[0].scrollHeight, 500

    callback: ->
        @$el.height $(window).height()
        @ctn.height($(window).height() - @btmHeight)

    afterAddAll: ->
        @goBtm()