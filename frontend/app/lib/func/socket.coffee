window.io = require("socket.io")
cf.onMap = {}
window.se = (path, opt, f)->
    log 'emit: ' + path
    log opt
    log 'end...'
    #    st.emit path, JSON.stringify(opt), f
    st.emit path, opt, f

window.so = (path, cb)->
    if cf.onMap[path]
        return
    cf.onMap[path] = true
    st.on path, (d)->
        log 'listen: ' + path
        cb(d)

module.exports = (code)->
    window.st = if code
        io("/#{code}")
    else
        io()

