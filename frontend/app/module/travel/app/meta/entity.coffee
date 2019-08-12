m.itemTable =
    prop: [
        _ep 'title'
        m._textarea 'content'
    ]

m.recItem =
    prop: [
        _ep '_e',
            label: 'Type'
            noEdit: true

        _ep 'title',
            noEdit: true

        code: 'ref'
        xtype: 'ref'
        type: 'holder'
        noName: true
        attrs:
            selectBoxOpt:
                setAttrs: 'title,subTitle,refFile'
                clickShow: true
                setVal: ->
                    log 'zxcvxzcv'
                    vv = _.pick @data, '_e', 'title', 'subTitle', 'refFile'
                    vv.href = util.pageUrl @data
                    @form.model.set vv
                    @target.val @data[@label]
    ]

m.theater = m.extra = m.subSight = m.restaurant =
    prop: [
        _ep 'title'
        _ep 'fee'
        _ep 'row'
        m._textarea 'content'
        m._pic 'head'
    ]

m.culture = m.handicraft =
    prop:[
        _ep 'title'
        _ep 'subTitle'
        _ep 'pinYin'
        _ep 'row'
        _ep 'content:content' 

        m._itemTable 'recommend',
            attrs:
                entity: 'recItem'

        m._pic 'slide'
        m._pic 'list'
    ]

m.food =
    prop:[
        _ep 'title'
        _ep 'subTitle'
        _ep 'pinYin'
        _ep 'row'
        _ep 'content:content' 

        m._itemTable 'restaurant'

        m._itemTable 'recommend',
            attrs:
                entity: 'recItem'

        m._pic 'slide'
        m._pic 'list'
    ]

m.guide =
    prop:[
        _ep 'username'
        _ep 'phone'
        _ep 'email'
        _ep 'row'
        _ep 'description'

        m._pic 'guide'
        m._pic 'licence'
        m._pic 'feedback',
            attrs:
                multi: true
    ]

m.city =
    prop:[
        _ep 'title'
        _ep 'description'
        m._pic 'slide'
    ]

m.top =
    prop:[
        code: 'ref'
        xtype: 'ref'
        type: 'holder'
        noName: true
        attrs:
            clickShow: true
            setAttrs: 'title,subTitle,_id,refFile'

        _ep 'title'

        _ep 'subTitle'
    ]

m.map =
    prop:[
        code: 'ref'
        xtype: 'ref'
        type: 'holder'
        noName: true
        attrs:
            clickShow: true
            setAttrs: 'title,subTitle,_id'

        _ep 'title'

        m._cat 'map'

        _ep 'description'

        m._pic 'list'
        m._pic 'slide'
    ]