require '../../../../lib/func/ipBtn'

m.forumPost =
    label: '论坛帖子'
    prop: [
        _ep 'title'
        m._cat 'forumPost'
        _ep 'brief'
        _ep 'content:content'
    ]
    listOpt:
        criteriaOpt: ->
            q:
                'user._id': user.id

m.post =
    label: '文章'
    prop: [
        _ep 'title'
        m._cat 'forumPost'
        _ep 'brief'
        _ep 'content:content'
    ]
    listOpt:
        criteriaOpt: ->
            q:
                'user._id': user.id


m.myCourse =
    label: '我的课程'
    prop: [

    ]

for it in [
    'forumPost',
    'post'
    'myCourse'
]
    cf.view.ipBtn 'home', it, ctn,
        func: 'tb'