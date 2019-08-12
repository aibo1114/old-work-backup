require './rating.css'
btn = require '../../btn'

util.starRating = (max,v)->
    ctn = $("<ul class='rater-star' style='width:#{max * 30}px'/>")
    ctn.append """<li class='star' style="z-index: #{max - i};width: #{100 * (i + 1) / max}%">#{i + 1}</li>""" for i in [0..(max - 1)]
    if v
        ctn.append "<li class='current' style='width:#{100 * v/max}%'>#{v}</li>"
    ctn

module.exports = cf.view.rating = btn.extend
    max: 10
    cleanAll: true
    className: 'starBox'

    buildMsg: (arr)->
        arr.join('|')

    events:
        'click .rateable .star': (e)->
            t = util.ct(e)
            v = +t.text()
            @form.model.set @name, v
            @$('.current').remove()
            @ctn.append @curStar(v/@max)
#
#            val = t.text()
#            uid = @user.id
#
#            pp = _.clone(@refs)
#            pp.push t.parent().parent().attr('code')
#            ref = @buildMsg pp
#
#
#            #prop = "_rating_#{uid}_#{ref.split(':')[2]}"
#
#            opt =
#                cid: cf.cid
#                code: cf.code
#                uid: uid
#                ref: ref
#                value: val
#                tid: 'user:' + uid
#                act: "activity:#{_activity.id}:rate"
#                source: "user:#{user.id}"
#
#            if @msg
#                opt.msg = prompt("给#{@user.username}的留言", '你的表现真的很不错...') || ''
#                #                        ref: @ref
#                #                        refClass: 'activity'
#                #                        title: @refTitle
#                #                        item: ref.split(':')[2]
#                #                        val: val
#                #                        uid: @user.id
#                #                        username: @user.username
#                #                        msg: prompt("给#{@user.username}的留言", '你的表现真的很不错...') || ''
#
#                if opt.msg.length > 30
#                    alert('请不要超过30字')
#                    return
#
#            if @notify
#                opt._event = true
#
#            if @rPage
#                opt.rSectionPage = @rPage #["page/activity-#{@target}.html:#{prop}", "page/user-#{uid}.html:#{prop}"].join(',')
#
#            $.post util.actUrl('event', 'rate'), opt, (data)=>

    curStar: (v)->
        "<li class='current' style='width:#{100 * v}%'>#{v}</li>"

    enhanceContent: ->
#        @user = _.result @, 'user'
#        if !@refs and window.user
#            @refs = ['user', @user.id]
#
#        @ctn = $("<ul name='#{@name}' class='rater-star' style='width:#{@max * 30}px'/>")
        @ctn = util.starRating @max, @v||@val
        if @rateable
            @ctn.addClass 'rateable'
        if @name
            @ctn.attr 'name', @name
#        code = $(it).attr('code')
#        if @user
#            if @user.rating[code]
#                v = @user.rating[code] / @max
#                @ctn.append @curStar(v)
#        @ctn.append """<li class='star' style="z-index: #{@max - i};width: #{100 * (i + 1) / @max}%">#{i + 1}</li>""" for i in [0..(@max - 1)]

        @$el.append @ctn

        if @tip
            t = $ "<div style='width:#{30*@max}px;text-align: center'/>"
            t.append "<span class='pull-left'>#{@tip.low}</span>"
            t.append "<span>#{@tip.middle}</span>"
            t.append "<span class='pull-right'>#{@tip.high}</span>"
            @$el.append t


