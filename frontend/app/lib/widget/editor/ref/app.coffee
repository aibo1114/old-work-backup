cf.view.ref = cf.view.tag.extend
    tmpl: 'cols'
    className: 'row'
    setAttrs: 'title,username,subTitle,refFile,brief'
    data: ->
        cols: [
            cls: 'col-md-3'
        ,
            cls: 'col-md-9'
        ]

    events:
        'change select': (e)->
            t = util.ct(e)
            if t.val() is '0'
                @sBox.unsetVal()
            else
                @sBox.reset(t.val())

    init:->
        @render()

    preRender: ->
        @refCtn ?= @$('.col-md-3')
        @entCtn ?= @$('.col-md-9')

        @refCtn.append cf._inputEditor
            type: 'select'
            attrs:
                data: @refClass || cf.opt.entity.headRefEntity
        @entCtn.addClass('pl0').append cf._inputEditor
            type: 'text'

        if @val
            ent = @val._e
            @refCtn.children().val ent

        @sBox = new cf.view.selectBox $.extend 
            clickShow: true
            form: @form
            name: @name
            val: @val
            el: @entCtn
            parent: null
            trigger: true
            label: 'title'
            hiddenValue: false
            setAttrs: @setAttrs 
            panelOpt:
                entity: ent
                noStr: 'Search User by username or Email'
            unsetVal:->
                @form.model.unset @name
                @_picked = false
                @target.val('')

                ob = {}
                ob[@name] = 1
                @form.model.set '_unset', ob

        , @selectBoxOpt
