tree = require './tree'
treeForm = require './treeForm'

module.exports = treeForm.extend

    edit: (e)->
        dd = @findItem(util.ct(e).attr('id'))
        dd = _.clone(dd)
        dd[@subName] = null
        @channelForm
            data: dd
            _saveSuccess: (m)->
                d = m.toJSON()
                v = m.view
                v.p.updateItem d
                v.$el.remove()
        e.stopPropagation()

    initData:->
        {}

    add: (e)->
        t = util.ct(e)
        pe = t.closest('ul').siblings("a[id]")
        pid = if pe.length
            pe.attr 'id'
        else
            @$('.root').attr 'id'
        data = @initData(t,pid)
        data[@parentKey] = pid
        @channelForm
            data: data
            pid: pid
            _saveSuccess: (m)->
                d = m.toJSON()
                v = m.view
                v.p.addItem v.pid, d
                v.$el.remove()

        e.stopPropagation()

    afterDel: (id)->
        ot = {}
        ot[cf.id] = id
        cf.dm.ent(ot, {entity: @entity}).destroy(wait: true)


#    preRender: ->
#        @handleData()
#        tree::preRender.call @
#        $(@parent).mk 'div',
#            class:'col-md-8'
#            id: @formId
#        $(@parent).append """<div class="col-md-8" id="#{@formId}"></div>"""
