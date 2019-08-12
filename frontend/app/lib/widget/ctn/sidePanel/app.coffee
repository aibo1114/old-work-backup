tmpl = require './tmpl.jade'

module.exports = cf.view.sidePanel = cf.view.tag.extend
    head: true
    tmpl: tmpl
    tagClass: 'clearfix'
    auto: true
#    init: ->
#        _i.common = '通用'
#        @render()
    events:
        'click .ent': (e)->
            util.setActive(e)
            @afterPick?(e)
            
