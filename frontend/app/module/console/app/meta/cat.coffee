require '../../../../lib/meta/cat'

meta.cat._ =
    filter:
        type: 'text'
    item: [
        "code"
        'title'
        'subTitle'
        'row'
        'type'
        "content"
        'headPic'
    ]

    tbItem:
        code:
            w: 100
            type: "text"
        title:
            type: "text"
        type:
            w: 80
            type: "text"
        _btn: ['edit', 'del']