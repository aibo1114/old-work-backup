require './style/mob.css'
require '../../../lib/main'
require '../../../lib/widget/prompt'
require '../../../lib/func/wtShare'

require '../../../../public/res/js/jquery.finger/dist/jquery.finger'

cf.loadTmpl = (name) ->
    require "./tmpl/#{name}.jade"
cf.loadLibTmpl = (name) ->
    require "../../../lib/tmpl/#{name}.jade"
############################################################
router = require("../../../lib/router")
require '../../../lib/view/tag'
require '../../../lib/view/list'
cf.noReply = true

meta.item =
    _: {}

cf.afterStart = ->
    unless location.hash
        cf.r 'index'

ctn = '#content'

alert = (tmpl, func)->
    app.dm.tag 'air',
        mode: null
        className: 'rdb'
        tmpl: tmpl
        events:
            'click .btn': func

#
#nextp = (e)->
#    if 'vertical' == e.orientation
#        cf.r 'vote'
#    e.preventDefault()
#    e.stopPropagation()

$('body').on 'tap', '.imgBtn img', (e)->
    cf.r 'vote'
    e.preventDefault()
    e.stopPropagation()
#
#$('body').on 'drag', '.bsb', nextp
#$('body').on 'flick', '.bsb', nextp

$('body').on 'tap', '.modal .modal-body img', (e)->
    t = util.ct(e)
    t.closest('.modal-content').find('.close').trigger 'click'
    e.preventDefault()
    e.stopPropagation()

new router
    routes:
        '!/index': 'index'
        '!/vote': 'vote'
        '!/done': 'done'
        '!/result': 'result'

    index: ->
        cf._ssd = true
        if new Date().getTime() > +$('#endDate').val()
            cf.r 'result'
            return
        @ctn.html cf.rtp 'index'
        $('body').css 'background-color': '#594374'

    result: ->
        unless cf._ssd
            cf.r 'index'
            return
        @dm.collection ctn, 'vote',
            title: '投票结果'
            max: 100
            style: 'panel'
            criteriaOpt: ->
                p:
                    sort:
                        count: -1
            itemContext: (d)->
                d.brief = d.count
                d
        $('body').css 'background-color': '#33286d'


    vote: ->
        unless cf._ssd
            cf.r 'index'
            return
        $('body').css 'background-color': '#764bb0'
        @dm.collection ctn, 'vote',
            max: 100
            ma_fade: true
            events:
                'click .submit': (e)->
                    chs = @$('.checkbox.checked')
                    if (len = chs.length) < 3
                        alert 'rdb1', ->
                            @closeDlg()
                    else if util.getCookie('_voted')
                        alert 'rdb2', ->
                            @closeDlg()
                            cf.r 'result'
                    else
                        for it in chs
                            $.post util.actUrl("inc/vote/#{$(it).attr('sid')}/count")
                        util.setCookie '_voted', true, 1
                        cf.r 'done'
                    e.stopD
                'click .cover': (e)->
                    t = util.ct(e)
                    t.next().children().trigger 'click'
                'click .sub': (e)->
                    t = util.ct(e)
                    t.children().trigger 'click'
                'click .checkbox': (e)->
                    t = util.ct(e)
                    t.toggleClass 'checked'
                    chs = @$('.checkbox.checked')
                    if chs.length > 3
                        alert 'rdb1', ->
                            @closeDlg()
                        t.removeClass 'checked'
                    e.preventDefault()
                    e.stopPropagation()

            mode: null
            tmpl: 'vote'
            modelOpt:
                className: 'col-xs-6'
                tmpl: 'voteItem'
    done: ->
        unless cf._ssd
            cf.r 'index'
            return
        @ctn.html cf.rtp 'done'

        $('.done').on 'click', '.inBtn .btn', ->
            alert 'rdb3', ->
                @closeDlg()
        util.loadPic '.done'
        $('body').css 'background-color': '#33286c'

