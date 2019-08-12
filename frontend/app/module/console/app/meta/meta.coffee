m.meta =
    prop: [
        _ep 'code'

        _ep _lang

        m._select 'type',
            data:
                'entity': '实体'
                'embed': '组件'

        m._itemTable 'prop',
            attrs:
                btns: ['inlineAdd']

        _ep 'memo',
            type: 'textarea'
    ]
    listOpt:
        checkAll: true
        btns:['topAdd','copyAdd','trans','batchDel']

m.metaInput =
    name:
        type: 'select'
        title: '请选择'
        data: ->
            res = {}
            for it in $('#metaForm').data('_item').model.get 'prop'
                res[it.code] = it.zh
            res
        trigger: 'change'

    type: m.prop.type
    valid: m.prop.valid
    attrs: m.prop.attrs
    ph: m.prop.ph
    val: m.prop.val
#
#    _:
#        item: [
#            'name'
#            'readonly'
#            'isShow'
#            'ph'
#            'val'
#            'type'
#            '_clearfix'
#        ]
#        tbItem:
#            name: {}
#            _btn: ['inlineEdit', 'formDel']




