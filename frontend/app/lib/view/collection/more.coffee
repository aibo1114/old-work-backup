seeMore = (more)->
    util.isInView(more) and !more.attr('loading')

$.extend cf.view.collection::,
    pagination: ->
        return unless @foot
        if @collection.criteria.max >= @collection.count
            @foot.hide()
            return
        v = @
        more = @foot.addClass('text-xs-center').mk 'a', class: 'btn moreBtn', "#{ii('more')}...", null, 'click', (e)->
            t = util.ct(e)
            t.attr('loading', true)
            v.collection.resetFetch 'next', null,
                silent: true
                success: (res)->
                    t.removeAttr 'loading'
                    v.data = res.entities
                    v.ctn.removeClass('loadingData')
                    v.collection.each(v.addOne, v)
                    v.afterAddAll?()
                    v.afterAjax?()
                    util.loadPic(v.ctn)
                    if v.collection.criteria.offset + v.max >= v.collection.count
                        v.foot.remove()

        @listenTo cf.bbEvt, 'scroll', ->
            if seeMore more
                more.trigger 'click'

        cf.bbEvt.trigger 'scroll'


