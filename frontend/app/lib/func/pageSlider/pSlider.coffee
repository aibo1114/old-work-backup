require './style.sass'
module.exports = ($container) ->
    container = $container
    currentPage = undefined
    stateHistory = []

    @remove = (p)->
        stateHistory.remove p.attr('id')
        p.remove()
        
    @reset = ->
        stateHistory = []
        currentPage = undefined

    @slideLastPage = (id) ->
        idx = _.indexOf stateHistory, id
        for it in stateHistory.splice((idx+1), (stateHistory.length-2-idx))
            rr = $('#'+it)
            rr.children().data('_item')._close()
            rr.remove()
        @slidePage()

    @slidePage = (page) ->
#        util.sTop()
        cf.onPageSlide?()
        l = stateHistory.length
        unless page
            page = container.children().eq(l-2)
        if page
            state = page.attr 'id'
        if l == 0
            currentPage = container.children().first()
            currentPage.addClass 'page center'
            stateHistory.push currentPage.attr 'id'
            stateHistory.push state
            @slidePageFrom page, 'right'
        else if state == stateHistory[l - 2]
            @slidePageFrom page, 'left'
            stateHistory.pop()
            if stateHistory.length is 1
                stateHistory.pop()
        else
            stateHistory.push state
            currentPage = container.children().last()
            @slidePageFrom page, 'right'

    @slidePageFrom = (page, from) ->
        page.attr 'class', 'page ' + from
        container.append page
#        if !currentPage or !from
#            page.attr 'class', 'page center'
#            currentPage = page
#            return
        # Position the page at the starting position of the animation
        currentPage.one 'webkitTransitionEnd', (e)->
            t = util.ct(e)
            if t.hasClass 'right'
                pr = container.children().last()
                if t.attr 'cache'
                    app.cache.append t
                else
                    app.cleanPage(t)
                    t.remove()
                if pr.length and (hash = pr.attr 'hash')
                    cf.r hash, false
#                if container.children().length is 1
#                    container.children().removeAttr 'class'
            cf.onEndSlide?(stateHistory,currentPage)
        # Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
        container[0].offsetWidth
        # Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
        currentPage.attr 'class', 'page transition ' + (if from == 'left' then 'right' else 'left')
        page.attr 'class', 'page transition center'
        currentPage = page
    @


#'transition':'transitionend',
#'OTransition':'oTransitionEnd',
#'MozTransition':'transitionend',
#'WebkitTransition':'webkitTransitionEnd',
#'MsTransition':'msTransitionEnd'