require './style/main.css'
require '../../../lib/main'

cf.loadTmpl = (name) ->
    require "./#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"


require '../../../res/js/jquery.tinyscrollbar'
require '../../../res/js/fullpage.js/jquery.fullPage'
require '../../../res/js/fullpage.js/jquery.fullPage.css'
require '../plugin/countdown/jcountdown.css'
require '../plugin/countdown/index.css'
require '../plugin/countdown/jquery.jcountdown.min'

require '../../../../ext/string'
require '../../../lib/view/sForm'

W.meta = require '../../../lib/meta/common'
require './meta/application'

new cf.view.sForm
    entity: 'application'
    el: '#regForm'
    toFetch: false
    validForm: ->
        rt = $('#isAccept').is(':checked')
        unless rt
            alert '请先阅读免责声明'
        rt

    _saveSuccess: (model, res)->
        if true
            alert '报名成功'
            model.view.reset()
        else
            alert '请不要重复报名'

$('#scrollBox').fullpage
    anchors: [
        'home'
        'news'
        'register'
        'events'
        'about'
    ]
    menu: '#menu'
    loopBottom: true
    afterLoad: ->
        util.loadPic()

$("#timerContent .countdown").jCountdown
    timeText: $('body').attr('et').replaceAll('-', '/')
    style: "flip"
    color: "white"

#$('#newPic').on 'slid.bs.carousel', ->
#    util.loadPic()

$('.imgs-banner-mud img').click (e)->
    util.setActive e

pl = $('#videoPlayer')
$('.videos li').click (e)->
    t = util.ct(e)
    url = t.data('url')
    pl.empty().append "<embed autoplay='autoplay' src='#{url}' allowFullScreen='true' quality='high' width='770' height='500' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'/>"

$('.videos li:eq(0)').trigger 'click'