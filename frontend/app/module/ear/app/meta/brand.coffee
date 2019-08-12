cf.showBrand = (t)->
    id = $(t).attr 'bid'
    app.dm.model 'air', 'brand', id,
        tmpl: 'brandShow'
        title: $(t).attr('title')
        head: true

m.brandSimple =
    prop:[
        _ep 'title'
        m._text 'origin'

    ]
m.brand =
    prop: [
        _ep 'title'
        m._text 'origin',
            attrs:
                data: [
                    '丹麦'
                    '瑞士'
                    '美国'
                    '加拿大'
                    '德国'
                    '新加坡'
                    '中国'
                ]
        _ep 'description'
        m._pic 'id'
    ]
    listOpt:
        btns: ['exExcel', 'topAdd']

#
#$.extend meta,
#    brandSimple:
#        _:
#            item: [
#                'title'
#                'origin'
#            ]
#
#            tbItem:
#                title: {}
#                origin: {}
#                _btn: ['edit', 'del']

#    brand:
#        _:
#            item: [
#
#            ]
#
#            tbItem:
#                refFile:
#                    w: 120
#                    type: 'img'
#                    prop: 'head'
#                title: {}
#                origin: {}
#                dateCreated:
#                    type: 'date'
#                _opt:
#                    type: 'btns'
#                    w: 120
#
#            action: ->
#                ['edit', 'del']
