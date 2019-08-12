figure = (path)->
    $(cf.rtp(require('../figure.jade'),
        path: path
        title: prompt('请输入图片下方介绍信息')
    ))[0]
$.extend true, cf._snPlugin,
    pic: (ctx)->
        ui = $.summernote.ui
        ctx.memo 'button.text', ->
            btn = ui.button
                contents: util.icon('ice-lolly-tasted')
                tooltip: '格式过滤'
                click: ->
                    app.dm.add 'air', 'common',
                        title: '格式过滤'
                        noLabel: true
                        prop:[
                            m._textarea 'memo'
                        ]
                        _save: ->
                            str = @$('[name="memo"]').val().trim()
                            for it in _.compact(str.split('\n'))
                                if it.trim()
                                    ctx.invoke 'editor.insertNode', $("<p>#{it}</p>")[0]
                            @closeDlg()
            btn.render()

        ctx.memo 'button.pic', ->
            btn = ui.button
                contents: util.icon('picture')
                tooltip: '插入图片'
                click: ->
                    if cf.mob
                        if W.wx
                            wx.chooseImage
                                count: 1
                                sizeType: 'compressed'
                                success: (res)->
                                    it = res.localIds[0]
                                    wx.uploadImage
                                        localId: it
                                        isShowProgressTips: 1
                                        success: (us)->
                                            img = it
                                            $.post util.actUrl 'upload',
                                                _wt: true
                                                mid: us.serverId
                                                wcode: $('body').data('wcode')
                                                type: 'img'
                                                uid: user.id
                                            , (res)->
                                                ctx.invoke 'editor.insertNode', tu.resPath(cf.community, res.path)
                        else
                            up = $('.uupp')
                            unless up.length
                                up = $("<input class='uupp' type='file'/>").hide()
                                up.change (e) ->
                                    file = util.ct(e)[0].files[0]
                                    if file.size > cf.uSize.img.max
                                        popMsg '文件太大', 'warning'
                                    else
                                        fd = new FormData()
                                        fd.append util.randomChar(8), file
                                        $.ajax
                                            type: 'POST'
                                            url: util.getUrlParams util.actUrl("upload"), code: cf.code, uid: user.id
                                            data: fd
                                            contentType: false
                                            processData: false
                                            success: (res)->
                                                ctx.invoke 'editor.insertNode', figure(tu.resPath(cf.community, res.entity.path.split("#{cf.code}/")[1]))
                                $('form').append up
                            up.trigger 'click'
                    else
                        cf.dm.l 'fileCollection', 'air',
                            type: 'img'
                            multi: true
                            title: '插入图片'
                            toFetch: true
                            closeBtn: true
                            itemBtns: ['insertToPage']
                            url: '/r/c/mg/file/list'
                            foot: true
                            preRender:->
                            events:
                                'click .insertToPage': (e)->
                                    ctx.invoke 'editor.insertNode', figure(util.ct(e).parent().prev().attr('src').split('?')[0])
                                    @closeDlg()

            btn.render()

        ctx.memo 'button.item', ->
            btn = ui.button
                contents: util.icon('th-large')
                tooltip: '插入站内内容'
                click: ->
                    app.dm.form 'air', 'head',
                        title: '站内页面'
                        cols: 'col-md-4:col-md-8'
                        items: ['refClass', 'ref']
                        btns: ['save']
                        save: ->
                            link = @$el.data('_link')
                            if link
                                ctx.invoke 'editor.insertNode', $(link)[0]
                            @$el.removeData '_link'
                            @$el.modal("hide")
            btn.render()

        ctx.memo 'button.tmpl', ->
            btn = ui.button
                contents: util.icon('file')
                tooltip: '设置页面模板'
                click: ->
                    return unless confirm(iim('sure'))
                    cstr = cf.code
                    if cf.community.pCode
                        cstr = cf.community.pCode + '___' + cstr
                    p = [util.atHash(3) + '.html', cstr, 'tmpl___editor'].join(':')
                    url = util.restUrl('file/' + p)

                    $.get url, null, (res)->
                        if res.entity
                            t = $('.note-editor')
                            ta = t.prev()
                            ta.summernote 'code', res.entity.content
                            ta.trigger 'change'
                        else
                            alert '没有模板文件'
            btn.render()

        ctx.memo 'button.custContent', ->
            btn = ui.button
                contents: util.icon('th')
                tooltip: '插入页面模块'
                click: ->
                    app.dm.tb 'air','content',
                        cols:[
                            _ep 'title'
                            _ep 'content:content' 
                        ]
                        btns: []
                        criteriaOpt:->
                            q:
                                cat: 'func'
                        title: '页面模块'
                        events:
                            'click tr': (e)->
                                ctx.invoke 'editor.insertNode', $("<div>#{@findData(e).get('content')}</div>")[0]
                                @closeDlg()
            btn.render()
