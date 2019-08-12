require '../../../../lib/func/wtShare'
sBtn = require '../../../../lib/widget/addSetBtn'
require './moodTag'

cf.userFunc = (ctn, mo)->
    cf.dm.l sBtn, ctn,
        ent: mo
        prop: 'like'
        item: user.id
        color: 'danger'
        icon: 'thumbs-up'
        text: ->
            "<div>#{if @added then '已' else ''}喜欢(#{@items.length})</div>"

    cf.dm.l sBtn, ctn,
        ent: mo
        prop: 'pick'
        item: user.id
        color: 'info m-l-3'
        icon: 'heart-empty'
        text: ->
            "<div>#{if @added then '已' else ''}收藏(#{@items.length})</div>"
        _clickBtn: ->
            #show pic
            if user.isLogin()
                if @added
                    $.delJSON util.restUrl('match', @ent._e, 'del'),
                        ent: 'pickedItem'
                        q:
                            'ref._id': @ent._id
                            'user._id': user.id
                else
                    cf.dm.ent(
                        user: user.pick()
                        group: @ent.group
                        title: @ent[(if @ent.cat is 'task' then 'content' else 'title')]
                        ref: _.pick @ent, '_id', '_e', 'user'
                    ,
                        entity: 'pickedItem'
                    ).save()
            else
                $('.wtShare').trigger 'click'
    cf.dm.l sBtn, ctn,
        ent: mo
        prop: 'share'
        item: user.id
        color: 'warning m-l-3 wtShare'
        icon: 'share'
        text: ()->
            "<div>#{if @added then '已' else ''}分享(#{@items.length})</div>"
        _clickBtn: ->
#            popMsg '分享您的阅读感悟给朋友们吧, 有精美的格式哦:)'

    util.viewCount(mo)
    mTags = {}
    if mo.moodTags and mo.moodTags.length
        @$('.moodTagsBox').show()
        for k, v of mo.moodTags
            if _.isArray v
                for it in v
                    mTags[it.title] ?= 0
                    mTags[it.title]++
        t = $('.moodTags')
        for k, v of mTags
            t.append tu.btn("#{k}x<strong>#{v}</strong>", 'btn btn-sm btn-success m-r-1 m-b-1')

        unless W._ent
            W._ent = {}
            $.get util.restUrl('moodTag'),max:100, (res)->
                W._ent.moodTag = res.entities

        $('.jBtns').mk 'a', class:'btn btn-sm btn-danger', "#{tu.icon('plus')} 添加标签", null, null, ->
            unless user.isLogin()
                cf.r 'login'
                return
            val = mo.moodTags?[user.id]

            cf.dm.l 'moodTag', 'air',
                data: W._ent.moodTag
                val: val || []
                entUrl: util.actUrl("set/thread/_id/#{_ent._id||mo._id}/moodTags")