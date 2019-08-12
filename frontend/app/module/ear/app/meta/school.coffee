m.school =
    prop:[
        _ep 'title'
        _ep 'row'

        _ep 'area'

        code: 'address'
        ph: '请输入完整地址'
        events:
            click: (e)->
                t = util.ct(e)
                v = t.val()
                unless v
                    t.val @$('.areaWt').attr('area')

        _ep 'phone'

        _ep 'description'

        m.content.prop.codeBy 'status'

        m._pic 'slide'

    ]
    listOpt:
        btns: ['exExcel', 'topAdd']