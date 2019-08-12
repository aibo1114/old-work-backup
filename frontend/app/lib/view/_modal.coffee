module.exports = ->
    @parent = null
    @mode = 'modal'

    cls = 'modal fade'

    if @fullScreen
        cls += ' fullScreen'
    if @centerScreen
        cls += ' centerScreen'
    if @btmScreen
        cls += ' btmScreen'

    @$el.addClass cls
    @$el.addClass @modalCls if @modalCls

    @layout()

    @preRender?()

    @$el.on 'show.bs.modal', =>
        if @fullScreen
            util.setPageHeight(@$('.modal-content'), true)

    @$el.on('shown.bs.modal', (e) =>
        @addEvents()
        @afterRender?()
        @formDlgFirstTab = false
        @callback?()
        util.loadPic('.modal')
    ).on('hidden.bs.modal', (e)=>
        @afterDlgClose?()
        @_close()
    )


    @$el.data '_item', @
    @$el.modal $.extend show: true, @dlgOpt || {}
    util.loadPic @ctn

