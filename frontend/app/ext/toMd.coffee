#marked = require '../res/js/marked/lib/marked'
marked = require '../res/js/markedex'

String::toMd = ->
    marked(this)