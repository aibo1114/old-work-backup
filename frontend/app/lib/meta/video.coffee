m.video =
    prop: [
        _ep 'title',
            valid:
                require: true

#        _ep 'channel'
        _ep 'cat'
        _ep 'url',
            valid:
                require: true
                url: true

        _ep 'description'
    ]