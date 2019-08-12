m.enquire =
    prop:[
        m._select 'title',
            attrs:
                data: ['Mr.', 'Mrs.', 'Miss']
    ,
        _ep 'nationality'
        _ep 'firstName'
        _ep 'lastName'
        
        _ep 'email'
        
        _ep '_confirm'

        m._tag 'hr'

        m._textarea 'yourQuestion'

        _ep '_captcha'
    ]

m.suggestion =
    prop:[
        m._select 'title',
            attrs:
                data: ['Mr.', 'Mrs.', 'Miss']

        _ep 'nationality'
        _ep 'firstName'
        _ep 'lastName'
        _ep 'email'
        m._tag 'hr'
        _ep 'yourSuggestion'
        _ep '_captcha'
    ]

cf.showEnquire = ->
    app.dm.form 'air', 'enquire',
#        cols: 'col-md-3:col-md-9'
        toFetch: false
        title: "Your are enquiring this tour"
#        className: 'break'

#meta.suggestion =
#    title:
#        col: 6
#        type: 'select'
#        data: ['Mr.', 'Mrs.', 'Miss']
#
#    yourSuggestion:
#        type: 'textarea'
#        valid:
#            required: true
#    _:
#        item: [
#            'title'
#            'nationality'
#            'firstName'
#            'lastName'
#            'email'
#            '_hr'
#            'yourSuggestion'
#            'captcha'
#        ]
#        tbItem:
#            username:
#                type: 'view'
#            phone: {}
#            _btn: ['popView', 'popEdit', 'del']