module.exports = cf.view.ipBtn = (mod, et, ctn, opt = {})->
    unless opt.func
        alert 'No ipBtn.func'
        throw New Error()
    url = '!'
    if mod
        url += '/' +mod
    url += '/' + et

    $.extend (meta[et].btn ?= {}),
        ipEdit: (it, e)->
            util.iBtn 'edit', null, "##{url}/edit/#{it[cf.id]}"

        ipAdd: (it, e)->
            ob = util.tBtn 'add', null, 'plus', 'btn btn-primary btn-sm'
            ob.href = "##{url}/add"
            ob

    ob =
        routes: {}

        add: ->
            opt.check?('add')
            opt.layout?()
            @dm.add ctn, et, opt.addFormOpt
            opt.after?()

        view: (id)->
            opt.check?('view')
            opt.layout?()
            @dm.view ctn, et, id, opt.viewOpt
            opt.after?()

        edit: (id)->
            opt.check?('edit')
            opt.layout?()
            @dm.edit ctn, et, id, opt.editFormOpt
            opt.after?()

        list: (eid)->
            opt.check?('list')
            opt.layout?()
            opt.listOpt ?= {}
            opt.listOpt._pagePath = true
            if eid
                [opt.listOpt.max,opt.listOpt.offset] = eid.split('_')

            @dm.collection ctn, et, $.extend(
                btns: ['ipAdd']
                topBtn: true
                itemBtns: ['ipEdit', 'del']
            , opt.listOpt)
            opt.after?()

        tb: ->
            opt.check?('tb')
            opt.layout?()
            @dm.tb ctn, et, $.extend(
                btns: ['ipAdd']
                itemBtns: ['ipEdit', 'del']
            , opt.listOpt)
            opt.after?()

    ob.routes["#{url}/edit/:id"] = "edit"
    ob.routes["#{url}/view/:id"] = "view"
    ob.routes["#{url}/add"] = 'add'
    ob.routes["#{url}/list(/:id)"] = 'list'
    ob.routes["#{url}/tb"] = 'tb'
    if _.isString opt.func
        ob.routes[url] = opt.func
    else
        ob.def = opt.func
        ob.routes[url] = 'def'

    if opt.layout and mod
        ob.layout = opt.layout
        ob.routes["!/#{mod}"] = 'layout'

    app.enhance ob

