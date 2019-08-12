tag = require '../view/tag'
entities = require '../model/entities'

module.exports = tag.extend
    className: 'alertBox alert alert-info'
    parent: 'body'
    gap: 5000
    events:
        mouseenter: ->
            clearTimeout @loopTimer  if @loopTimer
            @$('.eList').removeAttr 'style'

        mouseleave: 'leave'

        'click .closeBox': (e)->
            $('.alertBox ').hide()

    leave: ->
        @$('.eList').css 'max-height', '150px'
        @loopTimer = setInterval =>
            @eList.fetch
                data: @eList.criteriaOpt()
        , @gap

    callback: ->
        @ctn.prepend "<h4>新消息#{util.icon('minus-sign closeBox')}<strong class='badge'></strong></h4><div class='eList'></div>"

    criteriaOpt: ->
        q:
            status: 0
#                    'tid-1': "eq_s_#{cf.cid}:#{user.id}"
#                    'tid-2': "eq_s_#{cf.cid}:wechat"
#                    or: 'tid-1_tid-2'
    init: ->
        @render()
        @eList = new entities [],
            pView: @
            entity: 'event'
            toFetch: false
            init: ->
                @listenTo @, 'all', ->
                    @pView.$el.find('.badge').text @size()
            criteriaOpt: @criteriaOpt
            afterAjax: ->
                if @size() > 0
                    @pView.$el.fadeIn()
                else
                    @pView.$el.fadeOut()
        @eView = new cf.view.collection
            className: 'list-group'
            collection: @eList
            parent: '.eList'
            pView: @
            toFetch: false
            events:
                'click a': (e)->
                    item = @collection.get util.getTargetId(e)
                    item.set 'status', 1
                    item.save()
                    util.ct(e).remove()
                    @collection.remove item
                    if @collection.length is 0
                        @pView.hide()
            addOne: (d)->
                d = d.attributes
                tag = $("<a id='ev-#{d.id}' class='list-group-item'></a>")
                tag.html "#{d.msg} #{util.icon('ok', 'pull-right brand-success')}"
                if d.act.startsWith('!/')
                    tag.attr('href', '#' + d.act)
                else if d.act.startsWith('http://')
                    tag.attr('href', d.act)
                @ctn.append tag
        @leave()