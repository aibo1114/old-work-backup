$.extend m,

    xFile:
        prop:[
            m._select 'func',
                attrs:
                    data: ['head', 'img']

            code: 'pubTime'
            type: "text"
            xtype: 'dTime'
            isShow: ->
                user.isAdmin()
            attrs:
                format: "yyyy-mm-dd HH:ii:ss"
                minuteStep: 60
            valid:
                required: true
                dateTime: true

            _ep 'description'
        ]


        handleData: (d)->
            if _.isString d
                path: util.resPath(cf.community, d)
                type: 'img'
            else
                d
        item: ["title", 'pubTime', "description", "row"]

        filter: ['func']

        event:
            popEdit:
                type: 'click'
                fun: (e) ->
                    that = @
                    eid = util.getTargetId(e).split('.')[0]
                    d = that._getObj(eid, {})
                    app.dm.form 'air', "xFile",
                        data: ->
                            d
                        toFetch: false
                        className: "form-break"
                        preRender: cf.view.form::preRender
                        _save: ->
                            @closeDlg()
                            that._setObj @model.attributes, eid
                    e.stopPropagation()
            pickIt:
                type: 'click'
                fun: (e)->
                    opt =
                        id: util.getTargetId(e)
                        type: @type
                        func: @func
                    @p.ctn.append @p.addItem.call @p, opt
                    @p._addArrayItem opt
            crop:
                type: 'click'
                fun: (evt)->
                    co = _models['_' + @func + 'Crop']
                    if co
                        p = $(evt.currentTarget).parent().prev().attr('src')
                        p = p.replace('/_thumb', '') if p.indexOf('_thumb') > 0
                        p = p.substring(0, p.indexOf('?')) if p.indexOf('?') > 0
                        co.path = p
                        co.pid = mlu.getTargetId(evt)
                        co.renderTo = $(evt.currentTarget).parent().prev()
                        new mllv.crop(co).dlg()
            thumb:
                type: 'click'
                fun: (e)->
                    app.dm.form 'air','common',
                        title: 'Thumb Picture'
                        prop:[
                            m._number 'width'
                            m._number 'height'
                        ]
                        data:
#                            path: @findData(e).toJSON().path.split('/').pop()
                            path: @findData(e).toJSON().path.replace("#{cf.community.resPath}/upload/#{cf.code}/",'')
                        btns: ['save']
                        urlRoot: util.actUrl('upload', 'thumb')
                    $('#thumbForm').find('input[name=path]').val(util.getTargetId(e))
#                zoom:
#                    type: 'click'
#                    fun: (e) ->
#                        log 'zzzz'
#                        t = util.ct(e)
#                        p = t.parent().prev()
#                        path = p.attr('src').replace('/_thumb', '')
#                        if window.wx
#                            urls =  ($(it).attr('src') for it in t.closest('.xFile').find('img'))
#                            wx.previewImage
#                                current: path
#                                urls: urls
#                        else
#                            new tag(
#                                mode: 'modal'
#                                className: 'text-center'
#                                setContent: ->
#                                    @$('.modal-footer,.modal-header').remove()
#                                    @$('.modal-dialog').html "<img src='#{path}' title='#{p.attr('title')}'>"
#                            ).render()
            del:
                type: 'click'
                fun: (e)->
                    that = @
                    t = util.ct e
                    src = t.parent().prev().attr('src')
                    id = src.split(cf.code + '/')[1].split('?')[0]
                    if confirm(ii('m_sure', ii('del')))
                        img = t.closest('.media')
                        opt =
                            id: id
                            thumb: @upOpt?.thumb
                        if (wt = img.attr('wt')) && wt #wx transition
                            popMsg 'wt del' + wt
                            img.remove()
                            that._delArrayItem?(wt, true)
                            popMsg that._toStr()
                        else
                            if confirm(ii('delRealFile'))
                                $.post(util.actUrl("upload", "remove"), opt, (d)->
                                    img.remove()
                                    alert id
                                    that._delArrayItem?(id)
                                    if d.folder
                                        that.data.del(d.id)
                                ).fail ->
                                    that._delArrayItem?(id)
                            else
                                img.remove()
                                that._delArrayItem?(id)

        btn:
            crop: ->
                util.iBtn "screenshot", "crop"

            thumb: ->
                util.iBtn "fullscreen", "thumb"

            insertToPage: ->
                util.iBtn "import", "insertToPage"

            insertToHead: ->
                util.iBtn "edit", "insert"


#define [
#    './../init.js'
#    '/lib/view/tag.js'
#    '/lib/view/sForm.js'
#    './common.js'
#], (cf, _tag, _sForm)->
#    meta.
#
#
#    meta.xFile =
#        category: meta.util.category 'img'

#                insertToPage:
#                    type: 'click'
#                    fun: (e)->
#                        tt = $(e.currentTarget).parent().prev()
#                        opt =
#                            path: util.resPath null, util.getTargetId(e)
#                            type: @type
#                            title: tt.attr('title') || tt.text()
#                        if true
#                            n = $("<div>Loading...</div>")
#                            n.attr 'id', util.randomChar(4)
#                            n.addClass 'markImg'
#                            n.attr 'src', opt.path
#                        else
#                            n = $(util.genResItem(opt))
#                        unless cf._curRage
#                            alert '请选择插入的位置'
#                        cf._curRage.insertNode n[0]
#                        t = $('.note-editable')
#                        ta = t.prev()
#                        ta.text t.code()
#                        ta.trigger 'change'
#                        @$el.modal("hide")

#                insertToHead:
#                    type: 'click'
#                    fun: (e)->
#                        that = @
#                        if confirm(ii('m.sure', [iic('del')]))
#                            opt =
#                                id: mlu.getTargetId(e).substr(0, 20)
#                                code: cf.code
#                                fName: @opt.fName
#                                thumb: @opt.thumb
#                            if confirm(ii('m.delRealFile'))
#                                $.post(mlu.actUrl("upload", "remove"), opt, (d)=>
#                                    $(e.currentTarget).parents('li').remove()
#                                    @delRefFile(@func, mlu.getTargetId(e))
#                                    if d.folder
#                                        that.data.del(d.id)
#                                        dStore.cleanBatchCache(d.folder)
#                                ).fail(=>
#                                    @delRefFile(@func, mlu.getTargetId(e)))
#                            else
#                                $(e.currentTarget).parents('li').remove()
#                                @delRefFile(@func, util.getTargetId(e))

#                del: ->
#                    util.iBtn "remove", "del"
#        _events:
#            del:
#                action: 'click'
#                fun: (e)->
#                    that = @
#                    if confirm(ii('m.sure',[iic('del')]))
#                        opt=
#                            id: mlu.getTargetId(e).substr(0,20)
#                            code:cf.code
#                            fName: @opt.fName
#                            thumb: @opt.thumb
#                        if confirm(ii('m.delRealFile'))
#                            $.post(mlu.actUrl("upload", "remove"), opt, (d)=>
#                                $(e.currentTarget).parents('li').remove()
#                                @delRefFile(@func,mlu.getTargetId(e))
#                                if d.folder
#                                    that.data.del(d.id)
#                                    dStore.cleanBatchCache(d.folder)
#                            ).fail(=>@delRefFile(@func,mlu.getTargetId(e)))
#                        else
#                            $(e.currentTarget).parents('li').remove()
#                            @delRefFile(@func,mlu.getTargetId(e))
#            insert:
#                action: 'click'
#                fun: (evt) ->
#                    editor = $("textarea[name=#{@p.editorName}]", "#main form")
#                    if editor
#                        editor = editor.data("editor")
#                    else
#                        return
#                    tt = $(evt.currentTarget).parent().prev()
#                    opt=
#                        path: util.resPath(mlu.getTargetId(evt))
#                        type: @type
#                        title: tt.attr('title') || tt.text()
#                    t = $ mlb.genResItem(opt)
#                    editor.pasteHTML mlb.getJOHtml(t.html())
#                    cf.dlg().modal("hide")
#
#            zoom:


#            pickIt:
#                action: 'click'
#                fun: (e)->
#                    opt =
#                        id: mlu.getTargetId(e)
#                        type: @type
#                        func: @func
#                    @p.ctn.append @p.addItem.call @p, opt
#                    @p.newRefFile opt
#            crop:
#                action: 'click'
#                fun: (evt)->
#                    co = _models['_'+@func+'Crop']
#                    if co
#                        p = $(evt.currentTarget).parent().prev().attr('src')
#                        p = p.replace('/_thumb', '') if p.indexOf('_thumb') > 0
#                        p = p.substring(0, p.indexOf('?')) if p.indexOf('?') > 0
#                        co.path = p
#                        co.pid = mlu.getTargetId(evt)
#                        co.renderTo = $(evt.currentTarget).parent().prev()
#                        new mllv.crop(co).dlg()
#            thumb:
#
#            edit:
#                action: 'click'
#                fun: (evt) ->
#                    that = @
#                    t = $(evt.currentTarget)
#                    eid = mlu.getTargetId(evt)
#                    data = if @data then @data.find(eid) else {}
#
#                    new _views.Form(
#                        title: ii('c.edit',ii('nav.file'))
#                        data: data
#                        eid: eid
#                        entity: "xFile"
#                        gen: true
#                        btns: ['save', null]
#                        className: "form-break"
#                        afterSuccess: (r)->
#                            if @mode is 'dlg'
#                                @$el.modal("hide")
#                            d = r.entity
#                            log 'fuck1'
#
#                            if d and d.version
#                                that.data.addOrUpdate(d)
#                            else
#                                log 'upload error'
#                            ht = $('#refFile')
#                            func = that.func
#                            if func and ht
#                                ff = if ht.text() then JSON.parse(ht.text()) else {}
#                                if _.isObject ff and ff[func]
#                                    _.each ff[func],(v,k,a)->
#                                        if(v.startsWith(d.id))
#                                            res = v.split('?&')
#                                            res[1] = d.title
#                                            a[k] = res.join('?&')
#                                    ht.text(JSON.stringify ff)
#                            t.parent().prev().text(d.title)
#                    ).dlg()
#fax = meta.xFile._btns
