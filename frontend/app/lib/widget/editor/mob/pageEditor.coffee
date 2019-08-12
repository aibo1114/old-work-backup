cf.tp.profileItem = require('./profileItem.jade')
require './pageSelect'

module.exports = _exv 'pageEditor', 'model',
    backBtn: true
    toFetch: false
    tagClass: 'list-group'
    className: 'mobView pageEditor'
    toolbar: false
    foot: false
    head: true
    mode: 'card'
    exEvents:
        'click .inMod': (e)->
            util.sTop()
            code = util.ct(e).attr('code')
            cm = @prop.codeBy code
            v = @
            opt = $.extend
                title: iim('m_edit', iie(@entity, code))
                data: _.pick @model.toJSON(), '_id', code
                fullScreen: true
                noLabel: true
                toolbar: true
                backBtn: true
                pView: @
                prop: [
                    cm
                ]
                foot: false
                btns: [
                    label: '保存'
                    icon: 'save'
                    cls: 'btn btn-sm'
                    key: 'save'
                ]
                callback: ->
                    n = @$('input:first,textarea')
                    if n.length
                        n[0].focus()
                    else
                        @$('.save').remove()
                _saveSuccess: (m)->
                    popMsg '修改成功'
                    ob = {}
                    ob[code] = m.get(code)
                    v.model.update ob
                    cf.slider.slidePage()
            , {}
            app.dm.form 'slide', @entity, opt

    preRender: ->

        cf.view.form::showTip.call @

        @prop ?= @meta.prop
        if @model
            @data = @model.toJSON()

        for it in @prop
            it = _.clone it
            unless @isShow(it)
                continue

            k = it.code

            it.prop ?= {}
            it.prop.code = k
            it.prop.class ?= ''
            if !it.noMod
                it.prop.class += ' inMod'

            @data[k] and it.val = @data[k]
            it.val = if it.lenLimit
                util.adjustText(it.val, it.lenLimit)
            else if it.showText
                it.showText(it.val, @data, @meta, @)

            if k
                it.label ?= iie(@entity, k)

            it.ctx = @

            @ctn.append cf.rtp 'profileItem', it