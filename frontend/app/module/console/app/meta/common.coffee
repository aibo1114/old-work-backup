#ds = (v for k,v of meta when _.isObject(v) and v.def)

require '../../../../lib/meta/guestBook'

m.common.user = m._user
    attrs:
        key: '_id'
        label: 'username'
        showImg: 'portrait'
        setAttrs: '_id,username,title,email,industry,introduction'
        panelOpt:
            noStr: 'Search User by username or Email'

cf.opt =
    entity:
        cat: ['post', 'content']
        headRefEntity: ['post', 'content']
        headRefChannel: ['index']
    image:
        portrait:
            maxWidth: 200
            text: '>= 200px'
        upload:
            maxWidth: 550
            thumb: '_thumb:200'
            text: '>= 550px'
        head:
            maxWidth: 550
            thumb: '_thumb:200'
            text: '>= 550px'
        slide:
            maxWidth: 700
            thumb: '_thumb:200'
            text: '8:3，>=700px'

    addCat: (e)->
        cf.opt.entity.cat.push e
    addRef: (e)->
        cf.opt.entity.headRefEntity.push e
    addChannel: (e)->
        cf.opt.entity.headRefChannel.push e
    addImg: (opt)->
        $.extend cf.opt.image, opt

cf._stat =
    guestBook:
        className: 'col-md-12'

require './head'
require '../../../../lib/meta/content'
require '../../../../lib/meta/post'
require '../../../../lib/meta/cat'
require '../../../../lib/meta/link'
require '../../../../lib/meta/partner'

util.lcss(cf.modPath + cf.code + '.css')
