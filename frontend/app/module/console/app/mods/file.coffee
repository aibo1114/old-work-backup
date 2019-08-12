fileCollection = require '../../../../lib/widget/fileCollection'
dd = [
    key: 'img'
    row: 10
#,
#    key: 'doc'
#    row: 20
#,
#    key: 'other'
#    row: 30
]
app.enhance
    routes:
        '!/file(/:act)(:/p)': 'file'

    file: (act, name, p)->
        if @initLayout
            @initLayout 'file', '2-10', =>
                title: iim('m_mgm', 'file')
                tmpl: 'dataNavItem'
                data: dd
        switch act
            when 'img'
                new fileCollection
                    title: ii('file')
                    url: '/r/c/mg/file/list'
                    parent:@_mod_ctn
                    toFetch: true
                    itemBtns: ['thumb','del']
                    foot:true
                    style: 'panel-primary'
                    max: 30

            when 'doc'
                new fileCollection
                    parent: @_mod_ctn
                    itemBtns: ['_edit', 'del']
                    type: act

            when 'other'
                log 'video'

