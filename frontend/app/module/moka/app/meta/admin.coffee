require '../../../console/app/meta/common'

require '../../../../lib/meta/content'
require '../../../../lib/meta/post'
require '../../../../lib/meta/cat'
require '../../../../lib/meta/link'
require '../../../../lib/meta/partner'
require '../../../../lib/meta/comment'

require '../../../console/app/meta/head'

require '../../../_mod/group/meta/thread'
require '../../../_mod/group/meta/exForm'
require '../../../_mod/group/meta/group'
require '../../../_mod/group/meta/media'


require './service'
require './course'
require './qa'
require './video'

cf.__importedMeta = [
    'user'
    'content'
    'post'
    'service'
    'course'
    'qa'
    'video'
]

m.forumType =
    label: '论坛版区'
    prop: [
        _ep 'title'
        _ep 'brief'
        _ep 'content:content' 
        _ep 'limit'
    ]

m.up =
    label: '点赞人'
    prop:[
        _ep 'user',
            showText:(d)->
                d.username
        m._number 'score',
            label: '分数'
            val: 1
        m._text 'reason',
            label: '原因'
    ]

m.forumPost =
    label: '论坛帖子'
    prop: [
        _ep 'title'

        m._cat 'forumPost'

        m._select 'forumType',
            attrs:
                entity: 'forumType'
                keyVal: '_id,title'
            events:
                change:(e)->
                    log 'zxcvzxcv'
                    t = util.ct(e)
                    if (v = t.val()) is '0'
                        @model.unset 'forumType'
                    else
                        @model.set 'forumType',
                            _id: v
                            title: t.children(':selected').text()
        m._user
            code: 'author'
            attrs:
                setAttrs: '_id,username,title,role,desc,refFile'
        _ep 'brief'
        _ep 'content:content' 
        _ep 'limit'
        m._itemTable 'up'
        m._itemTable 'comment'
    ]

m.exp =
    prop:[
        _ep 'title'
        _ep 'subTitle'
        _ep 'description'
    ]

m.user.prop.push m._itemTable 'exp',
    label: '个人经历'

$.extend cf.opt.entity,
#    headRefEntity: ['post', 'content', 'forumItem']
#    headRefChannel: ['index', 'forum', 'forumSide', 'forumNotify']
    headRefEntity: ['post', 'content', 'course','forumPost']
    headRefChannel: ['index','vipCourse','pubCourse','topic','recommendVideo']

m.video.prop.push m._select 'pos',
    label: '插入位置'
    attrs:
        data:
            first: '前面'
            last: '后面'

m.post.prop.splice 10,0, m._itemTable 'video'

m.thread.prop.push(m._itemTable 'video')



cf.exLabel()