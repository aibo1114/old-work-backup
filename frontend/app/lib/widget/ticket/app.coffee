require './style.less'
tmpl = require './tmpl.jade'

module.exports = cf.view.ticket = cf.view.tag.extend
    tmpl: tmpl
    regBtn: '.regBtn'
    auto: true
    init: ->
        @regBtn = $(@regBtn)
        @regBtn.prop 'disabled', true
        @ctx ?= @form.model
    events:
        'click .ticket-item': (e)->
            t = util.ct(e)
            if t.hasClass 'active'
                util.del '__ticket', cf
                @ctx.unset 'ticket'
                @regBtn.prop 'disabled', true
                t.removeClass 'active'
            else
                util.setActive(t)
                d = @data[t.index()]
                @ctx.set 'ticket', _.pick(d, 'title', 'price', 'amount')
                @regBtn.prop 'disabled', false

