cf.jsCache || cf.jsCache = []
cf.jsLoading || cf.jsLoading = []
cf.jsDelay || cf.jsDelay = []

#Array::remove= (val) ->
#    i = 0
#    while i < @length
#        if @[i] == val
#            @splice i, 1
#            return val
#        i++
#    null

module.exports = (url, callback, err, charset, config) ->
    ld = document.getElementById('loading')
#    if cf.mode and !url.startsWith("http")
#        callback() if callback
#        return
    for it in cf.jsCache
        if it is url
            callback() if callback
            return
    for it in cf.jsLoading
        log "loading in queue: " + url
        if it is url
            cf.jsDelay[url].push callback if callback
            return
    log "loading: " + url
    cf.jsLoading.push url
    cf.jsDelay[url] = if callback then [callback] else []
    if ld
        document.getElementById("loading").style.display = 'block'
    script = document.createElement("script")
    script.type = "text/javascript"
    script.onload = script.onreadystatechange = ->
        return  if script and script.readyState and /^(?!(?:loaded|complete)$)/.test(script.readyState)
        script.onload = script.onreadystatechange = null
        script.src = ""
        script.parentNode.removeChild script
        script = null
        cf.jsCache.push url
        config() if config

        v() for v in cf.jsDelay[url]
        cf.jsDelay.url = null
        util.del(url, cf.jsDelay)
        cf.jsLoading.remove url

        if cf.jsLoading.length is 0 and ld
            ld.style.display = 'none'

    script.charset = charset or document.charset or document.characterSet
    script.src = (if (url.indexOf(".") > 0 or url.startsWith("http")) then url else cf.st + url + ".js")
    try
        document.getElementsByTagName("head")[0].appendChild script
    catch error
        err?()
        popMsg "Loading error: #{url}", 'error'