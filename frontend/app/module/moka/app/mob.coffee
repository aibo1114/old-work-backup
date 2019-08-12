require './style/mob.css'

$.extend cf,
    loadTmpl: (name) ->
        require "./tmpl/#{name}.jade"
    loadLibTmpl: (name) ->
        require "../../../lib/tmpl/#{name}.jade"
    _init: ->
        require '../../../lib/meta/content'
        require '../../../lib/func/entityAction'
        require '../../../lib/view/collection/app'
        require '../../../lib/view/collection/table'
        require '../../../lib/view/collection/jsonTable'
        require '../../../lib/widget/refFileCollection'
        require '../../../lib/widget/editor/dTime'
        require '../../../lib/widget/editor/selectBox/multiSelect'

require("../../../lib/mobRouter")()

require("./mod/home")()
