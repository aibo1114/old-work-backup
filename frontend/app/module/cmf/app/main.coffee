require './style/main.css'

cf.loadTmpl = (name) ->
    require "./tmpl/#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################

cf._uOpt =
    check: ->
        true
    afterLogin:->
        new cf.view.sideMenu()

require("../../../lib/webRouter")()

require '../../../lib/widget/ticket/app'
