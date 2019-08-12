require '../../../../lib/func/userRouterCheck'

id = util.atHash(2)

util.lcss(cf.modPath + 'group.css')

W._nav = (id, p...)->
    path = "group/#{id}"
    for it in p
        path += '/' + it
    util.navUrl path

$.extend cf,
    _bMenu: [
        icon: 'home'
        label: ii('home')
        href: _nav id
        row: 1
    ,
        icon: 'plus-sign'
        label: ii 'post'
        href: _nav id, 'post'
        row: 10
    ,
        icon: 'check'
        label: ii 'task'
        href: _nav id, 'task'
        row: 20
    ,
        icon: 'fire'
        label: ii 'rank'
        href: _nav id, 'rank'
        row: 30
    ,
        icon: 'user'
        label: ii 'm_my'
        href: _nav id, 'userInfo'
        row: 40
    ]
    _groupInfo: [
        _ep 'user:statement',
            type: 'textarea'
            prop:
                class: 'm-b-1'
            valid:
                min: 1
                max: 50
            lenLimit: 13
            attrs:
                max: 50

        _ep 'username'
        _ep 'user:phone'
        _ep 'wid'
        _ep 'user:department'
        _ep 'user:jobTitle',
            prop:
                class: 'm-b-1'
                
        _ep 'user:introduction',
            prop:
                class: 'bb'
            lenLimit: 13
            attrs:
                max: 150
    ]
    _statement: '好好看剧, 天天分享'

    _marks: [
        title: '综合'
    ,
        title: ii 'kind'
        key: 'kind'
    ,
        title: ii 'pop'
        key: 'pop'
    ]
    
app.dfPath = "group/#{id}"

app.about = ->
    cf.dm.l 'tag', 'slide',
        title: '关于我们'
        head: true
        mode: 'card'
        auto: true
        setContent: ->
            @ctn.mk 'p', class: 'text-xs-center', '非典型 IT男 @alex 出品<br/>版本: alpha 1.0'

require '../../../_mod/group/app'
require('../../../_mod/userInfo/meta')
require('../../../_mod/userInfo/app') _nav(id).substr(2),
    elem: [
        label: ii 'm_my', ii('work')
        icon: 'education'
        act: 'goto member'
    ,
        label: ii 'm_my', ii('task')
        icon: 'fire'
        act: 'goto task'
    ,
        label: ii 'm_my', ii('favorite')
        icon: 'heart-empty'
        act: 'favorite'
        cls: 'm-b-1'
#    ,
#        label: ii 'profile'
#        icon: 'user'
#        act: 'profile'
    ,
        label: ii 'setting'
        icon: 'cog'
        act: 'setting'
        cls: 'm-b-1 bb'
    ]


