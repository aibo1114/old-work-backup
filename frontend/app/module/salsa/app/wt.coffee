require './style/wt.sass'

cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################
require '../../../res/js/jquery-timeago/jquery.timeago'
jQuery.timeago.settings.allowFuture = true
jQuery.timeago.settings.localeTitle = true

cf._uOpt =
    check: ->
        true

require("../../../lib/wtRouter")()

