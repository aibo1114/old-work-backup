cf._snPlugin = {}

module.exports = _exv 'sForm', 'model',
    num: 0
    tagName: 'form'
    listenTime: 'listenToOnce'
    className: 'form-horizontal' #form-flow,form-break,form-line
    toFetch: false
    colSilent: true
#    focus: 'input:eq(0)'
    events:
        "click .back": "back"
        "click .save": "save"
        "click .reset": "reset"

        "click .show-help": "showHelp"
        "click .close-help": "closeHelp"

        "click .closeDlg": "close"

        "click .next": "next"
        "click .prev": "prev"
        "click .nav-tabs a": "onTab"

        "click label": "toEdit"

        "click .toPage": "toPage"

        'change input[name],textarea[name],select[name]': 'valChange'

#    toEdit: (e)->
#        t = util.ct(e)
#        t.next().find('input,textarea,select').focus()
#
#    toPage: (e)->
#        t = util.ct(e)
#        prop = t.attr('prop')
#        m = @prop.findBy code, prop
#        #            @meta[prop] || meta.common[prop]
#
#        opt =
#            mode: 'modal'
#            noLabel: true
#            p: @
#            _toPage: true
#            focus: true
#            foot: false
#            data: ->
#                if @prop
#                    @p.model.attributes[@prop]
#                else
#                    _.pick @p.model.attributes, @items
#            _save: ->
#                if @prop
#                    @p.model.set @prop, @model.attributes
#                else
#                    @p.model.set @model.attributes
#                @closeDlg()
#            _callback: ->
#                _.delay ->
#                    $('textarea').focus()
#                , 200
#        et = t.attr 'entity'
#        if et
#            opt.entity = et
#            opt.prop = t.attr('prop')
#        if m
#            opt.title = m.label
#            opt.items = if m.item
#                m.item.split(',')
#            else
#                [t.attr('name')]
#            if opt.items.length > 1
#                opt.noLabel = false
#                opt._toPage = false
#
#        app.dm.form app.ctn, @entity, opt


    init: ->
        @listenTo(@model, 'invalid', @renderError)
        @listenTo(@model, 'valid', @removeError)
        @prop ?= @meta.prop || []

    close: ->
        if @mode is 'modal'
            @$el.modal("hide")
        else
            @$el.remove()

    cAttr: (o)->
        for k,v of o
            @$("[name='#{k}']").val(v).trigger 'change'

    findItem: (name) ->
        @$("*[name='#{name}']")

    findItemValue: (name) ->
        t = @findItem(name)
        if t.is('input:checkbox')
            if t.length > 1
                r = ($(c).val() for c in t when $(c).is(':checked'))
                return r.join(',').toLowerCase()
            else #t.length is 1
                if t.is(':checked')
                    t.val()
                else
                    'false'
        else if t.is('input:radio')
            if t.length > 1
                t.filter(':checked').val()
            else
                t.val()
#        else if t.is('select') and !t.val()
#            t.find('option').first().val()
#            if !t.val()
        else
            t.val()

    removeError: (it)->
        if it and it.id
            p = @$('#' + it.id)
        else
            p = @findItem(it.code)
        p.tooltip('destroy').parent().removeClass('has-error')

    renderError: (msg, it)->
        if it and it.id
            p = @$('#' + it.id)
        else
            p = @findItem(it.code)

        p.parent().addClass('has-error')
        if p.attr('type') is 'hidden'
            @msg(msg)
        else
            p.attr 'title', msg
            p.tooltip
                delay:
                    show: 500
                    hide: 300
                trigger: 'manual'
            .tooltip 'show'

    rmInput: (name, query = "[name='#{name}']")->
        it = @$(query)
        if it.length
            it.closest('.form-group').remove()
        @model.unset(name)


    unsetVal: (k, v, name)->
        it = @$(k)
        if it.length
            it.val ''
            it.trigger 'change'
        @model.set name, v

    setVal: (k, v, name)->
        it = @$(k)
        if it.length
            it.val v
            it.trigger 'change'
        else if name
            @model.set name, v

    valChange: (e)->
        t = util.ct(e)
        k = t.attr('name')
        v = @findItemValue(k)

        if !@model.validateItem k, v
            if p = @prop.findBy('code', k)
                if p.cvt
                    v = p.cvt(v)
                if p.type is 'number'
                    v = +v
            @model.set k, v, silent: @colSilent
            if p and p.notify
                @model.trigger "change:#{p.code}", v
#            to del
            @["#{k}_change"]?(v, e)

            if @syncBox
                rk = k.split(':')[0]
                if @meta[rk] and @meta[rk].showCvt
                    v = @meta[rk].showCvt(v)
                $("[data-name='#{k}']", @syncBox).text v
#            to del

            if t.attr('type') == 'checkbox' && !t.is(':checked')
                @model.unset k, silent: @colSilent
        else
            @model.unset k, silent: @colSilent

    showHelp: (e) ->
        util.ct(e).parent().fadeIn()

    closeHelp: (e) ->
        util.ct(e).parent().fadeOut()

    validModel: ->
        for k,v of @_snote
            @model.set k, v.summernote('code')
        @_snote = {}
        for it in _.difference(@curItems(), _.keys(@model.attributes))
            res = @model.set it, @findItemValue(it), validate: true
            unless res
                er = @findItem(it)
                if er.length
                    @findItem(it).focus()
                    return false
        if @model._errors.length
            er = @findItem(@model._errors[0])
            if er.length
                er.focus()
                return false
        true

    reset: ->
        @model.clear(silent: true)
        @$el[0].reset()
        s = @$('.areaWt>.c')
        if s.length
            s.trigger 'change'


    before: (attr)->
        attr

    curItems: ->
        _.pluck @prop, 'code'

    single: ->
        true

    save: (e)->
        util.esp(e)
        t = if e then util.ct(e) else @$('.save')

        @ctn.find('.alert-danger').remove()

        if (@validForm and !@validForm()) or !@validModel()
            return
        cf.blockLine = @$('a.btn-primary')
        @_save(t)

    msg: (msg, type = 'danger')->
        @ctn.prepend cf.rtp 'alert',
            type: type
            closed: true
            msg: msg
            icon: _st.sign[type]

    checkAttrs: (attrs)->
        true

    _save: (t)->
        attrs = @model.attributes
        if @entity isnt 'user' and cf.index isnt 'console' and (W.user and user.isLogin())
            attrs.user = user.pick()
            if user.fake
                attrs.user.woid = user.id
                attrs.user._id = 'default' 

        @before(attrs)
        #        userOpt = @metaOpt.userOpt
        #        if userOpt and !attrs[userOpt.key] #and cf.index isnt 'console'
        #            attrs[userOpt.key] = _.pick(user.attributes, userOpt.val.split(','))

#        if @checkAttrs(attrs)
        
        opt =
            success: @_saveSuccess
            error: @_saveErr
            wait: true
        cf.blockLine = t
        @meta.afterValidate? attrs
        @model.save attrs, opt

    back: ->
        history.back()

    _saveSuccess: (model, res, options) ->
        v = model.view
        if v.colSilent
            model.trigger 'change'
        if v.rCollection
            c = _.result v, 'rCollection'
            m = c.get res.entity.id
            if m
                log 'modeify'
                m.set res.entity
            else
                log 'add to collection'
                c.add res.entity, pos: 0
        else if v.rModel
            log 'rModel'
            c = _.result v, 'rModel'
            c.set res.entity

        v.ccp && util.cleanCachePage(v.ccp)

        v.resetForm and v.reset()
        v.cleanForm and model.unset()
        v.saveSuccess(model, res, options)

    saveSuccess: (model)->
        v = model.view
        if v.mode is 'modal'
            v.closeDlg()
        else
            if v.sufPage
                v.showSufPage()
            else if v.goPage
                cf.r v.goPage
            else
                history.go(-1);
        model.view.afterSave?(model)

    _saveError: (model, xhr, options) ->
        r = $.parseJSON(xhr.responseText)
        v = model.view
        msg = ''
        cf._mkErrMsg?(r)
        if r.errors
            msg += "<p>#{e}</p>" for e in r.errors
        else if r.fmMsg
            msg = ii(r.fmMsg)
        v.ctn.find(".alert").remove()
        if msg
            v.msg msg
#        v.saveError?(model, xhr, options)

    setBtns: ->
        []

    preRender: ->
        if @focus #and !cf.mob
            @$(@focus).focus()
        #        if cf.mob
        #            @$('.btn-lg').addClass 'btn-block'
        @
