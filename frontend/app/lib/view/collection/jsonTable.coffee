require '../../func/popBtn'
require '../../func/inlineBtn'

metaOpt = m._
$.extend metaOpt.btn,
    formDel: (it, e)->
        util.iBtn 'trash', 'formDel'

    up: (it, e)->
        util.iBtn "chevron-up", 'up'

    down: (it, e)->
        util.iBtn "chevron-down", 'down'

    cleanCache: (it)->
        util.tBtn 'clean', null, 'erase', 'cleanCache btn btn-danger btn-sm'

$.extend metaOpt.event,
    cleanCache:
        type: 'click'
        fun: (e)->
            @collection.reset()
            
    up:
        type:'click'
        fun:(e)->
            t = util.ct(e)
            tr = t.closest('tr')
            if tr.prev().length
                index = tr.index()
                @_swap(index,index-1)
                tr.after tr.prev()
                
    down:
        type:'click'
        fun:(e)->
            t = util.ct(e)
            tr = t.closest('tr')
            if tr.next().length
                index = tr.index()
                @_swap(index,index+1)
                tr.before tr.next()
                
    listDel:
        type: 'click'
        fun: (e)->
            e.stopPropagation()
            return unless confirm(ii('m_sure'))
            m = @collection.at util.ct(e).closest('tr').index()
            m.view.remove()
            @collection.remove m
            @fData.set @entity, JSON.stringify(@collection.toJSON())
            @fData.save()

    formDel:
        type: 'click'
        fun: (e)->
            e.stopPropagation()
            return unless confirm(ii('m_sure'))
            m = @findData(e)
            if m
                @collection.remove m
                m.view.remove()
                m.view.afterRemove?()
                @afterRemove?()
#                @fData.set @entity, JSON.stringify(@collection.toJSON())


jt = require('./inlineTable').extend
    noLastTime: true
    toFetch: false
    foot:false
    modelOpt:
        local: true
        afterRemove: ->
            @collection._setObj @collection.collection.toJSON()

    formEditOpt:
        toFetch: false
        colSilent: false
        _save: ->
            @closeDlg()
            c = @rCollection
            c.view._setObj c.toJSON()
            c.view.afterSave?(@model)

    formAddOpt:
        _save: ->
            @closeDlg()
            @model.set 'id', util.randomChar(4)
            c = @rCollection
            c.add @model
            c.view._setObj c.toJSON()
            c.view.afterSave?(@model)

    data: ->
        @_getProp()

$.extend jt::, require('../../func/propObj')
cf.view.jsonTable = jt
module.exports = jt