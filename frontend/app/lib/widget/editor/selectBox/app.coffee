require './style.less'

selectItem = cf.view.collection.extend
    mode: 'panel'
    toFetch: false
    foot: true
    head: false
    cleanAll: true
    noStr: 'Search Entity by title'
    tagClass: 'list-group'
    modelOpt:
        tagName: 'a'
        className: 'list-group-item'
        setContent: ->
            d = @data
            @$el.append d.title || d.username
            @$el.attr 'id', "ss-#{d._id}"
            @$el.attr 'title', "ss-#{name}"

module.exports = cf.view.selectBox = cf.view.tag.extend
    key: cf.id
    disabled: false
    noHidden: false
    boxClass: 'selectBox'
    cleanAll: false
    paging: true
    addNew: false
    setInitVal: true
    searchItem: 'title'
    groupBtn: [
        icon: 'refresh'
    ,
        icon: 'edit'
    ,
        icon: 'remove'
    ]
    events:
        'click a[data-cid]': 'pick'

        'click .refresh': (e)->
            se = @
            if @data and @data[cf.id]
                url = util.restUrl(@panelOpt.entity) + '/' + @data[cf.id]
                $.get url, _attrs: @setAttrs, (res)->
                    se.data = res.entity
                    se.setVal()
                    popMsg '更新成功'

        'click .edit': (e)->
            se = @
            prop = null
            ent = @panelOpt.entity
            if se.getAttrs()
                prop = []
                for it in se.getAttrs().split(',')
                    if it is 'refFile'
                        prop.push m._pic('head')
                    else if !it.startsWith('_')
                        prop.push _ep "#{ent}:#{it}"

            app.dm.form 'air', ent,
                btns: [null,'save']
                data: @data
                prop: prop
                _save: ->
                    se.form.model.set se.name, @model.attributes
                    popMsg '更新成功'
                    @closeDlg()

        'click .remove': (e)->
            @unsetVal()
            @target.removeAttr 'readOnly'
            @form.model.unset @name, null

    getAttrs: ->
        if @setAttrs
            _.result @, 'setAttrs'
        else
            ''
    init: ->
        @target = @$('input[type=text]')
        @setData?(@form.data)
        @render()
        opt = if @clickShow
            'click input[type=text]': 'showBox'
            'keyup input[type=text]': 'filterItem'
        else
            'click input[type=text]': 'selectTextAll'
            'change input[type=text]': 'showBox'
        @bindEvents(opt)
        @panelOpt = _.result @, 'panelOpt'
        if @readonly or (@clickShow and cf.mob)
            @$('input[type=text]').attr 'readonly', 'readonly'
        if @groupBtn and user.isAdmin()
            @target.wrap '<div class="input-group"></div>'
            @target.after cf.rtp 'inputBtnGroup',
                btns: @groupBtn

    selectTextAll: (e)->
        util.ct(e).select()

    setSearch: ->

    setPanel: ->
        opt = $.extend true,
            p: @
            parent: @panel
            noStr: 'No Data!'
            criteriaOpt:
                _attrs: @getAttrs()
        , @panelOpt

        @collection = new selectItem opt

    setContent: ->
        @panel = $('<div/>')
        @panel.addClass(@boxClass)
        @setPanel?()

        @$el.append @panel

        @data ?= @val
        if @initData
            @data = @initData()

        if @data
            if _.isArray(@data)
                @target.val ''
            else
                @val = @data[@key]
                @target.val @data[@searchItem]
                @_picked = true
                @target.attr 'readOnly', true

        if @hiddenValue
            @target.removeAttr('name')

        @form.$el.mouseup =>
            if @panel.is(':visible')
                unless @_picked
                    @target.val ''
                @panel.hide()

        @$el.mouseup ->
            false

        @$el.data('sb', @)

    filterItem: (e)->
        v = util.ct(e).val()
        if v
            @panel.find('a').hide().filter(":contains('#{v}')").show()

    pick: (e)->
        @data = @collection.findData(e).attributes
        if @checkPick and !@checkPick(@data)
            @data = null
            @panel.hide()
            return
        @val = @data._id
        @_picked = true
        @setVal()
        @form.model.unset '_unset', silent: true
        @target.attr 'readonly', true
        @afterPick?(@data)
        @panel.hide()

    findSelect: (e)->
        if _.isString e
            id = parseInt(e)
        else
            id = util.getTargetId(e)

        d = @collection.get(id)
        @data = d.toJSON() if d

    setVal: ->
        ats = @getAttrs()

        res = if ats
            _.pick @data, ats.split(',')
        else
            @data

        if @setToEntity
            for k,v of res
                @form.setVal "[name='#{k}']", v, k
        else
            res._id ?= @data._id
            @form.model.set @name, res

        if @hiddenValue
            @form.model.set @name, @val

        @target.val @data[@searchItem]

    unsetVal:->
        if @setToEntity
            for k,v of res
                @form.unsetVal "[name='#{k}']"
        else
            @form.model.unset @name
        @_picked = false
        @target.val('')


    setCriteria: (v)->
        c = @collection.collection
        if _.isString v
            if v
                q = {}
                q[@searchItem] =
                    $regex: ".*#{v}.*"
                c.setCriteria q
            else

                c.unsetCriteria 'q'
        else
            c.setCriteria v

        if @entityTag and $(@entityTag).val()
            @collection.collection.entity = $(@entityTag).val()

        c.resetFetch()

    showBox: (e)->
        return if @_picked
        if !@panelOpt.entity or @panelOpt.entity is 'common'
            return
        if !@lazy
            @setCriteria if e.target then util.ct(e).val() else e
        @panel.css
            width: @target.outerWidth()
        @panel.show()

    reset: (entity)->
        if entity
            @panelOpt.entity = entity
            @meta = meta[entity]
        @unsetVal()
        @setPanel()


#    criteriaOpt: ->
#        _attrs: 'title,username,subTitle'
#    events:
#        'change select': (e)->
#            v = $(e.target).val()
#            if v.trim()
#                if v is 'file'
#                    url = util.restUrl("file/pages?code=#{cf.code}")
#                else
#                    url = util.restUrl(v)
#                @collection.entity = v
#                @collection.url = url
#                @collection.resetFetch()
#    modeContext: ->
#        title: iin(@entity)
#        tagClass: 'list-group'
#        foot: true
#    noData: ->
#        "<p class='info-text'>#{@noStr}</p>"
