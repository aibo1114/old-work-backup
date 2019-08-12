propEditor = require '../../../../lib/widget/editor/propEditor/app'
inputEditor = require '../../../../lib/widget/editor/inputEditor'

m.itinerary =
    prop:[
        _ep 'title'
        _ep 'brief'
        m._pic 'list'

    ]

m.deal =
    prop:[

    ]
m.tour =
    prop:[
        _ep 'title'

        _ep 'description'

        m._textarea 'note'

        m._cat 'tour'

        m._text 'type',
            val: 'Private/No Shopping'

        m._text 'duration',
            val: '8 Hours'

        m._select 'difficulty',
            attrs:
                data: [
                    'Light'
                    'Medium'
                    'High'
                ]
            val: 'Medium'

        m._text 'groupSize',
            val: '1-9 Travellers'
#
#        priceRange:
#            type: 'text'
#            val: '60$ - 300$'

        m._text 'departFrom',
            val: 'Hotel Lobby'

        m._text 'returnTo',
            val: 'Hotel'

        m._text 'startAt',
            val: '09:00'
        m._text 'availability',
            val: 'All Year Round'
    ,
        m._tag 'hr'

    ,
        code: 'highlight'
        xtype: 'listEditor'
        attrs:
            dv: []
    ,
        code: 'itinerary'
        xtype: 'multiSelect'
        type: 'custom'
        bind: true
        attrs:
            val: []
            clickShow: true
            searchItem: 'title'
            entityTag: '#eeei'
            formEntity: 'itinerary'
            setAttrs: 'title,refFile,brief,cat,_e'
            panelOpt:
                className: 'col-md-offset-4'
                entity: 'sight'
                noStr: 'Search Sight by title'
            callback: ->
                @ctn.append tu.icon 'plus add btn btn-primary'
        content: ->
            select =
                type: 'select'
                id: 'eeei'
                attrs:
                    data: [
                        'sight'
                        'food'
                        'show'
                        'handicraft'
                    ]
            input =
                type: 'text'
            row = $ '<div class="row"/>'
            select = $('<div class="col-md-3"/>').append inputEditor select
            input = $('<div class="col-md-9"/>').append inputEditor input
            input.children().attr('parent', '.row')
            row.append select
            row.append input
            row
    ,
        m._tag 'hr'
    ,
        code: 'inclusion'
        xtype: 'listEditor'
        attrs:
            val: [
                'Transfers between hotel and sights'
                'Entrance fees to all sights listed'
                'A local English-speaking guide'
                'Quality local Chinese lunch'
                'Mineral water'
                'Government taxes/service charges'
            ]
    ,
        code: 'exclusion'
        xtype: 'listEditor'
        attrs:
            val: [
                'Accommodation'
                'Gratuities (optional)'
            ]
    ,
        m._tag 'hr'
    ,
        code: 'prices'
        xtype: 'propEditor'
        attrs:
            cleanAll: true
            val:
                1: 0
                2: 0
                3: 0
                4: 0
                5: 0
                6: 0
                7: 0
                8: 0
                9: 0
            addable: false
            editor:
                _key:
                    type: 'label'
                    cls: '_k'
                _val:
                    type: 'number'
                    cls: '_v'
                    valid:
                        min: 1
                        max: 10000
    ,
        m._tag 'hr'
        m._pic 'slide'
        m._pic 'head'

    ]