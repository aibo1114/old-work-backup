insertImg = require '../insertImg'
initEditor = (ps)->
    p = $(ps.parent)
    t = p.find('textarea')
    ps.form.model.set 'cType', 'md'
    opt =
#        autofocus: false
        language: _lang
#        hiddenButtons:'cmdPreview'
        additionalButtons:[
            [
                name: 'groupCustom'
                data:[
                    name: 'uploadPic'
                    toggle: true
                    title: 'Upload Pic'
                    icon: _st.icon('picture')
                    callback: (e)->
                        selected = e.getSelection()
                        content = e.getContent()
                        insertImg (chunk)->
                            e.replaceSelection(chunk)
                            cursor = selected.start
                            e.setSelection(cursor,cursor+chunk.length)

                ,
                    name: 'pickRef'
                    toggle: true
                    title: 'Pick Ref'
                    icon: _st.icon('th')
                    callback: (e)->
                        log 22
                ]
            ]
        ]

#    opt.hiddenButtons = 'cmdPreview cmdBold'
    opt.footer = ''
    if ps.liveShow
        opt.footer += '<div id="twitter-footer" class="well" style="display:none;"></div>'
        opt.hiddenButtons = 'cmdPreview'
    if ps.size
        clen = 0
        if ps.val
            clen = ps.val.length
        opt.footer += "<small id='twitter-counter' class='text-success'>#{ps.size - clen} character left</small>"
        opt.onChange = (e)->
            size = ps.size
            content = e.parseContent()
            content_length = (content.match(/\n/g) or []).length + content.length
            if content == ''
                $('#twitter-footer').hide()
            else
                $('#twitter-footer').show().html content
            if content_length > 140
                $('#twitter-counter').removeClass('text-success').addClass('text-danger').html content_length - size + ' character surplus.'
            else
                $('#twitter-counter').removeClass('text-danger').addClass('text-success').html size - content_length + ' character left.'

    t.markdown opt

md = cf.view.markdown =
    fun: (opt)->
        util.lcss(cf.rPath + "js/bootstrap-markdown/css/bootstrap-markdown.min.css")
        cf.loadJS cf.rPath + 'js/bootstrap-markdown/js/bootstrap-markdown.js', ->
            cf.loadJS cf.rPath + 'js/marked/lib/marked.js', ->
#            cf.loadJS cf.rPath + 'js/marked.js', ->
                if _lang is 'zh'
                    cf.loadJS cf.rPath + "js/bootstrap-markdown/locale/bootstrap-markdown.#{_lang}.js", ->
                        initEditor(opt)
                else
                    initEditor(opt)


m._markdown = (code, opt)->
    $.extend true,
        code: code
        type: 'textarea'
        xtype: 'markdown'
        attrs:
            rows: 12
    , opt

module.exports = md
