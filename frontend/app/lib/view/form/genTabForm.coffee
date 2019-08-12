module.exports = _exv 'tabForm', 'form',

    num: 0
    saveByStep: true

    renderOneTab: ->
        curItems = @items[@num]

        if _.isFunction curItems.items
            curItems.items = curItems.items.call @

        @genForm curItems.items

        @btns = curItems.btns
        @$('.btnCtn').empty()

        @addBtns()

        if curItems.info
            @msg curItems.info, 'info'
        curItems.callback?.call @

        @formTab.find("li:eq(#{@num})").addClass('active').siblings().removeClass 'active'

        if !@formDlgFirstTab
            @afterRender()

    single: ->
        _.isString(@items[0])

    curItems: ->
        if @single() then @items else @items[@num].items
            
    addItems: (it, index)->
        if index
            @curItems().splice index, 0, it
        else
            @curItems().push it

    removeItems: (it)->
        @curItems().remove(it)