author = require('../../../../lib/meta/extend/uid')()

require '../../../../lib/meta/post'

meta.post._ =
    userOpt:
        key: 'author'
        val: '_id,username,title,industry,description'

    item: [
        "title"
        'subTitle'
        'author'
        'source'
        'pubTime'
        "cat"
        "tags"
        'row'
        "brief"
        "content"
        'uploadPic'
        'headPic'
        'status'
        'group'
    ]

    tbItem:
        title:
            type: "view"
        author:
            w: 150
            converter: (d)->
                if d
                    d.author?.username
        row:
            w: 60
            type: "text"
        cat:
            w: 100
            type: "text"
        dateCreated:
            w: 155
            type: "date"
        _btn: ['edit', 'del']