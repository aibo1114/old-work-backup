require '../../public/res/js/jquery.finger/dist/jquery.finger'
require('../../public/res/js/fastclick/lib/fastclick').attach(document.body)

_slide = require './func/pageSlider/_slide'
_st.mode = 'card'
_st.labelCls = 'form-control-label'


cf.view.tag::className = 'mobView'
cf.view.form::mode = _st.mode
cf.view.form::className = 'breakForm mobView'
cf.view.form::btns = ['save']
cf.view.form::cols = 'col-xs-3:col-xs-9'
cf.view.form::colon = false
cf.view.form::focus = false

cf.view.tag::backBtn = true
cf.view.tag::fullScreen = true

oll = cf.dm.l
cf.dm.l = (cp, place, opt)->
    if place is 'slide'
        opt.render = _slide
    oll.apply app, arguments

cf._initOpt = ->
    mode: _st.mode
    head: true
    cleanAll: true


#util.setPageHeight $("#content"), true


#cf.scrollFix = (elem) ->
## Variables to track inputs
#    startY = undefined
#    startTopScroll = undefined
#    elem = $(elem)
#    # If there is no element, then do nothing
#    if !elem
#        return
#    # Handle the start of interactions
#    elem[0].addEventListener 'touchstart', ((event) ->
#        startY = event.touches[0].pageY
#        startTopScroll = elem.scrollTop
#        if startTopScroll <= 0
#            elem.scrollTop = 1
#        if startTopScroll + elem.offsetHeight >= elem.scrollHeight
#            elem.scrollTop = elem.scrollHeight - (elem.offsetHeight) - 1
#        return
#    ), false
#
#cf.scrollFix "#content"

#document.querySelector("body").addEventListener 'touchstart', (e)->
##    util.esp e
#    e.preventDefault()

#$('body').on 'touchmove',(e)->
#    e.preventDefault()