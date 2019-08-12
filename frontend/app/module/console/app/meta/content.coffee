require '../../../../lib/widget/editor/snEditor'
require '../../../../lib/widget/editor/dTime'

require '../../../../lib/meta/content'

meta.content._ =
    filter:
        title: 'text:s:mt'
        cat: 'select:s:eq'

    item: [
        'title'
        'subTitle'
        'row'
        'cat'
        'pubTime'
        'content'
        'status'
        'headPic'
        'uploadPic'
    ]

    tbItem:
        title:
            type: 'view'
        cat: {}
        dateCreated:
            type: 'date'
        _btn: meta._._btn

