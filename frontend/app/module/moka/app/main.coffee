require './style/main.css'

$.extend cf,
    loadTmpl: (name) ->
        require "./tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"

require("../../../lib/webRouter")()
require("./mod/home")()
