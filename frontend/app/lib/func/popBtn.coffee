metaOpt = m._

$.extend metaOpt.btn,
    popEdit: (it, e)->
        util.iBtn 'edit', 'popEdit'
    popAdd: ->
        util.tBtn 'add', null, 'plus', 'popAdd btn btn-primary btn-sm'
    popView: (it, e)->
        util.iBtn "list-alt", 'edit'

$.extend metaOpt.event,
    popEdit:
        type: 'click'
        fun: (e)->
            md = @findData(e)
            opt =
                toFetch: false
                rCollection: @collection
                btns: ['save']


            $.extend(opt, _.result(@, 'formOpt')) if @formOpt
            $.extend(opt, _.result(@, 'formEditOpt')) if @formEditOpt

            id = null
            if opt.toFetch
                opt.listenTime = 'listenToOnce'
                id = md.id
            else
                opt.model = md

            app.dm.edit 'air', @entity, id, opt

            util.esp e

    popAdd:
        type: 'click'
        fun: (e)->
            opt =
                entity: @entity
                toFetch: false
                rCollection: @collection
                btns: ['save']
            if !@data and @meta.initData
                @data = @meta.initData.call @

            $.extend(opt, _.result(@, 'formOpt')) if @formOpt
            $.extend(opt, _.result(@, 'formAddOpt')) if @formAddOpt

            app.dm.add 'air', @entity, opt

            util.esp e

    popView:
        type: 'click'
        fun: (e)->
            d = @findData(e)
            opt = 
                model: d
                title: iim('view', @entity)
                foot: false

            $.extend opt, _.result(@, 'viewOpt') if @viewOpt

            app.dm.view 'air', @entity, d.id, opt


