require('../../../../lib/meta/extend/vcode')
require('../../../../lib/widget/editor/areaCode')
require '../../../../lib/plugin/excellentExport'
require '../../../../lib/meta/content'

$.extend m.common,
    goodAtBrand:
        xtype: 'multiSelect'
        type: 'text'
        bind: true
        attrs:
            clickShow: true
            showImg: 'id'
            formEntity: 'brandSimple'
            searchItem: 'title'
            setAttrs: 'title,refFile,origin'
            panelOpt:
                entity: 'brand'
                noStr: '按名称查找'

    title:
        type: "text"
        valid:
            required: true
            minlength: 2
            maxlength: 100

    level:
        type: 'select'
        attrs:
            data: [
                '五星'
                '四星'
                '三星'
                '二星'
                '一星'
            ]