initEditor = (opt)->
    p = $(opt.parent)
    t = p.find('textarea')
    t.markdown
        autofocus: false
        language: _lang
        additionalButtons:
            name: 'pickImg'
            toggle: true
            icon: _st.icon('img')
            callback: (e)->
                log 111

module.exports =
    fun:(opt)->
        util.lcss(cf.rPath + "js/bootstrap-markdown/css/bootstrap-markdown.min.css")
        cf.loadJS cf.rPath + 'js/bootstrap-markdown/js/bootstrap-markdown.js', ->
            if _lang is 'zh'
                cf.loadJS cf.rPath + "js/bootstrap-markdown/locale/bootstrap-markdown.#{_lang}.js", ->
                    initEditor(opt)
            else
                initEditor(opt)
    
m._markdown = (code,opt)->
    $.extend true,
        code: code
        type: 'textarea'
        xtype: 'markdown'
#        showText: (v)->
#            v
        attrs:{}
    ,opt