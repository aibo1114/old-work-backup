require '../../public/res/js/jquery.finger/dist/jquery.finger'
require('../../public/res/js/fastclick/lib/fastclick').attach(document.body)

mb = $('#menuBtn')
$('#nav').on 'click', "a[href^='#!'],a[onclick]",->
    mb.trigger 'click'
    
cf.view.form::btns = ['save']
cf.view.form::cols = 'col-xs-3:col-xs-9'
cf.view.form::colon = false
cf.view.tag::backBtn = true
cf.view.tag::fullScreen = true
cf.view.tag::closeBtn = true


cf._initOpt = (k)->
    opt =
        className: 'mobView'
        mode: 'panel'
        style: "panel-primary"
        head: true
        cleanAll: true
#        callback: ->
##            if app._history.length > 0 and @head and @head.length
##                @head.append tu.icon('chevron-left', 'a', '', 'btn pull-left goBack')
##
##            if @tagName is 'form'
##                if !@noTopAdd and @mode isnt 'modal'
##                    @head.append "<a class='btn pull-right save'>#{tu.icon('floppy-disk')} 保存</a> "
##                    @foot.hide()
#            @_callback?()

    if k is 'list'
        op = noFilter: true

    $.extend opt, op