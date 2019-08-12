tree = require './tree'

module.exports = tree.extend
#p:@ must set
#entity: Must set
    toFetch: false
    className: 'col-md-4'
    formId: 'treeForm'
    subName: 'children'
    showName: 'label'
    key: 'id'
    parentKey: 'pid'

    channelForm: (o)->
        opt =
            p: @
            toFetch: false
            btns: ['save']
        app.dm.form ('#' + @formId), (@formEntity || @entity), $.extend(opt, o, @formOpt)

    edit: (e)->
        @channelForm
            title: iim('m_edit',@formEntity)
            data: @findItem(util.ct(e).attr('id'))
            _save: ->
                d = @model.toJSON()
                @p.updateItem d
                @$el.remove()
        e.stopPropagation()

    add: (e)->
        t = util.ct(e)
        aid = t.closest('ul').siblings("a[id]")
        pid = if aid.length
            aid.attr 'id'
        else
            @$('.root').attr 'id'
        @channelForm
            title: iim('m_add',@formEntity)
            pid: pid
            _save: ->
                d = @model.toJSON()
                d[@p.key] = util.randomChar(4)
                @p.addItem @pid, d
                @$el.remove()
        e.stopPropagation()

    preRender: ->
        @handleData()
        tree::preRender.call @
#        $(@parent).append """<div class="col-md-8" id="#{@formId}"></div>"""
#        @foot.append "<a disabled class='saveRes btn btn-lg btn-block btn-primary'>保存</a>"
#        @$el.on('click', '.saveRes', _.bind(@saveRes, @)) if @saveRes
    afterMount:->
        $(@parent).mk 'div',
            class:'col-md-8'
            id: @formId

    context: ->
        title: @title
        foot: true

    findItem: (id)->
        @data[@subName].recFind(@subName, id, @key)

    updateItem: (obj)->
        tob = @findItem(obj[@key])
        $.extend tob, obj
        if obj.mType is 'file'
            util.del @subName, tob

        $('#' + obj[@key]).text(obj[@showName])

        @p.data.res[@p.rName] = @data if @p

#        $('.saveRes').removeAttr 'disabled'

    addItem: (pid, obj)->
        if pid is (@data[@key]+'')
            r = @data[@subName]
            r.push obj
            ul = @$('.root')
        else
            r = @findItem(pid)
            r[@subName] = [] unless r[@subName]
            r[@subName].push obj
            ul = $('#' + pid).siblings('ul')

        ul.find('>li>.add').parent().remove()

        @renderTree [obj], ul, true

        @p.data.res[@p.rName] = @data if @p
#        $('.saveRes').removeAttr 'disabled'