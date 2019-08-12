cf.view.navTreeItem = cf.view.model.extend
    entity: 'nav'
    tagName: 'li'
    tmpl: require './treeItem.jade'
    opt:
        folder: 'folder-close'
        file: 'file'
        key: 'id'
        fixed: false
        showName: 'label'
        subName: 'children'
    preRender: ->
        if @model.get('type') is 'folder'
            @sub = new cf.view.navTreeCollection
                pid: @data._id
                className: 'sub'
                parent: @$el
                data: @data.children || []
                cleanAll: false
        else
            @sub && @sub.remove()

cf.view.navTreeCollection = cf.view.collection.extend
    entity: 'nav'
    tagName: 'ul'
    className: 'root'
    toFetch: false
    itemView: cf.view.navTreeItem
    events:
        'click >li>.tg': (e)->
            t = util.ct(e)
            unless t.hasClass 'glyphicon-file'
                t.toggleClass("#{_st.iconStr}-folder-open")
                t.siblings('ul').toggle()
                @afterTg?()
        'click .del': (e)->
            if confirm('Are your sure?')
                util.getModel(e).destroy(wait: true)
                @afterDel?(id)
        'click a': (e)->
            t = util.ct(e)
            @$('.' + app.active).removeClass app.active
            t.addClass app.active
            @afterPick?(t)
    afterAddAll: ->
        @ctn.append @addBtn()
    addBtn: ->
        "<li class='addBtn'><i/>#{tu.icon('plus', 'b')}<a class='add'>#{ii('add')}</a></li>"

    addOne: (item, index, opt = {})->
        cf.view.collection::addOne.apply @, arguments
        @ctn.append @ctn.children('.addBtn')


module.exports = cf.view.navTree = cf.view.model.extend
    entity: 'nav'
    mode: 'panel'
    tagClass: 'tree panel-body'
    head: true
    foot: false
    style: 'panel-primary'
    events:
        'click .pick':(e)->
            app.dm.edit @opt.form, @entity, null,
                btns: ['save']
                toFetch: false
                colSilent: false
                model: util.getModel(e)
                _saveSuccess:(m)->
                    $('#navForm').empty()

        'click .add':(e)->
            pv = util.getView(e)
            app.dm.add @opt.form, @entity,
                btns: ['save']
                model: null
                data:
                    pid: pv.pid
                    label: ''
                    type: 'file'
                _saveSuccess:(m)->
                    pv.collection.add m
                    $('#navForm').empty()

    modelOpt:
        parse: (d)->
            if d.entities.length
                res = {}
                ids = {}
                for it in d.entities
                    rp = res[it.pid] ?=[]
                    rp.push it
                    ids[it._id] = it
                for k,v of res
                    v.sortBy 'row'
                    ids[k]?.children = v
                d: res._root
            else
                d: []

    preRender: ->
        @ctn = @$('.tree')
        new cf.view.navTreeCollection
            pid: '_root'
            parent: @ctn
            data: @model.get 'd'
