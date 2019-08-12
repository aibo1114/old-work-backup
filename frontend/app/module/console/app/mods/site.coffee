
util.lcss(cf.modPath + 'site.css')

require '../meta/meta'
require '../meta/script'
require '../meta/codeMap'
require '../meta/sms'
require '../meta/i18n'
require '../meta/email'

treeForm = require '../../../../lib/widget/tree/treeForm'
treeEntityForm = require '../../../../lib/widget/tree/treeEntityForm'
navTree = require '../../../../lib/widget/tree/navTree'

dd = [
    key: 'nav'
    row: 20
,
    key: 'meta'
    row: 25
,
    key: 'tmpl'
    row: 26
,
    key: 'script'
    row: 27
,
    key: 'codeMap'
    row: 30
,
    key: 'i18n'
    row: 40
,
    key: 'cat'
    row: 45
,
    key: 'sms'
    row: 50
,
    key: 'email'
    row: 60
]

ctn = '#main'

if user.isRoot()
    dd.unshift
        key: 'community'
        row: 10
else if user.isAdmin()
    dd.unshift
        key: 'community'
        row: 10
        href: util.navUrl "site/community/edit/#{cf.community._id}"

layout = ->
    app.initLayout 'site', '2-10', =>
        title: iim('m_mgm', 'community')
        data: dd

for it in [
    'community'
    'meta'
    'script'
    'codeMap'
    'i18n'
    'sms'
    'email'
]
    cf.view.ipBtn 'site', it, ctn,
        layout: layout
        func: 'tb'
        listOpt: m[it].listOpt
        
app.enhance
    routes:
        '!/site/tmpl(/:p)(/:pp)': 'tmpl'
        '!/site/cat(/:p)(/:pp)': 'cat'
        '!/site/nav(/:p)(/:pp)': 'nav'

    nav: (p, pp)->
        layout()
        unless $('#treeBox').length
            $(ctn).empty().append util.layout
                treeBox: 'col-md-4'
                formBox: 'col-md-8'
            ,true

            new navTree
                el: '#treeBox'
                parent: null
                title: '导航管理'
                opt:
                    tree: '#treeBox'
                    form: '#formBox'
    tmpl: ->
        layout()
        act = 'tmpl'
        $.get util.restUrl('c/mg/file/list'),
            mod: true
            path: ''
            ext: 'jade'
        , (res)->
            new treeForm
                className: 'col-md-3 pl0'
                data: res.entities
                style: 'panel-primary'
                title: '模板文件'
                handleData: ->
                    d =
                        label: '模板文件'
                        children: []
                    for it in @data
                        d.children.push
                            id: util.randomChar(4)
                            label: it
                    @data = d
    cat: ->
        layout()
        act = 'cat'
        $.get util.restUrl('cat') + '?max=100', (r)=>
            res = {}
            for it in r.entities
                k = it.type || 'global'
                (res[k] ?= []).push it
            rd = []
            for k,v of res
                rd.push
                    _id: '_' + k
                    title: ii(k)
                    children: v
            new treeEntityForm
                parent: ctn
                entity: act
                key: '_id'
                showName: 'title'
                style: 'panel-primary'
                title: iim('m_mgm', act)
                cleanAll: true
                data:
                    children: rd
                initData: (t, pid)->
                    type: pid.substr(1)
                callback: ->
                    @$('.root').children().last().remove()
