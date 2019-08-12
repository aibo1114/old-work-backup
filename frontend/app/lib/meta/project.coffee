meta.project =

    phone:
        type: 'text'

    username:
        label: '姓名'
        type: 'text'

    status:
        type: 'select'

    content:
        type: 'textarea'
        valid:
            required: true
    _:
        tbItem:
            title:
                type: 'view'
            status:
                w: 120
            _opt:
                type: "btns"

        item: ['title', 'cat', 'content', 'startedDate', 'endDate', 'headPic']