metaOpt = m._

$.extend metaOpt.btn,
    inlineEdit: (it, e)->
        util.iBtn 'edit', 'inlineEdit'

    inlineView: (it, e)->
        util.iBtn 'list-alt', 'inlineView'

    inlineAdd: ->
        util.tBtn 'add', null, 'plus', 'btn btn-primary btn-sm'

$.extend metaOpt.event,
    inlineEdit:
        type: 'click'
        fun: (e)->
            t = util.ct(e)
            tr = t.closest('tr')
            if tr.next().hasClass 'inlineBox'
                tr.next().remove()
            else
                $(@parent).find('.inlineBox').remove()
                p = $("<td colspan='#{tr.children('td').length}'></td>")
                tr.after $("<tr class='inlineBox'></tr>").append p
                app.dm.form p, @entity,
                    cleanAll: false
                    rCollection: @collection
                    model: @findData(e)
                    toFetch: false
                    btns: ['save']
                    _save:->
                        c = @rCollection
                        c.view._setObj c.toJSON()
                        @$el.remove()
                        c.view.afterSave?(@model)

    inlineView:
        type: 'click'
        fun: (e)->
            t = util.ct(e)
            tr = t.closest('tr')
            if tr.next().hasClass 'inlineBox'
                tr.next().remove()
            else
                $(@parent).find('.inlineBox').remove()
                p = $("<td colspan='#{tr.children('td').length}'></td>")
                tr.after $("<tr class='inlineBox'></tr>").append p

                d = @findData(e)
                opt =
                    model: d
                    title: iim('view', @entity)

                $.extend opt, _.result(@, 'viewOpt') if @viewOpt

                app.dm.view p, @entity, d.id, opt
               


    inlineAdd:
        type: 'click'
        fun: (e)->
            t = util.ct(e)
            ct = t.closest('.panel-heading')
            if ct.next().hasClass 'inlineBox'
                ct.next().remove()
            else
                $(@parent).find('.inlineBox').remove()
                p = $("<div class='inlineBox'></div>")
                ct.after p
                app.dm.add p, @entity,
                    cleanAll: false
                    rCollection: @collection
                    toFetch: false
                    btns: ['save']
                    _save:->
                        @model.set 'id', util.randomChar(4)
                        c = @rCollection
                        c.add @model
                        c.view._setObj c.toJSON()
                        @$el.remove()
                        c.view.afterSave?(@model)
