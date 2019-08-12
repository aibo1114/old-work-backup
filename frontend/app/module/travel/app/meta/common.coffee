cf.cc = CountriesList = require "../../../../res/js/bootstrap-formhelpers-countries.en_US.js"

ggMap = require '../../../../lib/plugin/ggMap'
require '../../../../lib/widget/editor/ref/app'

$.extend meta.common,

    nationality:
        type: 'select'
        attrs:
            data: CountriesList

    firstName:
        valid:
            required: true

    lastName:
        valid:
            required: true
    email:
        valid:
            required: true
            email: true

    _confirm:
        type: 'email'
        label: 'Confirm Email'
        valid:
            equalTo: "[name='email']"

    m._textarea 'yourQuestion'

    pinYin:
        type: 'text'

    geo:
        type: 'text'
        readonly: true
        group:
            suf: util.icon('search')
        showText:(v)->
            _.values(v)
        events:
            'click i':->
                cf.dm.l ggMap, 'air',
                    title: '请点击具体位置'
                    opt: $.extend({selected:true}, @data.geo||{})
                    form: @
                    
    cat:
        type: 'checkbox'
        attrs:
            entity: 'cat'
            keyVal: 'code,title'
            inline: true
            addBtn: true
            criteria: (op)->
                q:
                    type: op.form.entity

    m._itemTable 'recommend',
        entity: 'recItem'
#        
#    recommend:
#        xtype: 'jsonTable'
#        attrs:
#            entity: 'recItem'
#            toFetch: false
#            _func: null
#            _prop: 'recommend'
#            _dv: []

    price:
        type: 'text'
    from:
        type: 'text'
    to:
        type: 'text'



#    ref: meta.exCom 'ref',
#        attrs:
#            setAttrs: 'title,subTitle,_id'
#
#    _: lsOpt
#        item: [
#            'refClass'
#            'ref'
#            'title'
#            'cat'
#            'description'
#            'listPic'
#            'slidePic'
#            '_dateCreated_true'
#            '_lastUpdated_true'
#        ]
#    _:
#        item: [
#            'username'
#            'phone'
#            'email'
#            'description'
#            'row'
#            'guidePic'
#            'licencePic'
#            'feedbackPic'
#        ]
#        tbItem:
#            username: {}
#            phone: {}
#            _btn: ['edit', 'del']


#m.recItem.prop.codeBy('headPic')
#meta.recItem._.item = [
#    'refClass'
#    "ref"
#    'title'
#    'subTitle'
#    'href'
#    'cls'
#    'listPic'
#]

#tu = require '../../../../../ext/tmpl'
#showInTd = require "../../../../lib/func/showInTd"

#
#lsOpt = (opt)->
#    $.extend
#        filter:
#            title: 'text:s:mt'
#        tbItem:
#            title:
#                type: 'view'
#            lastUpdated:
#                type: 'date'
#            _btn: ['edit', 'del']
#    , opt

#
#
#itemTable = (dv = [])->
#    xtype: 'jsonTable'
#    attrs:
#        entity: 'itemTable'
#        toFetch: false
#        _func: null
#        _prop: 'itemTable'
#        _dv: dv


#meta.recItem.ref.attrs.setAttrs =

