meta.guestBook =
    def: true
    type: 'entity'
    prop: [
        _ep 'username'

        _ep 'email'

        _ep 'phone'

#        _ep 'cat'

        code: 'content'
        type: "textarea"
        attrs:
            rows: 5
        valid:
            required: true
            maxlength: 350
            minlength: 5

    ]
