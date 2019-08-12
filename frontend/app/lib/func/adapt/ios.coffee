timeouts = {}
intervals = {}
orgSetTimeout = window.setTimeout
orgSetInterval = window.setInterval
orgClearTimeout = window.clearTimeout
orgClearInterval = window.clearInterval

createTimer = (set, map, args) ->
    id = undefined
    cb = args[0]
    repeat = set == orgSetInterval

    callback = ->
        if cb
            cb.apply window, arguments
            if !repeat
                delete map[id]
                cb = null
        return

    args[0] = callback
    id = set.apply(window, args)
    map[id] =
        args: args
        created: Date.now()
        cb: cb
        id: id
    id

resetTimer = (set, clear, map, virtualId, correctInterval) ->
    timer = map[virtualId]
    # recreate

    callback = ->
        if timer.cb
            timer.cb.apply window, arguments
            if !repeat
                delete map[virtualId]
                timer.cb = null
        return

    if !timer
        return
    repeat = set == orgSetInterval
    # cleanup
    clear timer.id
    # reduce the interval (arg 1 in the args array)
    if !repeat
        interval = timer.args[1]
        reduction = Date.now() - (timer.created)
        if reduction < 0
            reduction = 0
        interval -= reduction
        if interval < 0
            interval = 0
        timer.args[1] = interval
    timer.args[0] = callback
    timer.created = Date.now()
    timer.id = set.apply(window, timer.args)
    return

window.setTimeout = ->
    createTimer orgSetTimeout, timeouts, arguments

window.setInterval = ->
    createTimer orgSetInterval, intervals, arguments

window.clearTimeout = (id) ->
    timer = timeouts[id]
    if timer
        delete timeouts[id]
        orgClearTimeout timer.id
    return

window.clearInterval = (id) ->
    timer = intervals[id]
    if timer
        delete intervals[id]
        orgClearInterval timer.id
    return

window.addEventListener 'scroll', ->
# recreate the timers using adjusted intervals
# we cannot know how long the scroll-freeze lasted, so we cannot take that into account
    virtualId = undefined
    for virtualId of timeouts
        `virtualId = virtualId`
        resetTimer orgSetTimeout, orgClearTimeout, timeouts, virtualId
    for virtualId of intervals
        `virtualId = virtualId`
        resetTimer orgSetInterval, orgClearInterval, intervals, virtualId
    return
return