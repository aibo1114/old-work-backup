require './multiSelect.less'

selectBox = require('./app')

meta.common.duration =
    type: 'text'

module.exports = cf.view.multiSelect = selectBox.extend
    width: '200px'
    height: '90px'
    itemBtn: ['edit']
    clickShow: false
    msTmpl: require './multiSelect.jade'
    showImg: 'slide'
    groupBtn: null
    events:
        'click a[data-cid]': 'pick'

        'click .del': (e)->
            t = util.ct(e)
            item = t.closest('.msItem')
            idx = item.index()
            item.remove()
            @val.splice(idx, 1)
            @form.model.set @name, @val

        'click .pos': (e)->

        'click .add': (e)->
            return if @$('.subAddBrand').length
            that = @
            p = if $('.modal').length
                @ctn
            else
                'air'
            app.dm.form p, @formEntity || @entity,
                toFetch: false
                className: 'form-horizontal subAddBrand'
                style: ''
                cleanAll: false
                _save: ->
                    opt = @model.toJSON()
                    that.val.push opt
                    if @$el.hasClass 'modal'
                        @closeDlg()
                    else
                        @$el.remove()
                    that.form.model.set that.name, that.val
                    that.resCtn.append that.resItem(opt)

        'click .edit': (e)->
            v = @val
            fmObj = @form
            name = @name
            idx = util.ct(e).closest('.msItem').index()
            app.dm.form 'air', @panelOpt.entity,
                toFetch: false
                items: @getAttrs().split(',')
                data: v[idx]
                _save: ->
                    v[idx] = @model.toJSON()
                    fmObj.model.set name, v
                    @closeDlg()

        'mouseenter .msItem': (e)->
            @$('.btnCtn').show()

        'mouseleave .msItem': (e)->
            @$('.btnCtn').hide()

    preRender: ->
        if @data
            @val = @data
        @resCtn = $('<div class="multiSelect"></div>')
        if @target.attr('parent')
            @target.closest(@target.attr('parent')).after @resCtn
        else
            @target.after @resCtn
        if _.isArray @val
            for it in @val
                @resCtn.append @resItem(it)
        else
            @val = []

    pick: (e)->
        @data = @collection.findData(e).attributes

        if @single
            @resCtn.html @resItem(@data)
            @val = []
        else
            unless @val.findBy('_id', @data._id)
                @resCtn.append @resItem(@data)

        @setVal()

        @afterPick?(@data)

        @target.val('')
        @panel.hide()

    setVal: ->
        res = _.pick @data, @getAttrs().split(',')
        res._id ?= @data._id
        @val.pushById res, '_id'
        @form.model.set @name, @val

    imgPath: (d)->
        path = if @showImg is 'portrait'
            "portrait/#{d._id}.jpg"
        else if @showImg is 'id'
            "#{d._id}.jpg"
        else
            if d.refFile && d.refFile[@showImg]
                d.refFile[@showImg][0]
            else
                'default.jpg'
        util.resPath cf.community, path

    resItem: (d)->
        opt =
            width: @width
            height: @height
            img: @imgPath(d)

        cf.rtp @msTmpl, $.extend(opt, d)

