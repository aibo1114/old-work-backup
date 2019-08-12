status = require '../meta/_status'
m.venueMenu =
    prop:[
        _ep 'title'
        m._number 'price'
        m._select 'cat',
            attrs:
                data: [
                    '酒水'
                    '甜点小吃'
                    '主食'
                ]
        _ep 'description'
    ]

#item: [
#    "title",
#    "specialty",
#    "phone",
#    'address',
#    'route',
#    'fee',
#    'sMap',
#    'content',
#    'venueMenu',
#    'status',
#    'lat',
#    'lng',
#    'qrcodePic'
#    'headPic'
#    'routePic'
#]

m.venue =
    prop:[
        _ep 'title'

        m._text 'specialty'

        _ep 'phone'

        _ep 'address'

        _ep 'schedule',
            label: '活动日程'

        m._text 'route'

        m._number 'fee'

        _ep 'content:content' 


        m.content.prop.codeBy 'status'

        m._pic 'qrcode'
        m._pic 'head'
        m._pic 'route'

    ]
    listOpt:

        checkAll: true
        btns:['topAdd','copyAdd','trans','batchDel']


status.add 'venue', status.common_status

#    phone:
#        type: 'number'
#
#    route:
#        type: 'text'
#        label: '线路'
#
#    specialty:
#        type: 'text'
#
#    venueMenu:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'venueMenu'
#            toFetch: false
#            _func: null
#            _prop: 'venueMenu'
#            _dv: []
#
#    address:
#        type: 'text'
#        xtype: require '../widget/editor/inputMap'
#        title: "m.p_c_a"
#        attrs:
#            data: (d)->
#                selected: true
#                lng: d.lng
#                lat: d.lat
#                level: 0
#                zoom: 12
#    _:
#        tbItem:
#            title:
#                w: 200
#                type: "view"
#            dateCreated:
#                type: "date"
#            status:
#                type: "status"
#            _btn: meta._._btn
#
#        item: [
#            "title",
#            "specialty",
#            "phone",
#            'address',
#            'route',
#            'fee',
#            'sMap',
#            'content',
#            'venueMenu',
#            'status',
#            'lat',
#            'lng',
#            'qrcodePic'
#            'headPic'
#            'routePic'
#        ]
#
