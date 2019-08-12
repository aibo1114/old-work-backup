require './style/main.css'
require '../../../lib/main'

cf.loadTmpl = (name) ->
    require "./#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################