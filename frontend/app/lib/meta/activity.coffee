require './participant'

m.feeTable =
    prop: [
        _ep 'title'
        m._number 'amount'
        m._number 'price'
        _ep 'description'
    ]
    tbBtn: ['popEdit', 'formDel']

m.activityItemTable =
    prop: [
        code: 'pick'
        noName: true
        type: 'select'
        attrs:
            entity: 'content'
            keyVal: '_id,title'
            _attrs: '_id,title,content'
            title: '请选择'
        events:
            change: (e)->
                t = util.ct(e)
                data = t.data 'sdata'
                d = data.findBy('_id', t.val())
                @_snote.content.summernote 'code', d.content

        _ep 'title'

        _ep 'content:content'
    ]

m.activity =
    code: 'activity'
    entity: true
    inherit: true
    prop: [
        _ep 'title'
        _ep 'subTitle'
        _ep 'cat'
        _ep 'row'

        code: 'master'
        type: 'text'
        xtype: 'multiSelect'
        bind: true
        attrs:
            val: []
            label: 'username'
            searchItem: 'username'
            showImg: 'portrait'
            setAttrs: 'username,title,industry,introduction,refFile'
            panelOpt:
                entity: 'user'
                noStr: 'Search User by username or Email'

        _ep 'tags'

        m._tag 'hr'

        _ep 'startedDate'

        _ep 'endDate'

        code: 'venue'
        type: 'text'
        xtype: 'selectBox'
        bind: true
        attrs:
            clickShow: true
            searchItem: 'title'
            setAttrs: 'title,refFile,fee,phone,route,address,lng,lat,content,langsTable'
            panelOpt:
                entity: 'venue'
                noStr: 'Search venue by name'

        _ep 'expected'

        _ep 'fee'

        _ep 'brief'

        _ep 'content:content'

        m._tag 'hr'

        m._itemTable 'itemTable',
            attrs:
                entity: 'activityItemTable'

        code: 'partner'
        type: 'text'
        xtype: 'selectBox'
        bind: true
        attrs:
            clickShow: true
            searchItem: 'title'
            setAttrs: 'title,slogan,contact,phone,refFile,introduction'
            panelOpt:
                entity: 'partner'
                noStr: 'Search partner by name'
    ]

    
#
#m.ex 'content', 'activity',
#
#
#    partner:
#        type: 'text'
#        xtype: 'selectBox'
#        bind: true
#        attrs:
#            clickShow: true
#            searchItem: 'title'
#            setAttrs: 'title,slogan,contact,phone,refFile,introduction'
#            panelOpt:
#                entity: 'partner'
#                noStr: 'Search partner by name'
#
#
#    fee:
#        type: 'text'
#
#    expected:
#        type: "number"
#        val: 30
#        valid:
#            number: true
#            min: 5
#            max: 2000
#
#    participant:
#        xtype: 'inlineTable'
#        attrs:
#            toFetch: true
#            entity: 'participant'
#            criteriaOpt: ->
#                q:
#                    'activity._id': @form.model.id
#
#    feeTable:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'feeTable'
#            toFetch: false
#            _func: null
#            _prop: 'feeTable'
#            _dv: []
#
#    itemTable:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'activityItemTable'
#            toFetch: false
#            _func: null
#            _prop: 'itemTable'
#            _dv: []

#    _:
#
#        userOpt:
#            key: 'master'
#            val: '_id,username,title,industry,description'
#
#        item: [
#            "title"
#            'subTitle'
#            "cat"
#            'row'
#            "master"
#            'tags'
#            '_hr'
#            "startedDate"
#            "endDate"
#            'venue'
#            "expected"
#            "fee"
#            "feeTable"
#            '_hr'
#            'brief'
#            'content'
#            '_hr'
#            'itemTable'
#            'participant'
#            'status'
#            'headPic'
#        ]
#
#        tbItem:
#            title:
#                type: "view"
#            startedDate:
#                w: 155
#                type: "date"
#            row:
#                w: 50
#                type: "text"
#            cat:
#                w: 100
#                type: "text"
#            _btn: m._._btn


#    resetDay: (date)->
#date = parseLocalDate(date)
#d = if date.getDay() then date.getDay() else 7
#h = date.getHours()
#m = date.getMinutes()
#date = cf.now()
#date.monday().addDays(d - 1)
#date.setHours h
#date.setMinutes m
#date.pattern("yyyy-MM-dd HH:mm:ss")