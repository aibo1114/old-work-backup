module.exports = cf.view.inlineTable = cf.view.table.extend
#    style: _st.panel 'success'
    toFetch: true
    dMode: false
    btns: ['popAdd']
    itemBtns:['popEdit','del']
    _dv: []
    init: ->
        cf.view.table::init.call @
        if @dMode
            @btns = []
            @itemBtns = []
        @listenTo(@collection, 'all', @callback) if @callback

    _save: ->
        c = @rCollection
        c.add @model
        if c.view._beforeSave
            c.view._beforeSave.call @
        @fData.set '_attrs', 'id,version'
        @fData.save()
        @$el.modal("hide")

    formEditOpt: ->
        pView: @
        toFetch: false
        fData: @fData
        _save: @_save

    formAddOpt: ->
        pView: @
        fData: @fData
        _save: @_save

    data: ->
        if @form and !@fData
            @fData = @form.model

        ds = @fData.get @entity
        #        if ds and _.isString(ds) and ds.trim().length > 2
        #            JSON.parse ds
        #        else
        if _.isArray ds
            ds
        else
            []