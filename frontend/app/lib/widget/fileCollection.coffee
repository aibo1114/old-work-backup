
uploader = require '../widget/editor/uploader'
wxUploader = require '../widget/wx/imgUploader'

cf.widget.fileItem = require('../view/model').extend
    className: 'media'

    genResItem: (it) ->
        if it.type is 'img'
            path = it.path
            if it.wt
                wtStr = "wt='#{it.wt}' "
            else
                path += "?#{util.randomChar(2)}"
            "<img #{wtStr||''} onclick='cf.showPic(this)' class='img-responsive' src='#{path}'>"  # img-thumbnail
        else if it.type is "doc"
            """#{util.icon('file')}<a target="_blank" href="#{it.path}">#{it.fName}<span class="float-right timestamp">#{it.username||''} #{it.dateCreated||''}</span>"""
        else if it.type is "audio"
            if util.html5Check()
                """<audio controls=""><source src="#{it.path}"/></audio>"""
            else
                "<div>#{it.path}</div>"
        else if it.type is "video"
            if util.html5Check()
                """<video controls="controls"><source src="#{it.path}"/></video>"""
            else
                "<li><div>#{it.path}</div></li>"

    setContent: ->
        @data = it = @model.toJSON()
        [it.uid,it.username] = it.uid.split('__') if it.uid
        @$el.append @genResItem it
        @$el.append $('<div class="f-btn btnCtn"/>')

        if @collection.ordered and @collection.multi #it.id.endsWith('.jpg')
            sp = $('<div class="s-btn"/>').appendTo @$el
            sp.append util.icon 'chevron-left mLeft', null, null, _st.btn(null, 'sm', false)
            sp.append util.icon 'chevron-right mRight', null, null, _st.btn(null, 'sm', false, 'pull-right')


cf.view.fileCollection = cf.view.collection.extend
    max: 20
    mode: 'panel'
    className: 'xFile'
    toFetch: false
    pickBtn: false
    syncBtn: false
    cleanAll: true
    entity: 'xFile'
    type: 'img'

    items: 'title,type'
    itemBtns: ['del']

    itemView: cf.widget.fileItem

    auto: true
    fixed: false

    init: ->
        @upOpt =
            url: '/upload'
        if @form and @form.entity is 'headItem'
            @func = $("input[name='type']").val()
#        if @fName
#            @upOpt.fName = @fName()
        if @pick and @multi
            @modelOpt && @modelOpt.className = 'pick'

    enhanceContent: ->
        @$el.addClass(@type)
        @ctn.addClass 'media-list'

    preRender: ->
        if window.wx and cf.mob
            new wxUploader
                parent: @head
                title: iim('upload', @type)
                form: @form
                name: @name
                type: @type
                multi: @multi
                _func: @func
                ctx: @
        else #if @uploader is 'html5'
            oi = cf.opt.image
            uploader.fun
                parent: @head
                btnTitle: @btnTitle = iim('upload', @type)
                form: @form
                name: @name
                type: @type
                multi: @multi
                func: @func
                pickBtn: @pickBtn
                upOpt: $.extend @upOpt, oi[@func]||oi.df
                uploadCallback: @uploadCallback
                ctx: @

    uploadCallback: (res)->
        @collection.add(res.entity)

module.exports = cf.view.fileCollection


#        @head.addClass 'clearfix'
#        if @syncBtn
#            @head.append """<div class="pickPics uploadBtn">#{iim('sync',@type)}</div>"""
#        if @pickBtn
#            p = @
#            pb = $("<div class='syncImg uploadBtn'>#{iim('select', @type)}</div>").click ->
#                new list
#                    mode: 'modal'
#                    toFetch: true
#                    entity: 'xFile'
#                    events:
#                        'click img': (e)->
#                            opt =
#                                id: util.ct(e).attr('src').split('/').pop()
#                                type: p.type
#                                func: p.func
#                            unless p.uploader.multi
#                                p.collection.reset()
#                            p.collection.add(opt)
#                            p.newRefFile opt
#                            @closeDlg()
#                    enhanceContent: ->
#                        @ctn = $('<ul class="media-list refresh"></ul>')
#                        @$('.modal-body').addClass('xFile img').append(@ctn)
#                    addOne: (m)->
#                        it = m.attributes
#                        path = util.resPath('_thumb/' + it.id)
#                        item = "<div class='media'><img class='pt img-thumbnail' src='#{path}'></div>"
#                        @ctn.append item
#                    context: ->
#                        head: true
#                        title: '插入图片'
#
#            @head.append pb
#        @initUploader()


#    initUploader: ()->
#
#
#
#        return if @dMode
#        cfg = cf.uSize[@type]
#        opt = @upOpt
#        opt.thumb || (opt.thumb = '_thumb:100')
#        opt.uid = user.id + '__' + user.username if window.user
#        opt.code = cf.code unless opt.code
#        opt.type = @type
#        that = @
#        fu = $("<div class='uploadBtn'>#{@btnTitle}<input type='file' value='浏览'/></div>")
#        fi = fu.children('input')
#        if @multi
#            fi.attr 'multiple', true
#        if cfg.ext
#            fi.attr 'accept', 'image/*'
#        @head.append fu
#        kk = "#{@form.model.entity}_#{@name}_ph"
#        msg = si(kk)
#        if msg
#            @head.append "<div>#{msg}</div>"
#        if @upOpt.text
#            @head.append "<div>#{@upOpt.text}</div>"
#
#        that = @
#        fi.change (e) ->
#            fs = util.ct(e)[0].files
#            for i in [0..(fs.length - 1)]
#                file = fs[i]
#                if file.size > cf.uSize.img.max
#                    popMsg '文件太大', 'warning'
#                else
#                    fd = new FormData()
#                    fd.append(util.randomChar(8), file)
#                    fd.append 'code', cf.code
#                    that = that
#                    opt.code = cf.code
#                    $.ajax
#                        type: 'POST'
#                        url: util.getUrlParams util.actUrl("upload"), opt
#                        data: fd
#                        contentType: false
#                        processData: false
#                        success: (res)->
#                            that.uploadCallback.call that, res

