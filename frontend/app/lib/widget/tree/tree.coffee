require './tree.less'

module.exports = _exv 'tree', 'model',

    cleanAll: true
    mode: 'panel'
#    auto: true
    head: true
    foot: false

    className: 'tree'
    subName: 'children'
    showName: 'label'
    key: 'id'

    fixed: false

    folder: 'folder-close'
    file: 'file'

    handleData: ->
        @data = _.result @, 'data'
        if @data
            @data[@subName].recSet @subName, (it)=>
                it[@key] = util.randomChar(4) unless it[@key]

    events:
        'click .tg': (e)->
            t = util.ct(e)
            unless t.hasClass 'glyphicon-file'
                t.toggleClass("#{_st.iconStr}-folder-open")
                t.siblings('ul').toggle()


        'click a': (e)->
            t = util.ct(e)
            @$('.' + app.active).removeClass app.active
            t.addClass app.active
            @itemClick?(t)

        'click .del': 'del'
        'click .add': 'add'
        'click .edit': 'edit'
        'click .ckb': 'ckb'

    ckb: (e)->
        t = util.ct(e)
        if t.attr('stype') is 'file'
            @ckbChildVal?(t)
#            if t.is ':checked'
#                pu = t.closest('ul').hasClass('sub')
#                if up.is ':checked'
        else
            all = t.parent().next().find('.ckb')
            all.prop "checked", (if t.is ':checked' then true else false)
            @ckbParentVal?(t,all)
    del: (e)->
        if confirm('Are your sure?')
            t = util.ct(e)
            id = t.siblings('a[id]').attr 'id'
            pu = t.closest('.sub')
            d = @findItem pu.siblings('a[id]').attr 'id'
            d ?= @data
            res = d[@subName].delBy id, 'id'
            if res
                t.parent().remove()
            $('#menuForm').remove()
            @afterDel?(id)

    preRender: ->
        @data[@key]?= util.randomChar(4)
        c = $("<ul id='#{@data[@key]}' class='root'></ul>")
        @ctn.addClass('tree').append c
        @renderTree(@data[@subName], c)
        if !@fixed
            c.append @addBtn()
        if @expend
            @$('.root>li>.tg').trigger 'click'


    renderTree: (items, c, addBtn)->
        for it in items
            li = @treeItem(it)
            if it[@subName]
                cc = $ '<ul class="sub"></ul>'
                li.append cc
                @renderTree it[@subName], cc, true
            c.append li
        if addBtn and !@fixed
            c.append @addBtn()

    addBtn: ->
        "<li><i/>#{tu.icon('plus', 'b')}<a class='add'>#{ii('add')}</a></li>"

    treeItem: (it, fixed = @fixed)->
        li = $ "<li><i/></li>"
        type = if it[@subName]
            @folder
        else
            @file
        li.append tu.icon(type, 'b', null, 'tg')

        if @select
            li.append "<label>#{it[@showName]}<input stype='#{type}' class='ckb' sid='#{it[@key]}' type='checkbox'/></label>"
        else
            li.append "<a class='edit' id='#{it[@key]}'>#{it[@showName]}</a>"

        unless fixed
            li.append tu.icon 'trash del', 'a'

        li









