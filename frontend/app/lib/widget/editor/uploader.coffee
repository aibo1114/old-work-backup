require "../../../lib/style/mod/upload.less";

module.exports = cf.view.uploader =
    fun: (opt)->
        if util.isIE('8') or util.isIE('7') or util.isIE('6')
            popMsg '浏览器版本过低，请升级浏览器，谢谢', 'warning'
            return
        return if opt.dMode

        p = $(opt.parent)
        fu = $("<div class='uploadBtn'>#{opt.btnTitle}<input type='file' value='浏览'/></div>")
        fi = fu.children('input')

        cfg = cf.uSize[opt.type]

        if opt.multi
            fi.attr 'multiple', true

        if cfg.ext
            fi.attr 'accept', 'image/*'
        p.append fu
        if opt.form
            kk = "#{opt.form.model.entity}_#{opt.name}_ph"
            msg = si(kk)
            if msg
                p.append "<div>#{msg}</div>"
            if opt.upOpt.text
                p.append "<div>#{util.del 'text', opt.upOpt}</div>"

        upOpt = opt.upOpt
        upOpt.code = cf.code
        if window.user
            upOpt.uid = user.id

        upOpt.eid = if opt.form then opt.form.model.id else null

        upOpt.func = opt.func

        fi.change (e) ->
            fs = util.ct(e)[0].files
            for i in [0..(fs.length - 1)]
                file = fs[i]
                if file.size > cfg.max
                    popMsg '文件太大', 'warning'
                else
#                    if file.name.indexOf('.jpeg') > -1
#                        file.name = file.name.replace '.jpeg', '.jpg'
                    fd = new FormData()
                    #opt.upOpt store info
                    if opt.func in ['portrait', 'id']
                        n = opt.upOpt.eid
                    else if opt.func in ['logo', 'banner']
                        n = opt.func
                    else
                        n = util.randomChar(8)
                    fd.append(n, file)
                    $.ajax
                        type: 'POST'
                        url: util.getUrlParams util.actUrl("upload"), upOpt
                        data: fd
                        contentType: false
                        processData: false
                        success: (res)->
                            opt.uploadCallback.call opt.ctx, res

        if opt.syncBtn
            p.prepend """<div class="syncImg uploadBtn">#{iim('sync',opt.type)}</div>"""

        if opt.pickBtn and !(opt.func in ['id', 'portrait']) and user.isAdmin()
            p.prepend $("<div class='pickPics uploadBtn'>#{iim('m_select', opt.type)}</div>").click ->
                cf.dm.l 'fileCollection', 'air',
                    type: 'img'
                    toFetch: true
                    closeBtn: true
                    foot: true
                    preRender:->

                    title: '选择图片'
                    itemBtns: ['insertToPage']
                    url: '/r/c/mg/file/list'
                    events:
                        'click .insertToPage': (e)->
                            res =
                                path: util.ct(e).parent().prev().attr('src')
                                type: @type
                                func: opt.func
                            res.id = res.path.split('/').pop()
                            unless opt.multi
                                opt.ctx.collection.reset()
                            opt.ctx.collection.add(res)
                            opt.ctx._addArrayItem(res.id, opt.multi)
                            @closeDlg()
#                    enhanceContent: ->
#                        @ctn = $('<ul class="media-list refresh"></ul>')
#                        @$('.modal-body').addClass('xFile img').append(@ctn)
#                    addOne: (m)->
#                        it = m.attributes
#                        path = util.resPath('_thumb/' + it.id)
#                        item = "<div class='media'><img class='pt img-thumbnail' src='#{path}'></div>"
#                        @ctn.append item
#                    modeContext: ->
#                        head: true
#                        foot: true
#                        title: '插入图片'


