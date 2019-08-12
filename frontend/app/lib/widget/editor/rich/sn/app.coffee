require './snBtn'

initEditor = (opt)->
    opt.type ?= 'full'
    p = $(opt.parent)
    $.extend $.summernote.plugins, cf._snPlugin
    t = p.find('textarea')
    sopt =
        placeholder: opt.ph
        height: opt.height || 300
        lang: opt.lang
        focus: true
        codemirror:
            theme: 'monokai'
        toolbar: sn.btns(opt.type)

    if user.isAdmin() and !cf.view.content.added
#        sopt.toolbar.push ['insert', ['item', 'tmpl','custContent']]
        ipp = sopt.toolbar[3][1]
        if ipp
            ipp.concatBy ['item', 'tmpl','custContent']
        sopt.toolbar.push ['misc', ['codeview', 'fullscreen']] #, 'help'
        cf.view.content.added = true

    if cf.mob
        sopt.height = window.innerHeight - 250
        sopt.toolbar = sn[opt.type]

    editor = t.summernote sopt

    if t.val()
        editor.summernote 'code', t.val()
    else
        editor.summernote 'code', ''

    opt.form._snote[opt.name] = editor

sn = cf.view.content =
    full: [
        ['easy', ['text']]
        ['font',
            ['style', 'bold', 'italic', 'underline', 'strikethrough', 'clear', 'fontsize', 'color',
                'height']]
        ['para', ['ul', 'ol', 'paragraph']]
        ['insert', ['hr', 'link', 'video', 'table', 'pic']]
    ]

    simple: [
        ['mob', [
            'paragraph'
            'ul'
            'bold'
            'style'
            'link'
            'pic'
            'table'
        ]
        ]
    ]
    btns: (type)->
        cf.view.content[type]

    fun: (opt)->
        util.lcss(cf.rPath + "js/summernote/dist/summernote.css")
        cf.loadJS cf.rPath + 'js/summernote/dist/summernote.js', ->
            if _lang is 'zh'
                opt.lang = 'zh-CN'
                cf.loadJS cf.rPath + 'js/summernote/lang/summernote-zh-CN.js', ->
                    initEditor(opt)
            else
                initEditor(opt)

#                if cf.mob
#                    $('.note-btn').removeAttr 'data-original-title'


#m.common.content =
#    type: 'textarea'
#    xtype: 'content'
#    attrs:
#        rows: 16
m._summer = (code,opt)->
    $.extend true,
        code: code
        type: 'textarea'
        xtype: 'content'
        attrs:
            rows: 16
    ,opt

module.exports = sn