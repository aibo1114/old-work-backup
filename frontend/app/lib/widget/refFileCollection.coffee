require '../meta/xFile'

cf.view.refFileCollection = ref = require('./fileCollection').extend
    type: 'img'
    showThumb: '_thumb'
    itemBtns: ['thumb','popEdit', 'del']
    func: 'head'

    title: ''

    context: ->
        style: @style

    events:
        'click .mLeft': (e)->
            t = util.ct(e).closest('.media')
            n = t.index()
            t.after t.prev()
            @_swap n - 1, n

        'click .mRight': (e)->
            t = util.ct(e).closest('.media')
            n = t.index()
            t.before t.next()
            @_swap n, n + 1

        'click .pick': (e)->
            t = util.ct(e)
            t.addClass('active').siblings().removeClass 'active'
            @_setObj(t.index(), 'pick')

    data: ->
        @_func = @func
        for it in @_getObj(null, [])
            pn = switch @func
                when 'portrait'
                    "portrait/#{@form.model.id}.jpg"
                when 'logo','banner'
                    "images/#{it}"
                when 'id'
                    @form.model.id + '.jpg'
                else
                    it

            path: util.resPath cf.community, pn
            type: @type
            id: it

    uploadCallback: (res)->
        e = res.entity
        e.id = e.fieldname + '.' + e.extension
        e.func = @func
        e.path = util.resPath cf.community, e.name
        if e.mimetype is "image/jpeg"
            e.type = 'img'

        if @multi
            @collection.add e
        else
            @collection.reset e

        @_addArrayItem e.id, @multi


$.extend ref::, require('../func/propObj')

module.exports = ref
