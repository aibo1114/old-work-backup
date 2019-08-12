#jsonTable = require '../../../../lib/view/jsonTable'
#listEditor = require '../../../../lib/widget/editor/listEditor'
#
#to =
#    type: 'textarea'
#
#meta.ex 'content', 'course',
#
#    info:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'infoContent'
#            toFetch: false
#            _func: null
#            _prop: 'info'
#            _dv: []
#
#    content:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'cContent'
#            toFetch: false
#            _func: null
#            _prop: 'content'
#            _dv: []
#    _:
#        item: [
#            'title'
#            'description'
#            'info'
#            'content'
#            'headPic'
#            'status'
#        ]


#meta.ex 'itemTable', 'cContent',
#    lesson:
#        xtype: 'listEditor'
#    homework:
#        xtype: 'listEditor'
#
#    _:
#        item: [
#            'title'
#            'lesson'
#            'homework'
#        ]
#
#meta.ex 'itemTable', 'infoContent',
#    en: {}
#    subTitle:
#        xtype: 'listEditor'
#    content:
#        xtype: 'listEditor'
#    _:
#        item: [
#            'title'
#            'en'
#            'subTitle'
#            'content'
#        ]
#

m.courseContent =
    prop: [
        _ep 'title'
        _ep 'row'
        m._textarea '课程介绍'
    ]
#
#m.courseInfo =
#    prop: [
#        _ep 'title'
#    ,
#        code: 'lesson'
#        xtype: 'listEditor'
#    ,
#        code: 'homework'
#        xtype: 'listEditor'
#    ]

m.course =
    prop: [
        _ep 'title'

        _ep 'subTitle'

        _ep 'description'

        m._itemTable 'courseContent',
            label:'课程内容'

        _ep 'price'

        m._cat 'course'

        m._pic 'head'

        m.content.prop.codeBy 'status'
    ]